import React, { useState } from 'react';
import { Product } from '@/types/products';
import ProductCard from './ProductCard';

interface ProductsGridProps {
  products: Product[];
}

const ProductsGrid: React.FC<ProductsGridProps> = ({ products }) => {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          isHovered={hoveredId === product.id}
          onHover={setHoveredId}
        />
      ))}
    </div>
  );
};

export default ProductsGrid; 