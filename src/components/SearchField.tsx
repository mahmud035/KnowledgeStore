import { ChangeEvent } from 'react';

interface SearchFieldProps {
  handleSearch: (e: ChangeEvent<HTMLInputElement>) => void;
}

const SearchField = ({ handleSearch }: SearchFieldProps) => {
  return (
    <div className="  lg:w-1/3 mb-5 sm:mb-0 flex  items-center justify-end rounded-lg bg-[#f3debd] ">
      <div className="w-full">
        <input
          onChange={handleSearch}
          type="search"
          className="w-full rounded-full px-4 py-2.5 text-gray-800 focus:outline-none"
          placeholder="Search Book by Title, Author or Genre..."
        />
      </div>
      <div>
        <button
          type="submit"
          className="flex h-12 w-12 items-center justify-center rounded-r-lg bg-[#da9323]  text-white"
        >
          <svg
            className="h-8 w-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default SearchField;
