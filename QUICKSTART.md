# Quick Start Guide

## Step 1: Setup MySQL Database

1. Make sure MySQL is running on your system
2. Open MySQL command line or Workbench
3. Run the following command:

```sql
source C:\Users\smrid\OneDrive\Desktop\Amazon\backend\database\schema.sql
```

Or manually copy and paste the contents of `backend/database/schema.sql` into MySQL.

## Step 2: Configure Backend

1. Open `backend/.env` file
2. Update the `DB_PASSWORD` with your MySQL password:

```
DB_PASSWORD=your_mysql_password
```

## Step 3: Seed Database with Sample Products

```bash
cd backend
npm run seed
```

You should see: "Seed completed successfully! Added 26 products."

## Step 4: Start Backend Server

```bash
cd backend
npm run dev
```

You should see:
```
Server is running on port 5000
API available at http://localhost:5000/api
```

## Step 5: Start Frontend Server

Open a NEW terminal and run:

```bash
cd frontend
npm run dev
```

You should see:
```
- Local:        http://localhost:3000
```

## Step 6: Open in Browser

Visit: http://localhost:3000

You should see the Amazon clone homepage with products!

## Testing the Application

1. **Browse Products**: Scroll through the product grid on the homepage
2. **Search**: Use the search bar to find products
3. **Filter**: Use the category dropdown to filter products
4. **View Product**: Click on any product to see details
5. **Add to Cart**: Click "Add to Cart" button
6. **View Cart**: Click the cart icon in the header
7. **Update Quantity**: Use + / - buttons in cart
8. **Checkout**: Click "Proceed to Checkout"
9. **Place Order**: Fill in the shipping form and place order
10. **Order Confirmation**: See your order details with Order ID

## Troubleshooting

**Can't connect to database?**
- Check MySQL is running
- Verify credentials in `backend/.env`

**Products not showing?**
- Run `npm run seed` in backend directory
- Check backend server is running on port 5000

**Frontend errors?**
- Make sure both backend and frontend servers are running
- Check browser console for errors

**CORS errors?**
- Backend should have CORS enabled by default
- Check backend terminal for any errors

## API Testing

You can test the API directly:

```bash
# Get all products
curl http://localhost:5000/api/products

# Get categories
curl http://localhost:5000/api/products/categories

# Health check
curl http://localhost:5000/api/health
```

## Next Steps

- Customize product images by updating URLs in `backend/src/utils/seed.js`
- Add more products to the seed file
- Modify styling in `frontend/src/app/globals.css`
- Deploy to production (see README.md)
