import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Heart, Search, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useHousesStore } from '@/features/houses';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { favorites } = useHousesStore();

  const navItems = [
    { name: 'Browse', path: '/', icon: Search },
    { name: 'Favorites', path: '/favorites', icon: Heart, badge: favorites.length },
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
          <div className="flex size-10 items-center justify-center rounded-xl bg-primary shadow-lg shadow-primary/20">
            <Home className="size-6 text-white" />
          </div>
          <span className="text-2xl font-black tracking-tighter text-zinc-900 dark:text-white">
            HOME<span className="text-primary italic">VISION</span>
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
          <div className="ml-4 h-6 w-px bg-zinc-200 dark:bg-zinc-800" />
          <Button className="ml-4 rounded-xl font-bold px-6 shadow-md shadow-primary/10">
            Post a Listing
          </Button>
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
              <div className="my-2 h-px bg-zinc-100 dark:bg-zinc-800" />
              <Button className="w-full rounded-xl font-bold py-6 text-lg" onClick={() => setIsMenuOpen(false)}>
                Post a Listing
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
