import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '@/types/products';

interface FeaturedProductsProps {
  products: Product[];
}

const FeaturedProducts: React.FC<FeaturedProductsProps> = ({ products }) => {
  // Get the latest 3 products with completed status
  const featuredProducts = products
    .filter(product => product.status === 'completed')
    .slice(0, 3);

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto">
        <div className="mb-16">
          <h3 className="text-lg text-primary mb-4 animate-fade-in">FEATURED PRODUCTS</h3>
          <h2 className="text-4xl md:text-5xl font-bold animate-fade-in delay-200">
            Our Latest<br />Innovations
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProducts.map((product) => (
            <Link
              key={product.id}
              to={`/products/${product.slug}`}
              className="group block"
            >
              <div className="relative aspect-[4/3] overflow-hidden rounded-lg mb-4 bg-muted">
                {product.image && (
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                {product.name}
              </h3>
              <p className="text-muted-foreground mb-3">{product.shortDesc}</p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  {product.client} • {product.year}
                </span>
                {product.technologies && product.technologies.length > 0 && (
                  <div className="flex gap-2">
                    {product.technologies.slice(0, 2).map((tech, i) => (
                      <span 
                        key={i}
                        className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                    {product.technologies.length > 2 && (
                      <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full">
                        +{product.technologies.length - 2}
                      </span>
                    )}
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts; 