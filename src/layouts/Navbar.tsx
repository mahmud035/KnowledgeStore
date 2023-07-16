import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import {
  clearAccessToken,
  clearUserEmail,
} from '../redux/features/user/userSlice';
import logo from '../assets/logo.svg';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // NOTE: Using Redux Toolkit
  const { email } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(clearUserEmail());
    dispatch(clearAccessToken());

    navigate('/login');
  };

  return (
    <>
      <div className="mx-auto py-4 sm:max-w-xl md:max-w-full lg:max-w-screen-xl">
        <div className="relative flex items-center justify-between">
          <Link to="/">
            <img src={logo} className="h-14 w-full" alt="" />
            {/* <h1 className="text-xl font-black">KnowledgeStore</h1> */}
          </Link>
          <ul className="hidden items-center space-x-8 lg:flex">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive
                    ? 'hover:text-deep-purple-accent-400 font-medium tracking-wide text-[#DA9323] transition-colors duration-200'
                    : 'hover:text-deep-purple-accent-400 font-medium tracking-wide text-gray-700 transition-colors duration-200'
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/all-books"
                className={({ isActive }) =>
                  isActive
                    ? 'hover:text-deep-purple-accent-400 font-medium tracking-wide text-[#DA9323] transition-colors duration-200'
                    : 'hover:text-deep-purple-accent-400 font-medium tracking-wide text-gray-700 transition-colors duration-200'
                }
              >
                All Books
              </NavLink>
            </li>

            {email ? (
              <>
                <li>
                  <NavLink
                    to="/add-new-book"
                    className={({ isActive }) =>
                      isActive
                        ? 'hover:text-deep-purple-accent-400 font-medium tracking-wide text-[#DA9323] transition-colors duration-200'
                        : 'hover:text-deep-purple-accent-400 font-medium tracking-wide text-gray-700 transition-colors duration-200'
                    }
                  >
                    Add New Book
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/wishlist"
                    className={({ isActive }) =>
                      isActive
                        ? 'hover:text-deep-purple-accent-400 font-medium tracking-wide text-[#DA9323] transition-colors duration-200'
                        : 'hover:text-deep-purple-accent-400 font-medium tracking-wide text-gray-700 transition-colors duration-200'
                    }
                  >
                    Wishlist
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/reading-list"
                    className={({ isActive }) =>
                      isActive
                        ? 'hover:text-deep-purple-accent-400 font-medium tracking-wide text-[#DA9323] transition-colors duration-200'
                        : 'hover:text-deep-purple-accent-400 font-medium tracking-wide text-gray-700 transition-colors duration-200'
                    }
                  >
                    Reading List
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/finish-list"
                    className={({ isActive }) =>
                      isActive
                        ? 'hover:text-deep-purple-accent-400 font-medium tracking-wide text-[#DA9323] transition-colors duration-200'
                        : 'hover:text-deep-purple-accent-400 font-medium tracking-wide text-gray-700 transition-colors duration-200'
                    }
                  >
                    Finished Books
                  </NavLink>
                </li>

                {/* toggle */}
                <li>
                  <button
                    onClick={handleLogout}
                    className="btn w-32 rounded-full  border-0 bg-[#ED7A00]/[0.8] capitalize text-white outline-none"
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/login">
                    <button className="btn w-32 text-white rounded-full border-0 bg-[#DA9323] capitalize outline-none">
                      Login
                    </button>
                  </Link>
                </li>
                <li>
                  <Link to="/signup">
                    <button className="btn w-32 text-white rounded-full border-0 bg-[#DA9323] capitalize outline-none">
                      Signup
                    </button>
                  </Link>
                </li>
              </>
            )}
          </ul>
          <div className="lg:hidden">
            <button
              aria-label="Open Menu"
              title="Open Menu"
              className="focus:shadow-outline hover:bg-deep-purple-50 focus:bg-deep-purple-50 -mr-1 rounded p-2 transition duration-200 focus:outline-none"
              onClick={() => setIsMenuOpen(true)}
            >
              <svg className="w-5 text-gray-600" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M23,13H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,13,23,13z"
                />
                <path
                  fill="currentColor"
                  d="M23,6H1C0.4,6,0,5.6,0,5s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,6,23,6z"
                />
                <path
                  fill="currentColor"
                  d="M23,20H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,20,23,20z"
                />
              </svg>
            </button>
            {isMenuOpen && (
              <div className="absolute left-0 top-0 w-full">
                <div className="rounded border bg-white p-5 shadow-sm">
                  <div className="mb-4 flex items-center justify-between">
                    <div>
                      <a
                        href="/"
                        aria-label="Company"
                        title="Company"
                        className="inline-flex items-center"
                      >
                        <svg
                          className="text-deep-purple-accent-400 w-8"
                          viewBox="0 0 24 24"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeMiterlimit="10"
                          stroke="currentColor"
                          fill="none"
                        >
                          <rect x="3" y="1" width="7" height="12" />
                          <rect x="3" y="17" width="7" height="6" />
                          <rect x="14" y="1" width="7" height="6" />
                          <rect x="14" y="11" width="7" height="12" />
                        </svg>
                        <span className="ml-2 text-xl font-bold uppercase tracking-wide text-gray-800">
                          Company
                        </span>
                      </a>
                    </div>
                    <div>
                      <button
                        aria-label="Close Menu"
                        title="Close Menu"
                        className="focus:shadow-outline -mr-2 -mt-2 rounded p-2 transition duration-200 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <svg className="w-5 text-gray-600" viewBox="0 0 24 24">
                          <path
                            fill="currentColor"
                            d="M19.7,4.3c-0.4-0.4-1-0.4-1.4,0L12,10.6L5.7,4.3c-0.4-0.4-1-0.4-1.4,0s-0.4,1,0,1.4l6.3,6.3l-6.3,6.3 c-0.4,0.4-0.4,1,0,1.4C4.5,19.9,4.7,20,5,20s0.5-0.1,0.7-0.3l6.3-6.3l6.3,6.3c0.2,0.2,0.5,0.3,0.7,0.3s0.5-0.1,0.7-0.3 c0.4-0.4,0.4-1,0-1.4L13.4,12l6.3-6.3C20.1,5.3,20.1,4.7,19.7,4.3z"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <nav>
                    <ul className="space-y-4">
                      <li>
                        <NavLink
                          to="/"
                          className="hover:text-deep-purple-accent-400 font-medium tracking-wide text-gray-700 transition-colors duration-200"
                        >
                          Home
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to="/all-books"
                          className={({ isActive }) =>
                            isActive
                              ? 'hover:text-deep-purple-accent-400 font-medium tracking-wide text-[#DA9323] transition-colors duration-200'
                              : 'hover:text-deep-purple-accent-400 font-medium tracking-wide text-gray-700 transition-colors duration-200'
                          }
                        >
                          All Books
                        </NavLink>
                      </li>

                      {email ? (
                        <>
                          <li>
                            <NavLink
                              to="/add-new-book"
                              className={({ isActive }) =>
                                isActive
                                  ? 'hover:text-deep-purple-accent-400 font-medium tracking-wide text-[#DA9323] transition-colors duration-200'
                                  : 'hover:text-deep-purple-accent-400 font-medium tracking-wide text-gray-700 transition-colors duration-200'
                              }
                            >
                              Add New Book
                            </NavLink>
                          </li>
                          <li>
                            <NavLink
                              to="/wishlist"
                              className={({ isActive }) =>
                                isActive
                                  ? 'hover:text-deep-purple-accent-400 font-medium tracking-wide text-[#DA9323] transition-colors duration-200'
                                  : 'hover:text-deep-purple-accent-400 font-medium tracking-wide text-gray-700 transition-colors duration-200'
                              }
                            >
                              Wishlist
                            </NavLink>
                          </li>
                          <li>
                            <NavLink
                              to="/reading-list"
                              className={({ isActive }) =>
                                isActive
                                  ? 'hover:text-deep-purple-accent-400 font-medium tracking-wide text-[#DA9323] transition-colors duration-200'
                                  : 'hover:text-deep-purple-accent-400 font-medium tracking-wide text-gray-700 transition-colors duration-200'
                              }
                            >
                              Reading List
                            </NavLink>
                          </li>
                          <li>
                            <NavLink
                              to="/finish-list"
                              className={({ isActive }) =>
                                isActive
                                  ? 'hover:text-deep-purple-accent-400 font-medium tracking-wide text-[#DA9323] transition-colors duration-200'
                                  : 'hover:text-deep-purple-accent-400 font-medium tracking-wide text-gray-700 transition-colors duration-200'
                              }
                            >
                              Finished Books
                            </NavLink>
                          </li>
                          <li>
                            <button
                              onClick={handleLogout}
                              className="btn w-32  border-0 bg-[#ED7A00]/[0.8] capitalize text-white outline-none"
                            >
                              Logout
                            </button>
                          </li>
                        </>
                      ) : (
                        <>
                          <li>
                            <Link to="/login">
                              <button className="btn w-32 border-0 bg-[#DA9323] capitalize outline-none">
                                Login
                              </button>
                            </Link>
                          </li>
                        </>
                      )}
                    </ul>
                  </nav>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
