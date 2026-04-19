import { z } from 'zod';

export const houseSchema = z.object({
  id: z.number(),
  address: z.string(),
  homeowner: z.string(),
  price: z.number(),
  photoURL: z.string().url(),
});

export const housesResponseSchema = z.object({
  houses: z.array(houseSchema),
  ok: z.boolean(),
});

export type House = z.infer<typeof houseSchema>;
export type HousesResponse = z.infer<typeof housesResponseSchema>;

export interface HousesQueryResponse extends HousesResponse {
  nextPage?: number;
}
