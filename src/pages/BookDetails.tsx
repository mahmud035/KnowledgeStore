/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useState } from 'react';
import {
  AiOutlineCheckCircle,
  AiOutlineHeart,
  AiOutlineRead,
} from 'react-icons/ai';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import DeleteModal from '../components/DeleteModal';
import {
  useAddReviewMutation,
  useDeleteBookMutation,
  useGetBookDetailsQuery,
} from '../redux/features/books/bookApi';
import {
  useAddToReadingListMutation,
  useAddToWishlistMutation,
  useMarkAsFinishedMutation,
} from '../redux/features/user/userApi';
import { useAppSelector } from '../redux/hooks';

const BookDetails = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [review, setReview] = useState<string>('');

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
  const [addToWishlist] = useAddToWishlistMutation();
  const [addToReadingList] = useAddToReadingListMutation();
  const [markAsFinished] = useMarkAsFinishedMutation();

  const navigate = useNavigate();

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
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

  const handleAddReview = async (review: string): Promise<void> => {
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
        return;
      }

      const res = response.data;

      if (!res.success) {
        toast.error(res.message as string);
        return;
      }

      setReview('');
      toast.success('Review added successfully');
    } catch (error) {
      toast.error('An error occurred. Please try again.');
    }

    return Promise.resolve();
  };

  const handleAddToWishlist = async (): Promise<void> => {
    if (!email) {
      toast.warn('Please login to add book to wishlist');
      return;
    }

    const options = {
      bookId: _id,
    };

    // NOTE: Call the mutation function
    try {
      const response = await addToWishlist(options);

      if ('error' in response) {
        toast.error('An error occurred. Please try again.');
        return;
      }

      const res = response.data;

      if (!res.success) {
        toast.error(res.message as string);
        return;
      }

      toast.success('Book added to wishlist successfully');
    } catch (error) {
      toast.error('An error occurred. Please try again.');
    }

    return Promise.resolve();
  };

  const handleAddToReadingList = async () => {
    if (!email) {
      toast.warn('Please login to add book to reading list');
      return;
    }

    const options = {
      bookId: _id,
    };

    // NOTE: Call the mutation function
    try {
      const response = await addToReadingList(options);

      if ('error' in response) {
        toast.error('An error occurred. Please try again.');
        return;
      }

      const res = response.data;

      if (!res.success) {
        toast.error(res.message as string);
        return;
      }

      toast.success('Book added to reading list successfully');
    } catch (error) {
      toast.error('An error occurred. Please try again.');
    }

    return Promise.resolve();
  };

  const handleMarkAsFinished = async (): Promise<void> => {
    if (!email) {
      toast.warn('Please login to mark book as finished');
      return;
    }

    const options = {
      bookId: _id,
    };

    // NOTE: Call the mutation function
    try {
      const response = await markAsFinished(options);

      if ('error' in response) {
        toast.error('An error occurred. Please try again.');
        return;
      }

      const res = response.data;

      if (!res.success) {
        toast.error(res.message as string);
        return;
      }

      toast.success('Book marked as finished successfully');
    } catch (error) {
      toast.error('An error occurred. Please try again.');
    }

    return Promise.resolve();
  };

  return (
    <div>
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* child-1 */}
        <div className="shadow-lg card bg-base-100">
          <div className="card-body">
            <h2 className="card-title">Title: {title}</h2>
            <p>Author: ${author}</p>
            <p>Genre: {genre}</p>
            <p>PublishYear: {publishYear}</p>

            <div className="flex flex-wrap gap-4">
              <div className="mt-2 card-actions">
                <button
                  onClick={handleAddToWishlist}
                  className="flex items-center gap-3 rounded-full border-0 pr-5 py-2 font-semibold capitalize outline-none transition duration-500 ease-in-out  hover:text-[#DA9323]"
                >
                  <AiOutlineHeart size={24} /> Add to Wishlist
                </button>
              </div>
              <div className="mt-2 card-actions">
                <button
                  onClick={handleAddToReadingList}
                  className="flex items-center gap-3  rounded-full border-0 font-semibold pr-5 py-2 capitalize outline-none transition duration-500 ease-in-out  hover:text-[#DA9323]"
                >
                  <AiOutlineRead size={24} /> Add to Reading List
                </button>
              </div>
            </div>

            <div className="mt-2 card-actions">
              <button
                onClick={handleMarkAsFinished}
                className="flex items-center gap-3 rounded-full border-0 pr-5 py-2 font-semibold capitalize outline-none transition duration-500 ease-in-out  hover:text-[#DA9323]"
              >
                <AiOutlineCheckCircle size={24} /> Mark as Finished
              </button>
            </div>

            {email === savedEmail && (
              <div className="flex gap-4">
                <div className="mt-2 card-actions">
                  <Link to={`/edit-book/${_id}`}>
                    <button className="rounded-full border-0 bg-[#DA9323]  px-5 py-2 capitalize text-white outline-none transition duration-500 ease-in-out hover:border hover:border-[#DA9323] hover:bg-transparent hover:text-[#DA9323]">
                      Edit Book
                    </button>
                  </Link>
                </div>
                <div className="mt-2 card-actions">
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
        <div className="shadow-lg card bg-base-100">
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
        {email && (
          <div className="w-full mx-auto shadow-lg lg:col-span-2 lg:w-1/2 card bg-base-100">
            <div className="card-body ">
              <textarea
                onChange={(e) => setReview(e.target.value)}
                value={review}
                placeholder="Give your valuable review here..."
                className="w-full h-full max-w-full textarea textarea-bordered textarea-lg"
              ></textarea>
            </div>
            <div className="mx-auto mb-6 card-actions">
              <button
                onClick={() => handleAddReview(review)}
                className="rounded-full border-0 bg-[#DA9323]  px-5 py-2 capitalize text-white outline-none transition duration-500 ease-in-out hover:border hover:border-[#DA9323] hover:bg-transparent hover:text-[#DA9323]"
              >
                Submit Review
              </button>
            </div>
          </div>
        )}
      </div>

      {!email && (
        <div className="my-8 text-lg font-medium text-center text-blue-500 underline">
          <Link to="/login">Please Login to add review.</Link>
        </div>
      )}

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
