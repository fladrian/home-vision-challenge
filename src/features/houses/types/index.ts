import { z } from 'zod';

export const houseSchema = z.object({
  id: z.number(),
  address: z.string(),
  homeowner: z.string(),
  price: z.number(),
  photoURL: z.url(),
});

export const housesResponseSchema = z.object({
  houses: z.array(houseSchema),
  ok: z.boolean(),
});

export type House = z.infer<typeof houseSchema>;
export type HousesResponse = z.infer<typeof housesResponseSchema>;

/** Extended property details used for AI analysis and detail pages */
export const propertyDetailsSchema = z.object({
  sqft: z.number(),
  beds: z.number(),
  baths: z.number(),
  garage: z.number(),
  yearBuilt: z.number(),
});

export type PropertyDetails = z.infer<typeof propertyDetailsSchema>;

export interface HousesQueryResponse extends HousesResponse {
  nextPage?: number;
}
