# MongoDB Atlas Setup Guide for Tea Website

## 🚀 Quick Setup Steps

### 1. Create MongoDB Atlas Account
1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Click "Try Free" and create an account
3. Create a new project called "TeaWebsite"

### 2. Create Free Cluster
1. Click "Build a Database"
2. Choose "M0 Sandbox" (FREE tier)
3. Select cloud provider and region (choose closest to you)
4. Name your cluster: `tea-store-cluster`
5. Click "Create Cluster"

### 3. Setup Database Access
1. Go to "Database Access" in left sidebar
2. Click "Add New Database User"
3. Choose "Password" authentication
4. Username: `teaadmin` (or your choice)
5. Password: Generate secure password (save it!)
6. Database User Privileges: "Read and write to any database"
7. Click "Add User"

### 4. Setup Network Access
1. Go to "Network Access" in left sidebar
2. Click "Add IP Address"
3. Choose "Allow Access from Anywhere" (0.0.0.0/0)
   - For development only! Use specific IPs in production
4. Click "Confirm"

### 5. Get Connection String
1. Go to "Database" in left sidebar
2. Click "Connect" on your cluster
3. Choose "Connect your application"
4. Copy the connection string
5. It looks like: `mongodb+srv://teaadmin:<password>@tea-store-cluster.xxxxx.mongodb.net/`

### 6. Update Environment File
1. Open `apps/backend/.env`
2. Replace the MongoDB URL:
```env
MONGODB_URL=mongodb+srv://teaadmin:YOUR_PASSWORD@tea-store-cluster.xxxxx.mongodb.net/
MONGODB_DB=tea_store
```

### 7. Run Atlas Setup Script
```bash
cd apps/backend
python -m app.scripts.setup_atlas
```

## 🎯 What This Sets Up

- **5 Premium Tea Products** with detailed information
- **4 Product Categories** (Wellness, Black Tea, Green Tea, Herbal)
- **Product Variants** with different pack sizes and pricing
- **Full Product Details** including brewing instructions, benefits, stories

## 🔧 Backend API Endpoints

Once setup is complete, these endpoints will be available:

- `GET /api/products/` - List all products
- `GET /api/products/{id}` - Get single product
- `GET /api/products/category/{category}` - Products by category
- `POST /api/products/` - Create product (admin)
- `PUT /api/products/{id}` - Update product (admin)
- `DELETE /api/products/{id}` - Delete product (admin)

## 🌐 Frontend Integration

The frontend is already configured to:
- Fetch products from MongoDB Atlas API
- Display loading states while fetching
- Handle errors gracefully
- Show proper product information with pricing
- Integrate with cart system

## ✅ Verification Steps

After setup, verify everything works:

1. **Start Backend**:
```bash
cd apps/backend
uvicorn app.main:app --reload --port 8000
```

2. **Check API**:
Visit: http://localhost:8000/api/products/

3. **Start Frontend**:
```bash
cd apps/frontend
npm run dev
```

4. **Test Products Page**:
Visit: http://localhost:3000/products

## 🔒 Security Notes

- **Development**: Using 0.0.0.0/0 IP access is OK
- **Production**: Restrict to specific IP addresses
- **Credentials**: Never commit passwords to git
- **Environment**: Use different clusters for dev/staging/prod

## 🆘 Troubleshooting

**Connection Issues**:
- Check your connection string format
- Verify username/password are correct
- Ensure IP address is whitelisted
- Check network connectivity

**Data Issues**:
- Run the setup script again to reset data
- Check MongoDB Atlas dashboard for data
- Verify environment variables are set

**API Issues**:
- Check backend logs for errors
- Verify MongoDB connection in backend startup
- Test API endpoints directly

## 📞 Support

If you encounter issues:
1. Check MongoDB Atlas dashboard for cluster status
2. Review backend logs for connection errors
3. Verify all environment variables are set correctly
4. Test connection string in MongoDB Compass (optional tool)

Your MongoDB Atlas cloud database is now ready for production! 🎉
