import { BadRequestException, forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import * as argon2 from "argon2";

import { AuthService } from "src/auth/auth.service";
import { PrismaService } from "src/prisma/prisma.service";
import { StorageService } from "src/storage/storage.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { filterUpdateUserDto } from "./utils/filter-update-user-dto.util";
import { isFilteredDataEmpty } from "./utils/is-filtered-data-empty.util";


@Injectable()
export class UserService {
  private readonly include: any;

  constructor(
    private readonly prismaService: PrismaService,
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
    private readonly storageService: StorageService,
  ) {
    this.include = { accounts: true };
  }

  async findById(id: string) {
    const user = await this.prismaService.user.findUnique({
      where: { id },
      include: this.include
    });

    if (!user) {
      throw new NotFoundException("Пользователь не найден. Пожалуйста, проверьте введенные данные.")
    }

    return user;
  }

  async findByEmail(email: string) {
    const user = await this.prismaService.user.findUnique({
      where: { email },
      include: this.include
    });

    return user;
  }

  async create({ email, password, name, picture, authMethod, isVerified }: CreateUserDto) {
    const user = await this.prismaService.user.create({
      data: {
        email,
        password: password ? await argon2.hash(password) : "",
        name,
        picture,
        authMethod,
        isVerified
      },
      include: this.include
    })

    return user;
  }

  async delete(id: string) {
    const deletedUser = await this.prismaService.user.delete({
      where: { id },
      include: this.include,
    })

    return { message: "Аккаунт успешно удален", user: deletedUser };
  }

  async updateUser(id: string, dto: UpdateUserDto, picture: Express.Multer.File | undefined) {
    const user = await this.findById(id);

    const { isResetPicture, email, ...data } = dto;
    const filteredData = filterUpdateUserDto(data, user);
    const messages: string[] = [];

    if (email && email !== user.email) {
      await this.authService.updateUserEmail(id, email);

      messages.push("Пожалуйста, подтвердите ваш email. Сообщение было отправлено на новый почтовый адрес.");
    }

    if (picture) {
      await this.uploadAvatar(id, picture);

      messages.push("Аватарка пользователя успешно изменена.");
    } else if (isResetPicture) {
      await this.prismaService.user.update({
        where: { id },
        data: { picture: null },
      });

      messages.push("Аватарка пользователя успешно удалена.");
    }

    if (!isFilteredDataEmpty(filteredData)) {
      await this.prismaService.user.update({
        where: { id },
        data: filteredData,
      });

      messages.push("Данные пользователя успешно изменены.");
    }

    if (messages.length === 0) {
      throw new BadRequestException("Изменений не найдено. Данные остались без изменений.");
    }

    return { message: messages.join(" ") };
  }

  async uploadAvatar(id: string, picture: Express.Multer.File) {
    const user = await this.findById(id);

    const { url } = await this.storageService.uploadFile({ file: picture, key: `avatars/${id}.jpg` });

    await this.prismaService.user.update({
      where: { id },
      data: { picture: url },
    });

    return { avatarUrl: url };
  }
}
