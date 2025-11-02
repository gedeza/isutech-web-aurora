import React, { useEffect, useState } from 'react';
import CategorySidebar from '@/components/products/CategorySidebar';
import ProductsGrid from '@/components/products/ProductsGrid';
import FeaturedProducts from '@/components/products/FeaturedProducts';
import { Product } from '@/types/products';
import { productsApi } from '@/utils/api';
import { Loader2 } from 'lucide-react';

// Fallback products data
const FALLBACK_PRODUCTS: Product[] = [
  {
    _id: '1',
    name: 'AutoSlip Digital Onboarding',
    slug: 'autoslip-digital-onboarding',
    description: 'Streamline your customer onboarding with our digital solution',
    shortDescription: 'Digital onboarding platform for modern businesses',
    category: 'Software Solutions',
    price: 'Custom Pricing',
    status: 'Active',
    images: ['/images/products/autoslip.jpg'],
    technologies: ['React', 'Node.js', 'MongoDB'],
    client: 'Various',
    year: '2024',
    createdBy: 'ISU Technologies',
    lastUpdated: new Date().toISOString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

const FALLBACK_CATEGORIES = ['Software Solutions', 'AI Solutions', 'Government Solutions'];

const ProductsPage = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeCategory, setActiveCategory] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [products, setProducts] = useState<Product[]>(FALLBACK_PRODUCTS);
  const [categories, setCategories] = useState<string[]>(FALLBACK_CATEGORIES);
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
        // Use fallback data instead of showing error
        console.log('Using fallback products data:', err instanceof Error ? err.message : 'Failed to fetch');
        setProducts(FALLBACK_PRODUCTS);
        setCategories(FALLBACK_CATEGORIES);
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