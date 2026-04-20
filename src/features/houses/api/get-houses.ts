import { api } from '@/lib/axios';
import { housesResponseSchema } from '../types';
import type { HousesQueryResponse } from '../types';

/**
 * Fetches a list of houses from the API with pagination.
 * Validates the response using Zod for runtime safety.
 * 
 * @param pageParam The page number to fetch
 * @returns Object containing house data and next page info
 */
export const getHouses = async ({ pageParam = 1 }): Promise<HousesQueryResponse> => {
  const PAGE_SIZE = 20;

  // The API returns the response data due to interceptor config
  const response = await api.get('/houses', {
    params: {
      page: pageParam,
      per_page: PAGE_SIZE,
    },
  });

  // Validate the API response at runtime
  const result = housesResponseSchema.safeParse(response);

  if (!result.success) {
    console.error('API validation failed:', result.error.flatten());
    throw new Error('Received invalid data from the houses API');
  }

  const { houses, ok } = result.data;

  return {
    houses,
    ok,
    nextPage: houses.length === PAGE_SIZE ? pageParam + 1 : undefined,
  };
};
