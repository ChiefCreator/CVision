import { Body, Controller, Delete, Param, Post } from '@nestjs/common';

import { Authorization } from "src/auth/decorators/authentication.decorator";
import { CreateSectionDto } from "./dto/create-section.dto";
import { SectionService } from "./section.service";

@Controller("documents/:documentId/sections")
export class SectionController {
	constructor(private readonly sectionService: SectionService) {}

	// create

	@Authorization()
	@Post()
	async create(
		@Param("documentId") documentId: string,
		@Body() body: CreateSectionDto
	) {
		return this.sectionService.create(documentId, body);
	}

	// delete

	@Authorization()
	@Delete(":id")
	async delete(@Param("id") id: string) {
		return this.sectionService.delete(id);
	}
}
