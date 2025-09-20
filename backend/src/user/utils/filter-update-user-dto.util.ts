import { User } from "prisma/generated/client";
import { UpdateUserDto } from "../dto/update-user.dto";

export const filterUpdateUserDto = (data: UpdateUserDto, user: User): UpdateUserDto => {
  return Object.fromEntries(
    Object.entries(data).filter(([key, value]) => {
      return (
        value !== "" &&
        value !== undefined &&
        value !== user[key as keyof UpdateUserDto]
      );
    })
  );
};
