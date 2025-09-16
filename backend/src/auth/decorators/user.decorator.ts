import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { Request } from "express";
import { User as UserType } from "prisma/generated/client";

export const User = createParamDecorator((userField: keyof UserType, ctx: ExecutionContext) => {
  const req = ctx.switchToHttp().getRequest() as Request;

	const user = req.user;

	return userField ? user?.[userField] : user;
});