# AfriAgroCore - Complete Deployment Guide

**Project Archive:** `afri-agro-core-complete.tar.gz` (737 MB)

This guide provides complete instructions for deploying the AfriAgroCore platform to external hosting providers including Vercel, Netlify, Railway, or any VPS/cloud server.

---

## Table of Contents

1. [Project Structure](#project-structure)
2. [Prerequisites](#prerequisites)
3. [Environment Variables](#environment-variables)
4. [Database Setup](#database-setup)
5. [Deployment Options](#deployment-options)
6. [Post-Deployment Configuration](#post-deployment-configuration)
7. [Troubleshooting](#troubleshooting)

---

## Project Structure

The extracted archive contains the complete AfriAgroCore project with the following structure:

```
afri-agro-core/
├── client/                 # React frontend application
│   ├── public/            # Static assets (images, favicon, etc.)
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Page-level components
│   │   ├── contexts/      # React contexts
│   │   ├── hooks/         # Custom React hooks
│   │   ├── lib/           # Utility functions
│   │   ├── App.tsx        # Main application component
│   │   ├── main.tsx       # React entry point
│   │   └── index.css      # Global styles
│   ├── index.html         # HTML template
│   └── vite.config.ts     # Vite configuration
├── server/                # Backend API (Node.js + Express)
│   ├── index.ts           # Server entry point
│   ├── routes/            # API route handlers
│   ├── db/                # Database schema and migrations
│   └── _core/             # Core server utilities
├── shared/                # Shared code between client and server
│   └── const.ts           # Shared constants
├── package.json           # Project dependencies
├── tsconfig.json          # TypeScript configuration
├── drizzle.config.ts      # Database ORM configuration
└── .env.example           # Environment variables template
```

---

## Prerequisites

Before deploying, ensure you have:

**Required Software:**
- **Node.js** 22.x or higher
- **pnpm** package manager (or npm/yarn)
- **PostgreSQL** database (14.x or higher)
- **Git** (for version control)

**Required Accounts:**
- Database hosting (Supabase, Neon, Railway, or self-hosted PostgreSQL)
- Deployment platform (Vercel, Netlify, Railway, or VPS)
- (Optional) Domain registrar for custom domain

**Installation Commands:**

```bash
# Install Node.js (if not installed)
# Download from https://nodejs.org/

# Install pnpm globally
npm install -g pnpm

# Verify installations
node --version  # Should be 22.x or higher
pnpm --version  # Should be 8.x or higher
```

---

## Environment Variables

The project requires the following environment variables to function properly. Create a `.env` file in the project root with these values:

### **Required Environment Variables**

```bash
# ============================================
# DATABASE CONFIGURATION
# ============================================
# PostgreSQL connection string
# Format: postgresql://username:password@host:port/database?sslmode=require
DATABASE_URL="postgresql://user:password@your-db-host.com:5432/afriagrocore?sslmode=require"

# ============================================
# AUTHENTICATION & SECURITY
# ============================================
# JWT secret for token signing (generate a strong random string)
JWT_SECRET="your-super-secret-jwt-key-min-32-characters-long"

# OAuth server URL (if using external auth)
OAUTH_SERVER_URL="https://your-oauth-server.com"

# Owner information
OWNER_NAME="Your Name"
OWNER_OPEN_ID="your-unique-id"

# ============================================
# APPLICATION CONFIGURATION
# ============================================
# Application ID (unique identifier)
VITE_APP_ID="afriagrocore-prod"

# Application title
VITE_APP_TITLE="AfriAgroCore.AI"

# Application logo URL
VITE_APP_LOGO="/logo.png"

# ============================================
# API KEYS (OPTIONAL - for extended features)
# ============================================
# Forge API for AI services (if using Manus Forge)
BUILT_IN_FORGE_API_KEY="your-forge-api-key"
BUILT_IN_FORGE_API_URL="https://forge-api.manus.com"

# Frontend Forge API keys
VITE_FRONTEND_FORGE_API_KEY="your-frontend-forge-key"
VITE_FRONTEND_FORGE_API_URL="https://forge-api.manus.com"

# ============================================
# ANALYTICS (OPTIONAL)
# ============================================
# Analytics endpoint
VITE_ANALYTICS_ENDPOINT="https://analytics.yourdomain.com"
VITE_ANALYTICS_WEBSITE_ID="your-website-id"

# ============================================
# OAUTH PORTAL (OPTIONAL)
# ============================================
VITE_OAUTH_PORTAL_URL="https://auth.yourdomain.com"
```

### **How to Generate Secure Values**

**JWT_SECRET:**
```bash
# Generate a secure random string (32+ characters)
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

**DATABASE_URL:**
- **Supabase:** Get from Project Settings → Database → Connection String
- **Neon:** Get from Dashboard → Connection Details
- **Railway:** Automatically provided in environment variables
- **Self-hosted:** Format as `postgresql://username:password@host:port/database`

---

## Database Setup

The project uses **PostgreSQL** with **Drizzle ORM** for database management.

### **Option 1: Managed Database (Recommended)**

**Supabase (Free tier available):**
1. Create account at https://supabase.com
2. Create new project
3. Copy connection string from Settings → Database
4. Add to `.env` as `DATABASE_URL`

**Neon (Free tier available):**
1. Create account at https://neon.tech
2. Create new project
3. Copy connection string
4. Add to `.env` as `DATABASE_URL`

**Railway:**
1. Create account at https://railway.app
2. Add PostgreSQL service
3. Connection string auto-provided in environment

### **Option 2: Self-Hosted PostgreSQL**

```bash
# Install PostgreSQL (Ubuntu/Debian)
sudo apt update
sudo apt install postgresql postgresql-contrib

# Create database and user
sudo -u postgres psql
CREATE DATABASE afriagrocore;
CREATE USER afriagrocore_user WITH PASSWORD 'your-secure-password';
GRANT ALL PRIVILEGES ON DATABASE afriagrocore TO afriagrocore_user;
\q

# Connection string format
DATABASE_URL="postgresql://afriagrocore_user:your-secure-password@localhost:5432/afriagrocore"
```

### **Database Migration**

After setting up the database, run migrations to create tables:

```bash
# Install dependencies
pnpm install

# Generate migration files
pnpm db:generate

# Apply migrations to database
pnpm db:push

# Verify database schema
pnpm db:studio  # Opens Drizzle Studio at http://localhost:4983
```

### **Database Schema Overview**

The project includes tables for:
- **Users** - User accounts and authentication
- **Farms** - Farm profiles and locations
- **Crops** - Crop types and cultivation data
- **Disease Scans** - AI disease detection results
- **Expert Consultations** - Booking and consultation records
- **Marketplace Transactions** - Input purchases and sales

---

## Deployment Options

### **Option 1: Vercel (Recommended for Full-Stack)**

Vercel supports both frontend and serverless backend functions.

**Step 1: Prepare Project**

Create `vercel.json` in project root:

```json
{
  "buildCommand": "pnpm build",
  "outputDirectory": "client/dist",
  "devCommand": "pnpm dev",
  "installCommand": "pnpm install",
  "framework": "vite",
  "rewrites": [
    {
      "source": "/api/(.*)",
      "destination": "/server/index.ts"
    },
    {
      "source": "/(.*)",
      "destination": "/client/index.html"
    }
  ]
}
```

**Step 2: Deploy**

```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy project
cd afri-agro-core
vercel

# Follow prompts:
# - Link to existing project or create new
# - Set environment variables when prompted
# - Deploy

# For production deployment
vercel --prod
```

**Step 3: Configure Environment Variables**

In Vercel Dashboard:
1. Go to Project Settings → Environment Variables
2. Add all variables from `.env`
3. Redeploy to apply changes

---

### **Option 2: Netlify (Frontend Only)**

Netlify is best for static frontend deployment. Backend requires separate hosting.

**Step 1: Prepare Frontend Build**

```bash
# Build frontend only
cd client
pnpm build

# Output will be in client/dist/
```

**Step 2: Deploy to Netlify**

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Deploy
netlify deploy --dir=client/dist

# For production
netlify deploy --prod --dir=client/dist
```

**Step 3: Backend Deployment**

Deploy backend separately to:
- **Railway** (easiest for Node.js backends)
- **Heroku**
- **DigitalOcean App Platform**
- **AWS Lambda** (requires serverless framework)

---

### **Option 3: Railway (Full-Stack)**

Railway provides simple full-stack deployment with built-in PostgreSQL.

**Step 1: Install Railway CLI**

```bash
npm install -g @railway/cli
```

**Step 2: Deploy**

```bash
# Login
railway login

# Initialize project
cd afri-agro-core
railway init

# Add PostgreSQL database
railway add --plugin postgresql

# Deploy
railway up

# Set environment variables
railway variables set JWT_SECRET="your-secret-key"
railway variables set VITE_APP_TITLE="AfriAgroCore.AI"
# ... add all other variables

# Open deployed app
railway open
```

---

### **Option 4: VPS/Cloud Server (Full Control)**

Deploy to any VPS (DigitalOcean, AWS EC2, Linode, etc.) for complete control.

**Step 1: Server Setup (Ubuntu 22.04)**

```bash
# SSH into server
ssh root@your-server-ip

# Update system
apt update && apt upgrade -y

# Install Node.js 22.x
curl -fsSL https://deb.nodesource.com/setup_22.x | bash -
apt install -y nodejs

# Install pnpm
npm install -g pnpm

# Install PostgreSQL
apt install -y postgresql postgresql-contrib

# Install Nginx (reverse proxy)
apt install -y nginx

# Install PM2 (process manager)
npm install -g pm2
```

**Step 2: Deploy Application**

```bash
# Create application directory
mkdir -p /var/www/afriagrocore
cd /var/www/afriagrocore

# Upload project files (from your local machine)
# Option A: Using scp
scp afri-agro-core-complete.tar.gz root@your-server-ip:/var/www/afriagrocore/

# Option B: Using git
git clone https://github.com/yourusername/afriagrocore.git .

# Extract archive (if using scp)
tar -xzf afri-agro-core-complete.tar.gz
cd afri-agro-core

# Install dependencies
pnpm install

# Create .env file
nano .env
# Paste environment variables, save and exit (Ctrl+X, Y, Enter)

# Run database migrations
pnpm db:push

# Build frontend
pnpm build

# Start backend with PM2
pm2 start server/index.ts --name afriagrocore-api --interpreter=tsx
pm2 save
pm2 startup  # Follow instructions to enable auto-start
```

**Step 3: Configure Nginx**

```bash
# Create Nginx configuration
nano /etc/nginx/sites-available/afriagrocore

# Paste configuration:
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;

    # Frontend (static files)
    location / {
        root /var/www/afriagrocore/afri-agro-core/client/dist;
        try_files $uri $uri/ /index.html;
    }

    # Backend API
    location /api {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}

# Enable site
ln -s /etc/nginx/sites-available/afriagrocore /etc/nginx/sites-enabled/
nginx -t  # Test configuration
systemctl restart nginx

# Install SSL certificate (Let's Encrypt)
apt install -y certbot python3-certbot-nginx
certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

---

## Post-Deployment Configuration

### **1. Custom Domain Setup**

**Vercel:**
1. Go to Project Settings → Domains
2. Add your domain
3. Update DNS records at your registrar:
   - Type: `CNAME`, Name: `www`, Value: `cname.vercel-dns.com`
   - Type: `A`, Name: `@`, Value: `76.76.21.21`

**Netlify:**
1. Go to Site Settings → Domain Management
2. Add custom domain
3. Update DNS records:
   - Type: `CNAME`, Name: `www`, Value: `your-site.netlify.app`
   - Type: `A`, Name: `@`, Value: `75.2.60.5`

**Railway:**
1. Go to Project → Settings → Domains
2. Add custom domain
3. Update DNS records as instructed

### **2. SSL Certificate**

All major platforms (Vercel, Netlify, Railway) provide automatic SSL certificates via Let's Encrypt. For VPS deployments, use Certbot as shown above.

### **3. Analytics Setup**

If using analytics, configure:
- **Google Analytics:** Add tracking ID to `VITE_ANALYTICS_WEBSITE_ID`
- **Plausible:** Set `VITE_ANALYTICS_ENDPOINT` to your Plausible instance
- **Custom:** Implement tracking in `client/src/lib/analytics.ts`

### **4. Email Configuration**

For contact form submissions and notifications, configure email service:

**Option A: SendGrid**
```bash
# Install SendGrid SDK
pnpm add @sendgrid/mail

# Add to .env
SENDGRID_API_KEY="your-sendgrid-api-key"
```

**Option B: AWS SES**
```bash
# Install AWS SDK
pnpm add @aws-sdk/client-ses

# Add to .env
AWS_ACCESS_KEY_ID="your-access-key"
AWS_SECRET_ACCESS_KEY="your-secret-key"
AWS_REGION="us-east-1"
```

---

## Troubleshooting

### **Build Errors**

**Error: "Cannot find module 'xyz'"**
```bash
# Clear cache and reinstall
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

**Error: "TypeScript compilation failed"**
```bash
# Check TypeScript version
pnpm list typescript

# Rebuild TypeScript
pnpm tsc --noEmit
```

### **Database Connection Issues**

**Error: "Connection refused"**
- Verify `DATABASE_URL` is correct
- Check database server is running
- Ensure firewall allows connections on port 5432
- For cloud databases, whitelist your server IP

**Error: "SSL required"**
- Add `?sslmode=require` to `DATABASE_URL`
- For local development, use `?sslmode=disable`

### **Runtime Errors**

**Error: "JWT secret not configured"**
- Ensure `JWT_SECRET` is set in `.env`
- Restart server after adding environment variables

**Error: "CORS policy blocked"**
- Update `server/index.ts` CORS configuration
- Add your frontend domain to allowed origins

### **Performance Issues**

**Slow page loads:**
- Enable gzip compression in Nginx/server
- Optimize images (use WebP format)
- Enable CDN for static assets

**High memory usage:**
- Increase server RAM
- Optimize database queries
- Enable connection pooling

---

## Additional Resources

**Documentation:**
- [Vite Documentation](https://vitejs.dev/)
- [React Documentation](https://react.dev/)
- [Drizzle ORM Documentation](https://orm.drizzle.team/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)

**Deployment Guides:**
- [Vercel Deployment Guide](https://vercel.com/docs)
- [Netlify Deployment Guide](https://docs.netlify.com/)
- [Railway Deployment Guide](https://docs.railway.app/)

**Support:**
- Project Repository: [GitHub link]
- Email: info@africybercore.com
- Phone: +234 (0) 8167205221

---

## Security Checklist

Before going to production, ensure:

- [ ] All environment variables are set correctly
- [ ] `JWT_SECRET` is a strong random string (32+ characters)
- [ ] Database uses SSL connections (`sslmode=require`)
- [ ] HTTPS is enabled (SSL certificate installed)
- [ ] CORS is configured to allow only your domain
- [ ] Rate limiting is enabled on API endpoints
- [ ] Input validation is implemented on all forms
- [ ] SQL injection protection is enabled (Drizzle ORM handles this)
- [ ] XSS protection headers are set
- [ ] Database backups are configured
- [ ] Error logging is set up (Sentry, LogRocket, etc.)

---

## Maintenance

**Regular Tasks:**

**Daily:**
- Monitor error logs
- Check database performance
- Review analytics data

**Weekly:**
- Update dependencies (`pnpm update`)
- Review security alerts
- Backup database

**Monthly:**
- Update Node.js version
- Review and optimize database queries
- Test disaster recovery procedures

**Backup Commands:**

```bash
# Database backup
pg_dump -h your-db-host -U your-db-user afriagrocore > backup_$(date +%Y%m%d).sql

# Restore from backup
psql -h your-db-host -U your-db-user afriagrocore < backup_20250101.sql

# Automated daily backups (cron)
0 2 * * * pg_dump -h your-db-host -U your-db-user afriagrocore > /backups/afriagrocore_$(date +\%Y\%m\%d).sql
```

---

## License

AfriAgroCore is proprietary software. All rights reserved.

---

**Document Version:** 1.0  
**Last Updated:** December 31, 2024  
**Prepared by:** Manus AI
