import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '@/types/products';

interface ProductCardProps {
  product: Product;
  isHovered: boolean;
  onHover: (id: number | null) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, isHovered, onHover }) => {
  // Determine link based on product ID
  const getLinkTo = () => {
    if (product.id === 0) return '/autoslip';
    if (product.id === 16) return '/education-analytics';
    if (product.id === 18) return '/property-intelligence';
    // Add more routes as pages are created
    // if (product.id === 19) return '/b2b2g-platform';
    return '#';
  };

  const linkTo = getLinkTo();
  const isClickable = linkTo !== '#';

  return (
    <Link
      to={linkTo}
      className="group relative aspect-[5/6] overflow-hidden rounded-lg bg-gray-100 animate-fade-in"
      onMouseEnter={() => onHover(product.id)}
      onMouseLeave={() => onHover(null)}
    >
      <div className="absolute inset-0">
        {/* Top Header */}
        <div className="absolute top-0 left-0 right-0 text-sm p-4 flex justify-between items-center z-10">
          <span className="text-gray-700 font-medium">{product.category}</span>
          <span className="flex items-center gap-2">
            {product.id === 0 && (
              <span className="text-xs px-3 py-1 bg-primary text-white rounded-full font-bold animate-pulse">
                FEATURED
              </span>
            )}
            {product.status === 'ongoing' && (
              <span className="inline-block w-2 h-2 rounded-full bg-primary animate-pulse" />
            )}
            <span className="text-gray-700 font-medium">{product.year}</span>
          </span>
        </div>

        {/* Gradient Overlay */}
        <div
          className={`absolute inset-0 bg-gradient-to-t transition-all duration-500 ${
            isHovered
              ? 'from-black/90 via-black/60 to-transparent'
              : 'from-black/60 via-black/30 to-transparent'
          }`}
        >
          {/* Content Container - Flexbox layout for consistent alignment */}
          <div className="absolute inset-0 p-6 flex flex-col justify-end">
            <div className={`transform transition-all duration-500 ${
              isHovered ? 'translate-y-0' : 'translate-y-2'
            }`}>
              {/* Product Name - Line clamp for consistent height */}
              <h3 className={`text-xl font-bold text-white mb-2 transition-opacity duration-500 line-clamp-2 ${
                isHovered ? 'opacity-100' : 'opacity-90'
              }`} style={{
                textShadow: '0 2px 4px rgba(0,0,0,0.8)',
                height: '3.5rem',
                display: 'flex',
                alignItems: 'flex-end'
              }}>
                {product.name}
              </h3>

              {/* Short Description - Line clamp for consistent height */}
              <p className={`text-base text-white mb-3 transition-opacity duration-500 line-clamp-2 ${
                isHovered ? 'opacity-100' : 'opacity-85'
              }`} style={{
                textShadow: '0 1px 3px rgba(0,0,0,0.8)',
                height: '3rem'
              }}>
                {product.shortDesc}
              </p>

              {/* Client Text - Single line with fixed height */}
              <p className={`text-sm text-white mb-4 transition-opacity duration-500 truncate ${
                isHovered ? 'opacity-90' : 'opacity-75'
              }`} style={{
                textShadow: '0 1px 3px rgba(0,0,0,0.8)',
                height: '1.25rem'
              }}>
                {product.client}
              </p>

              {/* Technology Badges - Fixed container height, limit to 2 rows */}
              <div className={`mb-4 transition-opacity duration-500 ${
                isHovered ? 'opacity-100' : 'opacity-80'
              }`} style={{ height: '3.5rem', overflow: 'hidden' }}>
                {product.technologies && (
                  <div className="flex flex-wrap gap-2">
                    {product.technologies.slice(0, 5).map((tech, i) => (
                      <span
                        key={i}
                        className="text-xs px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white font-medium"
                        style={{ textShadow: '0 1px 2px rgba(0,0,0,0.8)' }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* CTA Button - Fixed position at bottom */}
              <button className={`text-sm font-semibold hover:underline transition-all duration-300 ${
                isHovered ? 'opacity-100' : 'opacity-85'
              } ${isClickable ? 'text-primary' : 'text-white'}`} style={{ textShadow: '0 1px 3px rgba(0,0,0,0.8)' }}>
                {isClickable ? 'View Project →' : 'Details Coming Soon'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard; 