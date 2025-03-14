# RevFlare Website

This is the website for RevFlare, an AI-powered database reactivation and lead management solution.

## Setup Instructions

1. **Create the website directory structure** in your project folder:

```
mkdir -p website/assets/{css,js,images,fonts}
mkdir -p website/blog
```

2. **Copy the files** to their respective locations:

```
# Copy HTML files to the website root
cp index.html how-it-works.html early-access.html roadmap.html website/
cp .nojekyll website/

# Copy CSS file
cp style.css website/assets/css/

# Copy JavaScript file
cp scripts.js website/assets/js/

# Copy blog index file
cp blog/index.html website/blog/

# Copy the logo SVG
cp revflare-logo.svg website/assets/images/
```

3. **Create necessary placeholder images**:

For the website to work properly, you'll need to create or source placeholder images for:

- `assets/images/hero-illustration.svg`
- `assets/images/step1-database.svg`, `step2-conversation.svg`, etc.
- `assets/images/solution-preview.svg`
- `assets/images/database-reactivation.svg`
- `assets/images/expert-1.jpg`, `expert-2.jpg`
- `assets/images/testimonial-1.jpg`, `testimonial-2.jpg`, `testimonial-3.jpg`
- `assets/images/blog-feature.jpg`, `blog-1.jpg`, etc.
- `assets/images/integration-salesforce.svg`, etc.

You can use a service like [SVGator](https://www.svgator.com/) to create SVG illustrations or [Unsplash](https://unsplash.com/) for free stock photos.

4. **Test the website locally**:

You can use a local server to test the website. If you have Python installed:

```
cd website
python -m http.server 8000
```

Then visit `http://localhost:8000` in your browser.

5. **Deploy to GitHub Pages**:

- Create a new GitHub repository
- Initialize Git in your website folder and commit all files
- Push to GitHub
- Enable GitHub Pages in the repository settings

## Structure Overview

- **index.html**: Main landing page
- **how-it-works.html**: Detailed explanation of the product
- **early-access.html**: Early access application page
- **roadmap.html**: Product roadmap and future features
- **blog/index.html**: Blog landing page
- **assets/css/style.css**: Main stylesheet
- **assets/js/scripts.js**: Main JavaScript file
- **assets/images/**: All images and illustrations

## GitHub Pages Setup

The `.nojekyll` file is included to ensure GitHub Pages doesn't process the site with Jekyll, which can cause issues with certain file paths.