# 🚀 Deploy BikeHub to Production (FREE)

This guide will help you deploy your BikeHub e-commerce site for FREE using Render (backend) and Vercel (frontend).

## Prerequisites
- ✅ GitHub account with your code pushed
- ✅ MongoDB Atlas database (free tier)
- ✅ 15-20 minutes

---

## Step 1: Prepare Your Project

### 1.1 Update Package.json Scripts

Make sure `backend/package.json` has these scripts:
```json
"scripts": {
  "dev": "nodemon src/server.ts",
  "build": "tsc",
  "start": "node dist/server.js",
  "seed": "ts-node src/utils/seed.ts"
}
```

### 1.2 Create Production Files

**backend/render.yaml** (optional, for auto-deploy):
```yaml
services:
  - type: web
    name: bikehub-backend
    env: node
    buildCommand: npm install && npm run build
    startCommand: npm start
    envVars:
      - key: NODE_ENV
        value: production
```

---

## Step 2: Deploy Backend (Render.com)

### 2.1 Create Account
1. Go to https://render.com
2. Click "Get Started for Free"
3. Sign up with GitHub

### 2.2 Create Web Service
1. Click "New +" → "Web Service"
2. Connect your GitHub repository: `E-Commerce`
3. Click "Connect"

### 2.3 Configure Service
Fill in these settings:
- **Name:** `bikehub-backend` (or your choice)
- **Region:** Oregon (US West) - closest to you
- **Branch:** `main`
- **Root Directory:** `backend`
- **Runtime:** Node
- **Build Command:** `npm install && npm run build`
- **Start Command:** `npm start`
- **Instance Type:** Free

### 2.4 Add Environment Variables
Click "Advanced" → Add Environment Variables:

```
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb+srv://your_username:your_password@cluster0.xxxxx.mongodb.net/bikehub
JWT_SECRET=your_long_jwt_secret_here
FRONTEND_URL=https://your-site-will-be-here.vercel.app
```

*Note: We'll update FRONTEND_URL after deploying frontend*

### 2.5 Deploy
1. Click "Create Web Service"
2. Wait 3-5 minutes for build
3. Copy your backend URL: `https://bikehub-backend-xxxx.onrender.com`
4. Test it: Visit `https://bikehub-backend-xxxx.onrender.com` (should show API message)

---

## Step 3: Seed Production Database

### 3.1 SSH into Render (Optional)
Or run seed locally with production connection string:

```bash
cd backend

# Set production MongoDB in .env temporarily
MONGODB_URI=mongodb+srv://your_username:your_password@cluster0.xxxxx.mongodb.net/bikehub

# Run seed
npm run seed
```

### 3.2 Verify Database
- Check MongoDB Atlas → Browse Collections
- Should see: categories, products, users

---

## Step 4: Deploy Frontend (Vercel)

### 4.1 Create Account
1. Go to https://vercel.com
2. Click "Sign Up" → Continue with GitHub
3. Authorize Vercel

### 4.2 Import Project
1. Click "Add New..." → "Project"
2. Find `E-Commerce` repository
3. Click "Import"

### 4.3 Configure Project
- **Framework Preset:** Vite
- **Root Directory:** `frontend`
- **Build Command:** `npm run build`
- **Output Directory:** `dist`
- **Install Command:** `npm install`

### 4.4 Add Environment Variables
Click "Environment Variables" → Add:

```
VITE_API_URL=https://bikehub-backend-xxxx.onrender.com
```

*Replace with YOUR Render backend URL*

### 4.5 Deploy
1. Click "Deploy"
2. Wait 2-3 minutes
3. Your site is LIVE! 🎉
4. Copy URL: `https://e-commerce-xxxx.vercel.app`

---

## Step 5: Final Configuration

### 5.1 Update Backend FRONTEND_URL
1. Go back to Render dashboard
2. Click your `bikehub-backend` service
3. Environment → Edit `FRONTEND_URL`
4. Change to: `https://e-commerce-xxxx.vercel.app`
5. Save (this will redeploy backend)

