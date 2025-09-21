import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, UploadedFile, UseInterceptors } from '@nestjs/common';

import { FileInterceptor } from "@nestjs/platform-express";
import { User as UserType } from "prisma/generated/client";
import { Authorization } from "src/auth/decorators/authentication.decorator";
import { User } from "src/auth/decorators/user.decorator";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { UserService } from './user.service';

@Controller("users")
export class UserController {
  constructor(private readonly userService: UserService) {};

  @Authorization()
  @Get("me")
  async getCurrentUser(@User() user: UserType) {
    return user;
  }

  @Authorization()
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(FileInterceptor('picture'))
  @Patch("me")
  async updateCurrentUser(@User("id") id: string, @UploadedFile() picture: Express.Multer.File | undefined, @Body() dto: UpdateUserDto) {
    return this.userService.updateUser(id, dto, picture);
  }

  @Authorization()
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(FileInterceptor('picture'))
  @Post("me/avatar")
  async uploadCurrentUserAvatar(@User("id") id: string, @UploadedFile() picture: Express.Multer.File) {
    return this.userService.uploadAvatar(id, picture);
  }

  @Authorization()
  @HttpCode(HttpStatus.OK)
  @Get("profile")
  async getProfile(@User("id") id: string) {
    return this.userService.findById(id);
  }

  @Authorization("admin")
  @Get(":id")
  async findById(@Param("id") id: string) {
    return this.userService.findById(id);
  }
  
  @Authorization("admin")
  @Get("email/:email")
  async findByEmail(@Param("email") email: string) {
    return this.userService.findByEmail(email);
  }

  @Authorization("admin")
  @Post()
  async create(@Body() dto: CreateUserDto) {
    return this.userService.create(dto);
  }

  @Authorization()
  @Delete("me")
  async deleteCurrentUser(@User("id") id: string) {
    return this.userService.delete(id);
  }

  @Authorization("admin")
  @Delete(":id")
  async delete(@Param("id") id: string) {
    return this.userService.delete(id);
  }
}
