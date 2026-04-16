'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { productAPI } from '@/lib/api';
import ProductCard from '@/components/ProductCard';
import { CATEGORIES } from '@/lib/constants';

function ProductList() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const search = searchParams.get('search') || '';
  const categoryParam = searchParams.get('category') || '';

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState(categoryParam);
  const [loading, setLoading] = useState(true);

  // Update selectedCategory when URL changes
  useEffect(() => {
    setSelectedCategory(categoryParam);
  }, [categoryParam]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [productsRes, categoriesRes] = await Promise.all([
          productAPI.getAll(search, selectedCategory),
          productAPI.getCategories()
        ]);
        setProducts(productsRes.data);
        setCategories(categoriesRes.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [search, selectedCategory]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Hero Banner */}
      {!search && !selectedCategory && (
        <div className="bg-gradient-to-r from-amazon-light to-amazon-dark text-white p-8 rounded-lg mb-6">
          <h1 className="text-4xl font-bold mb-2">Welcome to Amazon.clone</h1>
          <p className="text-lg">Discover amazing products at great prices</p>
        </div>
      )}

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg mb-6 border border-gray-200">
        <div className="flex items-center gap-4 flex-wrap">
          <span className="font-bold">Filter by:</span>
          <select
            value={selectedCategory}
            onChange={(e) => {
              const newCategory = e.target.value;
              setSelectedCategory(newCategory);
              // Update URL
              const params = new URLSearchParams();
              if (search) params.set('search', search);
              if (newCategory) params.set('category', newCategory);
              router.push(`/?${params.toString()}`);
            }}
            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-amazon-orange"
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          {(search || selectedCategory) && (
            <span className="text-sm text-gray-600">
              {products.length} product{products.length !== 1 ? 's' : ''} found
              {search && ` for "${search}"`}
              {selectedCategory && ` in ${selectedCategory}`}
            </span>
          )}
        </div>
      </div>

      {/* Products Grid */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="spinner"></div>
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-lg border border-gray-200">
          <h2 className="text-2xl font-bold mb-2">No products found</h2>
          <p className="text-gray-600">Try adjusting your search or filter criteria</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product: any) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function HomePage() {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center h-64">
          <div className="spinner"></div>
        </div>
      }
    >
      <ProductList />
    </Suspense>
  );
}
