import React from 'react';
import { motion } from 'framer-motion';

interface PillCategoriesProps {
  categories: any;
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

const CategoryPills: React.FC<PillCategoriesProps> = ({ categories, activeCategory, onCategoryChange }) => {
  // Flatten categories into a simpler array for the pills
  const flattenedCategories = [
    { id: 'all', name: 'All Works' },
    ...Object.entries(categories)
      .filter(([key]) => key !== 'all')
      .flatMap(([key, cat]) => {
         return cat.items || [];
      })
  ];

  return (
    <div className="w-full overflow-x-auto pb-4 hide-scrollbar">
      <div className="flex space-x-2 md:space-x-4 items-center justify-start sm:justify-center min-w-max px-4 mx-auto">
        {flattenedCategories.map((cat) => {
          const isActive = activeCategory === cat.id;

          return (
            <button
              key={cat.id}
              onClick={() => onCategoryChange(cat.id)}
              className={`relative px-5 py-2.5 text-sm font-medium rounded-full transition-colors ${
                isActive ? 'text-background' : 'text-muted-foreground hover:text-foreground bg-foreground/5 border border-border/10'
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="active-pill"
                  className="absolute inset-0 bg-foreground rounded-full"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <span className="relative z-10 block whitespace-nowrap">{cat.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryPills;
