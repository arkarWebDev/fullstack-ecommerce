import { z } from "zod";

export const emailUpdateSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email." }),
});

export const nameUpdateSchema = z.object({
  name: z.string().min(3, { message: "Username must have 3 characters." }),
});
