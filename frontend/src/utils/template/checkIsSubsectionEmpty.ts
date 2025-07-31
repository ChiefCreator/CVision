export const checkIsSubsectionEmpty = (subsection: Record<string, any>) => {
  const { id, order, sectionId, ...props } = subsection;
  const values = Object.values(props);

  return values.length === 0 || values.every(value => value === "" || value === null || value === undefined);
}

export const checkIsAllSubsectionsEmpty = (subsections?: Record<string, any>[]) => {
  if (!subsections?.length) return true;

  return subsections.reduce((acc, subsection) => {
    return !!checkIsSubsectionEmpty(subsection);
  }, false);
}