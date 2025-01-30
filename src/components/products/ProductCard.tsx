import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '@/types/products';
import { formatDate } from '@/utils/format';

interface ProductCardProps {
  product: Product;
  isHovered: boolean;
  onHover: (id: string | null) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, isHovered, onHover }) => {
  return (
    <Link
      to={`/products/${product.slug}`}
      className="group relative aspect-[5/6] overflow-hidden rounded-lg bg-gray-100 animate-fade-in"
      onMouseEnter={() => onHover(product._id)}
      onMouseLeave={() => onHover(null)}
    >
      <div className="absolute inset-0">
        {product.images[0] && (
          <img
            src={product.images[0]}
            alt={product.name}
            className="h-full w-full object-cover"
          />
        )}
        <div className="text-sm text-muted-foreground p-4 flex justify-between items-center relative z-10">
          <span>{product.category}</span>
          <span className="flex items-center gap-2">
            {product.year}
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
              <p className="text-gray-300 mb-3">{product.shortDescription}</p>
              {product.client && (
                <p className="text-sm text-gray-400 mb-4">{product.client}</p>
              )}
              {product.technologies && product.technologies.length > 0 && (
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