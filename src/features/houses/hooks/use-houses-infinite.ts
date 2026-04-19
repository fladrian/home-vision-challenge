import { useInfiniteQuery } from '@tanstack/react-query';
import { getHouses } from '../api/get-houses';

/**
 * Custom hook to fetch houses with infinite scrolling support.
 * Leverages TanStack Query for caching, pagination, and loading states.
 */
export const useHousesInfinite = () => {
  return useInfiniteQuery({
    queryKey: ['houses', 'list'],
    queryFn: ({ pageParam }) => getHouses({ pageParam }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.nextPage,
    // Keep data fresh for 5 minutes, but allow background refetching
    staleTime: 1000 * 60 * 5,
  });
};
