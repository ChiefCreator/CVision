import { Injectable, NotFoundException } from '@nestjs/common';
import * as argon2 from "argon2";

import { PrismaService } from "src/prisma/prisma.service";
import { CreateUserDto } from "./dto/create-user.dto";


@Injectable()
export class UserService {
  private readonly include: any;

  constructor(private readonly prismaService: PrismaService) {
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
}
