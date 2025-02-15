/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  useGetBookDetailsQuery,
  useUpdateBookMutation,
} from '../redux/features/books/bookApi';
import SmallSpinner from './SmallSpinner';

export interface IEditBook {
  title: string;
  author: string;
  email: string;
  genre: string;
  publishYear: string;
}

const EditBookForm = () => {
  const { id } = useParams();
  // NOTE: Query
  const { data: bookData, isLoading } = useGetBookDetailsQuery(id);
  // NOTE: Mutation
  const [updateBook] = useUpdateBookMutation();

  const {
    _id,
    title,
    author,
    email: savedEmail,
    genre,
    publishYear,
  } = bookData?.data || {};

  const navigate = useNavigate();

  const { register, handleSubmit } = useForm<IEditBook>({
    defaultValues: {
      title,
      author,
      email: savedEmail,
      genre,
      publishYear,
    },
  });

  const handleUpdateBook = async (data: IEditBook) => {
    const options = {
      id: _id,
      data: {
        title: data.title,
        author: data.author,
        email: savedEmail,
        genre: data.genre,
        publishYear: data.publishYear,
      },
    };

    // NOTE: Call the mutation function
    try {
      const response = await updateBook(options);

      if ('error' in response) {
        toast.error('An error occurred. Please try again.');
        return;
      }

      const res = response.data;

      if (!res.success) {
        toast.error(res.message);
        return;
      }

      toast.success('Book updated successfully');
      navigate(`/book-details/${_id}`);
    } catch (error) {
      toast.error('An error occurred. Please try again.');
    }
  };
  return (
    <div>
      <>
        <div className="flex h-screen items-center rounded-lg bg-[#fbf4e9] py-16 ">
          <main
            data-aos="fade-up"
            data-aos-duration="1000"
            className="w-full max-w-md p-6 mx-auto"
          >
            <div className="bg-white border border-gray-200 shadow-sm mt-7 rounded-xl ">
              <div className="p-4 sm:p-7">
                <div className="text-center">
                  <h1 className="block text-2xl font-bold text-gray-800 ">
                    Edit Your Book
                  </h1>
                </div>

                <div className="mt-5 ">
                  <form onSubmit={handleSubmit(handleUpdateBook)}>
                    <div className="grid gap-y-4">
                      {/* form control */}
                      <div>
                        <label htmlFor="title" className="block mb-2 text-sm ">
                          Title*
                        </label>
                        <div className="relative">
                          <input
                            {...register('title', {
                              required: {
                                value: true,
                                message: 'Title is required',
                              },
                            })}
                            defaultValue={title}
                            type="text"
                            id="title"
                            name="title"
                            className="block w-full px-4 py-3 text-sm border border-gray-300 rounded-md "
                            required
                            placeholder="Enter book name"
                          />
                          <div className="absolute inset-y-0 right-0 items-center hidden pr-3 pointer-events-none">
                            <svg
                              className="w-5 h-5 text-red-500"
                              width="16"
                              height="16"
                              fill="currentColor"
                              viewBox="0 0 16 16"
                              aria-hidden="true"
                            >
                              <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                            </svg>
                          </div>
                        </div>
                        <p
                          className="hidden mt-2 text-xs text-red-600"
                          id="title-error"
                        >
                          error
                        </p>
                      </div>

                      {/* form control */}
                      <div>
                        <label htmlFor="title" className="block mb-2 text-sm ">
                          Author*
                        </label>
                        <div className="relative">
                          <input
                            {...register('author', {
                              required: {
                                value: true,
                                message: 'Author is required',
                              },
                            })}
                            defaultValue={author}
                            type="text"
                            id="author"
                            name="author"
                            className="block w-full px-4 py-3 text-sm border border-gray-300 rounded-md "
                            required
                            placeholder="Enter author name"
                          />
                          <div className="absolute inset-y-0 right-0 items-center hidden pr-3 pointer-events-none">
                            <svg
                              className="w-5 h-5 text-red-500"
                              width="16"
                              height="16"
                              fill="currentColor"
                              viewBox="0 0 16 16"
                              aria-hidden="true"
                            >
                              <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                            </svg>
                          </div>
                        </div>
                        <p
                          className="hidden mt-2 text-xs text-red-600"
                          id="author-error"
                        >
                          error
                        </p>
                      </div>

                      {/* form control */}
                      <div>
                        <label htmlFor="title" className="block mb-2 text-sm ">
                          Genre*
                        </label>
                        <div className="relative">
                          <input
                            {...register('genre', {
                              required: {
                                value: true,
                                message: 'Genre is required',
                              },
                            })}
                            defaultValue={genre}
                            type="text"
                            id="genre"
                            name="genre"
                            className="block w-full px-4 py-3 text-sm border border-gray-300 rounded-md "
                            required
                            placeholder="Enter book genre"
                          />
                          <div className="absolute inset-y-0 right-0 items-center hidden pr-3 pointer-events-none">
                            <svg
                              className="w-5 h-5 text-red-500"
                              width="16"
                              height="16"
                              fill="currentColor"
                              viewBox="0 0 16 16"
                              aria-hidden="true"
                            >
                              <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                            </svg>
                          </div>
                        </div>
                        <p
                          className="hidden mt-2 text-xs text-red-600"
                          id="genre-error"
                        >
                          error
                        </p>
                      </div>

                      {/* form control */}
                      <div>
                        <label
                          htmlFor="publishYear"
                          className="block mb-2 text-sm "
                        >
                          Publish Year*
                        </label>
                        <div className="relative">
                          <input
                            {...register('publishYear', {
                              required: {
                                value: true,
                                message: 'Publish Year is required',
                              },
                            })}
                            defaultValue={publishYear}
                            type="text"
                            id="publishYear"
                            name="publishYear"
                            className="block w-full px-4 py-3 text-sm border border-gray-300 rounded-md "
                            required
                            placeholder="Enter publish year"
                          />
                          <div className="absolute inset-y-0 right-0 items-center hidden pr-3 pointer-events-none">
                            <svg
                              className="w-5 h-5 text-red-500"
                              width="16"
                              height="16"
                              fill="currentColor"
                              viewBox="0 0 16 16"
                              aria-hidden="true"
                            >
                              <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                            </svg>
                          </div>
                        </div>
                        <p
                          className="hidden mt-2 text-xs text-red-600"
                          id="publishYear-error"
                        >
                          error
                        </p>
                      </div>

                      <button
                        type="submit"
                        className="inline-flex items-center justify-center gap-2 rounded-md border border-transparent bg-[#e1a84e] px-4 py-3 text-sm font-semibold text-white transition-all hover:bg-[#da9323] focus:outline-none focus:ring-2 focus:ring-[#e1a84e] focus:ring-offset-2"
                      >
                        {isLoading ? <SmallSpinner /> : 'Save Changes'}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </main>
        </div>
      </>
    </div>
  );
};

export default EditBookForm;
