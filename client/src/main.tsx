import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router";
import Main from "./layouts/Main.tsx";
import Home from "./pages/Home.tsx";
import Login from "./pages/Login.tsx";
import Register from "./pages/Register.tsx";
import ProductDetails from "./pages/ProductDetails.tsx";
import { Provider } from "react-redux";
import { store } from "./store/index.ts";
import { Toaster } from "sonner";
import Profile from "./pages/Profile.tsx";
import IsLogin from "./pages/isLogin.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "/products/:id",
        element: <ProductDetails />,
      },
      {
        path: "/profile",
        element: (
          <IsLogin>
            <Profile />
          </IsLogin>
        ),
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <Toaster richColors />
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
