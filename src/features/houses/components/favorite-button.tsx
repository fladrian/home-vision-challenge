import { Bookmark } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useHousesStore } from '../stores/use-houses-store';
import type { House } from '../types';
import { cn } from '@/lib/utils';

interface FavoriteButtonProps {
  /** The house object to add or remove from favorites */
  house: House;
  /** Optional custom Tailwind classes to style the button */
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
        active && 'text-primary',
        className
      )}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleFavorite(house);
      }}
    >
      <Bookmark className={cn('size-5', active && 'fill-current')} />
      <span className="sr-only">{active ? 'Remove from studio' : 'Add to studio'}</span>
    </Button>
  );
};
