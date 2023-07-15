export interface IBook {
  _id: string;
  title: string;
  author: string;
  email: string;
  genre: string;
  publishYear: string;
  reviews?: string[];
}

export interface ISearchAndFilter {
  searchText?: string | undefined | null;
  limit?: number | undefined | null;
  genre?: string | undefined | null;
  publishYear?: string | undefined | null;
}
