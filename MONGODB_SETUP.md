# MongoDB Setup Guide

## Option 1: Install MongoDB Locally (Recommended for Development)

### Windows Installation

1. **Download MongoDB Community Server:**
   - Go to https://www.mongodb.com/try/download/community
   - Select "Windows" platform
   - Download the MSI installer

2. **Install MongoDB:**
   - Run the installer
   - Choose "Complete" installation
   - Install MongoDB as a Windows Service (recommended)
   - Install MongoDB Compass (GUI tool) when prompted

3. **Verify Installation:**
   ```powershell
   mongod --version
   ```

4. **Start MongoDB Service:**
   ```powershell
   # MongoDB should auto-start as a Windows service
   # To manually start:
   net start MongoDB
   ```

5. **Test Connection:**
   ```powershell
   # Open MongoDB Shell
   mongosh
   ```

## Option 2: Use Docker (If Docker is Installed)

1. **Install Docker Desktop:**
   - Download from https://www.docker.com/products/docker-desktop/
   - Install and restart your computer

2. **Start MongoDB with Docker:**
   ```powershell
   docker run -d -p 27017:27017 --name mongodb mongo:latest
   ```

3. **Stop MongoDB:**
   ```powershell
   docker stop mongodb
   ```

4. **Start MongoDB (after first run):**
   ```powershell
   docker start mongodb
   ```

## Option 3: Use MongoDB Atlas (Cloud - Free Tier)

1. **Create Account:**
   - Go to https://www.mongodb.com/cloud/atlas
   - Sign up for free

2. **Create Cluster:**
   - Choose "Free Shared" (M0)
   - Select your region
   - Create cluster

3. **Setup Access:**
   - Create database user (Database Access)
   - Add IP address 0.0.0.0/0 (Network Access) for development
   - Get connection string

4. **Update Environment Variable:**
   - Copy your connection string
   - Update `.env` file in backend folder:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/ecommerce?retryWrites=true&w=majority
   ```

## After MongoDB is Running

1. **Seed the Database:**
   ```powershell
   cd backend
   npm run seed
   ```

2. **Expected Output:**
   ```
   Cleared existing data
   Admin user created
   Categories created
   Products created
   Database seeded successfully!
   Admin credentials:
   Email: admin@example.com
   Password: admin123
   ```

## Verify Database

Using MongoDB Compass or mongosh:

1. **Connect to:** `mongodb://localhost:27017`
2. **Check databases:** You should see `ecommerce`
3. **Check collections:**
   - users (1 admin user)
   - categories (5 categories)
   - products (15 products)
   - carts (empty initially)
   - orders (empty initially)

## Troubleshooting

### "Connection refused" error
- Make sure MongoDB service is running
- Check if port 27017 is available
- Try restarting MongoDB service

### "Authentication failed"
- If using MongoDB Atlas, verify username/password
- Check connection string format

### "Database not found"
- Run the seed script: `npm run seed`
- The database will be created automatically

## What's Seeded

### Categories (5)
- Electronics
- Clothing
- Home & Living
- Sports & Outdoors
- Books

### Products (15)
Featured products across all categories with:
- High-quality product images (Unsplash)
- Detailed descriptions
- Ratings and reviews
- Stock quantities
- Special pricing

### Admin User
- Email: admin@example.com
- Password: admin123
- Can access admin panel at `/admin`

## Next Steps

1. Start the backend server: `cd backend && npm run dev`
2. Login as admin to add more products
3. Create customer accounts to test shopping flow
4. Try all features: cart, checkout, orders, etc.
