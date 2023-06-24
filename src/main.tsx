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
import { Menu } from './Views/Menu.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Menu>
        <Home/>
      </Menu>
    ),
  },
  {
    path: "/Login",
    element: <Login/>,
  },
  {
    path: "/Client",
    element: (
      <Menu>
        <Client/>
      </Menu>
    ),
  },
  {
    path: "/Forms",
    element: (
      <Menu>
        <Forms/>
      </Menu>
    ),
  },
  {
    path: "/Report",
    element: (
      <Menu>
        <Report/>
      </Menu>
    ),
  },
  {
    path: "/Mail",
    element: (
      <Menu>
        <Mail/>
      </Menu>
    ),
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
      <RouterProvider router={router} />
  </React.StrictMode>,
)
