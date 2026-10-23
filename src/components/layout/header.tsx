import { useState, useLayoutEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BarChart2, Menu, X, Bookmark, Building2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useHousesStore } from '@/features/houses';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { favorites } = useHousesStore();

  const navItems = [
    { name: 'Saved', path: '/saved', icon: Bookmark, badge: favorites.length },
    { name: 'Comparison Studio', path: '/studio', icon: BarChart2 },
  ];

  // Prevent scrolling when menu is open
  useLayoutEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
      <div className="container mx-auto flex h-20 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2.5 transition-transform hover:scale-[1.02]">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent text-accent-foreground shadow-md">
            <Building2 className="size-5" />
          </div>
          <span className="text-2xl font-extrabold tracking-tight text-foreground">
            Props<span className="font-semibold text-primary">IA</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-2 md:flex">
          {navItems.map((item) => (
            <Link key={item.path} to={item.path}>
              <Button
                variant={location.pathname === item.path ? 'secondary' : 'ghost'}
                className={cn(
                  'relative px-4 font-bold transition-all',
                  location.pathname === item.path ? 'text-primary' : 'text-muted-foreground'
                )}
              >
                <item.icon className="mr-2 size-4" />
                {item.name}
                {item.badge !== undefined && item.badge > 0 && (
                  <span className="ml-2 flex size-5 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
                    {item.badge}
                  </span>
                )}
              </Button>
            </Link>
          ))}
        </nav>

        {/* Mobile Navigation Toggle */}
        <Button 
          variant="ghost" 
          size="icon" 
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="size-6" /> : <Menu className="size-6" />}
        </Button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="border-b bg-background md:hidden overflow-hidden"
          >
            <div className="container mx-auto px-4 py-8 flex flex-col gap-4">
              {navItems.map((item) => (
                <Link 
                  key={item.path} 
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Button
                    variant={location.pathname === item.path ? 'secondary' : 'ghost'}
                    className={cn(
                      'w-full justify-start text-lg font-bold py-6',
                      location.pathname === item.path ? 'text-primary' : 'text-muted-foreground'
                    )}
                  >
                    <item.icon className="mr-4 size-6" />
                    {item.name}
                    {item.badge !== undefined && item.badge > 0 && (
                      <span className="ml-auto flex size-6 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                        {item.badge}
                      </span>
                    )}
                  </Button>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
