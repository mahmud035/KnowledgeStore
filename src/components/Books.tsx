/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useGetTenBooksQuery } from '../redux/features/books/bookApi';
import { getTenBooks } from '../redux/features/books/bookSlice';
import { useAppDispatch } from '../redux/hooks';
import { IBook } from '../types/globalTypes';
import BookCard from './BookCard';
import Spinner from './Spinner';

const Books = () => {
  const { data, isLoading } = useGetTenBooksQuery(undefined);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (data) {
      dispatch(getTenBooks(data?.data as IBook[]));
    }
  }, [data, dispatch]);

  if (isLoading) {
    return <Spinner />;
  }

  // console.log(data);

  return (
    <>
      <div className="mx-auto mb-6 w-2/3 text-center lg:w-1/3">
        <h2 className=" text-center text-4xl font-semibold">Top Ten Books</h2>
        <h4 className="mt-5 text-sm text-gray-600 dark:text-gray-400">
          Explore top ten books from our online library
        </h4>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-8 py-5">
        {data?.data?.map((book: IBook, _id: string) => (
          <BookCard key={_id} book={book} />
        ))}
      </div>

      <div className="card-actions mt-12 flex justify-center">
        <Link to="/all-books">
          <button className="rounded-full border-0 bg-[#DA9323]  px-5 py-2.5 capitalize text-white outline-none transition duration-500 ease-in-out hover:border hover:border-[#DA9323] hover:bg-transparent hover:text-[#DA9323]">
            View All Books
          </button>
        </Link>
      </div>
    </>
  );
};

export default Books;
