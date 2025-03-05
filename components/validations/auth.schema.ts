import z from "zod";

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export type loginFormData = z.infer<typeof loginSchema>;

export const createUserSchema = z
  .object({
    email: z.string().email(),
    userName: z.string(),
    password: z.string().min(6),
    confirmPassword: z.string().min(6),
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    message: "Password did not matched",
    path: ["confirmPassword"],
  });

export type createUserFormData = z.infer<typeof createUserSchema>