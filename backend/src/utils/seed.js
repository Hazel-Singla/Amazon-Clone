const db = require('../config/database');

const products = [
  // Electronics
  {
    name: 'Apple MacBook Pro 14-inch with M3 Chip',
    description: 'Supercharged by M3 chip, 14-inch Retina display, 8GB RAM, 512GB SSD. Perfect for professionals and creatives.',
    price: 132799.17,
    category: 'Electronics',
    brand: 'Apple',
    stock: 25,
    rating: 4.8,
    images: [
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500',
      'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=500'
    ]
  },
  {
    name: 'Sony WH-1000XM5 Wireless Noise Cancelling Headphones',
    description: 'Industry-leading noise cancellation, 30-hour battery life, premium sound quality with LDAC support.',
    price: 29049.17,
    category: 'Electronics',
    brand: 'Sony',
    stock: 50,
    rating: 4.7,
    images: [
      'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=500',
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500'
    ]
  },
  {
    name: 'Samsung 65-inch QLED 4K Smart TV',
    description: 'Quantum HDR, Alexa built-in, Object Tracking Sound, Gaming Hub. Experience stunning picture quality.',
    price: 74699.17,
    category: 'Electronics',
    brand: 'Samsung',
    stock: 15,
    rating: 4.6,
    images: [
      'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=500',
      'https://images.unsplash.com/photo-1461151304267-38535e780c79?w=500'
    ]
  },
  {
    name: 'iPhone 15 Pro Max 256GB',
    description: 'Titanium design, A17 Pro chip, 48MP camera system, USB-C, Action button. The most powerful iPhone.',
    price: 99599.17,
    category: 'Electronics',
    brand: 'Apple',
    stock: 30,
    rating: 4.9,
    images: [
      'https://images.unsplash.com/photo-1592286927505-4d325b9d3f5a?w=500',
      'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=500'
    ]
  },
  {
    name: 'Canon EOS R6 Mark II Mirrorless Camera',
    description: '24.2MP Full-Frame CMOS sensor, 4K 60p video, advanced autofocus, up to 40 fps electronic shutter.',
    price: 207499.17,
    category: 'Electronics',
    brand: 'Canon',
    stock: 10,
    rating: 4.8,
    images: [
      'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500',
      'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=500'
    ]
  },
  {
    name: 'iPad Air 5th Generation 256GB',
    description: 'M1 chip, 10.9-inch Liquid Retina display, Touch ID, all-day battery life. Perfect for work and play.',
    price: 62249.17,
    category: 'Electronics',
    brand: 'Apple',
    stock: 40,
    rating: 4.7,
    images: [
      'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500',
      'https://images.unsplash.com/photo-1561157875-26a1682896b7?w=500'
    ]
  },
  
  // Books
  {
    name: 'Atomic Habits by James Clear',
    description: 'An Easy & Proven Way to Build Good Habits & Break Bad Ones. Transform your life with tiny changes.',
    price: 1410.17,
    category: 'Books',
    brand: 'Publisher',
    stock: 100,
    rating: 4.8,
    images: [
      'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500',
      'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=500'
    ]
  },
  {
    name: 'The Psychology of Money by Morgan Housel',
    description: 'Timeless lessons on wealth, greed, and happiness. Doing well with money isn\'t necessarily about what you know.',
    price: 1576.17,
    category: 'Books',
    brand: 'Publisher',
    stock: 85,
    rating: 4.7,
    images: [
      'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=500',
      'https://images.unsplash.com/photo-1524578271613-d550eacf6090?w=500'
    ]
  },
  {
    name: 'Project Hail Mary: A Novel by Andy Weir',
    description: 'A lone astronaut must save the earth from disaster in this incredible new science-based thriller.',
    price: 1244.17,
    category: 'Books',
    brand: 'Publisher',
    stock: 75,
    rating: 4.9,
    images: [
      'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=500',
      'https://images.unsplash.com/photo-1541963463532-d68292c34b19?w=500'
    ]
  },
  {
    name: 'Thinking, Fast and Slow by Daniel Kahneman',
    description: 'Nobel Prize winner explores the two systems that drive the way we think and make choices.',
    price: 1327.17,
    category: 'Books',
    brand: 'Publisher',
    stock: 60,
    rating: 4.6,
    images: [
      'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=500',
      'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500'
    ]
  },
  {
    name: 'The Lean Startup by Eric Ries',
    description: 'How Today\'s Entrepreneurs Use Continuous Innovation to Create Radically Successful Businesses.',
    price: 1493.17,
    category: 'Books',
    brand: 'Publisher',
    stock: 70,
    rating: 4.5,
    images: [
      'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=500',
      'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=500'
    ]
  },
  
  // Home & Kitchen
  {
    name: 'Instant Pot Duo 7-in-1 Electric Pressure Cooker',
    description: '6 Quart, 7-in-1 functionality: pressure cooker, slow cooker, rice cooker, steamer, sauté, yogurt maker & warmer.',
    price: 7469.17,
    category: 'Home & Kitchen',
    brand: 'Instant Pot',
    stock: 45,
    rating: 4.7,
    images: [
      'https://images.unsplash.com/photo-1556911220-bff31c812dba?w=500',
      'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=500'
    ]
  },
  {
    name: 'Dyson V15 Detect Cordless Vacuum Cleaner',
    description: 'Laser reveals hidden dust, piezo sensor counts particles, LCD screen shows real-time performance.',
    price: 53949.17,
    category: 'Home & Kitchen',
    brand: 'Dyson',
    stock: 20,
    rating: 4.8,
    images: [
      'https://images.unsplash.com/photo-1558317374-067fb5f30001?w=500',
      'https://images.unsplash.com/photo-1527515637462-cff94eebd24f?w=500'
    ]
  },
  {
    name: 'KitchenAid Artisan Stand Mixer 5-Quart',
    description: '10-speed slide control, includes flat beater, dough hook & wire whip. Perfect for baking enthusiasts.',
    price: 31539.17,
    category: 'Home & Kitchen',
    brand: 'KitchenAid',
    stock: 30,
    rating: 4.9,
    images: [
      'https://images.unsplash.com/photo-1594385208974-2e75f8d3dda8?w=500',
      'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=500'
    ]
  },
  {
    name: 'Ninja Air Fryer Max XL',
    description: '5.5-Quart capacity, Max Crisp Technology, 7 functions including air fry, roast, reheat & dehydrate.',
    price: 9959.17,
    category: 'Home & Kitchen',
    brand: 'Ninja',
    stock: 55,
    rating: 4.6,
    images: [
      'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=500',
      'https://images.unsplash.com/photo-1585515320310-259814833e62?w=500'
    ]
  },
  {
    name: 'iRobot Roomba j7+ Self-Emptying Robot Vacuum',
    description: 'Identifies and avoids obstacles, smart mapping, Alexa compatible, auto-empty base holds 60 days of debris.',
    price: 49799.17,
    category: 'Home & Kitchen',
    brand: 'iRobot',
    stock: 25,
    rating: 4.5,
    images: [
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500',
      'https://images.unsplash.com/photo-1518640467707-6811f4a6ab73?w=500'
    ]
  },
  
  // Fashion
  {
    name: 'Levi\'s 501 Original Fit Jeans',
    description: 'The iconic straight fit jeans that started it all. Sits at waist, classic straight leg, button fly.',
    price: 5809.17,
    category: 'Fashion',
    brand: "Levi's",
    stock: 120,
    rating: 4.5,
    images: [
      'https://images.unsplash.com/photo-1542272604-787c3835535d?w=500',
      'https://images.unsplash.com/photo-1582552938357-32b906df40cb?w=500'
    ]
  },
  {
    name: 'Nike Air Max 270 Running Shoes',
    description: 'Large Max Air unit for all-day comfort, breathable mesh upper, foam midsole for responsive cushioning.',
    price: 12449.17,
    category: 'Fashion',
    brand: 'Nike',
    stock: 80,
    rating: 4.6,
    images: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500',
      'https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=500'
    ]
  },
  {
    name: 'North Face Thermoball Eco Jacket',
    description: 'Lightweight, warm insulation even when wet. Packable design with recycled materials. Water-resistant.',
    price: 19089.17,
    category: 'Fashion',
    brand: 'The North Face',
    stock: 40,
    rating: 4.7,
    images: [
      'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=500',
      'https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=500'
    ]
  },
  {
    name: 'Ray-Ban Aviator Classic Sunglasses',
    description: 'Crystal lenses with 100% UV protection, metal frame, adjustable nose pads. Iconic aviator style.',
    price: 12864.17,
    category: 'Fashion',
    brand: 'Ray-Ban',
    stock: 65,
    rating: 4.8,
    images: [
      'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500',
      'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=500'
    ]
  },
  {
    name: 'Fossil Gen 6 Smartwatch',
    description: 'Wear OS by Google, heart rate tracker, GPS, NFC, smartphone notifications. Classic design meets modern tech.',
    price: 21579.17,
    category: 'Fashion',
    brand: 'Fossil',
    stock: 35,
    rating: 4.4,
    images: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500',
      'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=500'
    ]
  },
  
  // Sports
  {
    name: 'Yeti Rambler 36 oz Bottle with Chug Cap',
    description: 'Double-wall vacuum insulation, dishwasher safe, durable 18/8 stainless steel. Keeps drinks cold or hot.',
    price: 3817.17,
    category: 'Sports',
    brand: 'Yeti',
    stock: 90,
    rating: 4.8,
    images: [
      'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500',
      'https://images.unsplash.com/photo-1560008581-09826d1de69e?w=500'
    ]
  },
  {
    name: 'Manduka PRO Yoga Mat',
    description: '6mm thick, superior cushioning, high-density surface, lifetime guarantee. Non-slip, closed-cell surface.',
    price: 10789.17,
    category: 'Sports',
    brand: 'Manduka',
    stock: 50,
    rating: 4.7,
    images: [
      'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=500',
      'https://images.unsplash.com/photo-1592432678016-e91106cb7887?w=500'
    ]
  },
  {
    name: 'Bowflex SelectTech 552 Adjustable Dumbbells',
    description: 'Adjusts from 5 to 52.5 lbs, replaces 15 sets of weights, space-efficient design with dial system.',
    price: 33199.17,
    category: 'Sports',
    brand: 'Bowflex',
    stock: 20,
    rating: 4.8,
    images: [
      'https://images.unsplash.com/photo-1638536532686-d610adfc173e?w=500',
      'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=500'
    ]
  },
  {
    name: 'Garmin Forerunner 265 Running Smartwatch',
    description: 'AMOLED display, training readiness, race predictor, GPS, heart rate monitor, up to 13 days battery life.',
    price: 37349.17,
    category: 'Sports',
    brand: 'Garmin',
    stock: 30,
    rating: 4.7,
    images: [
      'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=500',
      'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=500'
    ]
  },
  {
    name: 'Coleman Sundome 4-Person Tent',
    description: 'Easy setup in 10 minutes, WeatherTec system, large windows for ventilation, fits 1 queen-size air bed.',
    price: 7469.17,
    category: 'Sports',
    brand: 'Coleman',
    stock: 45,
    rating: 4.5,
    images: [
      'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=500',
      'https://images.unsplash.com/photo-1478827536114-da961b7e8650?w=500'
    ]
  }
];

async function seedDatabase() {
  try {
    console.log('Starting database seed...');

    // Clear existing products
    await db.execute('DELETE FROM products');
    console.log('Cleared existing products');

    // Insert new products
    for (const product of products) {
      const [result] = await db.execute(
        'INSERT INTO products (name, description, price, category, brand, stock, rating, image, images, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())',
        [
          product.name,
          product.description,
          product.price,
          product.category,
          product.brand,
          product.stock,
          product.rating,
          product.images[0],
          JSON.stringify(product.images)
        ]
      );
      console.log(`Added: ${product.name} (ID: ${result.insertId})`);
    }

    console.log(`\nSeed completed successfully! Added ${products.length} products.`);
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
