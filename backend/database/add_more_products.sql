-- Add more products to amazon_clone database
USE amazon_clone;

-- Electronics (10 more products)
INSERT INTO products (name, description, price, category, stock_quantity, rating, image_urls) VALUES
('Apple AirPods Pro', 'Active Noise Cancellation, Transparency mode, Spatial audio with dynamic head tracking', 249.99, 'Electronics', 45, 4.8, '["https://images.unsplash.com/photo-1606841837735-259c572a52a8?w=500"]'),
('Samsung Galaxy Watch 6', 'Advanced health monitoring, fitness tracking, sleep coaching', 299.99, 'Electronics', 30, 4.6, '["https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=500"]'),
('Sony WH-1000XM5 Headphones', 'Industry-leading noise cancellation, 30-hour battery life', 399.99, 'Electronics', 25, 4.9, '["https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=500"]'),
('Canon EOS R6 Camera', 'Full-frame mirrorless camera, 20MP, 4K video recording', 2499.99, 'Electronics', 10, 4.9, '["https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500"]'),
('LG 55" OLED TV', '4K Ultra HD Smart OLED TV with AI ThinQ', 1299.99, 'Electronics', 15, 4.7, '["https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=500"]'),
('Dyson V15 Vacuum', 'Laser detect technology, whole-machine filtration', 749.99, 'Electronics', 20, 4.8, '["https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500"]'),
('Bose SoundLink Speaker', 'Portable Bluetooth speaker, 12-hour battery', 129.99, 'Electronics', 50, 4.5, '["https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500"]'),
('GoPro HERO12', 'Waterproof action camera, 5.3K video, HyperSmooth stabilization', 399.99, 'Electronics', 35, 4.7, '["https://images.unsplash.com/photo-1564466809058-bf4114d55352?w=500"]'),
('Logitech MX Master 3S', 'Wireless mouse, ergonomic design, 8K DPI tracking', 99.99, 'Electronics', 60, 4.8, '["https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500"]'),
('Anker PowerCore 26800', 'High-capacity portable charger, fast charging', 65.99, 'Electronics', 100, 4.6, '["https://images.unsplash.com/photo-1609091839311-d5365f9c15c5?w=500"]');

-- Books (10 more products)
INSERT INTO products (name, description, price, category, stock_quantity, rating, image_urls) VALUES
('Atomic Habits by James Clear', 'Tiny Changes, Remarkable Results - Build good habits and break bad ones', 16.99, 'Books', 200, 4.9, '["https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500"]'),
('The Psychology of Money', 'Timeless lessons on wealth, greed, and happiness by Morgan Housel', 18.99, 'Books', 180, 4.8, '["https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=500"]'),
('Think and Grow Rich', 'The landmark bestseller by Napoleon Hill on personal success', 12.99, 'Books', 250, 4.7, '["https://images.unsplash.com/photo-1512820790803-83ca734da794?w=500"]'),
('The 7 Habits of Highly Effective People', 'Powerful lessons in personal change by Stephen R. Covey', 15.99, 'Books', 220, 4.8, '["https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=500"]'),
('Sapiens by Yuval Noah Harari', 'A Brief History of Humankind - Explore the history of our species', 22.99, 'Books', 150, 4.8, '["https://images.unsplash.com/photo-1541963463532-d68292c34b19?w=500"]'),
('Educated: A Memoir', 'A memoir by Tara Westover about education and transformation', 14.99, 'Books', 170, 4.7, '["https://images.unsplash.com/photo-1519682337058-a94d519337bc?w=500"]'),
('The Alchemist by Paulo Coelho', 'A philosophical novel about following your dreams', 13.99, 'Books', 300, 4.7, '["https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500"]'),
('Becoming by Michelle Obama', 'An intimate memoir by the former First Lady', 19.99, 'Books', 140, 4.9, '["https://images.unsplash.com/photo-1532012197267-da84d127e765?w=500"]'),
('Rich Dad Poor Dad', 'What the Rich Teach Their Kids About Money by Robert Kiyosaki', 11.99, 'Books', 280, 4.6, '["https://images.unsplash.com/photo-1553729459-afe8f2e2ed08?w=500"]'),
('The Subtle Art of Not Giving a F*ck', 'A counterintuitive approach to living a good life by Mark Manson', 17.99, 'Books', 190, 4.6, '["https://images.unsplash.com/photo-1512820790803-83ca734da794?w=500"]');

