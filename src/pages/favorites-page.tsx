import { useMemo } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useHousesStore, HouseCard, HouseRow } from '@/features/houses';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Heart, ArrowLeft } from 'lucide-react';

export const FavoritesPage = () => {
  const { favorites, viewMode } = useHousesStore();

  const sortedFavorites = useMemo(() => {
    return [...favorites].sort((a, b) => b.id - a.id);
  }, [favorites]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <Link to="/" className="mb-4 inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary">
            <ArrowLeft className="mr-2 size-4" />
            Back to Catalog
          </Link>
          <h1 className="text-3xl font-black tracking-tight">Your <span className="text-red-500">Favorites</span></h1>
          <p className="text-muted-foreground">You have saved {favorites.length} properties.</p>
        </div>
      </div>

      {favorites.length === 0 ? (
        <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4 text-center">
          <div className="rounded-full bg-red-50 p-6 dark:bg-red-900/10">
            <Heart className="size-12 text-red-400" />
          </div>
          <h2 className="text-2xl font-bold">No favorites yet</h2>
          <p className="max-w-xs text-muted-foreground">
            Browse our property collection and tap the heart icon to save the ones you love.
          </p>
          <Button asChild className="mt-2">
            <Link to="/">Start Exploring</Link>
          </Button>
        </div>
      ) : (
        <div
          className={
            viewMode === 'grid'
              ? 'grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
              : 'flex flex-col gap-4'
          }
        >
          <AnimatePresence mode="popLayout">
            {sortedFavorites.map((house) => (
              viewMode === 'grid' ? (
                <HouseCard key={house.id} house={house} />
              ) : (
                <HouseRow key={house.id} house={house} />
              )
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};
