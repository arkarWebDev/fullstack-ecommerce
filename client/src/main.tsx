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
import IsLogin from "./pages/protector/IsLogin.tsx";
import ResetPassword from "./pages/ResetPassword.tsx";
import ForgotPassword from "./pages/FogotPassword.tsx";
import ProductFilter from "./pages/ProductFilter.tsx";
import IsAdmin from "./pages/protector/IsAdmin.tsx";
import ProductCreate from "./pages/admin/ProductCreate.tsx";
import Panel from "./pages/admin/Panel.tsx";
import ProductUpdate from "./pages/admin/ProductUpdate.tsx";
import ProductManagement from "./pages/admin/ProductManagement.tsx";

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
        path: "/register",
        element: <Register />,
      },
      { path: "/reset-password/:id", element: <ResetPassword /> },
      { path: "/forgot-password", element: <ForgotPassword /> },
      {
        path: "/products/filter",
        element: <ProductFilter />,
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
      {
        path: "/admin",
        element: (
          <IsAdmin>
            <Panel />
          </IsAdmin>
        ),
        children: [
          {
            path: "/admin/create-product",
            element: <ProductCreate />,
          },
          {
            path: "/admin/edit-product/:id",
            element: <ProductUpdate />,
          },

          {
            path: "/admin/manage-products",
            element: <ProductManagement />,
          },
        ],
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
