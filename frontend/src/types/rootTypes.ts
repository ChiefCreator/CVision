export interface BaseEntityFields {
  id: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface BaseSectionResume {
  id: string;
  title: string;
  defaultTitle: string;

  order: number;
}

export interface BaseComponent {
  className?: string;
}