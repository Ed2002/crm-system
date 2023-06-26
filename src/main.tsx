import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { Login } from './Views/Login/Login.tsx';
import { Client } from './Views/Client.tsx';
import { Forms } from './Views/Forms.tsx';
import { Report } from './Views/Report.tsx';
import { Mail } from './Views/Mail.tsx';
import Home from './Views/Home.tsx';
import { Menu } from './Views/Menu.tsx';
import { SnackbarProvider } from 'notistack';
import { AuthProvider } from './services/auth_provider.tsx';
import { Register } from './Views/Register/Register.tsx';
import { User } from './Views/User/User.tsx';

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
    element: (
    <SnackbarProvider>
      <Login/>
      <AuthProvider/>
    </SnackbarProvider>
    ),
  },
  {
    path: "/User/:userId",
    element: (
    <SnackbarProvider>
      <User/>
      <AuthProvider/>
    </SnackbarProvider>
    ),
  },
  {
    path: "/Register",
    element: (
    <SnackbarProvider>
      <Register/>
      <AuthProvider/>
    </SnackbarProvider>
    ),
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
