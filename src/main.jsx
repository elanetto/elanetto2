import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createHashRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import Layout from "./layout";
import Om from "./pages/Om";
import ProductsPage from "./pages/Produkter";
import ProductPage from "./pages/ProduktSide";
import CartPage from "./pages/Handlekurv"

const router = createHashRouter([
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
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
