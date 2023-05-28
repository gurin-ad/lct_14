import { ITopic } from "./topic.interface";

export interface ICategories {
  id: number;
  name: string;
  topics: ITopic[];
  categories: ICategories[];
}
