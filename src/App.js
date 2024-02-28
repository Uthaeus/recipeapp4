import { createBrowserRouter, RouterProvider } from "react-router-dom";

import RootLayout from "./components/root-layout";
import Home from "./pages/home";
import Contact from "./pages/contact";
import Login from "./components/auth/login";
import Signup from "./components/auth/signup";
import RecipeDetail from "./components/recipe/recipe-detail";
import RecipeEdit from "./components/recipe/recipe-edit";
import RecipeNew from "./components/recipe/recipe-new";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/recipe/:id",
        element: <RecipeDetail />,
      },
      {
        path: "/recipe/:id/edit",
        element: <RecipeEdit />,
      },
      {
        path: "/recipe/new",
        element: <RecipeNew />,
      },
    ],
  },
])

function App() {
  return <RouterProvider router={router} />
}

export default App;
