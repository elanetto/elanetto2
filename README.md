# elanetto Design - Landing page
En landingsnettside som brukes mens man bygger opp nettbutikken. Besøk siden her: https://www.elanetto.no/ 

Dette er det første React prosjektet jeg har satt opp med webhosting i Domeneshop.

For å få dette prosjektet (React) til å fungere med FileZilla og Domenehsop, så er Router i main.jsx satt opp med Hash Routher (#):


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

Jeg måtte også sette opp base til "/" i vite.config filen:

```bash
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  base: "/",
  plugins: [react(), tailwindcss()],
});
```

Tilslutt må vi lage filene som skal hostes gjennom Domeneshop (dist-folder):

```bash
npm run build
```

...og da var det bare å laste opp innholdet i dist gjennom FileZilla!

PS: Jeg måtte også bruke en direkte link til opplastet bilde i root index.html for at favicon skulle fungere:
```bash
<link rel="icon" type="image/png" href="https://elanetto.no/star.png" />
```

-----------------

# React Pakker
I dette prosjektet har jeg brukt følgende React Packages:
- [React Responsive Carousel](https://www.npmjs.com/package/react-responsive-carousel)
