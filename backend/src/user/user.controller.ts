import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post } from '@nestjs/common';

import { Authorization } from "src/auth/decorators/authentication.decorator";
import { User } from "src/auth/decorators/user.decorator";
import { CreateUserDto } from "./dto/create-user.dto";
import { UserService } from './user.service';

@Controller("users")
export class UserController {
  constructor(private readonly userService: UserService) {};

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
  
  @Get("email/:email")
  async findByEmail(@Param("email") email: string) {
    return this.userService.findByEmail(email);
  }
  
  @Post()
  async create(@Body() dto: CreateUserDto) {
    return this.userService.create(dto);
  }

  @Post(":id")
  async delete(@Param("id") id: string) {
    return this.userService.delete(id);
  }
}
