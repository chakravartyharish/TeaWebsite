#!/bin/bash

# Inner Veda Tea Store - Heroku Deployment Script
echo "🍃 Deploying Inner Veda Tea Store Backend to Heroku..."

# Check if Heroku CLI is installed
if ! command -v heroku &> /dev/null; then
    echo "❌ Heroku CLI not found. Please install it first:"
    echo "   Download from: https://devcenter.heroku.com/articles/heroku-cli"
    exit 1
fi

# Login to Heroku (if not already logged in)
echo "🔐 Checking Heroku authentication..."
heroku auth:whoami || heroku login

# Create Heroku app (replace 'innerveda-tea-api' with your preferred name)
APP_NAME="innerveda-tea-api"
echo "🚀 Creating Heroku app: $APP_NAME"
heroku create $APP_NAME --region us || echo "App might already exist, continuing..."

# Set environment variables
echo "⚙️  Setting environment variables..."
heroku config:set MONGODB_URL="mongodb+srv://SonamGarg:SonamGarg@teawebsite.ezdqheb.mongodb.net/?retryWrites=true&w=majority&appName=TeaWebsite" --app $APP_NAME
heroku config:set MONGODB_DB="teawebsite" --app $APP_NAME
heroku config:set SECRET_KEY="$(openssl rand -hex 32)" --app $APP_NAME
heroku config:set ADMIN_API_KEY="$(openssl rand -hex 16)" --app $APP_NAME
heroku config:set ENVIRONMENT="production" --app $APP_NAME
heroku config:set DEBUG="false" --app $APP_NAME
heroku config:set ALLOWED_ORIGINS="https://innerveda.netlify.app,https://innerveda.in,https://www.innerveda.in" --app $APP_NAME

# Add Heroku Redis (optional, for caching)
echo "📦 Adding Redis add-on..."
heroku addons:create heroku-redis:mini --app $APP_NAME || echo "Redis addon might already exist"

# Deploy to Heroku
echo "🚀 Deploying to Heroku..."
git add .
git commit -m "Deploy Inner Veda Tea Store API to Heroku" || echo "No changes to commit"
heroku git:remote -a $APP_NAME
git push heroku main || git push heroku master

# Open the app
echo "✅ Deployment complete!"
echo "🌐 Your API is available at: https://$APP_NAME.herokuapp.com"
echo "🔍 Check logs with: heroku logs --tail --app $APP_NAME"

heroku open --app $APP_NAME
