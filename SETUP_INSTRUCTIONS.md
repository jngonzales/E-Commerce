# 🚀 E-Commerce Platform Setup Guide

## Overview
Complete production-ready E-Commerce platform with React + Shadcn UI frontend and Node.js + Express backend.

## 📋 Prerequisites

- **Node.js** v18+ ([Download](https://nodejs.org/))
- **MongoDB** ([Download](https://www.mongodb.com/try/download/community) or use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas))
- **npm** or **yarn**
- **Git** (optional)

## 🛠️ Quick Start

### Option 1: Using Docker (Recommended)

```powershell
# Start all services (MongoDB, Backend, Frontend)
docker-compose up -d

# View logs
docker-compose logs -f

# Stop all services
docker-compose down
```

The application will be available at:
- Frontend: http://localhost:5173
- Backend API: http://localhost:5000
- MongoDB: mongodb://localhost:27017

### Option 2: Manual Setup

#### 1. Backend Setup

```powershell
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Copy environment file
copy .env.example .env

# Edit .env file with your MongoDB URI
# MONGODB_URI=mongodb://localhost:27017/ecommerce

# Start MongoDB (if running locally)
# mongod

# Seed the database with sample data
npm run seed

# Start the backend server
npm run dev
```

Backend will run on: http://localhost:5000

#### 2. Frontend Setup

```powershell
# Navigate to frontend directory (from project root)
cd frontend

# Install dependencies
npm install

# Create .env file
echo "VITE_API_URL=http://localhost:5000/api" > .env

# Start the development server
npm run dev
```

Frontend will run on: http://localhost:5173

## 📊 Seed Data

The database comes with:
- **Admin Account**: 
  - Email: `admin@example.com`
  - Password: `admin123`
- **5 Categories**: Electronics, Clothing, Home & Living, Sports & Outdoors, Books
- **15 Products**: Featured items across all categories

## 🎨 Tech Stack

### Frontend
- **Framework**: React 18 + TypeScript
- **UI Library**: Shadcn UI
- **Styling**: Tailwind CSS
- **Routing**: React Router v6
- **State Management**: Zustand
- **HTTP Client**: Axios
- **Form Handling**: React Hook Form + Zod
- **Notifications**: Sonner
- **Build Tool**: Vite

### Backend
- **Runtime**: Node.js 18+
- **Framework**: Express + TypeScript
- **Database**: MongoDB + Mongoose
- **Authentication**: JWT
- **Validation**: Express Validator
- **Security**: Helmet, CORS
- **Password Hashing**: Bcryptjs

## 📁 Project Structure

```
ECommerce/
├── backend/
│   ├── src/
│   │   ├── config/          # Database configuration
│   │   ├── controllers/     # Route controllers
│   │   ├── middleware/      # Auth & error handling
│   │   ├── models/          # Mongoose models
│   │   ├── routes/          # API routes
│   │   ├── utils/           # Utilities & seed data
│   │   └── server.ts        # Main server file
│   ├── package.json
│   ├── tsconfig.json
│   └── Dockerfile
├── frontend/
│   ├── src/
│   │   ├── components/      # React components
│   │   │   ├── ui/         # Shadcn UI components
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── ...
│   │   ├── pages/          # Page components
│   │   ├── store/          # Zustand stores
│   │   ├── lib/            # Utilities & API client
│   │   ├── types/          # TypeScript types
│   │   └── App.tsx
│   ├── package.json
│   ├── vite.config.ts
│   ├── tailwind.config.js
│   └── Dockerfile
├── docker-compose.yml
└── README.md
```

## 🔐 Authentication

The app uses JWT-based authentication:

1. **Register/Login**: Users can register and login through the UI
2. **Token Storage**: JWT tokens are stored in localStorage
3. **Protected Routes**: Cart, Checkout, Orders require authentication
4. **Admin Access**: Admin panel requires admin role

## 🌐 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)
- `PUT /api/auth/profile` - Update profile (protected)

### Products
- `GET /api/products` - Get all products (with filters)
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (admin)
- `PUT /api/products/:id` - Update product (admin)
- `DELETE /api/products/:id` - Delete product (admin)

### Categories
- `GET /api/categories` - Get all categories
- `POST /api/categories` - Create category (admin)
- `PUT /api/categories/:id` - Update category (admin)
- `DELETE /api/categories/:id` - Delete category (admin)

### Cart
- `GET /api/cart` - Get user cart (protected)
- `POST /api/cart` - Add to cart (protected)
- `PUT /api/cart/:itemId` - Update cart item (protected)
- `DELETE /api/cart/:itemId` - Remove from cart (protected)

### Orders
- `POST /api/orders` - Create order (protected)
- `GET /api/orders` - Get user orders (protected)
- `GET /api/orders/:id` - Get order details (protected)
- `GET /api/orders/admin/all` - Get all orders (admin)
- `PUT /api/orders/:id/status` - Update order status (admin)

## 🎨 Features

### User Features
- ✅ Browse products by category
- ✅ Search and filter products
- ✅ View product details
- ✅ Add to cart with quantity management
- ✅ Persistent cart (localStorage + DB)
- ✅ Checkout process
- ✅ Order history
- ✅ User authentication
- ✅ Dark/Light mode toggle

### Admin Features
- ✅ Product management (CRUD)
- ✅ Category management
- ✅ Order management
- ✅ View all orders
- ✅ Update order status

### UI/UX
- ✅ Beautiful Shadcn UI components
- ✅ Responsive mobile-first design
- ✅ Smooth animations
- ✅ Loading states with skeletons
- ✅ Toast notifications
- ✅ Glass-morphism effects
- ✅ Professional typography

## 🚧 Troubleshooting

### Backend Issues

**MongoDB Connection Error**
```powershell
# Make sure MongoDB is running
mongod

# Or check your MONGODB_URI in .env
```

**Port 5000 already in use**
```powershell
# Change PORT in backend/.env
PORT=5001
```

### Frontend Issues

**Can't connect to API**
```powershell
# Check VITE_API_URL in frontend/.env
# Make sure backend is running
```

**Build errors**
```powershell
# Clear node_modules and reinstall
rm -rf node_modules
npm install
```

## 📦 Production Build

### Backend
```powershell
cd backend
npm run build
npm start
```

### Frontend
```powershell
cd frontend
npm run build
npm run preview
```

## 🔒 Security Notes

- Change `JWT_SECRET` in production
- Use environment variables for sensitive data
- Enable HTTPS in production
- Implement rate limiting
- Add input sanitization
- Use MongoDB Atlas for production database

## 📝 Development

### Adding New Shadcn UI Components
```powershell
# Use the Shadcn CLI (if available)
npx shadcn-ui@latest add [component-name]

# Or manually add components to src/components/ui/
```

### Database Schema Changes
```powershell
# After modifying models, reseed the database
cd backend
npm run seed
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

MIT License - feel free to use this project for learning or commercial purposes.

## 🎯 Next Steps

1. Add payment gateway integration (Stripe/PayPal)
2. Implement product reviews and ratings
3. Add wishlist functionality
4. Implement email notifications
5. Add product image upload
6. Implement advanced search with filters
7. Add analytics dashboard
8. Implement social authentication

## 📧 Support

For issues or questions, please open an issue on the GitHub repository.

---

**Happy Coding! 🚀**
