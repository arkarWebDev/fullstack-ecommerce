import { z } from "zod";

export const productSchema = z.object({
  name: z.string().min(3, "Product name must be at least 3 characters"),
  description: z
    .string()
    .min(10, "Product description must be at least 10 characters"),
  price: z.number().min(0, "Price must be greater than 0"),
  instock_count: z.number(),
  category: z.string().min(1, "Category is required"),
  sizes: z.array(z.string()).min(1, "At least one size is required"),
  colors: z.array(z.string()).min(1, "At least one color is required"),
  images: z
    .array(
      z.object({
        file: z.instanceof(File).optional(),
        url: z.string(),
        public_alt: z.string().optional(),
      })
    )
    .min(1, "At least one image is required"),
  is_new_arrival: z.boolean(),
  is_feature: z.boolean(),
  rating_count: z.number().min(0),
});

export type ProductFormInputs = z.infer<typeof productSchema>;
