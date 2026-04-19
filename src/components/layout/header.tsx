import { Link, useLocation } from 'react-router-dom';
import { Home, Heart, Search, Menu } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useHousesStore } from '@/features/houses';

export const Header = () => {
  const location = useLocation();
  const { favorites } = useHousesStore();

  const navItems = [
    { name: 'Browse', path: '/', icon: Search },
    { name: 'Favorites', path: '/favorites', icon: Heart, badge: favorites.length },
  ];

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
                  location.pathname === item.path ? 'text-primary' : 'text-muted-foreground'
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

        {/* Mobile Navigation */}
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="size-6" />
        </Button>
      </div>
    </header>
  );
};
