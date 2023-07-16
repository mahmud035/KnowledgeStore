/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  useAddReviewMutation,
  useDeleteBookMutation,
  useGetBookDetailsQuery,
} from '../redux/features/books/bookApi';
import { useAppSelector } from '../redux/hooks';
import { AiOutlineHeart, AiOutlineRead } from 'react-icons/ai';
import DeleteModal from '../components/DeleteModal';
import { useState } from 'react';
import { toast } from 'react-toastify';

const BookDetails = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [review, setReview] = useState('');

  // NOTE: Redux Query + State
  const { id } = useParams();
  const { data: bookData } = useGetBookDetailsQuery(id, {
    refetchOnMountOrArgChange: true,
    pollingInterval: 30000, // 30 seconds
  });

  const { email } = useAppSelector((state) => state.user);
  // NOTE: Mutation
  const [deleteBook] = useDeleteBookMutation();
  const [addReview] = useAddReviewMutation();

  const navigate = useNavigate();

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const modalHandler = async (id: string): Promise<void> => {
    // NOTE: Call the mutation function
    try {
      const response = await deleteBook(id);

      if ('error' in response) {
        toast.error('An error occurred. Please try again.');
        // console.error(response.error);
        return;
      }

      const res = response.data;

      if (!res.success) {
        toast.error(res.message as string);
        return;
      }

      toast.success('Book deleted successfully');
      navigate('/all-books');
    } catch (error) {
      toast.error('An error occurred. Please try again.');
      // console.error(error);
    }
    console.log(id);
    setIsOpen(false);

    return Promise.resolve();
  };

  const handleAddReview = async (): Promise<void> => {
    console.log('review', review);

    if (!review) {
      toast.warn('Please add a review first');
      return;
    }

    const options = {
      id: _id,
      data: {
        review: review,
      },
    };

    // NOTE: Call the mutation function
    try {
      const response = await addReview(options);

      if ('error' in response) {
        toast.error('An error occurred. Please try again.');
        // console.error(response.error);
        return;
      }

      const res = response.data;

      if (!res.success) {
        toast.error(res.message as string);
        return;
      }

      toast.success('Review added successfully');
      setReview('');
    } catch (error) {
      toast.error('An error occurred. Please try again.');
      // console.error(error);
    }

    return Promise.resolve();
  };

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
                  <button
                    onClick={openModal}
                    className="rounded-full border-0 bg-[#da2378]  px-5 py-2 capitalize text-white outline-none transition duration-500 ease-in-out hover:border hover:border-[#da23b2] hover:bg-transparent hover:text-[#DA9323]"
                  >
                    Delete Book
                  </button>
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
              onChange={(e) => setReview(e.target.value)}
              defaultValue={review}
              placeholder="Give your valuable review here..."
              className="textarea textarea-bordered textarea-lg w-full max-w-full h-full"
            ></textarea>
          </div>
          <div className="card-actions mb-6 mx-auto">
            <button
              onClick={handleAddReview}
              className="rounded-full border-0 bg-[#DA9323]  px-5 py-2 capitalize text-white outline-none transition duration-500 ease-in-out hover:border hover:border-[#DA9323] hover:bg-transparent hover:text-[#DA9323]"
            >
              Submit Review
            </button>
          </div>
        </div>
      </div>

      <DeleteModal
        isOpen={isOpen}
        closeModal={closeModal}
        id={_id}
        modalHandler={modalHandler}
      />
    </div>
  );
};

export default BookDetails;
