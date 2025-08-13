# 🍃 Inner Veda Tea Store - Complete Deployment Guide

This guide will help you deploy your sophisticated Netflix-inspired Inner Veda tea website to production.

## 📋 Prerequisites

1. **Heroku Account**: Sign up at [heroku.com](https://heroku.com)
2. **Netlify Account**: Sign up at [netlify.com](https://netlify.com)
3. **MongoDB Atlas**: Already configured with your database
4. **Git Repository**: Your code should be in a Git repository

## 🚀 Phase 1: Backend Deployment (Heroku)

### Step 1: Install Heroku CLI
```bash
# Windows (using chocolatey)
choco install heroku-cli

# Or download from: https://devcenter.heroku.com/articles/heroku-cli
```

### Step 2: Deploy Backend
```bash
cd apps/backend

# Login to Heroku
heroku login

# Create Heroku app
heroku create innerveda-tea-api --region us

# Set environment variables
heroku config:set MONGODB_URL="mongodb+srv://SonamGarg:SonamGarg@teawebsite.ezdqheb.mongodb.net/?retryWrites=true&w=majority&appName=TeaWebsite" --app innerveda-tea-api
heroku config:set MONGODB_DB="teawebsite" --app innerveda-tea-api
heroku config:set SECRET_KEY="$(openssl rand -hex 32)" --app innerveda-tea-api
heroku config:set ADMIN_API_KEY="$(openssl rand -hex 16)" --app innerveda-tea-api
heroku config:set ENVIRONMENT="production" --app innerveda-tea-api
heroku config:set DEBUG="false" --app innerveda-tea-api
heroku config:set ALLOWED_ORIGINS="https://innerveda.netlify.app,https://innerveda.in,https://www.innerveda.in" --app innerveda-tea-api

# Add Redis addon (optional)
heroku addons:create heroku-redis:mini --app innerveda-tea-api

# Deploy
git add .
git commit -m "Deploy Inner Veda Tea Store API to Heroku"
heroku git:remote -a innerveda-tea-api
git push heroku main

# Test the deployment
curl https://innerveda-tea-api.herokuapp.com/health
```

### Step 3: Verify Backend
Your API should be available at: `https://innerveda-tea-api.herokuapp.com`

Test endpoints:
- `GET /` - Health check
- `GET /health` - Detailed health check
- `GET /api/products/` - All products from MongoDB

## 🌐 Phase 2: Frontend Deployment (Netlify)

### Step 1: Install Netlify CLI
```bash
npm install -g netlify-cli
```

### Step 2: Configure Environment Variables in Netlify

Go to [Netlify Dashboard](https://app.netlify.com) → Your Site → Site Settings → Environment Variables

Add these variables:
```
NEXT_PUBLIC_API_URL=https://innerveda-tea-api.herokuapp.com
NEXT_PUBLIC_SITE_URL=https://innerveda.netlify.app
NEXT_PUBLIC_USE_MOCK=0
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your-clerk-publishable-key
CLERK_SECRET_KEY=your-clerk-secret-key
OPENAI_API_KEY=your-openai-api-key
```

### Step 3: Deploy Frontend
```bash
cd apps/frontend

# Login to Netlify
netlify login

# Link to existing site or create new one
netlify init

# Build and deploy
npm run build
netlify deploy --prod --dir=.next
```

### Step 4: Configure Custom Domain (Optional)
1. Go to Netlify Dashboard → Domain Settings
2. Add custom domain: `innerveda.in`
3. Configure DNS records as instructed by Netlify

## 🔧 Phase 3: Final Configuration

### Step 1: Update CORS Origins
Update your Heroku backend CORS settings to include your final domain:
```bash
heroku config:set ALLOWED_ORIGINS="https://innerveda.netlify.app,https://innerveda.in,https://www.innerveda.in" --app innerveda-tea-api
```

### Step 2: Test Complete Flow
1. Visit your Netlify site
2. Test product loading from MongoDB
3. Test AI chat functionality
4. Test contact form
5. Test authentication (if using Clerk)

## 📊 Monitoring & Maintenance

### Heroku Monitoring
```bash
# View logs
heroku logs --tail --app innerveda-tea-api

# Check app status
heroku ps --app innerveda-tea-api

# Scale dynos (if needed)
heroku ps:scale web=1 --app innerveda-tea-api
```

### Netlify Monitoring
- Check build logs in Netlify Dashboard
- Monitor site performance
- Set up form notifications

## 🔐 Security Checklist

- ✅ Environment variables are set correctly
- ✅ CORS is configured for production domains only
- ✅ MongoDB connection uses secure credentials
- ✅ API keys are not exposed in frontend code
- ✅ HTTPS is enabled on both domains

## 🎯 Performance Optimization

### Backend (Heroku)
- Use Redis for caching (already configured)
- Monitor response times
- Scale dynos if needed

### Frontend (Netlify)
- Images are optimized
- Static assets are cached
- CDN is automatically configured

## 🆘 Troubleshooting

### Common Issues

1. **CORS Errors**
   - Check ALLOWED_ORIGINS in Heroku config
   - Ensure frontend URL matches exactly

2. **MongoDB Connection Issues**
   - Verify MONGODB_URL in Heroku config
   - Check MongoDB Atlas whitelist

3. **Build Failures**
   - Check Node.js version compatibility
   - Verify all dependencies are installed

4. **API Not Responding**
   - Check Heroku logs: `heroku logs --tail --app innerveda-tea-api`
   - Verify dyno is running: `heroku ps --app innerveda-tea-api`

## 📞 Support

- **Email**: innervedacare@gmail.com
- **Phone**: 9113920980
- **Contact**: Sonam Garg

---

## 🎉 Congratulations!

Your sophisticated Inner Veda Tea Store with Netflix-inspired design is now live in production!

- **Frontend**: https://innerveda.netlify.app
- **Backend API**: https://innerveda-tea-api.herokuapp.com
- **Database**: MongoDB Atlas (Cloud)
