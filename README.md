# Mohammad Zangooei - Personal Academic Website (`mhmd97z.github.io`)

Zero-dependency static academic homepage built with clean semantic HTML5, CSS custom properties (Light & Dark mode), and vanilla JavaScript.

## Local Preview

```bash
cd /Users/mzangooei/Desktop/thesis/mhmd97z.github.io
python3 -m http.server 8080
```

Then visit `http://localhost:8080`.

## Quick Customization

### 1. Updating Your Profile Photo
Replace `assets/img/profile.jpg` with any square or portrait image (`index.html` already points to `assets/img/profile.jpg`).

### 2. Adding a Public CV / Resume Later
1. Copy your public CV PDF to `assets/pdf/cv.pdf`.
2. Uncomment the `CV` link inside `<ul class="nav-links">` in `index.html`:
   ```html
   <li><a href="assets/pdf/cv.pdf" target="_blank" rel="noopener">CV</a></li>
   ```

## Deploying to GitHub Pages (`https://mhmd97z.github.io`)

1. Create a new **public** repository named **`mhmd97z.github.io`** under [`github.com/mhmd97z`](https://github.com/mhmd97z).
2. Run the following commands from this directory:
   ```bash
   cd /Users/mzangooei/Desktop/thesis/mhmd97z.github.io
   git init
   git branch -M main
   git add .
   git commit -m "Initial academic homepage"
   git remote add origin git@github.com:mhmd97z/mhmd97z.github.io.git
   git push -u origin main
   ```
3. GitHub Pages will automatically publish the site at **`https://mhmd97z.github.io/`** within ~1 minute (the included `.nojekyll` file ensures assets are served directly without Jekyll build steps).
