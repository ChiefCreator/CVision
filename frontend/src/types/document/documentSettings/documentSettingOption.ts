export interface DocumentSettingOption<T = string> {
  id: string;
  name?: string;
  value: T;
}