/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import BookCard from '../components/BookCard';
import { useGetAllBooksQuery } from '../redux/features/books/bookApi';
import { getAllBooks } from '../redux/features/books/bookSlice';
import { useAppDispatch } from '../redux/hooks';
import { IBook } from '../types/globalTypes';

const AllBooks = () => {
  const { data } = useGetAllBooksQuery(30, {
    refetchOnMountOrArgChange: true,
    pollingInterval: 30000,
  });
  const dispatch = useAppDispatch();

  if (data) {
    dispatch(getAllBooks(data?.data as IBook[]));
  }

  console.log(data);

  return (
    <div>
      <div className="mx-auto mb-6 w-2/3 text-center lg:w-1/3">
        <h2 className=" text-center text-4xl font-semibold">
          Explore All Books
        </h2>
        <h4 className="mt-5 text-sm text-gray-600 dark:text-gray-400">
          Explore all books from our online library
        </h4>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 py-5">
        {data?.data?.map((book: IBook, _id: string) => (
          <BookCard key={_id} book={book} />
        ))}
      </div>

      {data?.data?.length}
    </div>
  );
};

export default AllBooks;
