/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import BookCard from '../components/BookCard';
import Dropdown from '../components/Dropdown';
import SearchField from '../components/SearchField';
import { useGetBooksQuery } from '../redux/features/books/bookApi';
import { getBooks } from '../redux/features/books/bookSlice';
import { useAppDispatch } from '../redux/hooks';
import { IBook } from '../types/globalTypes';
import { useState, ChangeEvent } from 'react';

const AllBooks = () => {
  const [searchedBooks, setSearchedBooks] = useState<IBook[]>([]);
  const [filteredBooks, setFilteredBooks] = useState<IBook[]>([]);

  const { data: allBooks } = useGetBooksQuery(30, {
    refetchOnMountOrArgChange: true,
    pollingInterval: 30000,
  });
  // console.log(allBooks);

  const dispatch = useAppDispatch();

  if (allBooks) {
    dispatch(getBooks(allBooks?.data as IBook[]));
  }

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e);
    const query = e.target.value.trim().toLowerCase();
    if (query === '') {
      setSearchedBooks(allBooks?.data || []);
    } else {
      const searched = allBooks.data.filter(
        (book: IBook) =>
          book.title.toLowerCase().includes(query) ||
          book.author.toLowerCase().includes(query) ||
          book.genre.toLowerCase().includes(query)
      );
      setSearchedBooks(searched || []);
    }
  };

  const handleGenreFilter = (genre: string) => {
    if (genre === 'All') {
      setFilteredBooks(allBooks?.data || []);
    } else {
      const filteredByGenre = allBooks?.data?.filter(
        (book: IBook) => book.genre.toLowerCase() === genre.toLowerCase()
      );
      setFilteredBooks(filteredByGenre || []);
    }
  };

  const handlePublishYearFilter = (publishYear: string) => {
    if (publishYear === 'All') {
      setFilteredBooks(allBooks?.data || []);
    } else {
      const filteredByPublishYear = allBooks?.data?.filter(
        (book: IBook) => book.publishYear === publishYear
      );
      setFilteredBooks(filteredByPublishYear || []);
    }
  };

  return (
    <div className="min-h-screen">
      <div className="mx-auto mb-8 w-2/3 text-center lg:w-1/3">
        <h2 className=" text-center text-4xl font-semibold">
          Explore All Books
        </h2>
        <h4 className="mt-5 text-sm text-gray-600 dark:text-gray-400">
          Explore all books from our online library
        </h4>
      </div>

      {/* FIXME: Fix mobile device position (move to center) */}
      <div className="flex justify-between items-center flex-wrap ">
        <SearchField handleSearch={handleSearch} />

        <Dropdown
          handleGenreFilter={handleGenreFilter}
          handlePublishYearFilter={handlePublishYearFilter}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 py-5">
        {searchedBooks.length > 0
          ? searchedBooks.map((book: IBook, _id) => (
              <BookCard key={_id} book={book} />
            ))
          : filteredBooks.length > 0
          ? filteredBooks.map((book: IBook, _id) => (
              <BookCard key={_id} book={book} />
            ))
          : allBooks?.data?.map((book: IBook, _id: string) => (
              <BookCard key={_id} book={book} />
            ))}
      </div>
    </div>
  );
};

export default AllBooks;
