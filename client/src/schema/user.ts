import { z } from "zod";

export const emailUpdateSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email." }),
});

export const nameUpdateSchema = z.object({
  name: z.string().min(3, { message: "Username must have 3 characters." }),
});

export const passwordUpdateSchema = z
  .object({
    oldPassword: z
      .string()
      .min(6, { message: "Password must have 6 characters" }),
    newPassword: z
      .string()
      .min(6, { message: "Password must have 6 characters" }),
    confirmPassword: z.string({
      required_error: "Please enter password again.",
    }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords are don't match.",
    path: ["confirmPassword"],
  });
