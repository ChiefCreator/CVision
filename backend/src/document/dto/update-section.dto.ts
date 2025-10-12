import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class UpdateSectionDto {
	@IsNotEmpty({ message: "Id секции обязательно для заполнения" })
	@IsString({ message: "Id секции должен быть строкой." })
	id: string;

	@IsOptional()
	@IsString({ message: "Название секции должно быть строкой." })
	title?: string;

	@IsOptional()
	data?: any;

	@IsOptional()
	subsections?: UpdateSectionDto[];
}
