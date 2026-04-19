import { motion } from 'framer-motion';
import { Card, CardContent, CardFooter } from '@/components/ui/card';

export const HouseSkeleton = ({ viewMode = 'grid' }: { viewMode?: 'grid' | 'list' }) => {
  if (viewMode === 'list') {
    return (
      <div className="flex flex-col gap-4 overflow-hidden rounded-lg border bg-white p-3 shadow-sm sm:flex-row sm:items-center dark:bg-zinc-900">
        <div className="aspect-video w-full shrink-0 animate-pulse rounded-lg bg-muted sm:size-32 sm:aspect-square" />
        <div className="flex-1 space-y-3 px-2 py-4">
          <div className="h-4 w-1/4 animate-pulse rounded bg-muted" />
          <div className="h-6 w-3/4 animate-pulse rounded bg-muted" />
          <div className="flex gap-4">
            <div className="h-4 w-1/5 animate-pulse rounded bg-muted" />
            <div className="h-4 w-1/5 animate-pulse rounded bg-muted" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <Card className="overflow-hidden border-none bg-white shadow-sm dark:bg-zinc-900">
      <div className="aspect-[4/3] animate-pulse bg-muted" />
      <CardContent className="space-y-3 p-4">
        <div className="h-3 w-1/3 animate-pulse rounded bg-muted" />
        <div className="h-5 w-3/4 animate-pulse rounded bg-muted" />
        <div className="h-4 w-1/2 animate-pulse rounded bg-muted" />
      </CardContent>
      <CardFooter className="flex justify-between border-t bg-zinc-50/50 p-4 dark:bg-zinc-800/20">
        <div className="h-6 w-1/4 animate-pulse rounded bg-muted" />
        <div className="h-3 w-1/6 animate-pulse rounded bg-muted" />
      </CardFooter>
    </Card>
  );
};

export const HouseListSkeleton = ({ count = 8, viewMode = 'grid' }: { count?: number; viewMode?: 'grid' | 'list' }) => {
  return (
    <div
      className={
        viewMode === 'grid'
          ? 'grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
          : 'flex flex-col gap-4'
      }
    >
      {Array.from({ length: count }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: i * 0.05 }}
        >
          <HouseSkeleton viewMode={viewMode} />
        </motion.div>
      ))}
    </div>
  );
};
