import { IsNotEmpty, IsString } from "class-validator";

export class ChangeEmailDto {
	@IsString({ message: "Токен должен быть строкой." })
	@IsNotEmpty({ message: "Поле токен не может быть пустым." })
	token: string;
}