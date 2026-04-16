# 🚀 START HERE - Amazon Clone

## Quick Start (3 Steps)

### Step 1: Create Database

**Option A - Using Script (Easiest):**
```bash
# Double-click this file or run:
setup-database.bat
```

**Option B - Manual:**
```bash
# Open MySQL command line
mysql -u root -p

# Then paste the contents of:
backend/database/schema.sql
```

### Step 2: Configure & Seed Database

1. **Update your MySQL password:**
   - Open: `backend/.env`
   - Change: `DB_PASSWORD=your_mysql_password`

2. **Seed the database with 26 products:**
   ```bash
   cd backend
   npm run seed
   ```
   
   You should see: ✅ "Seed completed successfully! Added 26 products."

### Step 3: Start the Application

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```
Wait for: ✅ "Server is running on port 5000"

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```
Wait for: ✅ "Local: http://localhost:3000"

**Open Browser:**
👉 http://localhost:3000

---

## ✅ What's Already Done

- ✅ Backend API (Express.js + MySQL)
- ✅ Frontend App (Next.js + TypeScript)
- ✅ Database Schema (5 tables)
- ✅ 26 Sample Products
- ✅ All Features Working
- ✅ Amazon-like UI
- ✅ Dependencies Installed

## 🎯 Features to Test

1. **Browse Products** - Homepage shows product grid
2. **Search** - Use search bar to find products
3. **Filter** - Filter by category (Electronics, Books, etc.)
4. **View Product** - Click any product for details
5. **Add to Cart** - Click "Add to Cart" button
6. **View Cart** - Click cart icon (top right)
7. **Update Quantity** - Use +/- buttons in cart
8. **Checkout** - Fill shipping form
9. **Place Order** - Click "Place Order"
10. **Order Confirmation** - See your Order ID!

## 📁 Project Files

```
Amazon/
├── backend/              ✅ Complete
├── frontend/             ✅ Complete
├── README.md            ✅ Documentation
├── QUICKSTART.md        ✅ Setup Guide
└── DEPLOYMENT.md        ✅ Deploy Guide
```

## 🐛 Troubleshooting

**Problem: Can't connect to database**
- Solution: Check MySQL is running and password in `backend/.env` is correct

**Problem: Products not showing**
- Solution: Run `cd backend && npm run seed`

**Problem: Frontend errors**
- Solution: Make sure backend is running on port 5000 first

**Problem: Port already in use**
- Solution: Close other apps using port 3000 or 5000

## 📞 Need Help?

Check these files:
- `README.md` - Full documentation
- `QUICKSTART.md` - Detailed setup
- `DEPLOYMENT.md` - Deploy to cloud

## 🎓 Ready for Submission?

Follow: `SUBMISSION_CHECKLIST.md`

1. ✅ Test all features locally
2. ✅ Push to GitHub (make PUBLIC)
3. ✅ Deploy to Vercel + Railway
4. ✅ Submit both links

---

**Status: ✅ PROJECT COMPLETE & READY TO RUN**

Just follow the 3 steps above and you're good to go! 🚀
