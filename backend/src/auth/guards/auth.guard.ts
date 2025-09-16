import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Request } from "express";
import { UserService } from "src/user/user.service";

@Injectable()
export class AuthGuard implements CanActivate {
	constructor(private readonly userService: UserService) {};

	async canActivate(context: ExecutionContext) {
		const req = context.switchToHttp().getRequest() as Request;

		if (typeof req.session.userId === "undefined") {
			throw new UnauthorizedException("Пользователь не авторизован. Пожалуйста, войдите в систему, чтобы получить доступ.")
		}

		const user = await this.userService.findById(req.session.userId);

		req.user = user;

		return true;
	}
}