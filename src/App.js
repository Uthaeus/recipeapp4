import { createBrowserRouter, RouterProvider } from "react-router-dom";

import RootLayout from "./components/root-layout";
import Home from "./pages/home";
import Contact from "./pages/contact";
import Login from "./components/auth/login";
import Signup from "./components/auth/signup";

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
    ],
  },
])

function App() {
  return <RouterProvider router={router} />
}

export default App;
