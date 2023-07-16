/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Link, useParams } from 'react-router-dom';
import { useGetBookDetailsQuery } from '../redux/features/books/bookApi';
import { useAppSelector } from '../redux/hooks';
import { AiOutlineHeart, AiOutlineRead } from 'react-icons/ai';

const BookDetails = () => {
  const { id } = useParams();
  const { data: bookData } = useGetBookDetailsQuery(id, {
    refetchOnMountOrArgChange: true,
    pollingInterval: 30000,
  });
  const { email } = useAppSelector((state) => state.user);

  // console.log(bookData?.data);
  const {
    _id,
    title,
    author,
    email: savedEmail,
    genre,
    publishYear,
    reviews,
  } = bookData?.data || {};

  return (
    <div>
      <div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* child-1 */}
          <div className="card bg-base-100 shadow-lg">
            <div className="card-body">
              <h2 className="card-title">Title: {title}</h2>
              <p>Author: ${author}</p>
              <p>Genre: {genre}</p>
              <p>PublishYear: {publishYear}</p>

              <div className="flex gap-4">
                <div className="card-actions mt-2">
                  <Link to={`/book-details/${_id}`}>
                    <button className="flex items-center gap-3 rounded-full border-0 pr-5 py-2 font-semibold capitalize outline-none transition duration-500 ease-in-out  hover:text-[#DA9323]">
                      <AiOutlineHeart size={24} /> Add to Wishlist
                    </button>
                  </Link>
                </div>
                <div className="card-actions mt-2">
                  <Link to={`/book-details/${_id}`}>
                    <button className="flex items-center gap-3  rounded-full border-0 font-semibold px-5 py-2 capitalize outline-none transition duration-500 ease-in-out  hover:text-[#DA9323]">
                      <AiOutlineRead size={24} /> Add to Reading List
                    </button>
                  </Link>
                </div>
              </div>

              {email === savedEmail && (
                <div className="flex gap-4">
                  <div className="card-actions mt-2">
                    <Link to={`/edit-book/${_id}`}>
                      <button className="rounded-full border-0 bg-[#DA9323]  px-5 py-2 capitalize text-white outline-none transition duration-500 ease-in-out hover:border hover:border-[#DA9323] hover:bg-transparent hover:text-[#DA9323]">
                        Edit Book
                      </button>
                    </Link>
                  </div>
                  <div className="card-actions mt-2">
                    <Link to={`/book-details/${_id}`}>
                      <button className="rounded-full border-0 bg-[#da2378]  px-5 py-2 capitalize text-white outline-none transition duration-500 ease-in-out hover:border hover:border-[#da23b2] hover:bg-transparent hover:text-[#DA9323]">
                        Delete Book
                      </button>
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
          {/* child-2 */}
          <div className="card bg-base-100 shadow-lg">
            <div className="card-body">
              <h2 className="card-title">Reviews:</h2>
              {reviews?.map((review: string, index: string) => (
                <p key={index} className="">
                  {index + 1}. {review}
                </p>
              ))}
            </div>
          </div>
          {/* child-3 */}
          <div className="lg:col-span-2 w-full lg:w-1/2 mx-auto card bg-base-100 shadow-lg">
            <div className="card-body ">
              <textarea
                placeholder="Give your valuable review here..."
                className="textarea textarea-bordered textarea-lg w-full max-w-full h-full"
              ></textarea>
            </div>
            <div className="card-actions mb-6 mx-auto">
              <Link to={`/book-details/${_id}`}>
                <button className="rounded-full border-0 bg-[#DA9323]  px-5 py-2 capitalize text-white outline-none transition duration-500 ease-in-out hover:border hover:border-[#DA9323] hover:bg-transparent hover:text-[#DA9323]">
                  Submit Review
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
