import { useState, useMemo } from 'react';
import { AnimatePresence } from 'framer-motion';
import {
  useHousesInfinite,
  useHousesStore,
  HouseCard,
  HouseRow,
  HouseListSkeleton,
  HouseFilters,
  InfiniteScrollTrigger,
} from '@/features/houses';
import { Button } from '@/components/ui/button';
import { RefreshCcw, Home } from 'lucide-react';

export const HousesPage = () => {
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  
  const { viewMode } = useHousesStore();
  const {
    data,
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  } = useHousesInfinite();

  const allHouses = useMemo(() => {
    return data?.pages.flatMap((page) => page.houses) || [];
  }, [data]);

  const filteredHouses = useMemo(() => {
    return allHouses.filter((house) => {
      const price = house.price;
      const min = minPrice ? parseInt(minPrice) : 0;
      const max = maxPrice ? parseInt(maxPrice) : Infinity;
      return price >= min && price <= max;
    });
  }, [allHouses, minPrice, maxPrice]);

  if (isError) {
    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4 text-center">
        <div className="rounded-full bg-destructive/10 p-4">
          <RefreshCcw className="size-10 text-destructive" />
        </div>
        <h2 className="text-2xl font-bold">Something went wrong</h2>
        <p className="max-w-md text-muted-foreground">
          {error?.message || "We couldn't load the properties. The API might be having some trouble."}
        </p>
        <Button onClick={() => refetch()} className="mt-2">
          Try Again
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-10 text-center sm:text-left">
        <h1 className="mb-2 text-4xl font-black tracking-tight sm:text-5xl">
          Discover your <span className="text-primary italic">dream home</span>
        </h1>
        <p className="text-lg text-muted-foreground">
          Explore {allHouses.length}+ premium properties across the country.
        </p>
      </div>

      <HouseFilters
        minPrice={minPrice}
        maxPrice={maxPrice}
        onMinPriceChange={setMinPrice}
        onMaxPriceChange={setMaxPrice}
        onClear={() => {
          setMinPrice('');
          setMaxPrice('');
        }}
      />

      {isLoading ? (
        <HouseListSkeleton viewMode={viewMode} />
      ) : filteredHouses.length === 0 ? (
        <div className="flex min-h-[40vh] flex-col items-center justify-center gap-4 text-center">
           <div className="rounded-full bg-zinc-100 p-6 dark:bg-zinc-800">
            <Home className="size-12 text-muted-foreground" />
          </div>
          <h3 className="text-xl font-bold">No properties found</h3>
          <p className="text-muted-foreground">Try adjusting your filters or check back later.</p>
        </div>
      ) : (
        <>
          <div
            className={
              viewMode === 'grid'
                ? 'grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
                : 'flex flex-col gap-4'
            }
          >
            <AnimatePresence mode="popLayout">
              {filteredHouses.map((house) => (
                viewMode === 'grid' ? (
                  <HouseCard key={`${house.id}-${viewMode}`} house={house} />
                ) : (
                  <HouseRow key={`${house.id}-${viewMode}`} house={house} />
                )
              ))}
            </AnimatePresence>
          </div>

          <InfiniteScrollTrigger
            onIntersect={fetchNextPage}
            hasNextPage={hasNextPage}
            isFetchingNextPage={isFetchingNextPage}
          />
        </>
      )}
    </div>
  );
};
