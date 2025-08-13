# 🔧 Heroku Configuration Commands

Since your GitHub is already connected to Heroku, you need to configure the buildpack and environment variables. Run these commands in your Heroku CLI or dashboard:

## Step 1: Set Python Buildpack
```bash
heroku buildpacks:clear -a your-app-name
heroku buildpacks:add -a your-app-name heroku/python
```

## Step 2: Set Environment Variables
```bash
heroku config:set MONGODB_URL="mongodb+srv://SonamGarg:SonamGarg@teawebsite.ezdqheb.mongodb.net/?retryWrites=true&w=majority&appName=TeaWebsite" -a your-app-name

heroku config:set MONGODB_DB="teawebsite" -a your-app-name

heroku config:set ENVIRONMENT="production" -a your-app-name

heroku config:set DEBUG="false" -a your-app-name

heroku config:set ALLOWED_ORIGINS="https://innerveda.netlify.app,https://innerveda.in,https://www.innerveda.in" -a your-app-name

heroku config:set SECRET_KEY="your-secret-key-here" -a your-app-name

heroku config:set ADMIN_API_KEY="your-admin-key-here" -a your-app-name
```

## Step 3: Verify Configuration
```bash
heroku buildpacks -a your-app-name
heroku config -a your-app-name
```

Replace `your-app-name` with your actual Heroku app name.
