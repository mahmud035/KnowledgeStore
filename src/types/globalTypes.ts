export interface IBook {
  _id: string;
  title: string;
  author: string;
  email: string;
  genre: string;
  publishYear: string;
  reviews?: string[];
}
