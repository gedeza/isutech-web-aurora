import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import ThemeToggle from './ThemeToggle';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Careers', path: '/careers' },
    { name: 'Contact', path: '/contact' }
  ];

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-background/80 backdrop-blur-xl border-b border-border py-4 shadow-sm' 
          : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center z-50">
            <img 
              src="/images/iSuTech Logo2000x1000.png" 
              alt="iSuTech" 
              className="h-10 w-auto object-contain"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-10">
            {navLinks.map((link) => {
              const isActive = location.pathname.startsWith(link.path);
              return (
                <Link 
                  key={link.name} 
                  to={link.path} 
                  className={`relative text-sm font-medium transition-colors hover:text-foreground ${
                    isActive ? 'text-foreground' : 'text-muted-foreground'
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <motion.div 
                      layoutId="nav-indicator"
                      className="absolute -bottom-2 left-0 right-0 h-[2px] bg-foreground rounded-full"
                    />
                  )}
                </Link>
              );
            })}
            
            <div className="flex items-center gap-6">
               <Link 
                 to="/products" 
                 className="px-6 py-2.5 text-sm font-medium text-background bg-foreground rounded-full hover:scale-105 transition-transform duration-300 shadow-md"
               >
                 Products
               </Link>
               <ThemeToggle />
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-4 z-50">
             <ThemeToggle />
             <button
               className="p-2 text-foreground"
               onClick={() => setIsMenuOpen(!isMenuOpen)}
             >
               <div className="space-y-1.5 w-6">
                 <span className={`block w-6 h-0.5 bg-foreground transition-transform ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
                 <span className={`block w-6 h-0.5 bg-foreground transition-opacity ${isMenuOpen ? 'opacity-0' : ''}`} />
                 <span className={`block w-6 h-0.5 bg-foreground transition-transform ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
               </div>
             </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="md:hidden absolute top-0 left-0 right-0 h-screen bg-background/95 backdrop-blur-3xl pt-24 px-6 flex flex-col space-y-8"
            >
              {navLinks.map((link) => (
                <Link 
                  key={link.name} 
                  to={link.path} 
                  onClick={() => setIsMenuOpen(false)}
                  className="text-3xl font-light text-foreground tracking-tight hover:text-muted-foreground transition-colors"
                >
                  {link.name}
                </Link>
              ))}
              <Link 
                to="/products" 
                onClick={() => setIsMenuOpen(false)}
                className="text-3xl font-light text-foreground tracking-tight hover:text-muted-foreground transition-colors mt-8"
              >
                Products &rarr;
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;