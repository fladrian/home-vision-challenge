import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { House } from '../types';

export const VIEW_MODES = {
  GRID: 'grid',
  LIST: 'list',
} as const;

export type ViewMode = (typeof VIEW_MODES)[keyof typeof VIEW_MODES];

export interface HousesState {
  viewMode: ViewMode;
  favorites: House[];
  toggleViewMode: () => void;
  toggleFavorite: (house: House) => void;
  isFavorite: (id: number) => boolean;
}

/**
 * Store for managing house-related state, such as view modes and favorites.
 * Uses 'persist' middleware to maintain favorites and view mode across sessions.
 */
export const useHousesStore = create<HousesState>()(
  persist(
    (set, get) => ({
      viewMode: VIEW_MODES.GRID,
      favorites: [],
      toggleViewMode: () =>
        set((state) => ({
          viewMode:
            state.viewMode === VIEW_MODES.GRID ? VIEW_MODES.LIST : VIEW_MODES.GRID,
        })),
      toggleFavorite: (house: House) =>
        set((state) => {
          const isFav = state.favorites.some((fav) => fav.id === house.id);
          if (isFav) {
            return {
              favorites: state.favorites.filter((fav) => fav.id !== house.id),
            };
          }
          return { favorites: [...state.favorites, house] };
        }),
      isFavorite: (id: number) =>
        get().favorites.some((fav) => fav.id === id),
    }),
    {
      name: 'houses-storage',
      // Explicitly partialize to only persist data fields, excluding functions.
      // This solves the TypeScript inference issue with Zustand 5.
      partialize: (state) => ({
        viewMode: state.viewMode,
        favorites: state.favorites,
      }),
    }
  )
);