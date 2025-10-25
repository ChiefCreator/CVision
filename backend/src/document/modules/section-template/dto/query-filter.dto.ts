import { Type } from "class-transformer";
import { IsBoolean, IsOptional } from "class-validator";

export class QueryFilterDto {
	@IsOptional()
	@Type(() => Boolean)
	@IsBoolean({ message: "Параметр isDefault должен быть булевым значением." })
	isDefault?: boolean;

	@IsOptional()
	@Type(() => Boolean)
	@IsBoolean({ message: "Параметр isOrderFixed должен быть булевым значением." })
  isOrderFixed?: boolean;

	@IsOptional()
	@Type(() => Boolean)
	@IsBoolean({ message: "Параметр isMultiple должен быть булевым значением." })
  isMultiple?: boolean;

	@IsOptional()
	@Type(() => Boolean)
	@IsBoolean({ message: "Параметр isRequired должен быть булевым значением." })
  isRequired?: boolean;
}