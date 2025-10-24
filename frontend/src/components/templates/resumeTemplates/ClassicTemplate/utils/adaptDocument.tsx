import { Document } from "@/types/document/document";
import { getBaseAdaptedSectionsByKey } from "@/utils/template/getBaseAdaptedSectionsByKey";
import { getBaseAdaptedSection } from "../../../../../utils/template/getBaseAdaptedSection";

export function adaptDocument(data: Document<"resume">) {
	const personalDetails = getBaseAdaptedSection(data.sections, "personalDetails");
	const professionalSummary = getBaseAdaptedSection(data.sections, "professionalSummary");
	const employmentHistory = getBaseAdaptedSection(data.sections, "employmentHistory");
  const education = getBaseAdaptedSection(data.sections, "education");
	const skills = getBaseAdaptedSection(data.sections, "skills");
	const languages = getBaseAdaptedSection(data.sections, "languages");
  const links = getBaseAdaptedSection(data.sections, "links");
  const courses = getBaseAdaptedSection(data.sections, "courses");
  const internships = getBaseAdaptedSection(data.sections, "internships");
  const hobbies = getBaseAdaptedSection(data.sections, "hobbies");
  const extracurricularActivities = getBaseAdaptedSection(data.sections, "extracurricularActivities");
  const references = getBaseAdaptedSection(data.sections, "references");
	const customSections = getBaseAdaptedSectionsByKey(data.sections, "customSection");

	return {
		head: {
			id: `head-${personalDetails?.id}`,
      title: "Шапка",
      order: personalDetails?.order,
			data: {
				fullName: personalDetails?.data?.fullName,
				jobTitle: personalDetails?.data?.jobTitle,
				address: personalDetails?.data?.address,
				city: personalDetails?.data?.city,
				postalCode: personalDetails?.data?.postalCode,
				country: personalDetails?.data?.country,
				phone: personalDetails?.data?.phone,
				email: personalDetails?.data?.email,
			},
		},
		personalInformation: {
			id: `personalInformation-${personalDetails?.id}`,
      title: "Персональная информация",
      order: personalDetails?.order,
			data: {
				birthDate: personalDetails?.data?.birthDate,
				birthPlace: personalDetails?.data?.birthPlace,
				nationality: personalDetails?.data?.nationality,
				drivingLicense: personalDetails?.data?.drivingLicense,
			},
		},
		professionalSummary,
		employmentHistory,
		education,
		skills,
		languages,
		links,
		courses,
		internships,
		hobbies,
		extracurricularActivities,
		references,
		customSections,
	};
}