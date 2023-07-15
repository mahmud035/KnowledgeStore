import { Link } from 'react-router-dom';
import { IBook } from '../types/globalTypes';

const BookCard = ({ book }: { book: IBook }) => {
  console.log(book);
  const { _id, title, author, genre, publishYear } = book;

  return (
    <>
      <div className="card bg-base-100 shadow-lg">
        <div className="card-body">
          <h2 className="card-title">Title: {title}</h2>
          <p>Author: ${author}</p>
          <p>Genre: {genre}</p>
          <p>PublishYear: {publishYear}</p>
          <div className="card-actions mt-2">
            <Link to={`/book/${_id}`}>
              <button className="rounded-full border-0 bg-[#DA9323]  px-5 py-2.5 capitalize text-white outline-none transition duration-500 ease-in-out hover:border hover:border-[#DA9323] hover:bg-transparent hover:text-[#DA9323]">
                View Details
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default BookCard;
