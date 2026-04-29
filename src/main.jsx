import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import Layout from "./layout";
import Om from "./pages/Om";
import ProductsPage from "./pages/Produkter";
import ProductPage from "./pages/ProduktSide";
import CartPage from "./pages/Handlekurv"
import TagPage from "./pages/TagPage"
import Success from "./pages/Success"
import Cancel from "./pages/Cancel"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <App />,
      },
      {
        path: "/om",
        element: <Om />,
      },
      {
        path: "/produkter",
        element: <ProductsPage />,
      },
      {
        path: "/produkt/:slug",
        element: <ProductPage />,
      },
      {
        path: "/handlekurv",
        element: <CartPage />,
      },
      {
        path: "/tag/:tag",
        element: <TagPage />,
      },
      {
        path: "/success",
        element: <Success />,
      },
      {
        path: "/cancel",
        element: <Cancel />,
      }
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
