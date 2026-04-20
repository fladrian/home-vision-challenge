import { useMemo, useRef } from 'react';
import { useWindowVirtualizer } from '@tanstack/react-virtual';
import {
  useHousesInfinite,
  useHousesStore,
  HouseCard,
  HouseRow,
  HouseFilters,
  HouseListSkeleton,
  InfiniteScrollTrigger,
  VIEW_MODES,
} from '@/features/houses';
import { Button } from '@/components/ui/button';
import { RefreshCcw, Home } from 'lucide-react';
import { useWindowSize } from '@/hooks/use-window-size';
import { PageLayout } from '@/components/layout/page-layout';

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

  const columnCount = useMemo(() => {
    if (viewMode === VIEW_MODES.LIST) return 1;
    if (width >= 1280) return 4;
    if (width >= 1024) return 3;
    if (width >= 768) return 2;
    return 1;
  }, [width, viewMode]);

  const virtualRows = useMemo(() => {
    const rows = [];
    for (let i = 0; i < allHouses.length; i += columnCount) {
      rows.push(allHouses.slice(i, i + columnCount));
    }
    return rows;
  }, [allHouses, columnCount]);

  const parentRef = useRef<HTMLDivElement>(null);

  const rowVirtualizer = useWindowVirtualizer({
    count: virtualRows.length,
    estimateSize: () => (viewMode === VIEW_MODES.GRID ? 500 : 200),
    overscan: 5,
  });

  if (isError) {
    return (
      <PageLayout>
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
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <div className="mb-10 max-w-4xl">
        <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-[1.1]">
          Precision <span className="text-primary italic">property intelligence</span>.
        </h1>
        <p className="mt-4 text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl">
          Compare, evaluate, and assess properties with data-driven accuracy. 
          Streamline your workflow and turn complex insights into smarter collateral decisions.
        </p>
      </div>

      <HouseFilters />

      {isLoading ? (
        <HouseListSkeleton viewMode={viewMode} />
      ) : allHouses.length === 0 ? (
        <div className="flex min-h-[40vh] flex-col items-center justify-center gap-4 text-center">
          <div className="rounded-full bg-zinc-100 p-6 dark:bg-zinc-800">
            <Home className="size-12 text-muted-foreground" />
          </div>
          <h3 className="text-xl font-bold">No properties found</h3>
          <p className="text-muted-foreground">Check back later for new listings.</p>
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
                    viewMode === VIEW_MODES.GRID
                      ? 'grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 pb-6'
                      : 'flex flex-col gap-4 pb-4'
                  }
                >
                  {virtualRows[virtualRow.index].map((house) => (
                    viewMode === VIEW_MODES.GRID ? (
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
    </PageLayout>
  );
};
