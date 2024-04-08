import { z } from "zod";

const registerSchema = z.object({
  title: z
    .string({ required_error: "Title is required" })
    .min(5, {
      message: "Title must be at least 5 characters",
    })
    .max(50, {
      message: "Title must be less than 100 characters",
    }),
  description: z
    .string({ required_error: "Description is required" })
    .min(5, {
      message: "Description must be at least 5 characters",
    })
    .max(50, {
      message: "Description must be less than 100 characters",
    }),
  gif: z.string({ required_error: "Gif is required" }).url({
    message: "Gif must be a valid URL",
  }),
  steps: z.array(
    z.object({
      content: z
        .string({ required_error: "Content is required" })
        .min(3, {
          message: "Content must be at least 3 characters",
        })
        .max(100, {
          message: "Content must be less than 100 characters",
        }),
      order: z
        .number({ required_error: "Order is required" })
        .int({ message: "Order must be an integer" })
        .min(1, { message: "Order must be at least 1" })
        .max(10, { message: "Order must be less than 50" }),
    })
  ),
});

export default registerSchema;
