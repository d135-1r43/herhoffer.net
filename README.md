# Herhoffer.net - Bento-Style Portfolio

Modern portfolio website with a beautiful bento-style grid layout, built with plain HTML and Tailwind CSS.

## Features

- 🎨 **Bento-style grid layout** - Responsive card-based design
- 🌓 **Auto dark/light mode** - Adapts to system preference
- 📱 **Fully responsive** - Mobile, tablet, and desktop optimized
- ⚡ **Zero build complexity** - Plain HTML with Tailwind CDN
- 🔄 **Live reload** - Development server with auto-refresh

## Quick Start

### Install dependencies:
```bash
npm install
```

### Start development server:
```bash
npm run dev
```

The site will automatically open in your browser at http://localhost:8030

Any changes to files will automatically reload the browser.

## Project Structure

```
herhoffer.net/
├── index.html              # Main HTML file
├── package.json            # NPM configuration
├── assets/
│   └── images/             # Images directory
│       └── .gitkeep
├── .gitignore
└── README.md
```

## Customization

### Adding Your Profile Picture

Replace the placeholder avatar by adding your image:
```bash
# Add a square image (400x400px recommended)
cp /path/to/your/photo.jpg assets/images/avatar.jpg
```

Then update the HTML in `index.html` (search for "MH" placeholder).

### Editing Content

All content is in `index.html`. Simply edit the file and the browser will auto-reload.

### Color Scheme

The site automatically adapts to your system's dark/light mode preference:
- **macOS**: System Preferences → General → Appearance
- **Windows**: Settings → Personalization → Colors → Choose your mode

## Technology Stack

- **HTML5** - Semantic markup
- **Tailwind CSS v3** - Utility-first CSS (via CDN)
- **Font Awesome 6** - Icons
- **Google Fonts** - Inter font family
- **live-server** - Development server with auto-reload

## Deployment

### Docker (Recommended)

The site includes a Docker setup for easy deployment:

- **Docker Image**: Automatically built and pushed to GitHub Container Registry
- **Portainer Ready**: Includes `docker-compose.yml` for Portainer stacks
- **nginx-proxy-manager**: Pre-configured for external network integration

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed Docker deployment instructions.

### Static Hosting

The site is pure HTML and can also be deployed to any static hosting:

- **GitHub Pages**: Push to `gh-pages` branch
- **Netlify**: Drag & drop the project folder
- **Vercel**: Connect your Git repository
- **Traditional hosting**: Upload `index.html` and `assets/` folder via FTP

No build step required!

## License

MIT License - Feel free to use this as a template for your own site.

---

Built with ❤️ using Tailwind CSS
