import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useMemo } from 'react';
import type { House } from '../types';

// Fix for Leaflet default icon issues in React/Vite
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

const DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

interface HouseMapProps {
  house: House;
  className?: string;
}

/**
 * Interactive map component for displaying a property's location.
 * Generates stable coordinates based on the house ID for demonstration.
 */
export const HouseMap = ({ house, className }: HouseMapProps) => {
  // Generate stable coordinates in Montevideo, Uruguay for demo purposes
  // Montevideo center: -34.9011, -56.1645
  const position = useMemo((): [number, number] => {
    const seed = house.id;
    const lat = -34.9011 + ((seed * 12345) % 1000) / 50000;
    const lng = -56.1645 + ((seed * 54321) % 1000) / 50000;
    return [lat, lng];
  }, [house.id]);

  return (
    <div className={`relative h-[280px] w-full overflow-hidden rounded-2xl border bg-zinc-100 shadow-sm dark:bg-zinc-800 ${className}`}>
      <MapContainer
        center={position}
        zoom={15}
        scrollWheelZoom={false}
        className="h-full w-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
          <Popup>
            <div className="p-1">
              <p className="font-bold">{house.address}</p>
              <p className="text-xs text-muted-foreground">{house.homeowner}</p>
            </div>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};
