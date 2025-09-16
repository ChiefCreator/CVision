import { Transform } from "class-transformer";
import { IsBoolean, IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";
import { AuthMethod } from "prisma/generated/client";

export class CreateUserDto {
	@IsString({ message: "Имя должно быть строкой." })
	@IsNotEmpty({ message: "Имя обязательно для заполнения." })
	@Transform(({ value }) => value.trim())
	name: string;

	@IsString({ message: "Email должен быть строкой." })
	@IsEmail({}, { message: "некорректный формат email." })
	@IsNotEmpty({ message: "Email обязателен для заполнения." })
	email: string;

	@IsString({ message: "Пароль должен быть строкой." })
	@IsNotEmpty({ message: "Пароль обязателен для заполнения." })
	@MinLength(6, { message: "Пароль должен содержать минимум 6 символов." })
	password: string;

	@IsOptional()
  @IsString({ message: "Фото профиля должно быть строкой." })
  picture?: string;

	@IsEnum(AuthMethod, { message: "Неверный метод аутентификации." })
  authMethod: AuthMethod;

  @IsBoolean({ message: "isVerified должно быть boolean." })
  isVerified: boolean;
}