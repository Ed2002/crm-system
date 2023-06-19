import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { Login } from './Views/Login.tsx';
import { Client } from './Views/Client.tsx';
import { Forms } from './Views/Forms.tsx';
import { Report } from './Views/Report.tsx';
import { Mail } from './Views/Mail.tsx';
import Home from './Views/Home.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>,
  },
  {
    path: "/Login",
    element: <Login/>,
  },
  {
    path: "/Client",
    element: <Client/>,
  },
  {
    path: "/Form",
    element: <Forms/>,
  },
  {
    path: "/Report",
    element: <Report/>,
  },
  {
    path: "/Mail",
    element: <Mail/>,
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
     <RouterProvider router={router} />
  </React.StrictMode>,
)
