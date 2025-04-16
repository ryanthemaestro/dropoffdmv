# Dropoff DMV Website

A mobile-first, one-page website for Dropoff DMV, a local Facebook Marketplace delivery service based in Howard County, MD and the surrounding areas.

## Project Structure

- `index.html` - Main HTML file
- `style.css` - CSS styles with mobile-first approach
- `script.js` - JavaScript for form validation and interactive features

## Local Development

### Preview Locally

You can preview the website locally using a simple HTTP server. Here are a few options:

#### Using npx serve

```bash
# Navigate to the project directory
cd /path/to/dropoffdmv

# Start a local server
npx serve
```

#### Using Python (if installed)

```bash
# Navigate to the project directory
cd /path/to/dropoffdmv

# Python 3
python -m http.server

# Python 2
python -m SimpleHTTPServer
```

Then open your browser and navigate to `http://localhost:3000` (for npx serve) or `http://localhost:8000` (for Python).

## Deployment

### GitHub Deployment

1. Create a new repository on GitHub
2. Initialize your local repository and push to GitHub:

```bash
# Navigate to the project directory
cd /path/to/dropoffdmv

# Initialize git repository
git init

# Add all files
git add .

# Commit changes
git commit -m "Initial commit"

# Add your GitHub repository as remote
git remote add origin https://github.com/yourusername/dropoffdmv.git

# Push to GitHub
git push -u origin main
```

### Netlify Deployment

1. Sign up for a Netlify account at [netlify.com](https://www.netlify.com/)
2. Connect your GitHub account to Netlify
3. Select the repository you just created
4. Configure the build settings (not needed for this static site)
5. Click "Deploy site"

Netlify will automatically deploy your site and provide you with a URL. You can also configure a custom domain in the Netlify settings.

## Features

- Mobile-first responsive design
- Semantic HTML5
- Pure CSS with flexbox and grid layouts
- Form validation with JavaScript
- Smooth scrolling for navigation
- Sticky CTA button

## Customization

- Colors can be easily modified by changing the CSS variables in the `:root` selector in `style.css`
- Icons are from Font Awesome and can be replaced as needed
- Testimonials and pricing can be updated in the HTML file
