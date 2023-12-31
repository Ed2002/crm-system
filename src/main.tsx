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
import { SnackbarProvider } from 'notistack';
import { AuthProvider } from './services/auth_provider.tsx';
import { Register } from './Views/Register.tsx';
import { User } from './Views/User.tsx';
import {ErroPage} from './Views/ErroPage.tsx';
import {Project} from './Views/Project.tsx';
import LandPage from './Views/landpage/Index.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <LandPage/>
  },
  {
    path: "/Project",
    element: (
      <SnackbarProvider>
        <Project/>
        <AuthProvider/>
      </SnackbarProvider>
    ),
  },
  {
    path: ":IdProject/Home",
    element: (
      <Menu>
        <Home/>
      </Menu>
    ),
    errorElement: <ErroPage/>
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
    path: "/User",
    element: (
    <SnackbarProvider>
      <User/>
      <AuthProvider/>
    </SnackbarProvider>
    ),
    errorElement: <ErroPage/>
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
    path: ":IdProject/Clients",
    element: (
      <Menu>
        <Client/>
      </Menu>
    ),
  },
  {
    path: ":IdProject/Forms",
    element: (
      <Menu>
        <Forms/>
      </Menu>
    ),
  },
  {
    path: ":IdProject/Report",
    element: (
      <Menu>
        <Report/>
      </Menu>
    ),
  },
  {
    path: ":IdProject/Mail",
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
