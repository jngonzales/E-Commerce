# 🚀 Deployment Guide

This guide covers deploying the E-Commerce platform to production.

## Table of Contents
- [Prerequisites](#prerequisites)
- [Environment Setup](#environment-setup)
- [Backend Deployment](#backend-deployment)
- [Frontend Deployment](#frontend-deployment)
- [Database Setup](#database-setup)
- [Docker Deployment](#docker-deployment)
- [Monitoring & Maintenance](#monitoring--maintenance)

## Prerequisites

Before deploying, ensure you have:
- Node.js v18+ installed
- MongoDB Atlas account (or MongoDB server)
- Domain name (optional but recommended)
- SSL certificate (for HTTPS)
- Cloud hosting account (AWS, DigitalOcean, Heroku, etc.)

## Environment Setup

### Production Environment Variables

#### Backend (.env)
```bash
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/ecommerce?retryWrites=true&w=majority
JWT_SECRET=use-a-very-strong-random-secret-key-here
NODE_ENV=production
FRONTEND_URL=https://your-domain.com
```

**Security Notes:**
- Generate a strong JWT secret: `openssl rand -base64 64`
- Never commit `.env` files to version control
- Use environment-specific secrets

#### Frontend (.env.production)
```bash
VITE_API_URL=https://api.your-domain.com/api
```

## Backend Deployment

### Option 1: Heroku

1. **Install Heroku CLI**
```bash
npm install -g heroku
heroku login
```

2. **Create Heroku App**
```bash
cd backend
heroku create your-app-name
```

3. **Set Environment Variables**
```bash
heroku config:set MONGODB_URI="your-mongodb-uri"
heroku config:set JWT_SECRET="your-jwt-secret"
heroku config:set NODE_ENV=production
heroku config:set FRONTEND_URL="https://your-frontend-url.com"
```

4. **Deploy**
```bash
git push heroku main
```

### Option 2: DigitalOcean/AWS/VPS

1. **SSH into your server**
```bash
ssh root@your-server-ip
```

2. **Install Node.js and PM2**
```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
sudo npm install -g pm2
```

3. **Clone and Setup**
```bash
git clone your-repo-url
cd ECommerce/backend
npm install
npm run build
```

4. **Create .env file**
```bash
nano .env
# Add your production environment variables
```

5. **Start with PM2**
```bash
pm2 start dist/server.js --name ecommerce-api
pm2 save
pm2 startup
```

### Option 3: Docker on Server

```bash
# SSH into server
ssh root@your-server-ip

# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh

# Clone repo
git clone your-repo-url
cd ECommerce

# Build and run
docker-compose -f docker-compose.prod.yml up -d
```

## Frontend Deployment

### Option 1: Vercel (Recommended)

1. **Install Vercel CLI**
```bash
npm install -g vercel
```

2. **Deploy**
```bash
cd frontend
vercel
```

3. **Set Environment Variables in Vercel Dashboard**
- Go to Project Settings → Environment Variables
- Add `VITE_API_URL`

### Option 2: Netlify

1. **Build the project**
```bash
cd frontend
npm run build
```

2. **Deploy via Netlify CLI**
```bash
npm install -g netlify-cli
netlify login
netlify deploy --prod --dir=dist
```

3. **Set Environment Variables in Netlify Dashboard**

### Option 3: Static Hosting (Nginx)

1. **Build the project**
```bash
cd frontend
npm run build
```

2. **Copy to server**
```bash
scp -r dist/* root@your-server:/var/www/your-domain/
```

3. **Configure Nginx**
```nginx
server {
    listen 80;
    server_name your-domain.com;
    root /var/www/your-domain;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location /api {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## Database Setup

### MongoDB Atlas

1. **Create a Cluster**
- Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- Create a free or paid cluster

2. **Create Database User**
- Database Access → Add New Database User
- Set username and password

3. **Whitelist IP Addresses**
- Network Access → Add IP Address
- For development: Add your IP
- For production: Add server IP or allow all (0.0.0.0/0)

4. **Get Connection String**
- Clusters → Connect → Connect your application
- Copy the connection string
- Replace `<password>` with your database user password

5. **Seed Production Database**
```bash
# Update MONGODB_URI in backend/.env
npm run seed
```

## Docker Deployment

### Create docker-compose.prod.yml

```yaml
version: '3.8'

services:
  mongodb:
    image: mongo:7
    container_name: ecommerce-mongodb
    restart: always
    volumes:
      - mongodb_data:/data/db
    environment:
      MONGO_INITDB_ROOT_USERNAME: admin
      MONGO_INITDB_ROOT_PASSWORD: your-secure-password
    networks:
      - ecommerce-network

  backend:
    build: ./backend
    container_name: ecommerce-backend
    restart: always
    ports:
      - "5000:5000"
    environment:
      PORT: 5000
      MONGODB_URI: mongodb://admin:your-secure-password@mongodb:27017/ecommerce?authSource=admin
      JWT_SECRET: ${JWT_SECRET}
      NODE_ENV: production
      FRONTEND_URL: ${FRONTEND_URL}
    depends_on:
      - mongodb
    networks:
      - ecommerce-network

  frontend:
    build:
      context: ./frontend
      args:
        VITE_API_URL: ${VITE_API_URL}
    container_name: ecommerce-frontend
    restart: always
    ports:
      - "80:80"
    depends_on:
      - backend
    networks:
      - ecommerce-network

volumes:
  mongodb_data:

networks:
  ecommerce-network:
    driver: bridge
```

### Deploy with Docker

```bash
# Create .env file for docker-compose
echo "JWT_SECRET=your-secret-key" > .env
echo "FRONTEND_URL=https://your-domain.com" >> .env
echo "VITE_API_URL=https://api.your-domain.com/api" >> .env

# Build and deploy
docker-compose -f docker-compose.prod.yml up -d

# View logs
docker-compose -f docker-compose.prod.yml logs -f

# Seed database
docker-compose exec backend npm run seed
```

## SSL/HTTPS Setup

### Using Let's Encrypt (Free)

```bash
# Install Certbot
sudo apt-get update
sudo apt-get install certbot python3-certbot-nginx

# Get certificate
sudo certbot --nginx -d your-domain.com -d www.your-domain.com

# Auto-renewal is configured automatically
# Test renewal
sudo certbot renew --dry-run
```

## Monitoring & Maintenance

### PM2 Monitoring

```bash
# View logs
pm2 logs ecommerce-api

# Monitor resources
pm2 monit

# Restart application
pm2 restart ecommerce-api

# View status
pm2 status
```

### Docker Monitoring

```bash
# View logs
docker-compose logs -f backend

# Check resource usage
docker stats

# Restart services
docker-compose restart backend
```

### Database Backups

```bash
# Manual backup
mongodump --uri="your-mongodb-uri" --out=/backup/$(date +%Y%m%d)

# Automated daily backup (crontab)
0 2 * * * mongodump --uri="your-mongodb-uri" --out=/backup/$(date +\%Y\%m\%d)
```

### Health Checks

Create a simple health check endpoint:

```typescript
// backend/src/routes/health.ts
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});
```

## Performance Optimization

### Backend

1. **Enable Compression**
```typescript
import compression from 'compression';
app.use(compression());
```

2. **Use Caching**
```typescript
import redis from 'redis';
const client = redis.createClient();
```

3. **Database Indexing**
```typescript
// Add indexes to frequently queried fields
productSchema.index({ name: 'text', description: 'text' });
productSchema.index({ category: 1, price: 1 });
```

### Frontend

1. **Code Splitting**
```typescript
// Use React lazy loading
const AdminPage = lazy(() => import('./pages/AdminPage'));
```

2. **Image Optimization**
- Use WebP format
- Implement lazy loading
- Use CDN for images

3. **Bundle Optimization**
```bash
npm run build -- --mode production
```

## Troubleshooting

### Common Issues

1. **MongoDB Connection Failed**
   - Check connection string format
   - Verify IP whitelist
   - Check credentials

2. **CORS Errors**
   - Update `FRONTEND_URL` in backend .env
   - Check CORS configuration

3. **Build Failures**
   - Clear node_modules: `rm -rf node_modules && npm install`
   - Check Node.js version: `node -v`

## Security Checklist

- [ ] Use HTTPS/SSL
- [ ] Set strong JWT secret
- [ ] Enable rate limiting
- [ ] Sanitize user inputs
- [ ] Keep dependencies updated
- [ ] Use environment variables for secrets
- [ ] Enable CORS properly
- [ ] Implement request validation
- [ ] Use helmet.js for security headers
- [ ] Regular security audits: `npm audit`

## Post-Deployment

1. **Test all features**
   - User registration/login
   - Product browsing
   - Cart operations
   - Checkout process
   - Order management
   - Admin panel

2. **Monitor performance**
   - Page load times
   - API response times
   - Error rates

3. **Set up analytics**
   - Google Analytics
   - Error tracking (Sentry)
   - User behavior tracking

## Scaling Considerations

### Horizontal Scaling
- Use load balancer (Nginx, AWS ELB)
- Run multiple backend instances
- Use Redis for session management

### Database Scaling
- MongoDB sharding
- Read replicas
- Connection pooling

### CDN Integration
- Use Cloudflare or AWS CloudFront
- Cache static assets
- Optimize images

## Backup Strategy

1. **Database**: Daily automated backups
2. **Code**: Version control (Git)
3. **Environment**: Document all configurations
4. **Media**: Backup user uploads to cloud storage

## Support & Maintenance

- Monitor error logs daily
- Update dependencies monthly
- Review security advisories
- Plan for database migrations
- Schedule regular backups testing

---

**Congratulations!** Your E-Commerce platform is now deployed and ready for production use! 🎉
