import { z } from "zod";

const registerSchema = z
  .object({
    email: z
      .string({ required_error: "Username is require" })
      .email()
      .min(5, {
        message: "Username must be contain almost 5 character",
      })
      .max(100, { message: "Username must be contain less than 50 character" }),
    password: z
      .string({ required_error: "Password is require" })
      .min(5, { message: "Password must be contain almost 5 character" })
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}|:"<>?~\\-]).{5,30}$/,
        {
          message:
            "Password must be almost one uppercase, one number and one special character",
        }
      )
      .max(30, { message: "Password must be contain less than 50 character" }),
    confirmPassword: z
      .string({ required_error: "Retype password is require" })
      .min(5, { message: "Password must be contain almost 5 character" })
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}|:"<>?~\\-]).{5,30}$/,
        {
          message:
            "Password must be almost one uppercase, one number and one special character",
        }
      )
      .max(30, { message: "Password must be contain less than 50 character" }),
    firstName: z
      .string({ required_error: "First name is require" })
      .regex(/[a-zA-z]/, {
        message: "First name must be contain only letters",
      })
      .min(2, { message: "First name must be contain almost 2 letters" })
      .max(30, { message: "First name must be contain less than 30 letters" }),
    lastName: z
      .string({ required_error: "Last name is require" })
      .regex(/[a-zA-z]/, { message: "Last name must be contain only letters" })
      .min(2, { message: "Last name must be contain almost 2 letters" })
      .max(30, { message: "Last name must be contain less than 30 letters" }),
    dni: z
      .string()
      .regex(/^\d{6,15}$/, { message: "DNI number must contain only numbers" })
      .min(6, { message: "DNI number must be contain almost 6 numbers" })
      .max(15, { message: "DNI number must be contain less than 15 numbers" }),
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export default registerSchema;
