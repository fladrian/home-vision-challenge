import { motion } from 'framer-motion';
import { MapPin, User, Tag, ChevronRight } from 'lucide-react';
import type { House } from '../types';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FavoriteButton } from './favorite-button';
import { Link } from 'react-router-dom';

interface HouseRowProps {
  house: House;
}

export const HouseRow = ({ house }: HouseRowProps) => {
  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(house.price);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, scale: 0.98 }}
      whileHover={{ scale: 1.01 }}
      className="group"
    >
      <Link to={`/houses/${house.id}`}>
        <Card className="flex flex-col gap-4 overflow-hidden border-none bg-white p-3 shadow-sm transition-shadow hover:shadow-md sm:flex-row sm:items-center dark:bg-zinc-900">
          <div className="relative aspect-video w-full shrink-0 overflow-hidden rounded-lg sm:w-48 sm:aspect-square">
            <img
              src={house.photoURL}
              alt={house.address}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              loading="lazy"
            />
            <div className="absolute top-2 right-2">
              <FavoriteButton house={house} className="size-8" />
            </div>
          </div>

          <div className="flex flex-1 flex-col justify-center gap-1 overflow-hidden px-2">
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-[10px] uppercase tracking-wider">
                ID: {house.id}
              </Badge>
              <div className="flex items-center gap-1 text-xs text-muted-foreground font-medium">
                <MapPin className="size-3 text-primary" />
                <span className="line-clamp-1">{house.address.split(',').slice(-1)}</span>
              </div>
            </div>
            
            <h3 className="line-clamp-1 text-xl font-bold tracking-tight">
              {house.address.split(',')[0]}
            </h3>
            
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mt-1">
              <div className="flex items-center gap-1.5 font-medium">
                <Tag className="size-3.5 text-primary" />
                <span className="text-primary font-bold">{formattedPrice}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <User className="size-3.5" />
                <span className="line-clamp-1">{house.homeowner}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end px-4 sm:border-l">
            <ChevronRight className="size-5 text-muted-foreground transition-transform group-hover:translate-x-1" />
          </div>
        </Card>
      </Link>
    </motion.div>
  );
};
