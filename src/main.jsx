import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
    RouterProvider,
} from "react-router-dom";
import router from './route/index.jsx'
import './index.css'
import {AuthContextProvider} from "./context/AuthContext.jsx";




createRoot(document.getElementById('root')).render(
  <AuthContextProvider>
    <RouterProvider router={router}/>
  </AuthContextProvider>,
)
