import { IsBoolean, IsEnum, IsOptional, IsString } from "class-validator";
import { AuthMethod } from "prisma/generated/client";

export class UpdateUserDto {
	@IsOptional()
	@IsString({ message: "Имя должно быть строкой." })
	name?: string;

	@IsOptional()
	@IsString({ message: "Email должен быть строкой." })
	email?: string;

	@IsOptional()
	@IsEnum(AuthMethod, { message: "Неверный метод аутентификации." })
  authMethod?: AuthMethod;

	@IsOptional()
  @IsBoolean({ message: "isVerified должно быть boolean." })
  isVerified?: boolean;

	@IsOptional()
  isResetPicture?: boolean;
}