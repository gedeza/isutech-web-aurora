import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '@/types/products';

interface ProductCardProps {
  product: Product;
  isHovered: boolean;
  onHover: (id: number | null) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, isHovered, onHover }) => {
  return (
    <Link
      to="#"
      className="group relative aspect-[5/6] overflow-hidden rounded-lg bg-gray-100 animate-fade-in"
      onMouseEnter={() => onHover(product.id)}
      onMouseLeave={() => onHover(null)}
    >
      <div className="absolute inset-0">
        <div className="text-sm text-muted-foreground p-4 flex justify-between items-center">
          <span>{product.category}</span>
          <span className="flex items-center gap-2">
            {product.status === 'ongoing' && (
              <span className="inline-block w-2 h-2 rounded-full bg-primary animate-pulse" />
            )}
            <span>{product.year}</span>
          </span>
        </div>
        <div 
          className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent 
            transition-all duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`}
        >
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <div className={`transform transition-all duration-500 ${
              isHovered ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
            }`}>
              <h3 className="text-xl font-bold text-white mb-2">{product.name}</h3>
              <p className="text-gray-300 mb-3">{product.shortDesc}</p>
              <p className="text-sm text-gray-400 mb-4">{product.client}</p>
              {product.technologies && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {product.technologies.map((tech, i) => (
                    <span 
                      key={i}
                      className="text-xs px-2 py-1 bg-white/10 rounded-full text-white"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              )}
              <button className="text-primary text-sm font-medium hover:underline">
                View Project →
              </button>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard; 