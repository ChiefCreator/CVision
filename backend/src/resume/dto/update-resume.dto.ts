import { IsOptional, IsString, IsArray, IsEnum, IsBoolean, IsNumber, ValidateNested, IsDateString } from 'class-validator';
import { Type } from 'class-transformer';

export class PersonalDetailsDto {
  @IsOptional() @IsString() title?: string;
  @IsOptional() @IsString() defaultTitle?: string;

  @IsOptional() @IsString() avatarUrl?: string;
  @IsOptional() @IsString() jobTitle?: string;
  @IsOptional() @IsString() fullName?: string;
  @IsOptional() @IsString() email?: string;
  @IsOptional() @IsString() phone?: string;
  @IsOptional() @IsString() address?: string;
  @IsOptional() @IsString() city?: string;
  @IsOptional() @IsString() country?: string;
  @IsOptional() @IsString() postalCode?: string;
  @IsOptional() @IsString() drivingLicense?: string;
  @IsOptional() @IsString() birthPlace?: string;
  @IsOptional() @IsDateString() birthDate?: string;
  @IsOptional() @IsString() nationality?: string;
}

export class ProfessionalSummaryDto {
  @IsOptional() @IsString() title?: string;
  @IsOptional() @IsString() defaultTitle?: string;

  @IsOptional() @IsString() summary?: string;
}

export class EmploymentHistoryItemDto {
  @IsOptional() @IsString() jobTitle?: string;
  @IsOptional() @IsString() employer?: string;
  @IsOptional() @IsDateString() startDate?: string;
  @IsOptional() @IsDateString() endDate?: string;
  @IsOptional() @IsString() city?: string;
  @IsOptional() @IsString() description?: string;
}
export class EmploymentHistorySectionDto {
  @IsOptional() @IsString() title?: string;
  @IsOptional() @IsString() defaultTitle?: string;
  @IsNumber() order: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => EmploymentHistoryItemDto)
  data: EmploymentHistoryItemDto[];
}

export class EducationItemDto {
  @IsOptional() @IsString() school?: string;
  @IsOptional() @IsString() degree?: string;
  @IsOptional() @IsDateString() startDate?: string;
  @IsOptional() @IsDateString() endDate?: string;
  @IsOptional() @IsString() city?: string;
  @IsOptional() @IsString() description?: string;
}
export class EducationSectionDto {
  @IsOptional() @IsString() title?: string;
  @IsOptional() @IsString() defaultTitle?: string;
  @IsNumber() order: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => EducationItemDto)
  data: EducationItemDto[];
}

export class LinkDto {
  @IsOptional() @IsString() label?: string;
  @IsOptional() @IsString() url?: string;
}
export class LinkSectionDto {
  @IsOptional() @IsString() title?: string;
  @IsOptional() @IsString() defaultTitle?: string;
  @IsNumber() order: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => LinkDto)
  data: LinkDto[];
}

export enum SkillLevel {
  novice = 'novice',
  beginner = 'beginner',
  skillful = 'skillful',
  experienced = 'experienced',
  expert = 'expert',
}
export class SkillDto {
  @IsOptional() @IsString() title?: string;
  @IsEnum(SkillLevel) level: SkillLevel;
}
export class SkillSectionDto {
  @IsOptional() @IsString() title?: string;
  @IsOptional() @IsString() defaultTitle?: string;
  @IsNumber() order: number;

  @IsBoolean() isShowLevel: boolean;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SkillDto)
  data: SkillDto[];
}

export enum LanguageLevel {
  nativeSpeaker = 'nativeSpeaker',
  highlyProficient = 'highlyProficient',
  goodWorkingKnowledge = 'goodWorkingKnowledge',
  workingKnowledge = 'workingKnowledge',
  A1 = 'A1',
  A2 = 'A2',
  B1 = 'B1',
  B2 = 'B2',
  C1 = 'C1',
  C2 = 'C2',
}
export class LanguageDto {
  @IsOptional() @IsString() title?: string;
  @IsOptional() @IsEnum(LanguageLevel) level?: LanguageLevel;
}
export class LanguageSectionDto {
  @IsOptional() @IsString() title?: string;
  @IsOptional() @IsString() defaultTitle?: string;
  @IsNumber() order: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => LanguageDto)
  data: LanguageDto[];
}

export class CourseDto {
  @IsOptional() @IsString() title?: string;
  @IsOptional() @IsString() institution?: string;
  @IsOptional() @IsDateString() startDate?: string;
  @IsOptional() @IsDateString() endDate?: string;
}
export class CourseSectionDto {
  @IsOptional() @IsString() title?: string;
  @IsOptional() @IsString() defaultTitle?: string;
  @IsNumber() order: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CourseDto)
  data: CourseDto[];
}

