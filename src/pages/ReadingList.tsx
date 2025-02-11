/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Link } from 'react-router-dom';
import BookCard from '../components/BookCard';
import Spinner from '../components/Spinner';
import { useGetReadingListQuery } from '../redux/features/user/userApi';
import { IBook } from '../types/globalTypes';

const ReadingList = () => {
  const { data, isLoading } = useGetReadingListQuery(undefined, {
    refetchOnMountOrArgChange: true,
    // pollingInterval: 30000, // 30 seconds
  });

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <div className="w-2/3 mx-auto mb-6 text-center lg:w-1/3">
        <h2 className="text-4xl font-semibold text-center ">
          Your Reading List
        </h2>
        <h4 className="mt-5 text-sm text-gray-600 dark:text-gray-400">
          Explore books from our online library
        </h4>
      </div>

      {data?.data?.length > 0 ? (
        <>
          <div className="grid grid-cols-1 gap-8 py-5 md:grid-cols-2 lg:grid-cols-3">
            {data?.data?.map((book: IBook, _id: string) => (
              <BookCard key={_id} book={book} />
            ))}
          </div>
        </>
      ) : (
        <>
          <p className="text-xl font-semibold text-center">
            Sorry! you haven't add any book to Reading List.
          </p>
        </>
      )}

      <div className="flex justify-center mt-12 card-actions">
        <Link to="/all-books">
          <button className="rounded-full border-0 bg-[#DA9323]  px-5 py-2.5 capitalize text-white outline-none transition duration-500 ease-in-out hover:border hover:border-[#DA9323] hover:bg-transparent hover:text-[#DA9323]">
            View All Books
          </button>
        </Link>
      </div>
    </>
  );
};

export default ReadingList;
