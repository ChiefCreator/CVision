import sectionsConfig from "../data/sectionsConfig";

export function createDefaultResume(resumeId) {
  return {
    id: resumeId,
    creationDate: new Date(),
    changeDate: null,
    template: "resume-1",
    lineSpacing: 100,
    sections: Object.values(sectionsConfig).map(({ defaultTitle, defaultOrder, sectionId }) => ({
      title: defaultTitle,
      order: defaultOrder,
      id: sectionId,
    })),
  };
}

export function createDefaultCoverLetter(id) {
  return {
    id,
    creationDate: new Date(),
    changeDate: null,
    template: "cover-letter-1",
    lineSpacing: 100,
    sections: [
      {
        id: "personalDetails",
      },
      {
        id: "employerDetails",
      },
      {
        id: "letterDetails",
      },
    ]
  }
}

export function updateDocumentChangeDate(document) {
  document.changeDate = new Date();
}