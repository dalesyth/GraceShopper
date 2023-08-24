import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import ErrorPage from "./error-page";
import Root from "./routes/root";
import Home from "./components/Home";
import ItemDetail from "./components/ItemDetail";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import Login from "./components/login/Login";
import LoggedIn from "./components/login/LoggedIn";
import LogOut from "./components/login/LogOut";
import Register from "./components/Register";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/Home",
        element: <Home />,
      },
      {
        path: "/ItemDetail/:itemId",
        element: <ItemDetail />,
      },
      {
        path: "/Cart",
        element: <Cart />,
      },
      {
        path: "/Checkout",
        element: <Checkout />,
      },
      {
        path: "/Login",
        element: <Login />,
      },
      {
        path: "/LoggedIn",
        element: <LoggedIn />
      },
      {
        path: "/LogOut",
        element: <LogOut />
      },
      {
        path: "/Register",
        element: <Register />,
      },
      
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
