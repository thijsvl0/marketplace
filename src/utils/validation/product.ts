import * as z from "zod";

export const createProductSchema = z.object({
  title: z.string().min(8),
  description: z.string().min(64),
  price: z.number().min(0),
});

export type CreateProductSchema = z.infer<typeof createProductSchema>;
