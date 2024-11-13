import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import App from './App.js'
import Home from './pages/Home.js'
import Error from './pages/Error.js'
import Landing from './pages/Landing.js'
import Login from './pages/Login.js'
import SignUp from './pages/SignUp.js'

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
