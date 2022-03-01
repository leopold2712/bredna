export interface IResourceListFields<T = string> {
  name: string;
  key: T;
  width: number;
  centered?: boolean;
}
