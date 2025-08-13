#!/bin/bash

# Inner Veda Tea Store - Netlify Deployment Script
echo "🍃 Deploying Inner Veda Tea Store Frontend to Netlify..."

# Check if Netlify CLI is installed
if ! command -v netlify &> /dev/null; then
    echo "❌ Netlify CLI not found. Installing..."
    npm install -g netlify-cli
fi

# Login to Netlify (if not already logged in)
echo "🔐 Checking Netlify authentication..."
netlify status || netlify login

# Build the application
echo "🔨 Building the application..."
npm run build

# Deploy to Netlify
echo "🚀 Deploying to Netlify..."
netlify deploy --prod --dir=.next --site=innerveda

echo "✅ Deployment complete!"
echo "🌐 Your website is available at: https://innerveda.netlify.app"
echo "🔍 Check deployment status at: https://app.netlify.com/sites/innerveda"
