import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Reflector } from "@nestjs/core";
import { Request } from "express";
import { UserRole } from "prisma/generated/client";
import { ROLES_KEY } from "../decorators/roles.decorator";

@Injectable()
export class RolesGuard implements CanActivate {
	constructor(private readonly reflector: Reflector) {};

  canActivate(context: ExecutionContext) {
		const roles = this.reflector.getAllAndOverride<UserRole[]>(ROLES_KEY, [context.getHandler(), context.getClass()]);

		if (!roles) return true;

		const req = context.switchToHttp().getRequest() as Request;

		if (!req.user || !roles.includes(req.user.role)) {
			throw new ForbiddenException("Недостаточно прав. У вас нет доступа к этому ресурсу.")
		}

		return true;
  }
}