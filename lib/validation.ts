import { z } from "zod";

export const ProductFormDetails = z.object({
  color:z.enum(["orange", "red", "blue", "green", "black", "white"]),
  size: z.string(),
});

export type ProductFormType = z.infer<typeof ProductFormDetails>;
