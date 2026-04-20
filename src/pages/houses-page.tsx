import { useState, useMemo, useRef, useLayoutEffect } from 'react';
import { useWindowVirtualizer } from '@tanstack/react-virtual';
import {
  useHousesInfinite,
  useHousesStore,
  HouseCard,
  HouseRow,
  HouseListSkeleton,
  InfiniteScrollTrigger,
} from '@/features/houses';
import { Button } from '@/components/ui/button';
import { RefreshCcw, Home } from 'lucide-react';
import { useWindowSize } from '@/hooks/use-window-size';

export const HousesPage = () => {
  const { viewMode } = useHousesStore();
  const { width } = useWindowSize();
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

  // Calculate column count based on window width (Tailwind breakpoints)
  const columnCount = useMemo(() => {
    if (viewMode === 'list') return 1;
    if (width >= 1280) return 4; // xl
    if (width >= 1024) return 3; // lg
    if (width >= 768) return 2;  // md
    return 1;
  }, [width, viewMode]);

  // Group houses into rows for virtualization
  const virtualRows = useMemo(() => {
    const rows = [];
    for (let i = 0; i < allHouses.length; i += columnCount) {
      rows.push(allHouses.slice(i, i + columnCount));
    }
    return rows;
  }, [allHouses, columnCount]);

  const parentRef = useRef<HTMLDivElement>(null);
  const [scrollOffset, setScrollOffset] = useState(0);

  useLayoutEffect(() => {
    const calculateOffset = () => {
      if (parentRef.current) {
        const rect = parentRef.current.getBoundingClientRect();
        setScrollOffset(rect.top + window.scrollY);
      }
    };

    calculateOffset();
    window.addEventListener('resize', calculateOffset);
    return () => window.removeEventListener('resize', calculateOffset);
  }, [width, viewMode]);

  // Set up window virtualizer
  const rowVirtualizer = useWindowVirtualizer({
    count: virtualRows.length,
    estimateSize: () => (viewMode === 'grid' ? 500 : 200),
    overscan: 5,
    scrollMargin: scrollOffset,
  });

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



      {isLoading ? (
        <HouseListSkeleton viewMode={viewMode} />
      ) : allHouses.length === 0 ? (
        <div className="flex min-h-[40vh] flex-col items-center justify-center gap-4 text-center">
           <div className="rounded-full bg-zinc-100 p-6 dark:bg-zinc-800">
            <Home className="size-12 text-muted-foreground" />
          </div>
          <h3 className="text-xl font-bold">No properties found</h3>
          <p className="text-muted-foreground">Try adjusting your filters or check back later.</p>
        </div>
      ) : (
        <div className="relative" ref={parentRef}>
          <div
            style={{
              height: `${rowVirtualizer.getTotalSize()}px`,
              width: '100%',
              position: 'relative',
            }}
          >
            {rowVirtualizer.getVirtualItems().map((virtualRow) => (
              <div
                key={virtualRow.key}
                data-index={virtualRow.index}
                ref={rowVirtualizer.measureElement}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  transform: `translateY(${virtualRow.start}px)`,
                }}
              >
                <div
                  className={
                    viewMode === 'grid'
                      ? 'grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 pb-6'
                      : 'flex flex-col gap-4 pb-4'
                  }
                >
                  {virtualRows[virtualRow.index].map((house) => (
                    viewMode === 'grid' ? (
                      <HouseCard key={house.id} house={house} />
                    ) : (
                      <HouseRow key={house.id} house={house} />
                    )
                  ))}
                </div>
              </div>
            ))}
          </div>

          <InfiniteScrollTrigger
            onIntersect={fetchNextPage}
            hasNextPage={hasNextPage}
            isFetchingNextPage={isFetchingNextPage}
          />
        </div>
      )}
    </div>
  );
};
