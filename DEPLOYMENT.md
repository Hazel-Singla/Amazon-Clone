# Deployment Guide

## Pre-Deployment Checklist

✅ Test locally with both frontend and backend running
✅ Ensure database seeding works correctly
✅ Test all features: browse, search, filter, cart, checkout, orders
✅ Update `backend/.env` with production database credentials
✅ Update frontend API URL to production backend URL

## Option 1: Deploy to Vercel (Frontend) + Railway (Backend)

### Backend Deployment (Railway)

1. **Prepare Backend**
   ```bash
   cd backend
   ```

2. **Create Railway Account**
   - Visit: https://railway.app
   - Sign up with GitHub

3. **Create MySQL Database on Railway**
   - New Project → Add Database → MySQL
   - Copy the database credentials

4. **Deploy Backend**
   - Push your code to GitHub
   - In Railway: New Project → Deploy from GitHub repo
   - Set Root Directory: `backend`
   
5. **Set Environment Variables in Railway**
   ```
   PORT=5000
   DB_HOST=<railway-mysql-host>
   DB_USER=<railway-mysql-user>
   DB_PASSWORD=<railway-mysql-password>
   DB_NAME=<railway-mysql-database>
   DB_PORT=<railway-mysql-port>
   NODE_ENV=production
   ```

6. **Run Database Migration**
   - Open Railway shell
   - Run: `mysql -h $DB_HOST -u $DB_USER -p$DB_PASSWORD $DB_NAME < database/schema.sql`

7. **Seed Database**
   ```bash
   npm run seed
   ```

8. **Get Backend URL**
   - Railway will provide: `https://your-app.railway.app`
   - Copy this URL

### Frontend Deployment (Vercel)

1. **Update API URL**
   - Create `frontend/.env.production`:
   ```
   NEXT_PUBLIC_API_URL=https://your-backend.railway.app/api
   ```

2. **Deploy to Vercel**
   ```bash
   cd frontend
   npm install -g vercel
   vercel
   ```
   
   Or use Vercel dashboard:
   - Visit: https://vercel.com
   - Import your GitHub repository
   - Set Root Directory: `frontend`
   - Add Environment Variable: `NEXT_PUBLIC_API_URL`

3. **Build and Deploy**
   - Vercel will automatically build and deploy
   - Get your frontend URL: `https://your-app.vercel.app`

## Option 2: Deploy to Render (Backend) + Vercel (Frontend)

### Backend Deployment (Render)

1. **Create Render Account**
   - Visit: https://render.com
   - Sign up with GitHub

2. **Create Web Service**
   - New → Web Service
   - Connect GitHub repository
   - Root Directory: `backend`
   - Build Command: `npm install`
   - Start Command: `npm start`

3. **Add MySQL Database**
   - New → PostgreSQL (Render doesn't have MySQL, use PostgreSQL)
   - Update backend code to use PostgreSQL instead of MySQL
   - Or use external MySQL service (e.g., PlanetScale, ClearDB)

4. **Set Environment Variables**
   - Same as Railway setup

### Frontend Deployment (Vercel)
- Same as Option 1

## Option 3: Deploy to Heroku (Backend) + Netlify (Frontend)

### Backend Deployment (Heroku)

1. **Install Heroku CLI**
   ```bash
   npm install -g heroku
   heroku login
   ```

2. **Create Heroku App**
   ```bash
   cd backend
   heroku create your-amazon-clone-api
   ```

3. **Add MySQL Add-on**
   ```bash
   heroku addons:create cleardb:ignite
   ```

4. **Set Environment Variables**
   ```bash
   heroku config:set DB_HOST=<cleardb-host>
   heroku config:set DB_USER=<cleardb-user>
   heroku config:set DB_PASSWORD=<cleardb-password>
   heroku config:set DB_NAME=<cleardb-database>
   ```

5. **Deploy**
   ```bash
   git push heroku main
   ```

6. **Run Migration & Seed**
   ```bash
   heroku run bash
   mysql -h $DB_HOST -u $DB_USER -p$DB_PASSWORD $DB_NAME < database/schema.sql
   npm run seed
   ```

### Frontend Deployment (Netlify)

1. **Build Frontend**
   ```bash
   cd frontend
   npm run build
   ```

2. **Deploy to Netlify**
   ```bash
   npm install -g netlify-cli
   netlify deploy --prod --dir=out
   ```
   
   Or use Netlify dashboard:
   - Connect GitHub repository
   - Build Command: `npm run build`
   - Publish Directory: `.next` (for Next.js)

## Post-Deployment Testing

1. **Test API Health**
   ```bash
   curl https://your-backend-url.railway.app/api/health
   ```

2. **Test Frontend**
   - Visit your frontend URL
   - Test all features
   - Check browser console for errors

3. **Test API Calls**
   - Open browser DevTools → Network tab
   - Verify API calls go to production backend
   - Check for CORS errors

## Common Issues & Solutions

### CORS Errors
**Problem:** Frontend can't connect to backend
**Solution:** Ensure backend has CORS enabled (already configured in `app.js`)

### Database Connection Fails
**Problem:** Backend can't connect to database
**Solution:** 
- Verify environment variables are set correctly
- Check database is accessible from your hosting provider
- Ensure database schema is created

### Images Not Loading
**Problem:** Product images don't display
**Solution:** 
- Check `next.config.js` has correct image domains
- Unsplash images should work by default

### Build Fails
**Problem:** Frontend build fails
**Solution:**
- Check all TypeScript errors are resolved
- Run `npm run build` locally first
- Check environment variables are set

## Custom Domain Setup

### Vercel
1. Go to Project Settings → Domains
2. Add your custom domain
3. Update DNS records as instructed

### Railway
1. Go to Project Settings → Domains
2. Add custom domain
3. Update DNS CNAME record

## Environment Variables Summary

### Backend (.env)
```env
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=amazon_clone
DB_PORT=3306
NODE_ENV=production
```

### Frontend (.env.production)
```env
NEXT_PUBLIC_API_URL=https://your-backend-url/api
```

## Cost Estimate

**Free Tier Options:**
- Vercel: Free for hobby projects
- Railway: $5 credit/month (enough for small app)
- Render: Free tier available (with limitations)

**Total Estimated Cost: $0-5/month** for development/demo purposes

## Performance Optimization

After deployment:

1. **Enable CDN** (Vercel does this automatically)
2. **Optimize Images** (Next.js Image component already used)
3. **Enable Gzip Compression** (add to Express):
   ```javascript
   const compression = require('compression');
   app.use(compression());
   ```
4. **Database Indexing** (already added in schema.sql)
5. **Caching** (consider Redis for production)

## Monitoring

**Recommended Tools:**
- Sentry: Error tracking
- LogRocket: Session replay
- Google Analytics: User analytics
- UptimeRobot: Uptime monitoring

## Security Best Practices

✅ Already Implemented:
- Parameterized SQL queries (prevent injection)
- CORS configuration
- Environment variables for secrets

**Additional Recommendations:**
- Add rate limiting
- Implement input validation
- Use HTTPS (provided by hosting platforms)
- Add helmet.js security headers
- Regular dependency updates

---

**Note:** For the assignment submission, you can use free tiers of these platforms. The application is lightweight and should run well within free tier limits.