-- Home & Kitchen (10 more products)
INSERT INTO products (name, description, price, category, stock_quantity, rating, image_urls) VALUES
('Instant Pot Duo 7-in-1', 'Pressure cooker, slow cooker, rice cooker, steamer, sauté, yogurt maker', 89.99, 'Home & Kitchen', 55, 4.8, '["https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=500"]'),
('Ninja Air Fryer', '4-quart capacity, air fry, roast, reheat, dehydrate', 119.99, 'Home & Kitchen', 40, 4.7, '["https://images.unsplash.com/photo-1626147116986-46017a5e2d58?w=500"]'),
('KitchenAid Stand Mixer', '5-quart tilt-head stand mixer with 10 speeds', 379.99, 'Home & Kitchen', 25, 4.9, '["https://images.unsplash.com/photo-1594385208974-2e75f8d2bb48?w=500"]'),
('Keurig Coffee Maker', 'Single serve K-Cup pod coffee maker, brews multiple cup sizes', 129.99, 'Home & Kitchen', 45, 4.6, '["https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=500"]'),
('Cuisinart Food Processor', '14-cup food processor with stainless steel blades', 199.99, 'Home & Kitchen', 30, 4.7, '["https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?w=500"]'),
('Le Creuset Dutch Oven', '5.5-quart enameled cast iron dutch oven, multiple colors', 349.99, 'Home & Kitchen', 20, 4.9, '["https://images.unsplash.com/photo-1584990347449-a2d4c2c044c9?w=500"]'),
('iRobot Roomba', 'Robot vacuum with smart mapping, works with Alexa', 399.99, 'Home & Kitchen', 35, 4.5, '["https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500"]'),
('Dyson Purifier Cool', 'Air purifier and fan, removes allergens and pollutants', 549.99, 'Home & Kitchen', 15, 4.7, '["https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=500"]'),
('Weber Grill', 'Gas grill with 3 burners, 521 square inches cooking space', 449.99, 'Home & Kitchen', 18, 4.8, '["https://images.unsplash.com/photo-1556909114-44e3e70034e2?w=500"]'),
('Breville Espresso Machine', 'Barista-quality espresso at home, built-in grinder', 699.99, 'Home & Kitchen', 12, 4.8, '["https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=500"]');

-- Fashion (10 more products)
INSERT INTO products (name, description, price, category, stock_quantity, rating, image_urls) VALUES
('Levi 501 Original Jeans', 'Classic straight fit jeans, 100% cotton denim', 59.99, 'Fashion', 150, 4.7, '["https://images.unsplash.com/photo-1542272604-787c3835535d?w=500"]'),
('Nike Air Max 270', 'Comfortable running shoes with Max Air unit', 150.00, 'Fashion', 80, 4.6, '["https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500"]'),
('Adidas Ultraboost', 'Responsive running shoes with Boost cushioning', 180.00, 'Fashion', 70, 4.8, '["https://images.unsplash.com/photo-1587563871167-1ee9c731aefb?w=500"]'),
('Ray-Ban Aviator Sunglasses', 'Classic aviator style with polarized lenses', 154.00, 'Fashion', 100, 4.7, '["https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500"]'),
('Fossil Leather Watch', 'Minimalist stainless steel watch with genuine leather strap', 135.00, 'Fashion', 60, 4.5, '["https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=500"]'),
('Coach Crossbody Bag', 'Pebble leather crossbody bag with adjustable strap', 295.00, 'Fashion', 40, 4.8, '["https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=500"]'),
('The North Face Jacket', 'Waterproof rain jacket with hood, packable design', 99.00, 'Fashion', 75, 4.7, '["https://images.unsplash.com/photo-1544923246-77307dd270b5?w=500"]'),
('Calvin Klein Dress Shirt', 'Slim fit non-iron dress shirt, 100% cotton', 69.50, 'Fashion', 120, 4.5, '["https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=500"]'),
('New Balance 990v5', 'Premium made in USA running shoes', 184.99, 'Fashion', 50, 4.9, '["https://images.unsplash.com/photo-1539185441755-769473a23570?w=500"]'),
('Patagonia Backpack', '25L daypack for hiking and everyday use', 99.00, 'Fashion', 65, 4.7, '["https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500"]');

-- Sports (10 more products)
INSERT INTO products (name, description, price, category, stock_quantity, rating, image_urls) VALUES
('Peloton Bike+', 'Indoor cycling bike with 23.8" HD touchscreen', 2495.00, 'Sports', 8, 4.8, '["https://images.unsplash.com/photo-1598289431512-b97b0917affc?w=500"]'),
('Yeti Rambler Tumbler', '30oz insulated stainless steel tumbler with lid', 38.00, 'Sports', 200, 4.9, '["https://images.unsplash.com/photo-1610824352934-c10c1f9b1b3c?w=500"]'),
('Manduka Yoga Mat', 'Professional-grade yoga mat, 6mm thick', 120.00, 'Sports', 90, 4.8, '["https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=500"]'),
('Bowflex Adjustable Dumbbells', 'Adjustable from 5 to 52.5 lbs per dumbbell', 349.00, 'Sports', 25, 4.7, '["https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=500"]'),
('TRX Suspension Trainer', 'Full-body resistance training system', 169.95, 'Sports', 55, 4.6, '["https://images.unsplash.com/photo-1598289431512-b97b0917affc?w=500"]'),
('Garmin Forerunner 265', 'GPS running smartwatch with AMOLED display', 449.99, 'Sports', 30, 4.8, '["https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=500"]'),
('Under Armour Compression Shirt', 'HeatGear fitted compression shirt for training', 39.99, 'Sports', 150, 4.5, '["https://images.unsplash.com/photo-1571945153237-4929e783af4a?w=500"]'),
('Wilson Tennis Racket', 'Pro staff RF97 autograph tennis racket', 249.00, 'Sports', 20, 4.9, '["https://images.unsplash.com/photo-1617083934551-ac1f1c240d9b?w=500"]'),
('Spalding Basketball', 'Official size and weight indoor/outdoor basketball', 29.99, 'Sports', 180, 4.6, '["https://images.unsplash.com/photo-1519861531473-9200262188bf?w=500"]'),
('Coleman Camping Tent', '6-person dome tent with WeatherTec system', 149.99, 'Sports', 40, 4.5, '["https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=500"]');
