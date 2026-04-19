import { Grid2X2, List, FilterX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useHousesStore } from '../stores/use-houses-store';

interface HouseFiltersProps {
  minPrice: string;
  maxPrice: string;
  onMinPriceChange: (val: string) => void;
  onMaxPriceChange: (val: string) => void;
  onClear: () => void;
}

export const HouseFilters = ({
  minPrice,
  maxPrice,
  onMinPriceChange,
  onMaxPriceChange,
  onClear,
}: HouseFiltersProps) => {
  const { viewMode, toggleViewMode } = useHousesStore();

  return (
    <div className="mb-8 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
      <div className="flex flex-wrap items-end gap-4">
        <div className="grid w-full max-w-[140px] items-center gap-1.5">
          <Label htmlFor="minPrice" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
            Min Price
          </Label>
          <Input
            id="minPrice"
            type="number"
            placeholder="0"
            value={minPrice}
            onChange={(e) => onMinPriceChange(e.target.value)}
            className="h-10 bg-white dark:bg-zinc-900"
          />
        </div>
        <div className="grid w-full max-w-[140px] items-center gap-1.5">
          <Label htmlFor="maxPrice" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
            Max Price
          </Label>
          <Input
            id="maxPrice"
            type="number"
            placeholder="Any"
            value={maxPrice}
            onChange={(e) => onMaxPriceChange(e.target.value)}
            className="h-10 bg-white dark:bg-zinc-900"
          />
        </div>
        {(minPrice || maxPrice) && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClear}
            className="h-10 text-muted-foreground hover:text-destructive"
          >
            <FilterX className="mr-2 size-4" />
            Clear
          </Button>
        )}
      </div>

      <div className="flex items-center gap-4">
        <Tabs value={viewMode} onValueChange={toggleViewMode}>
          <TabsList className="bg-zinc-100 dark:bg-zinc-800">
            <TabsTrigger value="grid" className="data-[state=active]:bg-white data-[state=active]:shadow-sm dark:data-[state=active]:bg-zinc-700">
              <Grid2X2 className="mr-2 size-4" />
              Grid
            </TabsTrigger>
            <TabsTrigger value="list" className="data-[state=active]:bg-white data-[state=active]:shadow-sm dark:data-[state=active]:bg-zinc-700">
              <List className="mr-2 size-4" />
              List
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
    </div>
  );
};
