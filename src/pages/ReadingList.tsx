/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Link } from 'react-router-dom';
import { useGetReadingListQuery } from '../redux/features/user/userApi';
import { IBook } from '../types/globalTypes';
import BookCard from '../components/BookCard';
import Spinner from '../components/Spinner';

const ReadingList = () => {
  const { data, isLoading } = useGetReadingListQuery(undefined, {
    refetchOnMountOrArgChange: true,
    // pollingInterval: 30000, // 30 seconds
  });
  // console.log(data);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <div className="mx-auto mb-6 w-2/3 text-center lg:w-1/3">
        <h2 className=" text-center text-4xl font-semibold">
          Your Reading List
        </h2>
        <h4 className="mt-5 text-sm text-gray-600 dark:text-gray-400">
          Explore books from our online library
        </h4>
      </div>

      {data?.data?.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 py-5">
            {data?.data?.map((book: IBook, _id: string) => (
              <BookCard key={_id} book={book} />
            ))}
          </div>
        </>
      ) : (
        <>
          <p className="text-center font-semibold text-xl">
            Sorry! you haven't add any book to Reading List.
          </p>
        </>
      )}

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

export default ReadingList;
