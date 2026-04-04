import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import CategoryPills from '@/components/products/CategoryPills';
import ProductsGrid from '@/components/products/ProductsGrid';
import { categories, products } from '@/data/products';

const HERO_VARIANTS = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const, staggerChildren: 0.15 }
  }
};

const ITEM_VARIANTS = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const } }
};

const ProductsPage = () => {
  const [activeCategory, setActiveCategory] = useState('all');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const filteredProducts = activeCategory === 'all'
    ? products
    : products.filter(product => product.category === activeCategory);

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
  };

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden transition-colors duration-300">
      
      {/* Background Lighting */}
      <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-primary/10 blur-[150px] rounded-full pointer-events-none opacity-50 dark:opacity-30" />
      <div className="absolute top-[60%] right-0 translate-x-1/4 w-[600px] h-[400px] bg-foreground/5 blur-[120px] rounded-full pointer-events-none" />

      {/* Hero Section */}
      <section className="pt-40 pb-20 relative z-10">
        <div className="container mx-auto px-6">
          <motion.div 
            className="max-w-4xl mx-auto text-center"
            variants={HERO_VARIANTS}
            initial="hidden"
            animate="visible"
          >
            <motion.h3 variants={ITEM_VARIANTS} className="text-sm font-semibold tracking-widest uppercase text-muted-foreground mb-4">
              Our Products
            </motion.h3>
            <motion.h1 variants={ITEM_VARIANTS} className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.1] mb-6">
              Transforming <span className="text-transparent bg-clip-text bg-gradient-to-r from-foreground to-muted-foreground">ideas</span><br />
              into digital reality.
            </motion.h1>
            <motion.p variants={ITEM_VARIANTS} className="text-lg md:text-xl text-muted-foreground font-light max-w-2xl mx-auto">
              Explore our portfolio of innovative solutions and successful projects engineered for total scale.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Grid Section */}
      <section className="pb-32 relative z-10">
        <div className="container mx-auto px-6">
           <div className="flex flex-col gap-16">
              
              {/* Animated Category Pills */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <CategoryPills
                  categories={categories}
                  activeCategory={activeCategory}
                  onCategoryChange={handleCategoryChange}
                />
              </motion.div>

              {/* Grid Content */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.6 }}
              >
                <ProductsGrid products={filteredProducts} itemsPerPage={9} />
              </motion.div>
           </div>
        </div>
      </section>

    </div>
  );
};

export default ProductsPage;
