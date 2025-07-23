import { z } from "zod";

export const emailUpdateSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email." }),
});
