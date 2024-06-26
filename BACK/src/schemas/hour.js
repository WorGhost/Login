import { z } from "zod";

export const createHourSchema = z.object({
  hours: z.number({
    required_error: "Hour is required",
  }),
  description: z
    .string({
      required_error: "description must be a string",
    }),
  date: z.string().datetime().optional(),
});
