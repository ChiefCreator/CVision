const template_1_config = {
  blocksOverSections: ["header"],

  headerSectionsIds: ["personalInformation"],
  asideSectionsIds: ["skills", "languages", "hobbies", "gender", "nationality", "configurableFields"],
  mainSectionsIds: ["professionalSummary", "employmentHistory", "courses", "exstraCurricular"],

  getHeaderSections(sections) {
    const personalInformationSection = sections && Object.fromEntries(
      Object.entries(sections.find(section => section.id === "personalInformation"))
        .filter(([key]) => !["configurableFields", "nationality", "gender"].includes(key))
    );

    return sections ? [personalInformationSection] : [];
  },
  getAsideSections(sections) {
    const nationalitySection = sections && { id: "nationality", nationality: sections.find(section => section.id === "personalInformation").nationality };
    const genderSection = sections && { id: "gender", gender: sections.find(section => section.id === "personalInformation").gender };
    const configurableFieldsSection = sections && { id: "configurableFields", configurableFields: sections.find(section => section.id === "personalInformation").configurableFields };
    const defaultSections = sections && sections.filter(section => this.asideSectionsIds.includes(section.id)).sort((a, b) => (a.order ?? Infinity) - (b.order ?? Infinity));

    return sections ? [genderSection, nationalitySection, configurableFieldsSection, ...defaultSections] : [];
  },
  getMainSections(sections) {
    const defaultSections = sections && sections.filter(section => this.mainSectionsIds.includes(section.id)).sort((a, b) => (a.order ?? Infinity) - (b.order ?? Infinity));

    return sections ? [...defaultSections] : [];
  }
}

export default template_1_config;