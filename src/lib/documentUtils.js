import sectionsConfig from "../data/sectionsConfig";

export function createDefaultResume(resumeId) {
  return {
    id: resumeId,
    creationDate: new Date(),
    changeDate: null,
    template: "resume-1",
    sections: Object.values(sectionsConfig).map(({ defaultTitle, defaultOrder, sectionId }) => ({
      title: defaultTitle,
      order: defaultOrder,
      id: sectionId,
    })),
  };
}

export function updateDocumentChangeDate(document) {
  document.changeDate = new Date();
}