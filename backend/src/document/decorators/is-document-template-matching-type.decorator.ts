import { registerDecorator, ValidationArguments, ValidationOptions } from "class-validator";
import { DOCUMENT_TEMPLATES_MAP } from "../constants/document-templates-map.constants";

export function IsDocumentTemplateMatchingType(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: "isTemplateMatchingType",
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: {
        validate(value: string | undefined, args: ValidationArguments) {
          const obj = args.object as any;
          const allowedTemplates = DOCUMENT_TEMPLATES_MAP[obj.type];

          return allowedTemplates.includes(value);
        },
        defaultMessage(args: ValidationArguments) {
          const obj = args.object as any;
          const allowedTemplates = DOCUMENT_TEMPLATES_MAP[obj.type];

          return `Шаблон "${args.value}" не разрешён для типа "${obj.type}". Разрешены следующие шаблоны: ${allowedTemplates?.join(", ")}`;
        },
      },
    });
  };
}
