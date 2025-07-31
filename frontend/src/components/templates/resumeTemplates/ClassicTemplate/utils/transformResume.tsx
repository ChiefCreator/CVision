import type { Resume } from "@/types/resume/resume";
import type { ClassicTemplateData } from "../types/data";

export const transformResume = (resume: Resume) => {
  const { personalDetails, professionalSummary, employmentHistory, education, skills,languages, links, courses, internships, hobbies, extraCurricularActivities, references, customSections } = resume;

  const sections: ClassicTemplateData = [];

  if (personalDetails) {
    sections.push(
      {
        name: "personalInformation",
        data: {
          id: "personalInformation",
          birthDate: personalDetails.birthDate,
          birthPlace: personalDetails.birthPlace,
          nationality: personalDetails.nationality,
          drivingLicense: personalDetails.drivingLicense,
        }
      },
      {
        name: "head",
        data: {
          id: "head",
          fullName: personalDetails.fullName,
          jobTitle: personalDetails.jobTitle,
          address: personalDetails.address,
          city: personalDetails.city,
          postalCode: personalDetails.postalCode,
          country: personalDetails.country,
          phone: personalDetails.phone,
          email: personalDetails.email,
        }
      }
    );


  }

  if (professionalSummary) {
    sections.push({
      name: "professionalSummary",
      data: professionalSummary
    });
  }

  if (employmentHistory) {
    sections.push({
      name: "employmentHistory",
      data: employmentHistory
    });
  }

  if (education) {
    sections.push({
      name: "education",
      data: education
    });
  }

  if (skills) {
    sections.push({
      name: "skills",
      data: skills,
    });
  }

  if (languages) {
    sections.push({
      name: "languages",
      data: languages
    });
  }

  if (links) {
    sections.push({
      name: "links",
      data: links,
    });
  }

  if (courses) {
    sections.push({
      name: "courses",
      data: courses
    });
  }

  if (internships) {
    sections.push({
      name: "internships",
      data: internships,
    });
  }

  if (hobbies) {
    sections.push({
      name: "hobbies",
      data: hobbies,
    });
  }

  if (extraCurricularActivities) {
    sections.push({
      name: "extraCurricularActivities",
      data: extraCurricularActivities,
    });
  }

  if (references) {
    sections.push({
      name: "references",
      data: references
    });
  }

  if (customSections?.length) {
    customSections.forEach((custom, index) => {
      sections.push({
        name: "customSections",
        data: custom
      });
    });
  }

  return sections;
}