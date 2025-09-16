import * as z from "zod";

export const loginSchema = z.object({
  email: z.string("Email обязателен для заполнения").email("Введите корректный email"),
  password: z
    .string("Паспорт обязателен для заполнения")
    .min(8, "Пароль должен содержать минимум 8 символов")
    .max(64, "Пароль слишком длинный")
    .regex(/[A-Z]/, "Пароль должен содержать хотя бы одну заглавную букву")
    .regex(/[a-z]/, "Пароль должен содержать хотя бы одну строчную букву")
    .regex(/[0-9]/, "Пароль должен содержать хотя бы одну цифру"),
});

export type LoginFormData = z.infer<typeof loginSchema>;