# Lucas Stackhouse Portfolio

A simple coming soon landing page for my personal portfolio website.

## Local Development

1. Install dependencies:
```bash
npm install
```

2. Run the server:
```bash
npm start
```

3. Visit `http://localhost:3000` in your browser

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
6. Click "Create Web Service"
7. Once deployed, connect your GoDaddy domain to Render by updating your DNS settings

## DNS Configuration (GoDaddy to Render)

1. In Render dashboard, find your service's custom domain settings
2. In GoDaddy DNS settings, add a CNAME record pointing to your Render URL
3. It may take a few minutes to propagate

## Next Steps

Once deployed, you can update this site by:
- Adding new sections and pages
- Creating a projects showcase
- Adding contact information
- Showcasing your skills and experience
