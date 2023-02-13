import * as z from "zod";

export const createProductSchema = z.object({
  title: z.string().min(8),
  description: z.string().min(64),
  price: z.coerce.number().min(0.01),
  images: z.array(z.string()).min(1),
});

export type CreateProductSchema = z.infer<typeof createProductSchema>;
