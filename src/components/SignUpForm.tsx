/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useSignupMutation } from '../redux/features/user/userApi';
import { setUserEmail } from '../redux/features/user/userSlice';
import { useAppDispatch } from '../redux/hooks';

interface LoginFormInputs {
  email: string;
  password: string;
}

const SignUpForm = () => {
  const { register, handleSubmit } = useForm<LoginFormInputs>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  // NOTE: Mutation
  const [signup, { isLoading }] = useSignupMutation();
  // NOTE: Dispatch
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const handleSignUp = async (data: LoginFormInputs) => {
    const email = data.email;
    const password = data.password;
    // console.log(email, password);

    if (password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    const options = {
      email: email,
      password: password,
    };

    // NOTE: Call the mutation function
    try {
      const response = await signup(options);

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

      // Set userEmail to redux state and localStorage
      dispatch(setUserEmail(email));

      toast.success('Account created successfully. Now login to your account.');
      navigate('/login');
    } catch (error) {
      toast.error('An error occurred. Please try again.');
      console.error(error);
    }
  };

  return (
    <div>
      <div className="mt-4 h-full">
        <div className="flex h-full items-center rounded-lg bg-[#fbf4e9] py-16 ">
          <main
            data-aos="fade-up"
            data-aos-duration="1000"
            className="mx-auto w-full max-w-md p-6"
          >
            <div className="mt-7 rounded-xl border border-gray-200 bg-white  shadow-sm ">
              <div className="p-4 sm:p-7">
                <div className="text-center">
                  <h1 className="block text-2xl font-bold text-gray-800 ">
                    Sign Up
                  </h1>
                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                    Already have an account?{' '}
                    <Link
                      to="/login"
                      className="font-medium text-[#DA9323] decoration-2 hover:underline"
                    >
                      Login here
                    </Link>
                  </p>
                </div>

                <div className="mt-5 ">
                  <form onSubmit={handleSubmit(handleSignUp)}>
                    <div className="grid gap-y-4">
                      {/* form control */}
                      <div>
                        <label htmlFor="email" className="mb-2 block text-sm ">
                          Email*
                        </label>
                        <div className="relative">
                          <input
                            {...register('email', {
                              required: {
                                value: true,
                                message: 'Email is required',
                              },
                              pattern: {
                                value:
                                  /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: 'Invalid email format',
                              },
                            })}
                            type="email"
                            id="email"
                            name="email"
                            className="block w-full rounded-md border border-gray-300 px-4 py-3 text-sm "
                            required
                            aria-describedby="email-error"
                            placeholder="example@gmail.com"
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
                          id="email-error"
                        >
                          error
                        </p>
                      </div>

                      {/* form control */}
                      <div>
                        <div className="flex items-center justify-between">
                          <label
                            htmlFor="password"
                            className="mb-2 block text-sm"
                          >
                            Password*
                          </label>
                        </div>
                        <div className="relative">
                          <input
                            {...register('password', {
                              required: {
                                value: true,
                                message: 'Password is required',
                              },
                            })}
                            type="password"
                            id="password"
                            name="password"
                            className="block w-full rounded-md border border-gray-300 px-4 py-3 text-sm "
                            required
                            aria-describedby="password-error"
                            placeholder="******"
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
                          id="password-error"
                        >
                          error
                        </p>
                      </div>

                      <button
                        type="submit"
                        className="inline-flex items-center justify-center gap-2 rounded-md border border-transparent bg-[#e1a84e] px-4 py-3 text-sm font-semibold text-white transition-all hover:bg-[#da9323] focus:outline-none focus:ring-2 focus:ring-[#e1a84e] focus:ring-offset-2"
                      >
                        {isLoading ? 'Loading' : 'Signup'}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
