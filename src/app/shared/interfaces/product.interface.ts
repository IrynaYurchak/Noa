import { ICategoryResponse } from "./category.interface";

export interface IProductRequest {
  category: ICategoryResponse;
  name:string;
  path:string;
  description:string;
  price: number;
  imgPath:string;
  count: number;
}
export interface IProductResponse extends IProductRequest {
  id: string;
}
