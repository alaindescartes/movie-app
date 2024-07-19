import "bootstrap/dist/css/bootstrap.min.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import HomePage, {
  loader as homePageLoader,
} from "./components/homePage/HomePage";
import LoginForm from "./components/login/LoginForm";
import SignUp from "./components/login/SignUp";
import MovieByGenre, {
  fetchMoviesByGenre,
} from "./components/movieContainer/MovieByGenre";
import RootWrapper from "./components/routerWrappers/RootWrapper";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootWrapper />,
    children: [
      {
        index: true,
        element: <HomePage />,
        loader: homePageLoader,
      },
      {
        path: "genres/:genreId",
        element: <MovieByGenre />,
        loader: async ({ params }) => {
          return fetchMoviesByGenre(params.genreId);
        },
      },
      {
        path: "login",
        children: [
          {
            index: true,
            element: <LoginForm />,
          },
          {
            path: "forgot-password",
            element: <p>hey there from password</p>,
          },
          {
            path: "signUp",
            element: <SignUp />,
          },
        ],
      },
    ],
  },
]);

function App() {
  //movie app router
  return <RouterProvider router={router} />;
}

export default App;
