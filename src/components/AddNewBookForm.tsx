/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { usePostBookMutation } from '../redux/features/books/bookApi';
import { useAppSelector } from '../redux/hooks';
import SmallSpinner from './SmallSpinner';

export interface IAddBook {
  title: string;
  author: string;
  email: string;
  genre: string;
  publishYear: string;
  reviews?: string[];
}

const AddNewBookForm = () => {
  // NOTE: Mutation
  const [postBook, { isLoading }] = usePostBookMutation();
  const { email } = useAppSelector((state) => state.user);

  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/';
  console.log(from);

  const { register, handleSubmit } = useForm<IAddBook>({
    defaultValues: {
      title: '',
      author: '',
      email: '',
      genre: '',
      publishYear: '',
      reviews: [],
    },
  });

  const handleLogin = async (data: IAddBook) => {
    const options = {
      title: data.title,
      author: data.author,
      email: email,
      genre: data.genre,
      publishYear: data.publishYear,
      reviews: [],
    };

    // console.log(options);

    // NOTE: Call the mutation function
    try {
      const response = await postBook(options);

      if ('error' in response) {
        toast.error('An error occurred. Please try again.');
        // console.error(response.error);
        return;
      }

      const res = response.data;

      if (!res.success) {
        toast.error(res.message);
        return;
      }

      toast.success('Book added successfully');
      navigate('/all-books');
    } catch (error) {
      toast.error('An error occurred. Please try again.');
      // console.error(error);
    }
  };
  return (
    <div>
      <>
        <div className="flex h-screen items-center rounded-lg bg-[#fbf4e9] py-16 ">
          <main
            data-aos="fade-up"
            data-aos-duration="1000"
            className="mx-auto w-full max-w-md p-6"
          >
            <div className="mt-7 rounded-xl border border-gray-200 bg-white  shadow-sm ">
              <div className="p-4 sm:p-7">
                <div className="text-center">
                  <h1 className="block text-2xl font-bold text-gray-800 ">
                    Add A New Book
                  </h1>
                </div>

                <div className="mt-5 ">
                  <form onSubmit={handleSubmit(handleLogin)}>
                    <div className="grid gap-y-4">
                      {/* form control */}
                      <div>
                        <label htmlFor="title" className="mb-2 block text-sm ">
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
                            type="text"
                            id="title"
                            name="title"
                            className="block w-full rounded-md border border-gray-300 px-4 py-3 text-sm "
                            required
                            placeholder="Enter book name"
                          />
                          <div className="pointer-events-none absolute inset-y-0 right-0 hidden items-center pr-3">
                            <svg
                              className="h-5 w-5 text-red-500"
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
                          className="mt-2 hidden text-xs text-red-600"
                          id="title-error"
                        >
                          error
                        </p>
                      </div>

                      {/* form control */}
                      <div>
                        <label htmlFor="title" className="mb-2 block text-sm ">
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
                            type="text"
                            id="author"
                            name="author"
                            className="block w-full rounded-md border border-gray-300 px-4 py-3 text-sm "
                            required
                            placeholder="Enter author name"
                          />
                          <div className="pointer-events-none absolute inset-y-0 right-0 hidden items-center pr-3">
                            <svg
                              className="h-5 w-5 text-red-500"
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
                          className="mt-2 hidden text-xs text-red-600"
                          id="author-error"
                        >
                          error
                        </p>
                      </div>

                      {/* form control */}
                      <div>
                        <label htmlFor="title" className="mb-2 block text-sm ">
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
                            type="text"
                            id="genre"
                            name="genre"
                            className="block w-full rounded-md border border-gray-300 px-4 py-3 text-sm "
                            required
                            placeholder="Enter book genre"
                          />
                          <div className="pointer-events-none absolute inset-y-0 right-0 hidden items-center pr-3">
                            <svg
                              className="h-5 w-5 text-red-500"
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
                          className="mt-2 hidden text-xs text-red-600"
                          id="genre-error"
                        >
                          error
                        </p>
                      </div>

                      {/* form control */}
                      <div>
                        <label
                          htmlFor="publishYear"
                          className="mb-2 block text-sm "
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
                            type="text"
                            id="publishYear"
                            name="publishYear"
                            className="block w-full rounded-md border border-gray-300 px-4 py-3 text-sm "
                            required
                            placeholder="Enter publish year"
                          />
                          <div className="pointer-events-none absolute inset-y-0 right-0 hidden items-center pr-3">
                            <svg
                              className="h-5 w-5 text-red-500"
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
                          className="mt-2 hidden text-xs text-red-600"
                          id="publishYear-error"
                        >
                          error
                        </p>
                      </div>

                      <button
                        type="submit"
                        className="inline-flex items-center justify-center gap-2 rounded-md border border-transparent bg-[#e1a84e] px-4 py-3 text-sm font-semibold text-white transition-all hover:bg-[#da9323] focus:outline-none focus:ring-2 focus:ring-[#e1a84e] focus:ring-offset-2"
                      >
                        {isLoading ? <SmallSpinner /> : 'Add Book'}
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

export default AddNewBookForm;
