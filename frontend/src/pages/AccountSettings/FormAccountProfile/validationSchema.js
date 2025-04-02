import * as yup from "yup";

const validationSchema = yup.object({
  name: yup.string().required("Имя обязательно").min(2, "Минимум 2 символа"),
  email: yup.string().required("Email обязателен").email("Некорректный email"),
});

export default validationSchema;