export class InternshipSubsectionDto {
  @IsOptional() @IsString() jobTitle?: string;
  @IsOptional() @IsString() employer?: string;
  @IsOptional() @IsDateString() startDate?: string;
  @IsOptional() @IsDateString() endDate?: string;
  @IsOptional() @IsString() city?: string;
  @IsOptional() @IsString() description?: string;
}
export class InternshipsSectionDto {
  @IsOptional() @IsString() title?: string;
  @IsOptional() @IsString() defaultTitle?: string;
  @IsNumber() order: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => InternshipSubsectionDto)
  data: InternshipSubsectionDto[];
}

export class ExtraCurricularActivitySubsectionDto {
  @IsOptional() @IsString() functionTitle?: string;
  @IsOptional() @IsString() employer?: string;
  @IsOptional() @IsDateString() startDate?: string;
  @IsOptional() @IsDateString() endDate?: string;
  @IsOptional() @IsString() city?: string;
  @IsOptional() @IsString() description?: string;
}
export class ExtraCurricularActivitiesSectionDto {
  @IsOptional() @IsString() title?: string;
  @IsOptional() @IsString() defaultTitle?: string;
  @IsNumber() order: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ExtraCurricularActivitySubsectionDto)
  data: ExtraCurricularActivitySubsectionDto[];
}

export class ReferenceSubsectionDto {
  @IsOptional() @IsString() referentFullName?: string;
  @IsOptional() @IsString() company?: string;
  @IsOptional() @IsString() phone?: string;
  @IsOptional() @IsString() email?: string;
}
export class ReferencesSectionDto {
  @IsOptional() @IsString() title?: string;
  @IsOptional() @IsString() defaultTitle?: string;
  @IsNumber() order: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ReferenceSubsectionDto)
  data: ReferenceSubsectionDto[];
}

export class HobbiesSectionDto {
  @IsOptional() @IsString() title?: string;
  @IsOptional() @IsString() defaultTitle?: string;
  @IsNumber() order: number;

  @IsOptional() @IsString() hobbyDescription?: string;
}

export class CustomDataDto {
  @IsOptional() @IsString() title?: string;
  @IsOptional() @IsString() city?: string;
  @IsOptional() @IsDateString() startDate?: string;
  @IsOptional() @IsDateString() endDate?: string;
  @IsOptional() @IsString() description?: string;
}
export class CustomSectionDto {
  @IsOptional() @IsString() title?: string;
  @IsOptional() @IsString() defaultTitle?: string;
  @IsNumber() order: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CustomDataDto)
  data: CustomDataDto[];
}

export class UpdateResumeDto {
  @IsOptional() @IsString() title?: string;
  @IsOptional() @IsString() template?: string;

  @IsOptional() @ValidateNested() @Type(() => PersonalDetailsDto)
  personalDetails?: PersonalDetailsDto;

  @IsOptional() @ValidateNested() @Type(() => ProfessionalSummaryDto)
  professionalSummary?: ProfessionalSummaryDto;

  @IsOptional() @ValidateNested() @Type(() => EmploymentHistorySectionDto)
  employmentHistory?: EmploymentHistorySectionDto;

  @IsOptional() @ValidateNested() @Type(() => EducationSectionDto)
  education?: EducationSectionDto;

  @IsOptional() @ValidateNested() @Type(() => LinkSectionDto)
  links?: LinkSectionDto;

  @IsOptional() @ValidateNested() @Type(() => SkillSectionDto)
  skills?: SkillSectionDto;

  @IsOptional() @ValidateNested() @Type(() => LanguageSectionDto)
  languages?: LanguageSectionDto;

  @IsOptional() @ValidateNested() @Type(() => CourseSectionDto)
  courses?: CourseSectionDto;

  @IsOptional() @ValidateNested() @Type(() => InternshipsSectionDto)
  internships?: InternshipsSectionDto;

  @IsOptional() @ValidateNested() @Type(() => ExtraCurricularActivitiesSectionDto)
  extraCurricularActivities?: ExtraCurricularActivitiesSectionDto;

  @IsOptional() @ValidateNested() @Type(() => ReferencesSectionDto)
  references?: ReferencesSectionDto;

  @IsOptional() @ValidateNested() @Type(() => HobbiesSectionDto)
  hobbies?: HobbiesSectionDto;

  @IsOptional() @ValidateNested() @Type(() => CustomSectionDto)
  customSections?: CustomSectionDto;
}

export type ResumeFieldUpdates = Record<string, any>
