export const checkIsSubsectionDataEmpty = (data: Record<string, any> | undefined) => {
  if (!data) return true;

  const values = Object.values(data);

  return values.length === 0 || values.every(value => !value);
}

export const checkIsAllSubsectionsDataEmpty = (subsectionsData?: (Record<string, any> | undefined)[]) => {
  if (!subsectionsData?.length) return true;

  return subsectionsData.reduce((acc, data) => {
    return !!checkIsSubsectionDataEmpty(data);
  }, false);
}