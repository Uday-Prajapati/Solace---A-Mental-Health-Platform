# Vercel Deployment Guide

## Prerequisites

1. **MongoDB Atlas Database**: Set up a MongoDB Atlas cluster
2. **Gmail Account**: For sending password reset emails
3. **Vercel Account**: For deployment

## Environment Variables

Set these environment variables in your Vercel project settings:

### Required Variables:

1. **MONGODB_URI**
   - Format: `mongodb+srv://username:password@cluster.mongodb.net/database?retryWrites=true&w=majority`
   - Get this from your MongoDB Atlas dashboard

2. **EMAIL_USER**
   - Your Gmail address (e.g., `your-email@gmail.com`)

3. **EMAIL_PASS**
   - Your Gmail app password (not your regular password)
   - Generate this in Gmail settings → Security → 2-Step Verification → App passwords

4. **NODE_ENV**
   - Set to `production`

## Deployment Steps

1. **Connect to Vercel**:
   - Install Vercel CLI: `npm i -g vercel`
   - Login: `vercel login`

2. **Deploy**:
   ```bash
   vercel --prod
   ```

3. **Set Environment Variables**:
   - Go to your Vercel dashboard
   - Navigate to your project settings
   - Add the environment variables listed above

4. **Redeploy**:
   - After setting environment variables, redeploy your project

## MongoDB Atlas Setup

1. Create a MongoDB Atlas account
2. Create a new cluster
3. Create a database user with read/write permissions
4. Get your connection string
5. Add your IP address to the IP whitelist (or use 0.0.0.0/0 for all IPs)

## Gmail App Password Setup

1. Enable 2-Step Verification on your Gmail account
2. Go to Google Account settings
3. Navigate to Security → 2-Step Verification → App passwords
4. Generate a new app password for "Mail"
5. Use this password in the EMAIL_PASS environment variable

## Troubleshooting

### MongoDB Connection Issues:
- Check your connection string format
- Ensure your IP is whitelisted in MongoDB Atlas
- Verify database user credentials

### Email Issues:
- Ensure 2-Step Verification is enabled
- Use app password, not regular password
- Check Gmail settings for less secure app access

### API Routes:
- All API routes are handled by `/api/index.js`
- Routes: `/api/signup`, `/api/login`, `/api/forgot-password`, `/api/reset-password`

## Local Development

For local development, create a `.env` file with the same variables:

```env
MONGODB_URI=your_mongodb_connection_string
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
NODE_ENV=development
```

Then run:
```bash
npm run dev
``` 