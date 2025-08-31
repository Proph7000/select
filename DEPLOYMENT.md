# Deployment Guide

This project is configured with GitHub Actions for automated deployment.

## Environment Variables Setup

### GitHub Repository Secrets (Encrypted)

- `VITE_APP_ID` - Application ID for external services
- `VITE_MASTER_KEY` - Master key for authentication

### GitHub Repository Variables (Visible in logs)

- `VITE_API_URL` - API endpoint URL

## Deployment Options

### 1. GitHub Pages (Default)

The main workflow `deploy.yml` automatically deploys to GitHub Pages when you push to the `main` branch.

**Setup:**

1. Go to your repository Settings
2. Navigate to Pages section
3. Select "GitHub Actions" as source
4. The workflow will automatically deploy to `https://username.github.io/repository-name`

**Features:**

- ✅ Free hosting
- ✅ Automatic HTTPS
- ✅ Custom domain support
- ❌ Limited to static files only

### 2. Vercel (Alternative)

Use `deploy-vercel.yml` for Vercel deployment.

**Additional Secrets Required:**

- `VERCEL_TOKEN` - Vercel API token
- `VERCEL_ORG_ID` - Vercel organization ID
- `VERCEL_PROJECT_ID` - Vercel project ID

**Setup:**

1. Install Vercel CLI: `npm i -g vercel`
2. Run `vercel login` and follow instructions
3. Get your tokens from Vercel dashboard
4. Add secrets to GitHub repository

**Features:**

- ✅ Serverless functions support
- ✅ Automatic preview deployments
- ✅ Edge functions
- ✅ Better performance

## Workflow Triggers

- **Push to main branch** - Triggers production deployment
- **Pull Request to main** - Triggers build check (no deployment)

## Build Process

1. **Checkout** - Downloads repository code
2. **Setup Node.js** - Installs Node.js 18 with npm caching
3. **Install Dependencies** - Runs `npm ci` for clean install
4. **Build** - Runs `npm run build` with environment variables
5. **Deploy** - Uploads built files to hosting platform

## Environment Variables Usage

Environment variables are injected during build time:

```typescript
// Access in your code
const apiUrl = import.meta.env.VITE_API_URL
const appId = import.meta.env.VITE_APP_ID
const masterKey = import.meta.env.VITE_MASTER_KEY
```

## Troubleshooting

### Build Failures

- Check if all environment variables are set
- Verify Node.js version compatibility
- Check for TypeScript compilation errors

### Deployment Issues

- Ensure repository has proper permissions
- Check if hosting platform is properly configured
- Verify branch protection rules

### Environment Variables Not Working

- Ensure variables are set in correct repository section
- Check variable names match exactly (case-sensitive)
- Verify variables are accessible to the workflow

## Security Notes

- **Never commit secrets to repository**
- **Use repository secrets for sensitive data**
- **Repository variables are visible in logs**
- **Review workflow permissions regularly**
