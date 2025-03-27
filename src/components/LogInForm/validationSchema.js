import * as yup from "yup";

const validationSchema = yup.object({
  email: yup.string().required("Email обязателен").email("Некорректный email"),
  password: yup
    .string()
    .required("Пароль обязателен")
    .min(6, "Минимум 6 символов")
    .matches(/[A-Za-z]/, "Пароль должен содержать букву")
    .matches(/[0-9]/, "Пароль должен содержать цифру"),
});

export default validationSchema;