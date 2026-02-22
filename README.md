# AfriAgroCore - Complete Project Package

**Version:** 1.0  
**Date:** December 31, 2024  
**Archive Size:** 737 MB

---

## What's Included

This package contains the **complete AfriAgroCore platform** with all source code, assets, configuration files, and documentation needed for deployment.

### **Contents:**

✅ **Full Source Code**
- React 19 frontend with Vite
- Node.js backend with Express
- TypeScript throughout
- Drizzle ORM for database management

✅ **All Assets**
- Images and graphics
- Fonts and icons
- Favicon and logos
- Static files

✅ **Configuration Files**
- `package.json` - Dependencies and scripts
- `tsconfig.json` - TypeScript configuration
- `vite.config.ts` - Frontend build configuration
- `drizzle.config.ts` - Database ORM configuration
- `.env.example` - Environment variables template

✅ **Database Schema**
- Complete database schema definitions
- Migration files
- Seed data (if applicable)

✅ **Documentation**
- `DEPLOYMENT_GUIDE.md` - Comprehensive deployment instructions
- `README.md` - This file
- Inline code comments

---

## Quick Start

### **1. Extract the Archive**

```bash
# Extract the tar.gz file
tar -xzf afri-agro-core-complete.tar.gz

# Navigate to project directory
cd afri-agro-core
```

### **2. Install Dependencies**

```bash
# Install pnpm if not already installed
npm install -g pnpm

# Install project dependencies
pnpm install
```

### **3. Configure Environment**

```bash
# Copy environment template
cp .env.example .env

# Edit .env file with your values
nano .env  # or use your preferred editor
```

**Required variables:**
- `DATABASE_URL` - PostgreSQL connection string
- `JWT_SECRET` - Secure random string for authentication
- `VITE_APP_TITLE` - Application name
- Other variables as needed (see `.env.example`)

### **4. Setup Database**

```bash
# Run database migrations
pnpm db:push

# (Optional) Open database studio to verify
pnpm db:studio
```

### **5. Run Development Server**

```bash
# Start both frontend and backend
pnpm dev

# Frontend will run on: http://localhost:5173
# Backend API will run on: http://localhost:3000
```

### **6. Build for Production**

```bash
# Build frontend
pnpm build

# Output will be in client/dist/
```

---

## Deployment

**For detailed deployment instructions, see `DEPLOYMENT_GUIDE.md`**

### **Quick Deploy Options:**

**Vercel (Recommended):**
```bash
npm install -g vercel
vercel login
vercel
```

**Railway:**
```bash
npm install -g @railway/cli
railway login
railway init
railway up
```

**Netlify:**
```bash
npm install -g netlify-cli
netlify login
netlify deploy --dir=client/dist --prod
```

**VPS/Cloud Server:**
- See detailed instructions in `DEPLOYMENT_GUIDE.md`
- Includes Nginx configuration, PM2 setup, SSL certificates

---

## Project Structure

```
afri-agro-core/
├── client/                     # Frontend application
│   ├── public/                # Static assets
│   │   ├── images/           # All images used in the site
│   │   ├── favicon.ico       # Site favicon
│   │   └── robots.txt        # SEO configuration
│   ├── src/
│   │   ├── components/       # Reusable UI components
│   │   │   ├── ui/          # shadcn/ui components
│   │   │   ├── Navbar.tsx   # Navigation bar
│   │   │   ├── Footer.tsx   # Site footer
│   │   │   ├── Map.tsx      # Google Maps integration
│   │   │   └── WaitlistModal.tsx  # Waitlist modal
│   │   ├── pages/           # Page components
│   │   │   ├── Home.tsx     # Landing page
│   │   │   ├── AISolutions.tsx  # AI features page
│   │   │   ├── Community.tsx    # Community page
│   │   │   ├── Contact.tsx      # Contact form
│   │   │   └── ...
│   │   ├── contexts/        # React contexts
│   │   ├── hooks/           # Custom React hooks
│   │   ├── lib/             # Utility functions
│   │   ├── App.tsx          # Main app component
│   │   ├── main.tsx         # React entry point
│   │   └── index.css        # Global styles (Tailwind CSS)
│   ├── index.html           # HTML template
│   └── vite.config.ts       # Vite configuration
├── server/                    # Backend API
│   ├── index.ts             # Server entry point
│   ├── routes/              # API routes
│   ├── db/                  # Database schema
│   │   └── schema.ts       # Drizzle schema definitions
│   └── _core/               # Core utilities
│       └── dataApi.ts      # Data API helpers
├── shared/                   # Shared code
│   └── const.ts            # Shared constants
├── package.json             # Dependencies and scripts
├── tsconfig.json            # TypeScript config
├── drizzle.config.ts        # Database ORM config
├── .env.example             # Environment template
├── DEPLOYMENT_GUIDE.md      # Deployment instructions
└── README.md                # This file
```

---

## Available Scripts

```bash
# Development
pnpm dev              # Start development server (frontend + backend)
pnpm dev:client       # Start frontend only
pnpm dev:server       # Start backend only

# Building
pnpm build            # Build frontend for production
pnpm build:client     # Build frontend only
pnpm build:server     # Build backend only

# Database
pnpm db:generate      # Generate migration files
pnpm db:push          # Apply migrations to database
pnpm db:studio        # Open Drizzle Studio (database GUI)

# Testing
pnpm test             # Run tests
pnpm test:watch       # Run tests in watch mode

# Linting & Formatting
pnpm lint             # Run ESLint
pnpm format           # Format code with Prettier

# Production
pnpm start            # Start production server
```

