import { BaseEntityFields } from "../root";
import { Document } from "./document";

export type UpdateDocument = Partial<Omit<Document, 
	keyof BaseEntityFields
	| "userId"
	| "typeId"
	| "templateId"
>>;

export type DocumentFieldUpdates = Record<string, UpdateDocument>;