import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BarChart2, Menu, X, Bookmark } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useHousesStore } from '@/features/houses';
import homevisionLogo from '@/assets/branding/homevision_logo.svg';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { favorites } = useHousesStore();

  const navItems = [
    { name: 'Saved', path: '/saved', icon: Bookmark, badge: favorites.length },
    { name: 'Comparison Studio', path: '/comparison', icon: BarChart2 },
  ];

  // Prevent scrolling when menu is open
  useEffect(() => {
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
    <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md dark:bg-zinc-950/80">
      <div className="container mx-auto flex h-20 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2 transition-transform hover:scale-105">
          <div className="flex flex-col">
            <span className="text-2xl font-black tracking-tighter text-zinc-900 dark:text-white leading-none">
              Props<span className="text-primary italic">Vision</span>
            </span>
            <div className="flex items-center gap-1 mt-1">
              <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-wider">by</span>
              <img src={homevisionLogo} alt="HomeVision Logo" className="h-3" />
            </div>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-2 md:flex">
          {navItems.map((item) => (
            <Link key={item.path} to={item.path}>
              <Button
                variant={location.pathname === item.path ? 'secondary' : 'ghost'}
                className={cn(
                  'relative px-4 font-bold transition-all',
                  location.pathname === item.path ? 'text-primary' : 'text-zinc-500'
                )}
              >
                <item.icon className="mr-2 size-4" />
                {item.name}
                {item.badge !== undefined && item.badge > 0 && (
                  <span className="ml-2 flex size-5 items-center justify-center rounded-full bg-primary text-[10px] text-white">
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
            className="border-b bg-white dark:bg-zinc-950 md:hidden overflow-hidden"
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
                      location.pathname === item.path ? 'text-primary' : 'text-zinc-500'
                    )}
                  >
                    <item.icon className="mr-4 size-6" />
                    {item.name}
                    {item.badge !== undefined && item.badge > 0 && (
                      <span className="ml-auto flex size-6 items-center justify-center rounded-full bg-primary text-xs text-white">
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
