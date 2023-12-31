import router from './routes/routes';
import { RouterProvider } from 'react-router-dom';

function App() {
  return (
    <div className="mx-auto max-w-screen-xl px-6 overflow-x-hidden ">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
