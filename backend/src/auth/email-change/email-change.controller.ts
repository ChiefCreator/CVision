import { Body, Controller, HttpCode, HttpStatus, Post, Req } from '@nestjs/common'
import { Request } from 'express'

import { ChangeEmailDto } from './dto/change-email.dto'
import { EmailChangeService } from './email-change.service'

@Controller("auth/email-change")
export class EmailChangeController {
	constructor(
		private readonly emailChangeService: EmailChangeService
	) {}

	@Post()
	@HttpCode(HttpStatus.OK)
	async newEmail(@Req() req: Request, @Body() dto: ChangeEmailDto) {
		return this.emailChangeService.newEmail(req, dto)
	}
}
