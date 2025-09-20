import { BadRequestException, forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import * as argon2 from "argon2";

import { AuthService } from "src/auth/auth.service";
import { PrismaService } from "src/prisma/prisma.service";
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
    private readonly authService: AuthService
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
      include: this.include
    })

    return deletedUser;
  }

  async updateUser(id: string, dto: UpdateUserDto) {
    const user = await this.findById(id);

    const { email, ...data } = dto ?? {};

    const filteredData = filterUpdateUserDto(data, user);

    let isEmailChangeMessageSent = false;
    let isDataUpdated = false;

    if (email && email !== user.email) {
      await this.authService.updateUserEmail(id, email);

      isEmailChangeMessageSent = true;
    }

    if (!isFilteredDataEmpty(filteredData)) {
      await this.prismaService.user.update({
        where: { id },
        data: filteredData,
      })

      isDataUpdated = true;
    }

    if (isEmailChangeMessageSent && isDataUpdated) {
      return {
        message: "Данные пользователя успешно изменены. Пожалуйста, подтвердите ваш email. Сообщение было отправлено на новый почтовый адрес."
      }
    }

    if (isEmailChangeMessageSent) {
      return {
        message: "Пожалуйста, подтвердите ваш email. Сообщение было отправлено на новый почтовый адрес."
      }
    }

    if (isDataUpdated) {
      return {
        message: "Данные пользователя успешно изменены."
      }
    }

    throw new BadRequestException("Изменений не найдено. Данные остались без изменений.");
  }
}
