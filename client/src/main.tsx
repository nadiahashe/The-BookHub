import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import App from './App.js'
// import Home from './pages/Home.js'
import Error from './pages/Error.js'
import Landing from './pages/Landing.js'
import Login from './pages/Login.js'
import SignUp from './pages/SignUp.js'
import DiscussionPage from './pages/DiscussionPage.js'
import ClubPage from './pages/ClubPage.js'
import BookPage from './pages/Book.js'
import BookThoughtsPage from './pages/BookThoughts.js'
import ProfilePage from './pages/ProfilePage.js'
import CreateDiscussionPage from './pages/CreateDiscussionPage.js'
import BookSearchPage from './pages/BookSearch.js'
import CreateClubPage from './pages/CreateClub.js'

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
        path: "/profile",
        element: <ProfilePage />,
      },
      {
        path: "/discussion/:id",
        element: <DiscussionPage />
      },
      {
        path: "/club/:id",
        element: <ClubPage />
      },
      {
        path: "/book/:id",
        element: <BookPage />
      },
      {
        path: "/thoughts/:bookId",
        element: <BookThoughtsPage />
      },
      {
        path: "/createDiscussion/:id",
        element: <CreateDiscussionPage />
      },
      {
        path: "/bookSearch",
        element: <BookSearchPage />
      },
      {
        path: "/createClub",
        element: <CreateClubPage />
      }
    ],
  },
]);

const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(<RouterProvider router={router} />);
}
