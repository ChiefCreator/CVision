import { Controller, Get, Query } from '@nestjs/common';

import { Authorization } from "src/auth/decorators/authentication.decorator";
import { QueryFilterDto } from "./dto/query-filter.dto";
import { SectionTemplateService } from "./section-template.service";

@Controller("section-templates")
export class SectionTemplateController {
	constructor(private readonly sectionTemplateService: SectionTemplateService) {}

	// find

	@Authorization()
	@Get("root")
	async findAllRoot(@Query() queryFilter: QueryFilterDto = {}) {
		return this.sectionTemplateService.findAllRoot(queryFilter);
	}
}
