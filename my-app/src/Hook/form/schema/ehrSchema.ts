import { z } from "zod";

export const ehrSchema = z.object({
 name: z.string().min(2, "Name too short"),
  surname: z.string().min(2, "Surname too short"),
  gender: z.enum(["Male", "Female", "Other"]),
  location: z.string().min(2, "Location is required"),
  email: z.string().email("Invalid email"),
  ssn: z.string().length(16, "SSN must be 16 characters"),
  dateOfBirth: z
    .string()
    .min(1, "Date of birth is required")
    .refine((val) => {
      const d = new Date(val);
      return !isNaN(d.getTime());
    }, {
      message: "Invalid date format",
    }),
  phone: z.string().min(10, "Invalid phone number"),
});

export type EhrFormValues = z.infer<typeof ehrSchema>;