import { Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useHousesStore } from '../stores/use-houses-store';
import type { House } from '../types';
import { cn } from '@/lib/utils';

interface FavoriteButtonProps {
  house: House;
  className?: string;
}

export const FavoriteButton = ({ house, className }: FavoriteButtonProps) => {
  const { toggleFavorite, isFavorite } = useHousesStore();
  const active = isFavorite(house.id);

  return (
    <Button
      variant="secondary"
      size="icon"
      className={cn(
        'rounded-full bg-white/80 backdrop-blur-sm transition-all hover:scale-110 active:scale-95 dark:bg-zinc-900/80',
        active && 'text-red-500 hover:text-red-600',
        className
      )}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleFavorite(house);
      }}
    >
      <Heart className={cn('size-5', active && 'fill-current')} />
      <span className="sr-only">{active ? 'Remove from favorites' : 'Add to favorites'}</span>
    </Button>
  );
};
