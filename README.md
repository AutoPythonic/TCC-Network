# TCC Network Automation Services

A web application for managing and providing TCC Network automation services, including a referral system bypass tool and daily task automation script.

## Project Structure

```
TCC/
├── css/                  # CSS stylesheets
│   ├── styles.css        # Main stylesheet for the website
│   ├── about.css         # Styles for the About page
│   └── admin.css         # Styles for the Admin panel
├── js/                   # JavaScript files
│   ├── script.js         # Main JavaScript for the website
│   ├── about.js          # JavaScript for the About page
│   └── admin.js          # JavaScript for the Admin panel
├── data/                 # Data files
│   └── status.json       # Service status configuration
├── assets/               # Static assets (images, icons, etc.)
├── index.html            # Homepage with service status and pricing
├── about.html            # About page with information about the service
├── admin.html            # Admin panel for managing service status
└── README.md             # Project documentation
```

## Features

- **Service Status Management**: Admin-controlled service status system
- **Dynamic Service Buttons**: Buttons change based on service status (Live/Offline)
- **Admin Panel**: Secure login for managing service status
- **About Section**: Comprehensive information about the service
- **Responsive Design**: Mobile-friendly layout for all devices

## Setup Instructions

1. Clone the repository to your local machine or web server
2. No build process required - this is a static website
3. Access `index.html` to view the main website
4. Access `admin.html` to manage service status (login required)

## Admin Access

- Username: admin
- Password: tcc2025admin

## Service Status Management

The service status is stored in `data/status.json` and can be updated through the admin panel. For GitHub Pages deployment, you'll need to manually update this file in your repository after making changes in the admin panel.

## Browser Compatibility

The website is compatible with all modern browsers:
- Chrome (recommended)
- Firefox
- Safari
- Edge

## Dependencies

- Font Awesome 6.0.0-beta3 for icons
- Google Fonts (Inter) for typography
- All dependencies are loaded via CDN, no local installation required

## Development

To make changes to the project:

1. Edit HTML files for structural changes
2. Modify CSS files in the `css/` directory for styling changes
3. Update JavaScript files in the `js/` directory for functionality changes
4. The `data/status.json` file controls the service status displayed to users

## License

This project is proprietary and confidential. Unauthorized copying, distribution, or use is strictly prohibited.

© 2025 TCC Network Automation
