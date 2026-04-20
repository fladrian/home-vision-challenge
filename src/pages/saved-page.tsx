import { Link } from 'react-router-dom';
import { ArrowLeft, Bookmark, BarChart2 } from 'lucide-react';
import { useHousesStore, HouseCard } from '@/features/houses';
import { Button } from '@/components/ui/button';
import { PageLayout } from '@/components/layout/page-layout';

export const SavedPage = () => {
  const { favorites } = useHousesStore();

  return (
    <PageLayout>
      <div className="mb-8 flex flex-col gap-4">
        <div>
          <Link to="/" className="mb-4 inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
            <ArrowLeft className="mr-2 size-4" />
            Back to Listings
          </Link>
          <div className="flex items-center gap-4">
             <h1 className="text-4xl font-black tracking-tight flex-1">Saved <span className="text-primary italic">Properties</span></h1>
             {favorites.length > 0 && (
                 <Button asChild className="rounded-xl font-bold">
                     <Link to="/comparison">
                        <BarChart2 className="mr-2 size-4" />
                        Open Comparison Studio
                     </Link>
                 </Button>
             )}
          </div>
          <p className="text-muted-foreground text-lg mt-2">
            You have {favorites.length} saved properties.
          </p>
        </div>
      </div>

      {favorites.length === 0 ? (
        <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4 text-center">
          <div className="rounded-full bg-primary/10 p-6">
            <Bookmark className="size-12 text-primary" />
          </div>
          <h2 className="text-2xl font-bold">No saved properties yet</h2>
          <p className="max-w-xs text-muted-foreground">
            Save potential investments from the main feed to review them later.
          </p>
          <Button asChild className="mt-4 font-bold rounded-xl" size="lg">
            <Link to="/">Explore Listings</Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {favorites.map((house) => (
               <HouseCard key={house.id} house={house} />
            ))}
        </div>
      )}
    </PageLayout>
  );
};
