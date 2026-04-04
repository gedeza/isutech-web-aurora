import React, { useState } from 'react';
import { Product } from '@/types/products';
import ProductCard from './ProductCard';
import Pagination from './Pagination';

interface ProductsGridProps {
  products: Product[];
  itemsPerPage?: number;
}

const ProductsGrid: React.FC<ProductsGridProps> = ({ products, itemsPerPage = 6 }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null);

  const totalPages = Math.ceil(products.length / itemsPerPage);
  const currentProducts = products.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentProducts.map((product, index) => (
          <ProductCard
            key={product.id}
            product={product}
            isHovered={hoveredProduct === product.id}
            onHover={setHoveredProduct}
          />
        ))}
      </div>

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default ProductsGrid;
