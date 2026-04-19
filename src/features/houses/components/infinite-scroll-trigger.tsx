import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { Loader2 } from 'lucide-react';

interface InfiniteScrollTriggerProps {
  onIntersect: () => void;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
}

export const InfiniteScrollTrigger = ({
  onIntersect,
  hasNextPage,
  isFetchingNextPage,
}: InfiniteScrollTriggerProps) => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    rootMargin: '200px',
  });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      onIntersect();
    }
  }, [inView, hasNextPage, isFetchingNextPage, onIntersect]);

  return (
    <div ref={ref} className="flex h-24 items-center justify-center py-10">
      {isFetchingNextPage ? (
        <div className="flex items-center gap-2 text-muted-foreground">
          <Loader2 className="size-5 animate-spin text-primary" />
          <span className="text-sm font-medium">Loading more properties...</span>
        </div>
      ) : hasNextPage ? (
        <span className="text-xs text-muted-foreground">Scroll to load more</span>
      ) : (
        <span className="text-sm font-medium text-muted-foreground">You've reached the end of the collection</span>
      )}
    </div>
  );
};
