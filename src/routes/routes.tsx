import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import AddNewBook from '../pages/AddNewBook';
import AllBooks from '../pages/AllBooks';
import BookDetails from '../pages/BookDetails';
import EditBook from '../pages/EditBook';
import ErrorPage from '../pages/ErrorPage';
import FinishedReadingBooks from '../pages/FinishedReadingBooks';
import Home from '../pages/Home';
import Login from '../pages/Login';
import ReadingList from '../pages/ReadingList';
import SignUp from '../pages/SignUp';
import Wishlist from '../pages/Wishlist';

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
]);

export default router;
