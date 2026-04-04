import React from 'react';
import { Link } from 'react-router-dom';
import { Categories } from '@/types/products';

interface CategorySidebarProps {
  categories: Categories;
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
    <>
      {/* Mobile Filter Toggle */}
      <button
        className="lg:hidden flex items-center gap-2 text-muted-foreground mb-6"
        onClick={onToggleFilters}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16">
          <path fill="currentColor" d="m8 13.228 2.827-2.801a.34.34 0 0 1 .23-.104.31.31 0 0 1 .242.104q.11.11.11.238a.33.33 0 0 1-.11.238l-2.81 2.814a.67.67 0 0 1-.49.204.67.67 0 0 1-.488-.204l-2.814-2.815a.322.322 0 0 1 .004-.476.3.3 0 0 1 .238-.103.4.4 0 0 1 .238.104zM8 2.772 5.177 5.569a.325.325 0 0 1-.472 0 .34.34 0 0 1-.112-.238.33.33 0 0 1 .108-.237l2.81-2.81A.67.67 0 0 1 8 2.078q.284 0 .488.204l2.81 2.81a.322.322 0 0 1-.004.476.32.32 0 0 1-.235.102.37.37 0 0 1-.236-.102z"/>
        </svg>
        <span>OUR SELECTED PROJECTS</span>
      </button>

      <aside
        className={`lg:w-1/4 transition-all duration-300 ${
          showFilters ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        } fixed lg:relative top-0 left-0 h-full lg:h-auto bg-white lg:bg-transparent z-40 p-6 lg:p-0 overflow-y-auto`}
      >
        <div className="sticky top-4">
          <h3 className="text-lg font-bold mb-6 animate-fade-in">THE VAULT</h3>
          <nav className="space-y-8">
            <Link
              to="#"
              className={`block text-lg transition-colors ${
                activeCategory === 'all'
                  ? 'text-primary font-medium'
                  : 'text-muted-foreground hover:text-primary'
              }`}
              onClick={() => onCategoryChange('all')}
            >
              ALL WORKS ({totalProducts})
            </Link>

            {Object.entries(categories).map(([key, category], index) => (
              <div
                key={key}
                className="space-y-4 animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="space-y-2">
                  <h5 className="text-sm font-medium text-muted-foreground">
                    {category.name}
                  </h5>
                  <p className="text-xs text-muted-foreground/80">
                    {category.description}
                  </p>
                </div>
                <div className="space-y-3">
                  {category.items.map((item, itemIndex) => (
                    <Link
                      key={item.id}
                      to="#"
                      className={`block text-sm transition-colors ${
                        activeCategory === item.id
                          ? 'text-primary font-medium'
                          : 'text-muted-foreground hover:text-primary'
                      }`}
                      onClick={() => onCategoryChange(item.id)}
                      style={{ animationDelay: `${(index * 100) + (itemIndex * 50)}ms` }}
                    >
                      {item.name} ({item.count})
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </nav>
        </div>
      </aside>
    </>
  );
};

export default CategorySidebar;
