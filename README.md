# 🚴 BikeHub - Full-Stack E-Commerce Platform

<div align="center">

![BikeHub Logo](https://img.shields.io/badge/BikeHub-E--Commerce-blue?style=for-the-badge)

A modern, production-ready e-commerce platform built with the MERN stack, featuring 58+ premium bikes across 8 categories.

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-20232A?style=flat-square&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat-square&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Express](https://img.shields.io/badge/Express-000000?style=flat-square&logo=express&logoColor=white)](https://expressjs.com/)

[Features](#-features) • [Demo](#-demo) • [Tech Stack](#-tech-stack) • [Getting Started](#-getting-started) • [Deployment](#-deployment)

</div>

---

## 📸 Screenshots

> *Add your screenshots here after deployment*

---

## ✨ Features

### 🛒 **E-Commerce Functionality**
- **Product Catalog**: Browse 58+ bikes across 8 specialized categories
- **Advanced Filtering**: Search, sort, and filter products by category, price, and name
- **Shopping Cart**: Persistent cart with real-time price calculations
- **Order Management**: Complete checkout flow with order tracking
- **User Authentication**: Secure JWT-based auth with password encryption

### 👨‍💼 **Admin Dashboard**
- **Product Management**: Full CRUD operations for products
- **Category Management**: Create and manage bike categories
- **Order Tracking**: View and manage customer orders
- **User Management**: Admin access control and user roles

### 🎨 **Modern UI/UX**
- **Responsive Design**: Mobile-first design that works on all devices
- **Dark/Light Theme**: Toggle between dark and light modes
- **Smooth Animations**: Professional transitions and loading states
- **Intuitive Navigation**: Easy-to-use shop dropdown and category filters

### 🔒 **Security Features**
- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: Bcrypt with 12 salt rounds
- **Rate Limiting**: Protection against brute force attacks (100 req/min general, 10 req/15min auth)
- **HTTP Security Headers**: Helmet.js for enhanced security
- **NoSQL Injection Protection**: MongoDB sanitization middleware
- **CORS Configuration**: Secure cross-origin resource sharing
- **Input Validation**: Server-side validation for all inputs

### 📊 **Developer Experience**
- **TypeScript**: Full type safety across frontend and backend
- **API Versioning**: Clean `/api/v1/` structure
- **Error Handling**: Centralized error handling with Winston logging
- **Environment Config**: Secure environment variable management
- **Docker Support**: Ready for containerized deployment

---

## 🎯 Demo

### Live Site
> 🌐 **[View Live Demo](https://your-deployed-site.vercel.app)** *(Add after deployment)*

### Test Credentials
```
Admin Account:
Email: admin@bikehub.com
Password: SecureAdmin2024!
```

---

## 🛠 Tech Stack

### **Frontend**
- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **React Router v6** - Client-side routing
- **Zustand** - State management
- **Tailwind CSS** - Utility-first styling
- **Shadcn/ui** - Beautiful UI components
- **Axios** - HTTP client

### **Backend**
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **TypeScript** - Type safety
- **MongoDB** - NoSQL database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **Bcrypt** - Password hashing

### **Security & Monitoring**
- **Helmet.js** - HTTP security headers
- **Express Rate Limit** - API rate limiting
- **Express Mongo Sanitize** - NoSQL injection prevention
- **Winston** - Logging with daily rotation
- **Morgan** - HTTP request logging

### **DevOps**
- **Docker** - Containerization
- **Git** - Version control
- **Render/Vercel** - Hosting platforms

---

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have:
- **Node.js** (v20 or higher) - [Download](https://nodejs.org/)
- **npm** or **yarn** - Comes with Node.js
- **MongoDB Atlas account** (free tier) - [Sign up](https://www.mongodb.com/cloud/atlas)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/jngonzales/E-Commerce.git
   cd E-Commerce
   ```

2. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

### Configuration

4. **Set up MongoDB Atlas**
   
   - Go to [MongoDB Atlas](https://cloud.mongodb.com/)
   - Create a new cluster (free M0 tier)
   - Click "Connect" → "Connect your application"
   - Copy the connection string

5. **Configure backend environment**
   
   Create `backend/.env`:
   ```env
   NODE_ENV=development
   PORT=5000
   MONGODB_URI=mongodb+srv://your_username:your_password@cluster0.xxxxx.mongodb.net/bikehub
   JWT_SECRET=your_super_secure_jwt_secret_at_least_64_characters_long
   FRONTEND_URL=http://localhost:5173
   ```

   **Generate JWT Secret:**
   ```powershell
   # Windows PowerShell
   -join ((48..57) + (65..90) + (97..122) | Get-Random -Count 64 | % {[char]$_})
   ```
   ```bash
   # Mac/Linux
   openssl rand -base64 64 | tr -d '\n'
   ```

6. **Configure frontend environment**
   
   Create `frontend/.env`:
   ```env
   VITE_API_URL=http://localhost:5000
   ```

### Database Seeding

7. **Seed the database**
   ```bash
   cd backend
   npm run seed
   ```
   
   This creates:
   - ✅ Admin account (`admin@bikehub.com` / `SecureAdmin2024!`)
   - ✅ 8 bike categories
   - ✅ 58 sample bikes from top brands

### Running the Application

8. **Start the backend** (Terminal 1)
   ```bash
   cd backend
   npm run dev
   ```
   Backend runs on: http://localhost:5000

9. **Start the frontend** (Terminal 2)
   ```bash
   cd frontend
   npm run dev
   ```
   Frontend runs on: http://localhost:5173

10. **Open your browser**
    
    Navigate to http://localhost:5173 and start shopping! 🎉

---

## 📁 Project Structure

```
E-Commerce/
├── backend/                 # Node.js + Express API
│   ├── src/
│   │   ├── config/         # Database & logger configuration
│   │   ├── controllers/    # Route controllers
│   │   ├── middleware/     # Auth & error handling
│   │   ├── models/         # Mongoose models
│   │   ├── routes/         # API routes
│   │   ├── utils/          # Utilities & seed data
│   │   └── server.ts       # Entry point
│   ├── .env                # Environment variables (not in git)
│   ├── .env.example        # Environment template
│   ├── package.json
│   └── tsconfig.json
│
├── frontend/               # React + TypeScript + Vite
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   │   ├── ui/        # Shadcn/ui components
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── ...
│   │   ├── pages/         # Page components
│   │   ├── lib/           # API client & utilities
│   │   ├── store/         # Zustand state management
│   │   ├── types/         # TypeScript definitions
│   │   └── App.tsx
│   ├── .env               # Environment variables (not in git)
│   ├── .env.example       # Environment template
│   ├── package.json
│   └── vite.config.ts
│
├── docker-compose.yml     # Docker configuration
├── .gitignore
└── README.md
```

---

## 🌐 API Documentation

### Base URL
```
Development: http://localhost:5000/api/v1
Production: https://your-api.onrender.com/api/v1
```

### Endpoints

#### **Authentication** (`/api/v1/auth`)
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/register` | Register new user | ❌ |
| POST | `/login` | Login user | ❌ |
| GET | `/profile` | Get user profile | ✅ |

#### **Products** (`/api/v1/products`)
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/` | Get all products (with filters) | ❌ |
| GET | `/:id` | Get single product | ❌ |
| POST | `/` | Create product | 👑 Admin |
| PUT | `/:id` | Update product | 👑 Admin |
| DELETE | `/:id` | Delete product | 👑 Admin |

**Query Parameters for GET `/products`:**
- `search` - Search by name, description, tags
- `category` - Filter by category slug
- `sort` - Sort by: `-createdAt`, `price`, `-price`, `name`
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 12)

#### **Categories** (`/api/v1/categories`)
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/` | Get all categories | ❌ |
| POST | `/` | Create category | 👑 Admin |
| PUT | `/:id` | Update category | 👑 Admin |
| DELETE | `/:id` | Delete category | 👑 Admin |

#### **Cart** (`/api/v1/cart`)
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/` | Get user cart | ✅ |
| POST | `/` | Add item to cart | ✅ |
| PUT | `/:id` | Update cart item | ✅ |
| DELETE | `/:id` | Remove from cart | ✅ |

#### **Orders** (`/api/v1/orders`)
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/` | Get user orders | ✅ |
| GET | `/:id` | Get single order | ✅ |
| POST | `/` | Create order | ✅ |

---

## 🐳 Docker Deployment

### Using Docker Compose

```bash
# Build and start containers
docker-compose up -d

# View logs
docker-compose logs -f

# Stop containers
docker-compose down
```

---

## 🚢 Deployment

### Deploy to Render (Backend) + Vercel (Frontend)

#### **Backend on Render**

1. Go to [Render](https://render.com) and sign up with GitHub
2. Click "New +" → "Web Service"
3. Connect your repository
4. Configure:
   - **Name**: `bikehub-backend`
   - **Root Directory**: `backend`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
   - **Instance Type**: Free

5. Add Environment Variables:
   ```
   NODE_ENV=production
   PORT=5000
   MONGODB_URI=your_production_mongodb_uri
   JWT_SECRET=your_production_jwt_secret
   FRONTEND_URL=https://your-site.vercel.app
   ```

6. Deploy! Backend URL: `https://bikehub-backend-xxxx.onrender.com`

#### **Frontend on Vercel**

1. Go to [Vercel](https://vercel.com) and sign up with GitHub
2. Click "New Project" → Import your repository
3. Configure:
   - **Framework**: Vite
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

4. Add Environment Variable:
   ```
   VITE_API_URL=https://bikehub-backend-xxxx.onrender.com
   ```

5. Deploy! Frontend URL: `https://bikehub-xxxx.vercel.app`

**📝 Note:** Update `FRONTEND_URL` in Render after getting your Vercel URL

---

## 🔧 Available Scripts

### Backend Scripts
```bash
npm run dev         # Start development server with nodemon
npm run build       # Compile TypeScript to JavaScript
npm start           # Start production server
npm run seed        # Seed database with sample data
```

### Frontend Scripts
```bash
npm run dev         # Start Vite dev server
npm run build       # Build for production
npm run preview     # Preview production build
npm run lint        # Run ESLint
```

---

## 🧪 Testing

### Manual Testing Checklist
- [ ] Browse products and test filtering
- [ ] Search functionality
- [ ] Sort by price, name, newest
- [ ] Category filtering
- [ ] Add items to cart
- [ ] Update cart quantities
- [ ] Remove items from cart
- [ ] Complete checkout
- [ ] View order history
- [ ] Login as admin
- [ ] Create/edit/delete products
- [ ] Manage categories
- [ ] Dark/light theme toggle
- [ ] Responsive design on mobile

---

## 🤝 Contributing

This is a portfolio project, but suggestions are welcome!

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Your Name**

- GitHub: [@jngonzales](https://github.com/jngonzales)
- Portfolio: [Your Portfolio](https://your-portfolio.com)
- LinkedIn: [Your LinkedIn](https://linkedin.com/in/yourprofile)

---

## 🙏 Acknowledgments

- [Shadcn/ui](https://ui.shadcn.com/) - Beautiful UI components
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) - Cloud database
- [Render](https://render.com) - Backend hosting
- [Vercel](https://vercel.com) - Frontend hosting
- Bike images from [Unsplash](https://unsplash.com)

---

## 📚 Resources

- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [Express.js Guide](https://expressjs.com)
- [MongoDB Manual](https://docs.mongodb.com)
- [Tailwind CSS](https://tailwindcss.com)

---

<div align="center">

**⭐ Star this repo if you find it helpful!**

Made with ❤️ and ☕

</div>
