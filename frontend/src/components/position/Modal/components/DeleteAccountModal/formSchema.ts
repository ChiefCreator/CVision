import * as z from "zod";

export const formSchema = (currentEmail: string) => z.object({
	confirmation: z
		.string("Email обязателен для заполнения")
		.email("Введите корректный email")
		.refine((val) => val === currentEmail, {
      message: "Email не совпадает с текущим",
    }),
});

export type FormSchema = z.infer<typeof formSchema>;