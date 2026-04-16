# Amazon Clone - E-Commerce Platform

A full-stack e-commerce web application that closely replicates Amazon's design and user experience, built for the SDE Intern Fullstack Assignment.

## 🚀 Tech Stack

### Frontend
- **Framework**: Next.js 14 (React with App Router)
- **Styling**: Tailwind CSS
- **State Management**: React Context API
- **HTTP Client**: Fetch API
- **Icons**: React Icons
- **Language**: TypeScript

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MySQL
- **Database Driver**: mysql2
- **Language**: JavaScript

## 📋 Prerequisites

- Node.js (v18 or higher)
- MySQL (v8.0 or higher)
- npm or yarn package manager

## 🛠️ Installation & Setup

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd Amazon
```

### 2. Database Setup

1. **Create MySQL Database and Tables**

```bash
# Login to MySQL
mysql -u root -p

# Run the schema file
source backend/database/schema.sql
```

Alternatively, you can manually execute the SQL commands in `backend/database/schema.sql`

2. **Configure Backend Environment Variables**

```bash
cd backend
cp .env.example .env
```

Edit `.env` with your MySQL credentials:

```env
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=amazon_clone
DB_PORT=3306
```

3. **Install Backend Dependencies**

```bash
cd backend
npm install
```

4. **Seed the Database with Sample Products**

```bash
npm run seed
```

This will add 25+ sample products across 5 categories:
- Electronics (6 products)
- Books (5 products)
- Home & Kitchen (5 products)
- Fashion (5 products)
- Sports (5 products)

### 3. Frontend Setup

```bash
cd ../frontend
npm install
```

### 4. Run the Application

**Start Backend Server** (Terminal 1):

```bash
cd backend
npm run dev
```

The backend will run on `http://localhost:5000`

**Start Frontend Server** (Terminal 2):

```bash
cd frontend
npm run dev
```

The frontend will run on `http://localhost:3000`

## 🎯 Features

### Core Features (Implemented)

1. **Product Listing Page**
   - Grid layout matching Amazon's design
   - Product cards with image, name, price, and Add to Cart button
   - Search functionality to find products by name
   - Filter products by category
   - Responsive design (mobile, tablet, desktop)

2. **Product Detail Page**
   - Image carousel with multiple product images
   - Product description and specifications
   - Price and stock availability status
   - Add to Cart and Buy Now buttons
   - Breadcrumb navigation

3. **Shopping Cart**
   - View all items added to cart
   - Update product quantity (+/-)
   - Remove items from cart
   - Cart summary with subtotal and total amount
   - Proceed to checkout

4. **Order Placement**
   - Checkout page with shipping address form
   - Order summary review (subtotal, shipping, tax, total)
   - Place order functionality
   - Order confirmation page with order ID

### Good to Have (Bonus Features)

- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Amazon-like UI patterns and color scheme
- ✅ Loading states and error handling
- ✅ Stock quantity management

## 📊 Database Schema

### Tables

1. **products** - Stores product information
   - Fields: id, name, description, price, category, stock_quantity, rating, image_urls, timestamps

2. **carts** - User shopping carts
   - Fields: id, user_id, timestamps

3. **cart_items** - Items in each cart
   - Fields: id, cart_id, product_id, quantity, timestamps

4. **orders** - Customer orders
   - Fields: id, user_id, total_amount, shipping_address, status, timestamps

5. **order_items** - Items in each order
   - Fields: id, order_id, product_id, quantity, price, timestamps

## 🔌 API Endpoints

### Products
- `GET /api/products` - Get all products (with optional `?search=` and `?category=` filters)
- `GET /api/products/:id` - Get single product by ID
- `GET /api/products/categories` - Get all categories

### Cart
- `GET /api/cart` - Get user's cart
- `POST /api/cart/items` - Add item to cart (body: `{ product_id, quantity }`)
- `PUT /api/cart/items/:product_id` - Update cart item quantity (body: `{ quantity }`)
- `DELETE /api/cart/items/:product_id` - Remove item from cart

### Orders
- `POST /api/orders` - Create new order (body: `{ shipping_address }`)
- `GET /api/orders/:id` - Get order by ID
- `GET /api/orders` - Get all orders for user

## 📁 Project Structure

```
Amazon/
├── backend/                 # Express.js backend
│   ├── src/
│   │   ├── config/         # Database configuration
│   │   ├── controllers/    # Request handlers
│   │   ├── models/         # Database models
│   │   ├── routes/         # API routes
│   │   ├── middleware/     # Custom middleware
│   │   ├── utils/          # Helper functions (seed script)
│   │   └── app.js          # Express app setup
│   ├── database/
│   │   └── schema.sql      # Database schema
│   ├── package.json
│   └── .env
│
└── frontend/               # Next.js frontend
    ├── src/
    │   ├── app/            # Next.js App Router pages
    │   │   ├── layout.tsx  # Root layout
    │   │   ├── page.tsx    # Home/Product listing
    │   │   ├── product/[id]/  # Product detail
    │   │   ├── cart/       # Shopping cart
    │   │   ├── checkout/   # Checkout flow
    │   │   └── order-confirmation/[id]/  # Order confirmation
    │   ├── components/     # Reusable UI components
    │   │   ├── Header.tsx
    │   │   ├── Footer.tsx
    │   │   ├── ProductCard.tsx
    │   │   └── ImageCarousel.tsx
    │   ├── context/        # React Context (Cart)
    │   └── lib/            # API utilities and constants
    ├── public/             # Static assets
    ├── package.json
    └── tailwind.config.js
```

## 🎨 UI Design

The application closely follows Amazon's design patterns:

- **Color Scheme**:
  - Header: Dark navy (#131921)
  - Buttons: Amazon yellow (#ffd814)
  - Links: Amazon blue (#007185)
  - Search button: Amazon orange (#febd69)

- **Layout Patterns**:
  - Product grid with responsive cards
  - Left-aligned items, right-aligned summary in cart
  - Breadcrumb navigation on product pages
  - Star ratings display

## 🔒 Assumptions Made

1. **Default User**: User ID is hardcoded to 1 (no authentication required per assignment specs)
2. **Images**: Using Unsplash images for product photos
3. **Tax Rate**: Fixed at 8% for simplicity
4. **Shipping**: Flat rate of $5.99
5. **Cart Persistence**: Cart is stored in database and synced on page load

## 🚀 Deployment

### Frontend (Vercel)

```bash
cd frontend
npm run build
# Deploy to Vercel
vercel
```

### Backend (Railway/Render)

1. Create a new project on Railway or Render
2. Connect your GitHub repository
3. Set environment variables (DB credentials)
4. Deploy

**Important**: Update `NEXT_PUBLIC_API_URL` in frontend to point to your deployed backend URL.

## 📝 Development Notes

- All TypeScript errors will resolve after running `npm install` in both frontend and backend directories
- The application uses modern React patterns including hooks and context API
- Database queries use parameterized statements to prevent SQL injection
- Transaction management for order creation ensures data consistency

## 🐛 Troubleshooting

**Backend won't start:**
- Ensure MySQL is running
- Check `.env` file has correct database credentials
- Run `npm install` in backend directory

**Frontend won't start:**
- Run `npm install` in frontend directory
- Ensure backend is running on port 5000
- Check browser console for CORS errors

**Database seeding fails:**
- Ensure database schema is created first
- Check MySQL connection in `.env`

## 👨‍💻 Author

SDE Intern Assignment - Amazon Clone

## 📄 License

This project is created for educational purposes as part of an SDE Intern assignment.