---

## Key Features Implemented

### **Frontend:**
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Dark theme with emerald/green color scheme
- ✅ Smooth animations (Framer Motion)
- ✅ Modern UI components (shadcn/ui)
- ✅ Google Maps integration
- ✅ Multi-page navigation (Home, AI Solutions, Community, Contact, etc.)
- ✅ Waitlist modal for coming soon features
- ✅ Contact form with multi-select feature interests
- ✅ External link to AI Disease Detection app

### **Backend:**
- ✅ Express.js API server
- ✅ PostgreSQL database with Drizzle ORM
- ✅ JWT authentication
- ✅ RESTful API endpoints
- ✅ Database migrations
- ✅ Environment-based configuration

### **Pages:**
1. **Home** - Landing page with hero section, features, testimonials
2. **AI Solutions** - AI-powered features (disease detection, weather, yield optimization)
3. **Community** - Voice assistant, expert consultations, forums
4. **Marketplace** - (Placeholder for future implementation)
5. **Learn** - (Placeholder for future implementation)
6. **Contact** - Contact form with waitlist feature selection

---

## Database Schema

The project uses PostgreSQL with the following main tables:

- **users** - User accounts and authentication
- **farms** - Farm profiles and locations
- **crops** - Crop types and cultivation data
- **disease_scans** - AI disease detection results
- **consultations** - Expert consultation bookings
- **transactions** - Marketplace transactions

To view the complete schema:
```bash
pnpm db:studio
# Opens at http://localhost:4983
```

---

## Environment Variables Explained

### **Required:**

**DATABASE_URL**  
PostgreSQL connection string. Get from your database provider (Supabase, Neon, Railway, etc.)

**JWT_SECRET**  
Secret key for signing JWT tokens. Generate with:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### **Optional but Recommended:**

**VITE_APP_TITLE**  
Application name displayed in browser tab and header

**VITE_APP_LOGO**  
Path to logo image (relative to public folder)

**VITE_APP_ID**  
Unique identifier for the application

### **Optional (for extended features):**

**BUILT_IN_FORGE_API_KEY / VITE_FRONTEND_FORGE_API_KEY**  
API keys for Manus Forge AI services (if using)

**VITE_ANALYTICS_ENDPOINT / VITE_ANALYTICS_WEBSITE_ID**  
Analytics configuration (Google Analytics, Plausible, etc.)

**OAUTH_SERVER_URL / VITE_OAUTH_PORTAL_URL**  
OAuth authentication configuration (if using external auth)

---

## Technology Stack

### **Frontend:**
- **React 19** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS 4** - Styling
- **shadcn/ui** - UI component library
- **Framer Motion** - Animations
- **Wouter** - Client-side routing
- **Lucide React** - Icons

### **Backend:**
- **Node.js 22** - Runtime
- **Express** - Web framework
- **TypeScript** - Type safety
- **Drizzle ORM** - Database ORM
- **PostgreSQL** - Database

### **Development Tools:**
- **pnpm** - Package manager
- **ESLint** - Linting
- **Prettier** - Code formatting
- **tsx** - TypeScript execution

---

## Browser Support

- **Chrome/Edge** - Latest 2 versions
- **Firefox** - Latest 2 versions
- **Safari** - Latest 2 versions
- **Mobile browsers** - iOS Safari, Chrome Android

---

## Performance Optimizations

✅ **Code Splitting** - Automatic route-based code splitting  
✅ **Lazy Loading** - Images and components loaded on demand  
✅ **Asset Optimization** - Compressed images, minified CSS/JS  
✅ **Caching** - Browser caching for static assets  
✅ **CDN Ready** - Static assets can be served from CDN  

---

## Security Features

✅ **JWT Authentication** - Secure token-based auth  
✅ **SQL Injection Protection** - Drizzle ORM parameterized queries  
✅ **XSS Protection** - React's built-in XSS prevention  
✅ **CORS Configuration** - Controlled cross-origin requests  
✅ **Environment Variables** - Sensitive data not in code  
✅ **HTTPS Ready** - SSL certificate support  

---

## Troubleshooting

### **"Cannot find module" errors:**
```bash
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

### **Database connection fails:**
- Verify DATABASE_URL is correct
- Check database server is running
- Ensure firewall allows connections
- For cloud databases, whitelist your IP

### **Build fails:**
```bash
# Clear Vite cache
rm -rf client/dist client/.vite
pnpm build
```

### **Port already in use:**
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Or use different port
PORT=3001 pnpm dev
```

---

## Support & Contact

**Email:** info@africybercore.com  
**Phone:** +234 (0) 8167205221  
**Location:** Lagos, Nigeria

---

## License

AfriAgroCore is proprietary software. All rights reserved.

---

## Next Steps

1. **Read `DEPLOYMENT_GUIDE.md`** for detailed deployment instructions
2. **Set up your database** (Supabase, Neon, or self-hosted PostgreSQL)
3. **Configure environment variables** in `.env`
4. **Run database migrations** with `pnpm db:push`
5. **Test locally** with `pnpm dev`
6. **Deploy to your chosen platform** (Vercel, Railway, VPS, etc.)
7. **Set up custom domain** and SSL certificate
8. **Configure analytics** and monitoring

---

**Ready to deploy? Start with `DEPLOYMENT_GUIDE.md`**

Good luck with your deployment! 🚀
