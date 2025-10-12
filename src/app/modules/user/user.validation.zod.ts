import { z } from "zod";

export const createPatientZodSchema = z.object({
  name: z.string().nonempty("Name is required"),
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  address: z.string().optional(),
});
