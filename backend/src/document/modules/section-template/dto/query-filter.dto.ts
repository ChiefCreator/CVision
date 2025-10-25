import { Transform } from "class-transformer";
import { IsBoolean, IsOptional } from "class-validator";

export class QueryFilterDto {
	@IsOptional()
	@Transform(({ value }) => value === "true" || value === true)
	@IsBoolean({ message: "Параметр isDefault должен быть булевым значением." })
	isDefault?: boolean;

	@IsOptional()
	@Transform(({ value }) => value === "true" || value === true)
	@IsBoolean({ message: "Параметр isOrderFixed должен быть булевым значением." })
  isOrderFixed?: boolean;

	@IsOptional()
	@Transform(({ value }) => value === "true" || value === true)
	@IsBoolean({ message: "Параметр isMultiple должен быть булевым значением." })
  isMultiple?: boolean;

	@IsOptional()
	@Transform(({ value }) => value === "true" || value === true)
	@IsBoolean({ message: "Параметр isRequired должен быть булевым значением." })
  isRequired?: boolean;
}