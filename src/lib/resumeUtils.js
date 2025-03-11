import sectionsConfig from "../data/sectionsConfig";

export function createDefaultResume(resumeId) {
  return {
    id: resumeId,
    sections: Object.values(sectionsConfig).map(({ defaultTitle, defaultOrder, sectionId }) => ({
      title: defaultTitle,
      order: defaultOrder,
      id: sectionId,
    })),
  };
}