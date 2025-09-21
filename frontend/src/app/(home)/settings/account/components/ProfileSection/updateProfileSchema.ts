import * as z from "zod";

const avatarSchema = z
  .instanceof(File)
  .optional()
  .nullable();

const isResetPictureSchema = z.boolean();

const nameSchema = z
  .string("Имя обязательно для заполнения")
  .min(2, "Имя должно содержать минимум 2 символа");

const emailSchema = z
  .string("Email обязателен для заполнения")
  .email("Введите корректный email");


const baseProfileSchema = z.object({
  name: nameSchema.optional(),
  email: emailSchema.optional(),
  picture: avatarSchema,
  isResetPicture: isResetPictureSchema.optional(),
});

export const updateProfileSchema = baseProfileSchema
  .partial()
  .refine((obj) => Object.keys(obj).length > 0, { message: "Хотя бы одно поле должно быть изменено" })
  .strict();

export type UpdateProfileFormData = z.infer<typeof updateProfileSchema>;