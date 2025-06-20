# elanetto Design - Landing page
A page to use while we are creating the webshop. 
This is also the first React project I made work with webhosting at Domeneshop.

To make this site (React project) work with FileZilla and Domenehsop, we had to set up the router as a Hash Routher (#):


```bash
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider, createHashRouter } from "react-router-dom"
import './index.css'
import App from './App.jsx'
import Layout from './layout'
import Om from './pages/Om'

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
    ],
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)

```

We also had to add the base to be used in the vite.config file:

```bash
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  base: "/",
  plugins: [react(), tailwindcss()],
});
```

Then, simply build th dist file:

```bash
npm run build
```

And upload the contents of the dist file to filezilla!

PS: I also had to add a direct link to the favicon in the root html document for the favicon to work:
```bash
<link rel="icon" type="image/png" href="https://elanetto.no/star.png" />
```
