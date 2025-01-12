import React from 'react';
import { Product } from '@/types/products';

interface FeaturedProductsProps {
  products: Product[];
}

const FeaturedProducts: React.FC<FeaturedProductsProps> = ({ products }) => {
  return (
    <section className="py-24 bg-primary/5">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold mb-12 text-center animate-fade-in">
          Featured Solutions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {products.slice(0, 2).map((product, index) => (
            <div 
              key={product.id}
              className="group relative overflow-hidden rounded-lg bg-white p-8 shadow-lg transition-all duration-500 hover:shadow-xl animate-fade-in hover:-translate-y-1"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <p className="text-sm text-primary">{product.category.toUpperCase()}</p>
                  {product.status === 'ongoing' && (
                    <span className="inline-block w-2 h-2 rounded-full bg-primary animate-pulse" />
                  )}
                </div>
                <h3 className="text-2xl font-bold mb-3">{product.name}</h3>
                <p className="text-muted-foreground mb-4">{product.description}</p>
                {product.technologies && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {product.technologies.map((tech, i) => (
                      <span 
                        key={i}
                        className="text-xs px-2 py-1 bg-primary/10 rounded-full text-primary"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              <button className="text-primary font-medium group-hover:underline inline-flex items-center gap-2">
                Learn more
                <span className="transform transition-transform group-hover:translate-x-1">→</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts; 