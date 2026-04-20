import { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useHousesInfinite, FavoriteButton, HouseMap, AISummary, MortgageCalculator } from '@/features/houses';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { PageLayout } from '@/components/layout/page-layout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  ArrowLeft, 
  MapPin, 
  Maximize, 
  Bed, 
  Bath, 
  Car, 
  Calendar,
  ShieldCheck,
} from 'lucide-react';
import { motion } from 'framer-motion';

// Simple stable random function based on seed
const getStableValue = (id: number, offset: number, min: number, max: number) => {
  const seed = (id * 9301 + offset) % 49297;
  const rnd = seed / 49297;
  return Math.floor(rnd * (max - min) + min);
};

export const HouseDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { data } = useHousesInfinite();

  const house = useMemo(() => {
    if (!data) return null;
    return data.pages.flatMap(p => p.houses).find(h => h.id === Number(id));
  }, [data, id]);

  // Stable fake data based on product ID
  const extraData = useMemo(() => {
    const houseId = Number(id) || 0;
    return {
      sqft: getStableValue(houseId, 1, 1500, 4000),
      beds: getStableValue(houseId, 2, 2, 5),
      baths: getStableValue(houseId, 3, 1, 4),
      garage: getStableValue(houseId, 4, 0, 3),
      yearBuilt: getStableValue(houseId, 5, 1980, 2024),
      description: "This stunning property offers an exceptional blend of modern sophistication and timeless elegance. Featuring spacious interiors, high-end finishes, and a sprawling outdoor space, this home is perfect for those who appreciate quality and style. Located in a quiet, sought-after neighborhood, it's close to top-rated schools and local amenities.",
    };
  }, [id]);

  if (!house) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 text-center">
        <h2 className="text-2xl font-bold">Property not found</h2>
        <p className="text-muted-foreground">The house you're looking for might have been sold or removed.</p>
        <Button asChild>
          <Link to="/">Back to Catalog</Link>
        </Button>
      </div>
    );
  }

  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(house.price);

  return (
    <PageLayout>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
      <Link to="/" className="mb-6 inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
        <ArrowLeft className="mr-2 size-4" />
        Back to Results
      </Link>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
        <div className="space-y-6">
          <motion.div 
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="group relative aspect-4/3 overflow-hidden rounded-3xl bg-zinc-100 shadow-xl dark:bg-zinc-800"
          >
            <img
              src={house.photoURL}
              alt={house.address}
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute top-6 right-6">
              <FavoriteButton house={house} className="size-12 shadow-lg" />
            </div>
            <div className="absolute bottom-6 left-6">
              <Badge className="bg-primary px-4 py-1.5 text-sm font-bold shadow-lg">
                Exclusive Listing
              </Badge>
            </div>
          </motion.div>

          <div className="grid grid-cols-4 gap-4">
             {[...Array(4)].map((_, i) => (
                <div key={i} className="aspect-square overflow-hidden rounded-xl bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 opacity-60 hover:opacity-100 cursor-pointer transition-all">
                   <img src={house.photoURL} className="h-full w-full object-cover filter blur-[2px] hover:blur-0" />
                </div>
             ))}
          </div>
        </div>

        <div className="flex flex-col">
          <div className="mb-6">
            <h1 className="mb-2 text-4xl font-black tracking-tight lg:text-5xl">{house.address}</h1>
            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="size-5 text-primary" />
              <span className="text-lg font-medium">{house.address.split(',').slice(-2).join(',')}</span>
            </div>
          </div>

          <div className="mb-8 flex items-baseline gap-2">
            <span className="text-4xl font-black text-primary">{formattedPrice}</span>
            <span className="text-sm font-medium text-muted-foreground">/ Total Price</span>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            <div className="flex flex-col rounded-2xl border bg-zinc-50 p-4 dark:bg-zinc-900/50">
              <Bed className="mb-2 size-5 text-primary" />
              <span className="text-xl font-bold">{extraData.beds}</span>
              <span className="text-xs text-muted-foreground uppercase font-bold tracking-wider">Bedrooms</span>
            </div>
            <div className="flex flex-col rounded-2xl border bg-zinc-50 p-4 dark:bg-zinc-900/50">
              <Bath className="mb-2 size-5 text-primary" />
              <span className="text-xl font-bold">{extraData.baths}</span>
              <span className="text-xs text-muted-foreground uppercase font-bold tracking-wider">Bathrooms</span>
            </div>
            <div className="flex flex-col rounded-2xl border bg-zinc-50 p-4 dark:bg-zinc-900/50">
              <Maximize className="mb-2 size-5 text-primary" />
              <span className="text-xl font-bold">{extraData.sqft}</span>
              <span className="text-xs text-muted-foreground uppercase font-bold tracking-wider">Sq Ft</span>
            </div>
            <div className="flex flex-col rounded-2xl border bg-zinc-50 p-4 dark:bg-zinc-900/50">
              <Car className="mb-2 size-5 text-primary" />
              <span className="text-xl font-bold">{extraData.garage}</span>
              <span className="text-xs text-muted-foreground uppercase font-bold tracking-wider">Garage</span>
            </div>
          </div>

          <Tabs defaultValue="details" className="mt-8 w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="location">Location</TabsTrigger>
              <TabsTrigger value="calculator">Mortgage Estimator</TabsTrigger>
            </TabsList>
            
            <TabsContent value="details" className="mt-6 space-y-8">
              <AISummary house={house} extraData={extraData} />
              
              <div className="space-y-4">
                <h3 className="text-xl font-bold">Property Description</h3>
                <p className="leading-relaxed text-muted-foreground">
                  {extraData.description}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 border-y py-6">
                <div className="flex items-center gap-3">
                  <div className="flex size-9 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Calendar className="size-4" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase font-bold tracking-wider">Built In</p>
                    <p className="text-sm font-bold">{extraData.yearBuilt}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex size-9 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <ShieldCheck className="size-4" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase font-bold tracking-wider">Verified Owner</p>
                    <p className="text-sm font-bold">{house.homeowner}</p>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="location" className="mt-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold">Location</h3>
                <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  <MapPin className="size-4 text-primary" />
                  <span>{house.address}</span>
                </div>
              </div>
              <HouseMap house={house} />
            </TabsContent>
            
            <TabsContent value="calculator" className="mt-6">
              <MortgageCalculator price={house.price} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </motion.div>
    </PageLayout>
  );
};
