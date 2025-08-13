# 🍃 Inner Veda Tea Store - Deployment Checklist

## ✅ Pre-Deployment Setup (COMPLETED)
- [x] Created Heroku configuration files (Procfile, runtime.txt)
- [x] Created Netlify configuration (netlify.toml)
- [x] Updated API endpoints for production
- [x] Configured CORS for production domains
- [x] Added health check endpoints
- [x] Created environment variable templates

## 🚀 PHASE 1: Backend Deployment (Heroku)

### Step 1: Heroku Authentication
```bash
heroku login
# Complete authentication in browser
heroku auth:whoami  # Verify login
```

### Step 2: Create Heroku App
```bash
cd apps/backend
heroku create innerveda-tea-api --region us
```

### Step 3: Set Environment Variables
```bash
heroku config:set MONGODB_URL="mongodb+srv://SonamGarg:SonamGarg@teawebsite.ezdqheb.mongodb.net/?retryWrites=true&w=majority&appName=TeaWebsite" --app innerveda-tea-api

heroku config:set MONGODB_DB="teawebsite" --app innerveda-tea-api

heroku config:set ENVIRONMENT="production" --app innerveda-tea-api

heroku config:set DEBUG="false" --app innerveda-tea-api

heroku config:set ALLOWED_ORIGINS="https://innerveda.netlify.app,https://innerveda.in,https://www.innerveda.in" --app innerveda-tea-api

# Generate secure keys
heroku config:set SECRET_KEY="$(openssl rand -hex 32)" --app innerveda-tea-api
heroku config:set ADMIN_API_KEY="$(openssl rand -hex 16)" --app innerveda-tea-api
```

### Step 4: Add Redis (Optional)
```bash
heroku addons:create heroku-redis:mini --app innerveda-tea-api
```

### Step 5: Deploy Backend
```bash
git add .
git commit -m "Deploy Inner Veda Tea Store API to Heroku"
heroku git:remote -a innerveda-tea-api
git push heroku main
```

### Step 6: Test Backend
```bash
# Test health endpoint
curl https://innerveda-tea-api.herokuapp.com/health

# Test products endpoint
curl https://innerveda-tea-api.herokuapp.com/api/products/
```

## 🌐 PHASE 2: Frontend Deployment (Netlify)

### Step 1: Install Netlify CLI
```bash
npm install -g netlify-cli
```

### Step 2: Netlify Authentication
```bash
cd apps/frontend
netlify login
# Complete authentication in browser
```

### Step 3: Initialize Netlify Site
```bash
netlify init
# Choose "Create & configure a new site"
# Choose your team
# Site name: innerveda
```

### Step 4: Set Environment Variables in Netlify Dashboard
Go to: https://app.netlify.com/sites/innerveda/settings/env

Add these variables:
```
NEXT_PUBLIC_API_URL=https://innerveda-tea-api.herokuapp.com
NEXT_PUBLIC_SITE_URL=https://innerveda.netlify.app
NEXT_PUBLIC_USE_MOCK=0
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your_clerk_key
CLERK_SECRET_KEY=sk_test_your_clerk_secret
OPENAI_API_KEY=sk-your_openai_key
```

### Step 5: Build and Deploy
```bash
npm run build
netlify deploy --prod --dir=.next
```

### Step 6: Test Frontend
- Visit: https://innerveda.netlify.app
- Test product loading
- Test AI chat functionality
- Test contact form

## 🔧 PHASE 3: Final Configuration

### Step 1: Custom Domain (Optional)
1. Go to Netlify Dashboard → Domain Settings
2. Add custom domain: `innerveda.in`
3. Configure DNS records

### Step 2: SSL Certificates
- Heroku: Automatically enabled
- Netlify: Automatically enabled

### Step 3: Final Testing
- [ ] Homepage loads correctly
- [ ] All 15 products load from MongoDB
- [ ] AI chatbot responds correctly
- [ ] Contact form sends emails
- [ ] Netflix-inspired design displays properly
- [ ] Mobile responsiveness works
- [ ] Authentication flow works (if using Clerk)

## 🎯 Production URLs

- **Frontend**: https://innerveda.netlify.app
- **Backend API**: https://innerveda-tea-api.herokuapp.com
- **Custom Domain**: https://innerveda.in (after DNS setup)

## 🔍 Monitoring Commands

### Heroku Monitoring
```bash
heroku logs --tail --app innerveda-tea-api
heroku ps --app innerveda-tea-api
heroku config --app innerveda-tea-api
```

### Netlify Monitoring
```bash
netlify status
netlify logs
```

## 🆘 Troubleshooting

### Common Issues:
1. **CORS Errors**: Check ALLOWED_ORIGINS matches exactly
2. **MongoDB Connection**: Verify connection string and whitelist
3. **Build Failures**: Check Node.js version and dependencies
4. **API 404 Errors**: Verify backend is deployed and running

### Support Contacts:
- **Email**: innervedacare@gmail.com
- **Phone**: 9113920980
- **Contact**: Sonam Garg

---

## 🎉 Success Criteria

Your deployment is successful when:
- ✅ Backend API responds at https://innerveda-tea-api.herokuapp.com/health
- ✅ Frontend loads at https://innerveda.netlify.app
- ✅ Products load from MongoDB Atlas
- ✅ AI chat functionality works
- ✅ Contact forms send emails
- ✅ Netflix-inspired design displays correctly
