import { BadRequestException } from '@nestjs/common';
import { JSONSchemaType } from 'ajv';
import addFormats from 'ajv-formats';
import Ajv2020 from "ajv/dist/2020";

const ajv = new Ajv2020({ allErrors: true, useDefaults: true });

addFormats(ajv);

interface ValidateWithSchemaOptions {
  error?: Error;
}

export function validateWithSchema<T = unknown>(
  data: unknown,
  schema: JSONSchemaType<T>,
  options: ValidateWithSchemaOptions = {}
): T {
  const { error } = options;
  const validate = ajv.compile(schema);

  if (!validate(data)) {
    throw error ?? new BadRequestException({
      message: 'Валидация не успешна',
      errors: validate.errors,
    });
  }
  
  return data as T;
}
