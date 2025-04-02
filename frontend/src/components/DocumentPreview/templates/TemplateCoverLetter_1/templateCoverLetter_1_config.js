const templateCoverLetter_1_config = {
  getHeaderSections(sections) {
    const personalDetailsSection = sections && Object.fromEntries(
      Object.entries(sections.find(section => section.id === "personalDetails"))
        .filter(([key]) => !["adress", "email", "phoneNumber"].includes(key))
    );
  
    return sections ? [personalDetailsSection] : [];
  },
  getAsideSections(sections) {
    const personalDetailsSection = sections && sections.find(section => section.id === "personalDetails");
    const employerDetailsSection = sections && sections.find(section => section.id === "employerDetails");

    const sectionTo = { hiringManagerName: employerDetailsSection?.hiringManagerName, companyName: employerDetailsSection?.companyName, id: "sectionTo" };
    const sectionFrom = { ...personalDetailsSection, id: "sectionFrom" }
   
    return sections ? [sectionTo, sectionFrom] : [];
  },
  getMainSections(sections) {
    const letterDetailsSection = sections && sections.find(section => section.id === "letterDetails");

    return sections ? [letterDetailsSection] : [];
  }
};

export default templateCoverLetter_1_config;