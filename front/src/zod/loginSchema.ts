import { z } from "zod";

const loginSchema = z.object({
  email: z.string({ required_error: "Username is require" }).email(),
  password: z.string({ required_error: "Password is require" }),
});

export default loginSchema;
