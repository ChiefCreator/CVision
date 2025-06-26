export interface BaseEntityFields {
  id: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface BaseSectionResume {
  id: string;
  order: number;
}

export interface BaseComponent {
  className?: string;
}