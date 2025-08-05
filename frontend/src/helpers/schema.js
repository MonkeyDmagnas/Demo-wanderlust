import { z } from "zod";

export const signInSchema = z.object({
  email: z.string().min(1, { message: " email is required" }),
  password: z.string().min(1, "Password must be at least 1 character"),
});

export const signUpSchema = z.object({
  email: z.string().min(1, { message: " email is required" }),
  password: z.string().min(1, "Password must be at least 1 character"),
  userName: z.string().min(1, "Username is required"),
  fullName: z.string().min(1, "Fullname is required"),
});
