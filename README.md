# Lucas Stackhouse Portfolio

A modern, responsive portfolio website showcasing professional experience, projects, and skills.

## Repository Structure

```
LucasStackhouse-portfolio/
├── frontend/               # Static frontend files
│   ├── index.html         # Main HTML file
│   ├── script.js          # Frontend JavaScript
│   └── style.css          # Styling
├── backend/               # Express.js server
│   ├── server.js          # Express server configuration
│   └── Procfile           # Render deployment config
├── common/                # Shared assets
│   ├── Images/            # Profile photos and assets
│   └── Resume/            # Resume/CV files
├── package.json           # Dependencies and scripts
└── README.md              # This file
```

## Prerequisites

- Node.js (v14 or higher)
- npm (comes with Node.js)

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd LucasStackhouse-portfolio
```

2. Install dependencies:
```bash
npm install
```

## Development

To run the server locally:

```bash
npm start
```

Or use the dev script:
```bash
npm run dev
```

The application will be available at `http://localhost:3000`

### Making Changes

- **Frontend**: Edit files in the `frontend/` directory
- **Styles**: Update `frontend/style.css`
- **Scripts**: Modify `frontend/script.js`
- **Assets**: Add images/files to `common/` folder

The server will automatically serve updated files (refresh browser to see changes).

## Deployment on Render

1. Push your code to a GitHub repository
2. Go to [Render.com](https://render.com)
3. Click "New +" and select "Web Service"
4. Connect your GitHub repository
5. Configure as follows:
   - **Name**: LucasStackhouse
   - **Environment**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Root Directory**: `.` (leave default)
6. Click "Create Web Service"
7. Once deployed, Render will provide you with a URL

## DNS Configuration (GoDaddy to Render)

1. In Render dashboard, find your service's custom domain settings
2. In GoDaddy DNS settings, add a CNAME record pointing to your Render URL
3. DNS propagation may take a few minutes

## Technology Stack

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Backend**: Node.js with Express.js
- **Deployment**: Render.com

## Features

- Responsive design for all devices
- Interactive timeline of professional experience
- Skills showcase with categorized tags
- Project portfolio with detailed descriptions
- About and contact sections
- Smooth navigation and animations

## Future Enhancements

- Add contact form with email integration
- Implement blog section
- Add dark mode toggle
- Integrate with external APIs
- Add more interactive elements
- Implement backend API routes for dynamic content

## Support

For questions or issues, contact: lucas.stackhouse@colorado.edu

## License

ISC
