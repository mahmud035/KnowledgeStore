/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Link, useParams } from 'react-router-dom';
import { useGetBookDetailsQuery } from '../redux/features/books/bookApi';
import { useAppSelector } from '../redux/hooks';
// import BookDetailsCard from '../components/BookDetailsCard';

const BookDetails = () => {
  const { id } = useParams();
  const { data: bookData } = useGetBookDetailsQuery(id);
  const { email } = useAppSelector((state) => state.user);

  console.log(bookData?.data);
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
        <div>
          <div className="card bg-base-100 shadow-lg">
            <div className="card-body">
              <h2 className="card-title">Title: {title}</h2>
              <p>Author: ${author}</p>
              <p>Genre: {genre}</p>
              <p>PublishYear: {publishYear}</p>

              {email === savedEmail && (
                <>
                  <div className="card-actions mt-2">
                    <Link to={`/book-details/${_id}`}>
                      <button className="rounded-full border-0 bg-[#DA9323]  px-5 py-2.5 capitalize text-white outline-none transition duration-500 ease-in-out hover:border hover:border-[#DA9323] hover:bg-transparent hover:text-[#DA9323]">
                        Edit Book
                      </button>
                    </Link>
                  </div>
                  <div className="card-actions mt-2">
                    <Link to={`/book-details/${_id}`}>
                      <button className="rounded-full border-0 bg-[#da2378]  px-5 py-2.5 capitalize text-white outline-none transition duration-500 ease-in-out hover:border hover:border-[#da23b2] hover:bg-transparent hover:text-[#DA9323]">
                        Delete Book
                      </button>
                    </Link>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
