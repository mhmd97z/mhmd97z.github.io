/**
 * Interactive behaviors for Mohammad Zangooei's academic homepage:
 * 1. Light / Dark theme toggle with localStorage persistence
 * 2. Publication filter (All vs. First-Author)
 * 3. One-click copy email address
 * 4. Scroll-spy active state in top navigation bar
 */
(function () {
  "use strict";

  // 1. Theme Toggle
  var themeBtn = document.getElementById("theme-toggle");
  function syncThemeState() {
    var isDark = document.documentElement.getAttribute("data-theme") === "dark";
    themeBtn.setAttribute("aria-pressed", isDark ? "true" : "false");
  }
  if (themeBtn) {
    syncThemeState();
    themeBtn.addEventListener("click", function () {
      var current = document.documentElement.getAttribute("data-theme");
      var next = current === "dark" ? "light" : "dark";
      if (next === "dark") {
        document.documentElement.setAttribute("data-theme", "dark");
      } else {
        document.documentElement.removeAttribute("data-theme");
      }
      syncThemeState();
      try {
        localStorage.setItem("theme", next);
      } catch (e) {}
    });
  }

  // 2. Publication Filter (All vs. First-Author)
  var filterBtns = document.querySelectorAll(".filter-btn");
  var pubItems = document.querySelectorAll(".pub-item");

  filterBtns.forEach(function (btn) {
    btn.addEventListener("click", function () {
      var mode = btn.getAttribute("data-filter");
      filterBtns.forEach(function (b) {
        var active = b === btn;
        b.classList.toggle("active", active);
        b.setAttribute("aria-pressed", active ? "true" : "false");
      });

      pubItems.forEach(function (item) {
        var isFirst = item.getAttribute("data-first-author") === "true";
        if (mode === "first" && !isFirst) {
          item.classList.add("hidden-by-filter");
        } else {
          item.classList.remove("hidden-by-filter");
        }
      });
    });
  });

  // 3. Copy Email helper
  function copyText(text, onDone) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(onDone).catch(function () {});
    } else {
      var ta = document.createElement("textarea");
      ta.value = text;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      try {
        document.execCommand("copy");
        onDone();
      } catch (e) {}
      document.body.removeChild(ta);
    }
  }

  var emailBtn = document.getElementById("copy-email");
  var emailToast = document.getElementById("email-toast");
  if (emailBtn && emailToast) {
    emailBtn.addEventListener("click", function () {
      var email = emailBtn.getAttribute("data-email");
      copyText(email, function () {
        emailToast.classList.add("visible");
        setTimeout(function () {
          emailToast.classList.remove("visible");
        }, 1600);
      });
    });
  }

  // 4. Scroll-Spy Navigation Highlighting
  var navLinks = document.querySelectorAll(".nav-links a[href^='#']");
  var sections = [];
  navLinks.forEach(function (link) {
    var sec = document.querySelector(link.getAttribute("href"));
    if (sec) sections.push({ id: sec.id, el: sec, link: link });
  });

  function updateActiveNav() {
    var scrollPos = window.scrollY + 120;
    var current = sections[0];
    for (var i = 0; i < sections.length; i++) {
      if (sections[i].el.offsetTop <= scrollPos) {
        current = sections[i];
      }
    }
    // At the bottom of the page, short final sections can never reach the
    // threshold above, so highlight the last section explicitly.
    var atBottom =
      window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
    if (atBottom) {
      current = sections[sections.length - 1];
    }
    if (current) {
      navLinks.forEach(function (l) {
        l.classList.toggle("active", l === current.link);
      });
    }
  }

  if (sections.length > 0) {
    window.addEventListener("scroll", updateActiveNav, { passive: true });
    updateActiveNav();
  }
})();
