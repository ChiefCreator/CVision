import { adaptDocument } from "../utils/adaptDocument";

export type TemplateData = ReturnType<typeof adaptDocument>;

export type StrictTemplateData = {
  [K in keyof TemplateData]-?: NonNullable<TemplateData[K]>;
};
