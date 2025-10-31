import React, { useEffect, useState } from 'react';
import CategorySidebar from '@/components/products/CategorySidebar';
import ProductsGrid from '@/components/products/ProductsGrid';
import FeaturedProducts from '@/components/products/FeaturedProducts';
import { Product } from '@/types/products';
import { productsApi } from '@/utils/api';
import { Loader2 } from 'lucide-react';

const ProductsPage = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeCategory, setActiveCategory] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [productsData, categoriesData] = await Promise.all([
          productsApi.getAll(),
          productsApi.getCategories()
        ]);
        setProducts(productsData);
        setCategories(categoriesData.categories);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch products');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight - windowHeight;
      const scrolled = window.scrollY;
      const progress = (scrolled / documentHeight) * 100;
      setScrollProgress(Math.min(progress, 100));
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const filteredProducts = activeCategory === 'all' 
    ? products 
    : products.filter(product => product.category === activeCategory);

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    setShowFilters(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-500 mb-2">Error</h2>
          <p className="text-muted-foreground">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="products-page">
      {/* Progress Bar */}
      <div 
        className="fixed top-0 left-0 h-1 bg-primary z-50 transition-all duration-300"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Hero Section */}
      <section className="py-32 bg-background relative overflow-hidden">
        <div className="container mx-auto relative z-10">
          <div className="max-w-3xl">
            <h3 className="text-lg text-primary mb-4 animate-fade-in">LATEST WORKS</h3>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in delay-200">
              Transforming ideas into<br />digital reality.
            </h1>
            <p className="text-xl text-muted-foreground animate-fade-in delay-300">
              Explore our portfolio of innovative solutions and successful projects.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Works Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto">
          <div className="mb-16">
            <h3 className="text-lg text-primary mb-4 animate-fade-in">FEATURED WORKS</h3>
            <h2 className="text-4xl md:text-5xl font-bold animate-fade-in delay-200">
              Elevating businesses<br />to new heights.
            </h2>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            <CategorySidebar
              categories={categories}
              activeCategory={activeCategory}
              totalProducts={products.length}
              onCategoryChange={handleCategoryChange}
              showFilters={showFilters}
              onToggleFilters={() => setShowFilters(!showFilters)}
            />

            <div className="lg:w-3/4">
              <ProductsGrid products={filteredProducts} />
            </div>
          </div>
        </div>
      </section>

      <FeaturedProducts products={products} />
    </div>
  );
};

export default ProductsPage; 