# Lucas Stackhouse Portfolio

A modern, responsive portfolio website showcasing professional experience, projects, and skills.

## Repository Structure

```
LucasStackhouse-portfolio/
├── frontend/               # Static frontend files
│   ├── index.html         # Main HTML file
│   ├── script.js          # Frontend JavaScript
│   ├── style.css          # Styling
│   └── favicon.svg        # Site favicon
├── backend/               # Express.js server
│   └── server.js          # Serves frontend/ and common/ as static files
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

Run the server locally:

```bash
npm run dev     # nodemon — auto-restarts on file changes
npm start       # standard start, no auto-restart
```

The application will be available at `http://localhost:3000`

### Making Changes

- **Frontend**: Edit files in `frontend/`
- **Styles**: Update `frontend/style.css`
- **Scripts**: Modify `frontend/script.js`
- **Assets**: Add images/files to `common/`

The Express server automatically serves updated static files — just refresh the browser.

## Deployment on AWS Amplify

The site is hosted on **AWS Amplify** with continuous deployment from the `main` branch on GitHub.

### Initial Setup

1. Push your code to GitHub
2. Go to [AWS Amplify Console](https://console.aws.amazon.com/amplify)
3. Click **New app → Host web app**
4. Connect your GitHub account and select this repository
5. Select the **`main`** branch for production
6. Configure build settings:
   - **Build command**: `npm install`
   - **Start command**: `npm start`
   - **Output directory**: `frontend`
7. Click **Save and deploy**

Amplify will automatically redeploy on every push to `main`.

### Amplify Build Specification (`amplify.yml`)

If Amplify requires an explicit build spec, create `amplify.yml` at the repo root:

```yaml
version: 1
frontend:
  phases:
    preBuild:
      commands:
        - npm install
    build:
      commands:
        - echo "No build step required"
  artifacts:
    baseDirectory: frontend
    files:
      - '**/*'
  cache:
    paths:
      - node_modules/**/*
```

### Continuous Deployment

Every push to `main` triggers an automatic Amplify build and deploy:

```bash
git add .
git commit -m "your message"
git push origin main
```

## Custom Domain (GoDaddy → AWS Amplify)

1. In the Amplify Console, go to **App settings → Domain management**
2. Click **Add domain** and enter your GoDaddy domain name
3. Amplify will generate the required CNAME records
4. In your **GoDaddy DNS settings**, add those CNAME records
   - For the root domain (`@`), use a forwarding or ALIAS record pointing to the Amplify URL
   - For `www`, add the CNAME provided by Amplify
5. Back in Amplify, click **Verify** — SSL is provisioned automatically via AWS Certificate Manager
6. DNS propagation typically takes a few minutes to a few hours

## Technology Stack

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Backend**: Node.js + Express.js (static file serving)
- **Hosting**: AWS Amplify
- **Domain**: GoDaddy (DNS pointing to AWS)
- **PDF Rendering**: PDF.js (CDN-loaded, canvas-based)

## Features

- Responsive design for all screen sizes
- Sticky navigation header with dropdown menu
- Interactive career timeline
- Embedded PDF resume viewer
- Project portfolio with technology tags
- Skills showcase organized by category
- About and contact sections
- Smooth page transitions and animations

## Support

For questions or issues, contact: lucas.stackhouse@colorado.edu

## License

ISC
