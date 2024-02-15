import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

import 'bootstrap/dist/css/bootstrap.min.css';


import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Clientes from './pages/Clientes/Clientes.jsx';
import Facturacion from './pages/Facturacion/Facturacion.jsx';


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/clientes",
    element: <Clientes />
  },
  { 
    path: "/facturacion",
    element: <Facturacion />
  }

]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
