import { UpdateUserDto } from "../dto/update-user.dto";

export const isFilteredDataEmpty = (data: UpdateUserDto) => {
	return Object.entries(data).length === 0;
}