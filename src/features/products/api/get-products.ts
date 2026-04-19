import { useQuery } from '@tanstack/react-query';
import { api } from '../../../lib/axios';
import type { Product } from '../types';

export const getProducts = (): Promise<Product[]> => {
  return api.get('https://fakestoreapi.com/products');
};

export const useProducts = () => {
  return useQuery({
    queryKey: ['products'],
    queryFn: getProducts,
  });
};
