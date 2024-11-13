import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import App from './App.tsx'
import Home from './pages/Home.tsx'
import Error from './pages/Error.tsx'
import Landing from './pages/Landing.tsx'
import Login from './pages/Login.tsx'
import SignUp from './pages/Signup.tsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Landing />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <SignUp />,
      },
      {
        index: true,
        element: <Home />,
      },
      // {
      //   path: "/profile",
      //   element: <Profile />,
      // }
    ],
  },
]);

const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(<RouterProvider router={router} />);
}
