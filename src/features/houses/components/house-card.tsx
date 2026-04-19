import { motion } from 'framer-motion';
import { MapPin, User, Tag } from 'lucide-react';
import type { House } from '../types';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FavoriteButton } from './favorite-button';
import { Link } from 'react-router-dom';

interface HouseCardProps {
  house: House;
}

export const HouseCard = ({ house }: HouseCardProps) => {
  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(house.price);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ y: -4 }}
      className="group h-full"
    >
      <Link to={`/houses/${house.id}`}>
        <Card className="h-full overflow-hidden border-none bg-white shadow-sm transition-shadow hover:shadow-xl dark:bg-zinc-900">
          <div className="relative aspect-[4/3] overflow-hidden">
            <img
              src={house.photoURL}
              alt={house.address}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            
            <div className="absolute top-3 right-3">
              <FavoriteButton house={house} />
            </div>
            
            <div className="absolute bottom-3 left-3">
              <Badge variant="secondary" className="bg-white/90 font-bold backdrop-blur dark:bg-zinc-900/90">
                <Tag className="mr-1 size-3" />
                Featured
              </Badge>
            </div>
          </div>

          <CardContent className="p-4">
            <div className="mb-2 flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
              <MapPin className="size-3.5 text-primary" />
              <span className="line-clamp-1">{house.address.split(',').slice(-2).join(',')}</span>
            </div>
            <h3 className="mb-1 line-clamp-1 text-lg font-bold tracking-tight">
              {house.address.split(',')[0]}
            </h3>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <User className="size-3.5" />
              <span className="line-clamp-1">{house.homeowner}</span>
            </div>
          </CardContent>

          <CardFooter className="flex items-center justify-between border-t bg-zinc-50/50 p-4 dark:bg-zinc-800/20">
            <span className="text-xl font-black text-primary">{formattedPrice}</span>
            <span className="text-xs font-medium text-muted-foreground">ID: {house.id}</span>
          </CardFooter>
        </Card>
      </Link>
    </motion.div>
  );
};
