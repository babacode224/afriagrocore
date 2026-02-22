# AfriAgroCore - IDE Setup Guide

## Quick Start (5 minutes)

### 1. Open in Your IDE

**VS Code:**
```bash
code .
```

**WebStorm/IntelliJ:**
- File → Open → Select this folder

**Other IDEs:**
- Open the project folder directly

### 2. Install Dependencies
```bash
pnpm install
```

If you don't have pnpm:
```bash
npm install -g pnpm
```

### 3. Set Up Environment
```bash
# Copy the example file
cp .env.example .env

# Edit .env with your values
# See DEPLOYMENT.md for all required variables
```

### 4. Start Development Server
```bash
pnpm dev
```

Server will start at `http://localhost:5173`

---

## Project Structure

```
afri-agro-core/
├── client/                    # React frontend
│   ├── src/
│   │   ├── pages/            # Page components (Home, AI Solutions, etc.)
│   │   ├── components/       # Reusable UI components
│   │   ├── hooks/            # Custom React hooks
│   │   ├── lib/              # Utilities (tRPC client, etc.)
│   │   ├── App.tsx           # Main app routing
│   │   └── main.tsx          # Entry point
│   ├── public/               # Static assets (images, fonts)
│   ├── index.html            # HTML template
│   └── vite.config.ts        # Vite configuration
│
├── server/                    # Express backend
│   ├── _core/                # Core infrastructure (auth, OAuth, etc.)
│   ├── routers.ts            # tRPC API routes
│   ├── feedbackRouter.ts     # Feedback widget API
│   ├── db.ts                 # Database helpers
│   ├── storage.ts            # S3 storage helpers
│   └── lib/                  # Email, utilities
│
├── drizzle/                  # Database
│   ├── schema.ts             # Database tables
│   ├── migrations/           # Database migrations
│   └── relations.ts          # Table relationships
│
├── shared/                   # Shared code
│   ├── types.ts              # TypeScript types
│   └── const.ts              # Constants
│
├── package.json              # Dependencies & scripts
├── tsconfig.json             # TypeScript config
├── vite.config.ts            # Frontend build config
├── drizzle.config.ts         # Database config
└── vitest.config.ts          # Testing config
```

---

## Common Commands

### Development
```bash
pnpm dev              # Start dev server (frontend + backend)
pnpm dev:client       # Frontend only
pnpm dev:server       # Backend only
```

### Building
```bash
pnpm build            # Build for production
pnpm preview          # Preview production build locally
```

### Database
```bash
pnpm db:push          # Push schema changes to database
pnpm db:studio        # Open Drizzle Studio (database UI)
```

### Testing
```bash
pnpm test             # Run all tests
pnpm test:watch       # Watch mode
```

### Code Quality
```bash
pnpm format           # Format code with Prettier
pnpm lint             # Check for errors
```

---

## IDE Extensions (Recommended)

### VS Code
- **ES7+ React/Redux/React-Native snippets** (dsznajder.es7-react-js-snippets)
- **Tailwind CSS IntelliSense** (bradlc.vscode-tailwindcss)
- **TypeScript Vue Plugin** (Vue.volar)
- **Prettier - Code formatter** (esbenp.prettier-vscode)
- **ESLint** (dbaeumer.vscode-eslint)

### WebStorm
- Built-in support for React, TypeScript, Tailwind
- Install Tailwind CSS plugin from marketplace

---

## Key Technologies

| Layer | Technology | Version |
|-------|-----------|---------|
| Frontend | React | 19 |
| Styling | Tailwind CSS | 4 |
| Build Tool | Vite | Latest |
| Backend | Express | 4 |
| API | tRPC | 11 |
| Database | MySQL/TiDB | - |
| ORM | Drizzle | 0.44 |
| Auth | Manus OAuth | - |
| Testing | Vitest | Latest |

---

## File Descriptions

### Critical Files (Don't Delete!)
- `package.json` - Dependencies and scripts
- `tsconfig.json` - TypeScript configuration
- `vite.config.ts` - Frontend build settings
- `drizzle.config.ts` - Database connection settings
- `drizzle/schema.ts` - Database table definitions

### Configuration Files
- `.env` - Environment variables (create from .env.example)
- `.prettierrc` - Code formatting rules
- `.gitignore` - Files to ignore in git

### Important Directories
- `client/src/pages/` - Add new pages here
- `client/src/components/` - Add reusable components here
- `server/` - Add backend logic here
- `drizzle/migrations/` - Auto-generated database migrations

---

## Troubleshooting

### Port 5173 Already in Use
```bash
# Kill the process using port 5173
lsof -ti:5173 | xargs kill -9

# Or use a different port
pnpm dev -- --port 3000
```

### Database Connection Error
1. Check `.env` has correct `DATABASE_URL`
2. Verify database server is running
3. Test connection: `pnpm db:studio`

### Module Not Found Errors
```bash
# Clear cache and reinstall
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

### TypeScript Errors
```bash
# Regenerate types
pnpm db:push
```

---

## Git Workflow

```bash
# Initialize git (if not already)
git init

# Add all files
git add .

# First commit
git commit -m "Initial commit: AfriAgroCore"

# Add remote (GitHub, GitLab, etc.)
git remote add origin https://github.com/yourusername/afri-agro-core.git

# Push to remote
git push -u origin main
```

---

## Next Steps

1. **Set up `.env`** - Copy from `.env.example` and fill in values
2. **Install dependencies** - Run `pnpm install`
3. **Start dev server** - Run `pnpm dev`
4. **Make changes** - Edit files in `client/src/` and `server/`
5. **Test** - Run `pnpm test` before committing
6. **Build** - Run `pnpm build` before deploying

---

## Support & Documentation

- **Frontend Guide:** See `README.md` in `client/` folder
- **Backend Guide:** See `README.md` in `server/` folder
- **Deployment:** See `DEPLOYMENT.md`
- **Database:** See `drizzle/schema.ts` for table definitions

---

## Important Notes

⚠️ **Before Deploying:**
- Update `.env` with production values
- Run `pnpm build` to check for errors
- Run `pnpm test` to verify functionality
- Update `VITE_APP_TITLE` and `VITE_APP_LOGO` in `.env`

🔒 **Security:**
- Never commit `.env` file to git
- Keep `JWT_SECRET` secure
- Use strong database passwords
- Enable HTTPS in production

📱 **Mobile Development:**
- Test on mobile devices
- Use Chrome DevTools device emulation
- Check responsive design at 375px, 768px, 1024px breakpoints

---

Happy coding! 🚀
