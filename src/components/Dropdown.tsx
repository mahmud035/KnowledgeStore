import { useAppSelector } from '../redux/hooks';
import { IBook } from '../types/globalTypes';

interface IDropdownProps {
  handleGenreFilter: (genre: string) => void;
  handlePublishYearFilter: (publishYear: string) => void;
}

const Dropdown = ({
  handleGenreFilter,
  handlePublishYearFilter,
}: IDropdownProps) => {
  const { books } = useAppSelector((state) => state.book);

  // Get unique genres
  const uniqueGenres = [...new Set(books.map((book: IBook) => book.genre))];

  // Get unique publishYear
  const uniquePublishYear = [
    ...new Set(books.map((book: IBook) => book.publishYear)),
  ];

  return (
    <div className=" flex justify-center items-center">
      Filter By:
      <div className="dropdown dropdown-hover">
        <label tabIndex={0} className="btn m-1 capitalize">
          Genre
        </label>
        <ul
          tabIndex={0}
          className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
        >
          <li onClick={() => handleGenreFilter('All')}>
            <a>All</a>
          </li>
          {uniqueGenres.map((genre, index) => (
            <li key={index} onClick={() => handleGenreFilter(genre)}>
              <a>{genre}</a>
            </li>
          ))}
        </ul>
      </div>
      <div className="dropdown dropdown-hover">
        <label tabIndex={0} className="btn m-1 capitalize">
          PublishYear
        </label>
        <ul
          tabIndex={0}
          className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52 min-h-fit"
        >
          <li onClick={() => handleGenreFilter('All')}>
            <a>All</a>
          </li>
          {uniquePublishYear.map((publishYear, index) => (
            <li
              key={index}
              onClick={() => handlePublishYearFilter(publishYear)}
            >
              <a>{publishYear}</a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dropdown;