### 5.2 Update MongoDB Network Access
1. Go to MongoDB Atlas
2. Network Access → Add IP Address
3. Add: `0.0.0.0/0` (allow all) *for demo purposes*
4. Or add Render's IP addresses (more secure)

---

## Step 6: Test Your Live Site

### 6.1 Test Frontend
Visit `https://e-commerce-xxxx.vercel.app`
- ✅ Should load homepage
- ✅ Should show bike products
- ✅ Should allow browsing categories

### 6.2 Test Backend
Visit `https://bikehub-backend-xxxx.onrender.com`
- ✅ Should show API info message

### 6.3 Test Full Flow
1. Browse products ✅
2. Register new account ✅
3. Login ✅
4. Add items to cart ✅
5. Place order ✅
6. Login as admin: `admin@bikehub.com` / `SecureAdmin2024!` ✅
7. Access admin dashboard ✅

---

## 🎉 You're Live!

Your BikeHub e-commerce site is now running 24/7 for FREE!

**Share these URLs:**
- 🌐 **Website:** https://e-commerce-xxxx.vercel.app
- 🔌 **API:** https://bikehub-backend-xxxx.onrender.com

---

## ⚠️ Important Notes

### Free Tier Limitations:

**Render (Backend):**
- Spins down after 15 minutes of inactivity
- First request after sleep takes 30-60 seconds to wake up
- Perfect for portfolio/demo sites
- **Solution:** Use a service like UptimeRobot to ping your API every 14 minutes

**Vercel (Frontend):**
- No limitations for personal projects
- Lightning fast
- 100GB bandwidth/month (more than enough)

**MongoDB Atlas:**
- 512MB storage (enough for ~10,000 products)
- Free forever

### Auto-Deploy:
- Any push to `main` branch automatically redeploys
- Changes go live in 2-5 minutes

---

## 📊 Add to Your Portfolio

### Update GitHub README
Add these badges at the top:

```markdown
# 🚴 BikeHub - E-Commerce Platform

[![Live Demo](https://img.shields.io/badge/Live-Demo-success)](https://e-commerce-xxxx.vercel.app)
[![API](https://img.shields.io/badge/API-Docs-blue)](https://bikehub-backend-xxxx.onrender.com)
```

### Add to Resume/LinkedIn
```
BikeHub E-Commerce Platform
🔗 Live: https://e-commerce-xxxx.vercel.app
📚 Code: https://github.com/jngonzales/E-Commerce

Full-stack MERN e-commerce platform with 58+ bikes, JWT authentication,
shopping cart, order management, and admin dashboard. Deployed on Render + Vercel.
```

---

## 🛠 Troubleshooting

### Backend not responding
- Check Render logs for errors
- Verify environment variables are set correctly
- Check MongoDB Atlas network access

### Frontend not connecting to backend
- Verify `VITE_API_URL` in Vercel environment variables
- Check browser console for CORS errors
- Ensure backend `FRONTEND_URL` matches your Vercel URL

### Database connection failed
- Check MongoDB Atlas → Network Access
- Verify connection string in Render environment variables
- Check MongoDB Atlas → Database Access (user permissions)

---

## 🎯 Next Steps

1. **Custom Domain (Optional):**
   - Buy domain on Namecheap (~$10/year)
   - Add to Vercel: Settings → Domains

2. **Keep Backend Awake:**
   - Use UptimeRobot (free) to ping every 14 minutes
   - Prevents cold starts

3. **Analytics:**
   - Add Google Analytics to track visitors
   - Or use Vercel Analytics (built-in)

4. **Monitor:**
   - Render provides logs and metrics
   - Vercel provides deployment logs

---

## 💡 Pro Tips

- Use Render's "Deploy Hook" to redeploy from GitHub Actions
- Set up branch previews in Vercel for testing
- Use Render's disk storage for user uploads (if needed)
- Enable Vercel's Edge Network for faster global delivery

---

**Your BikeHub site is now LIVE and will stay FREE forever!** 🚀

*Total cost: $0/month*
*Suitable for: Portfolio, demo, low-traffic sites*
