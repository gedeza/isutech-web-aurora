import React from 'react';
import { Button } from '@/components/ui/button';
import { Filter } from 'lucide-react';

interface CategorySidebarProps {
  categories: string[];
  activeCategory: string;
  totalProducts: number;
  onCategoryChange: (category: string) => void;
  showFilters: boolean;
  onToggleFilters: () => void;
}

const CategorySidebar: React.FC<CategorySidebarProps> = ({
  categories,
  activeCategory,
  totalProducts,
  onCategoryChange,
  showFilters,
  onToggleFilters,
}) => {
  return (
    <div className={`lg:w-1/4 ${showFilters ? 'block' : 'hidden lg:block'}`}>
      <div className="sticky top-24">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold">Categories</h3>
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={onToggleFilters}
          >
            <Filter className="w-5 h-5" />
          </Button>
        </div>

        <div className="space-y-2">
          <button
            onClick={() => onCategoryChange('all')}
            className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
              activeCategory === 'all'
                ? 'bg-primary text-primary-foreground'
                : 'hover:bg-muted'
            }`}
          >
            <span className="flex items-center justify-between">
              <span>All Products</span>
              <span className="text-sm">{totalProducts}</span>
            </span>
          </button>

          {categories.map((category) => (
            <button
              key={category}
              onClick={() => onCategoryChange(category)}
              className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                activeCategory === category
                  ? 'bg-primary text-primary-foreground'
                  : 'hover:bg-muted'
              }`}
            >
              <span className="flex items-center justify-between">
                <span>{category}</span>
                <span className="text-sm">
                  {totalProducts}
                </span>
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategorySidebar; 