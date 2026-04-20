import { Grid2X2, List } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useHousesStore } from '../stores/use-houses-store';
import { VIEW_MODES } from '../stores/use-houses-store';

export const HouseFilters = () => {
  const { viewMode, toggleViewMode } = useHousesStore();

  return (
    <div className="mb-6 flex items-center justify-end">
      <div className="flex items-center gap-1 rounded-xl bg-zinc-100 p-1 dark:bg-zinc-800">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => viewMode !== VIEW_MODES.GRID && toggleViewMode()}
          className={`rounded-lg px-3 py-1.5 text-sm font-bold transition-all ${
            viewMode === VIEW_MODES.GRID
              ? 'bg-white shadow-sm text-foreground dark:bg-zinc-900'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          <Grid2X2 className="mr-2 size-4" />
          Grid
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => viewMode !== VIEW_MODES.LIST && toggleViewMode()}
          className={`rounded-lg px-3 py-1.5 text-sm font-bold transition-all ${
            viewMode === VIEW_MODES.LIST
              ? 'bg-white shadow-sm text-foreground dark:bg-zinc-900'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          <List className="mr-2 size-4" />
          List
        </Button>
      </div>
    </div>
  );
};
