# Deployment Guide - PlaCen2

## Prerequisites
- GitHub account
- Vercel account (for frontend)
- Render account (for backend)
- MongoDB Atlas account (for database)

---

## Backend Deployment (Render)

### Step 1: Prepare MongoDB Atlas
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster (if not already created)
3. Create a database user
4. Whitelist all IPs (0.0.0.0/0) for Render
5. Get your connection string:
   ```
   mongodb+srv://<username>:<password>@cluster.mongodb.net/placen2?retryWrites=true&w=majority
   ```

### Step 2: Deploy to Render
1. Push your code to GitHub
2. Go to [Render Dashboard](https://dashboard.render.com/)
3. Click "New +" → "Web Service"
4. Connect your GitHub repository
5. Configure:
   - **Name**: placen2-backend
   - **Region**: Choose nearest region
   - **Branch**: main
   - **Root Directory**: backend
   - **Environment**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Free

### Step 3: Add Environment Variables in Render
Go to Environment section and add:

```bash
NODE_ENV=production
PORT=5000
MONGODB_URI=<your-mongodb-atlas-connection-string>
ACCESS_TOKEN_SECRET=<generate-random-string-64-chars>
REFRESH_TOKEN_SECRET=<generate-random-string-64-chars>
EMAIL_VERIFICATION_SECRET=<generate-random-string-32-chars>
PASSWORD_RESET_SECRET=<generate-random-string-32-chars>
FRONTEND_URL=<your-vercel-frontend-url>
```

**Generate secrets using:**
```bash
# In terminal
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### Step 4: Deploy
- Click "Create Web Service"
- Wait for deployment to complete
- Note your backend URL: `https://placen2-backend.onrender.com`

---

## Frontend Deployment (Vercel)

### Step 1: Update Environment Variable
1. Create `.env.production` in frontend folder:
   ```bash
   VITE_API_URL=https://placen2-backend.onrender.com/api/v1
   ```

### Step 2: Deploy to Vercel
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "Add New..." → "Project"
3. Import your GitHub repository
4. Configure:
   - **Framework Preset**: Vite
   - **Root Directory**: frontend
   - **Build Command**: `npm run build`
   - **Output Directory**: dist
   - **Install Command**: `npm install`

### Step 3: Add Environment Variables in Vercel
Go to Settings → Environment Variables:

```bash
VITE_API_URL=https://placen2-backend.onrender.com/api/v1
```

### Step 4: Deploy
- Click "Deploy"
- Wait for deployment
- Your app will be live at: `https://your-app.vercel.app`

---

## Post-Deployment Configuration

### 1. Update Backend CORS
Make sure your backend allows your Vercel domain:

In `backend/index.js`, the CORS configuration should include your Vercel URL:
```javascript
app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://your-app.vercel.app'
  ],
  credentials: true
}));
```

### 2. Update Frontend URL in Backend
In Render dashboard, update the `FRONTEND_URL` environment variable with your Vercel URL.

### 3. Test the Application
1. Visit your Vercel URL
2. Try registering a new user
3. Test login/logout
4. Test all major features

---

## Monitoring & Logs

### Backend Logs (Render)
- Go to Render dashboard → Your service → Logs
- Monitor for errors and issues

### Frontend Logs (Vercel)
- Go to Vercel dashboard → Your project → Deployments
- Click on a deployment to see build logs

---

## Troubleshooting

### Common Issues

**1. CORS Errors**
- Ensure backend CORS includes your Vercel domain
- Check that credentials: true is set

**2. API Connection Failed**
- Verify VITE_API_URL in Vercel environment variables
- Check backend is running on Render
- Test backend URL directly: `https://your-backend.onrender.com/api/v1/health`

**3. MongoDB Connection Issues**
- Verify MONGODB_URI is correct
- Check MongoDB Atlas IP whitelist includes 0.0.0.0/0
- Ensure database user has proper permissions

**4. Build Failures**
- Check build logs in Vercel/Render
- Verify all dependencies are in package.json
- Ensure Node version compatibility

---

## Custom Domain (Optional)

### For Frontend (Vercel)
1. Go to Project Settings → Domains
2. Add your custom domain
3. Update DNS records as instructed

### For Backend (Render)
1. Go to Service Settings → Custom Domain
2. Add your custom domain
3. Update DNS records as instructed

---

## Continuous Deployment

Both Vercel and Render support automatic deployments:
- Push to your GitHub repository
- Deployments trigger automatically
- Production branch (main) deploys to production
- Feature branches can create preview deployments

---

## Environment Variables Summary

### Backend (Render)
- `NODE_ENV` - production
- `PORT` - 5000
- `MONGODB_URI` - MongoDB Atlas connection string
- `ACCESS_TOKEN_SECRET` - 64-char random string
- `REFRESH_TOKEN_SECRET` - 64-char random string
- `EMAIL_VERIFICATION_SECRET` - 32-char random string
- `PASSWORD_RESET_SECRET` - 32-char random string
- `FRONTEND_URL` - Your Vercel URL

### Frontend (Vercel)
- `VITE_API_URL` - Your Render backend URL + /api/v1

---

## Free Tier Limitations

### Render Free Tier
- Service spins down after 15 minutes of inactivity
- First request after spin-down takes 30-60 seconds
- 750 hours/month free

### Vercel Free Tier
- 100 GB bandwidth/month
- Unlimited deployments
- Custom domains supported

### MongoDB Atlas Free Tier
- 512 MB storage
- Shared RAM
- Suitable for small-scale applications

---

## Scaling Considerations

When your app grows:
1. Upgrade Render to paid plan for persistent service
2. Upgrade MongoDB Atlas for more storage
3. Add Redis for caching on Render
4. Consider CDN for static assets
5. Implement rate limiting and monitoring

---

## Security Checklist

- ✅ Environment variables set correctly
- ✅ MongoDB IP whitelist configured
- ✅ CORS properly configured
- ✅ All secrets are random and secure
- ✅ HTTPS enabled (automatic on Vercel/Render)
- ✅ No sensitive data in frontend code
- ✅ API rate limiting enabled

---

## Support

For issues:
- Check deployment logs
- Review this guide
- Check MongoDB Atlas connectivity
- Verify all environment variables
- Test API endpoints directly

**Deployment Status Check:**
- Backend Health: `https://your-backend.onrender.com/api/v1/health`
- Frontend: `https://your-app.vercel.app`
