import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Product } from '@/types/products';
import { ThreeDCard } from '../ui/3d-card';

interface ProductCardProps {
  product: Product;
  isHovered: boolean;
  onHover: (id: number | null) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onHover }) => {
  const navigate = useNavigate();

  const linkTo = `/products/${product.slug || product.name.toLowerCase().replace(/\s+/g, '-')}`;

  return (
    <Link to={linkTo} className="block group w-full h-[450px]">
      <ThreeDCard className="w-full h-full bg-black relative border-transparent border dark:border-white/[0.1] rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-white/[0.05] transition-all duration-300">
        <div className="absolute inset-0">
          {/* Header Info */}
          <div className="absolute top-0 left-0 right-0 p-5 flex justify-between items-center z-20">
            <span className="text-muted-foreground text-xs tracking-wider uppercase font-medium drop-shadow-md">{product.category}</span>
            <div className="flex items-center gap-2">
              {product.status === 'completed' && (
                <span className="text-[10px] px-2.5 py-1 bg-green-500/20 text-green-400 rounded-full font-bold shadow-sm">
                  LIVE
                </span>
              )}
              {product.status === 'ongoing' && (
                <span className="text-[10px] px-2.5 py-1 bg-amber-500/20 text-amber-400 rounded-full font-bold shadow-sm">
                  PLANNING
                </span>
              )}
              {product.year && <span className="text-muted-foreground text-xs drop-shadow-md">{product.year}</span>}
            </div>
          </div>

          {/* Image Layer (Fallback if not provided) */}
          <div className="absolute inset-0 z-0">
            {product.images && product.images.length > 0 ? (
              <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover opacity-40 group-hover:opacity-30 transition-opacity duration-300" />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-neutral-900 to-black" />
            )}
          </div>

          {/* Deep Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent z-10" />

          {/* Content Block */}
          <div className="absolute inset-0 p-6 flex flex-col justify-end z-20 text-white">
            <div className="transform transition-transform duration-500 group-hover:translate-y-[-8px]">
              <h3 className="text-2xl font-bold mb-2 leading-tight">
                {product.name}
              </h3>
              <p className="text-sm text-neutral-300 mb-4 line-clamp-2 leading-relaxed max-w-[90%]">
                {product.shortDescription}
              </p>

              {/* Features as Bullets on Hover */}
              {product.features && (
                <ul className="mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 space-y-1.5 h-0 group-hover:h-auto overflow-hidden">
                  {product.features.slice(0, 3).map((feature, i) => (
                    <li key={i} className="text-xs text-white/80 flex items-start gap-2">
                      <span className="text-white/40 mt-[2px]">•</span> 
                      {feature}
                    </li>
                  ))}
                </ul>
              )}

              {/* Technologies Tags */}
              {product.technologies && (
                <div className="flex flex-wrap gap-2 mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {product.technologies.slice(0, 3).map((tech, i) => (
                    <span
                      key={i}
                      className="text-[10px] px-2.5 py-1 bg-white/10 border border-white/20 backdrop-blur-md rounded-full text-white shadow-sm"
                    >
                      {tech}
                    </span>
                  ))}
                  {product.technologies.length > 3 && (
                    <span className="text-[10px] px-2 py-1 text-white/70">+{product.technologies.length - 3}</span>
                  )}
                </div>
              )}
              
              {/* Call to action arrow */}
              <div className="flex items-center gap-2 mt-4 text-white/70 group-hover:text-white transition-colors">
                <span className="text-xs font-medium uppercase tracking-widest">
                  View Project
                </span>
                <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </ThreeDCard>
    </Link>
  );
};

export default ProductCard;