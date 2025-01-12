import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  return (
    <nav className="mt-12 flex justify-center gap-2">
      <button
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className="px-4 py-2 rounded-lg transition-colors disabled:opacity-50 text-muted-foreground hover:text-primary"
      >
        ←
      </button>
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-4 py-2 rounded-lg transition-all duration-300 ${
            currentPage === page
              ? 'bg-primary text-white scale-110'
              : 'text-muted-foreground hover:text-primary hover:scale-105'
          }`}
        >
          {page}
        </button>
      ))}
      <button
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className="px-4 py-2 rounded-lg transition-colors disabled:opacity-50 text-muted-foreground hover:text-primary"
      >
        →
      </button>
    </nav>
  );
};

export default Pagination; 