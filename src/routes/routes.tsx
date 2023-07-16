import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import Home from '../pages/Home';
import ErrorPage from '../pages/ErrorPage';
import AllBooks from '../pages/AllBooks';
import AddNewBook from '../pages/AddNewBook';
import Login from '../pages/Login';
import SignUp from '../pages/SignUp';
import BookDetails from '../pages/BookDetails';
import EditBook from '../pages/EditBook';
import Wishlist from '../pages/Wishlist';
import ReadingList from '../pages/ReadingList';
import FinishedReadingBooks from '../pages/FinishedReadingBooks';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/all-books',
        element: <AllBooks />,
      },
      {
        path: '/add-new-book',
        element: <AddNewBook />,
      },
      {
        path: '/book-details/:id',
        element: <BookDetails />,
      },
      {
        path: '/edit-book/:id',
        element: <EditBook />,
      },
      {
        path: '/wishlist',
        element: <Wishlist />,
      },
      {
        path: '/reading-list',
        element: <ReadingList />,
      },
      {
        path: '/finish-list',
        element: <FinishedReadingBooks />,
      },
    ],
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/signup',
    element: <SignUp />,
  },

  // {
  //   path: '*',
  //   element: <NotFound />,
  // },
]);

export default router;
