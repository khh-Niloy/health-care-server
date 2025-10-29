import { z } from "zod";

export const createPatientZodSchema = z.object({
  name: z.string().nonempty("Name is required"),
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  address: z.string().optional(),
});

export const createDoctorZodSchema = z.object({
  ...createPatientZodSchema.shape,
  contactNumber: z.string().nonempty("Contact number is required"),
  registrationNumber: z.string().nonempty("Registration number is required"),
  experience: z.number().min(0, "Experience must be at least 0"),
  gender: z.enum(["MALE", "FEMALE"]),
  appointmentFee: z.number().min(0, "Appointment fee must be at least 0"),
  qualification: z.string().nonempty("Qualification is required"),
  currentWorkingPlace: z.string().nonempty("Current working place is required"),
  designation: z.string().nonempty("Designation is required"),
});