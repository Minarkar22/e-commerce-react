import {createBrowserRouter} from "react-router-dom";
import Layout from "../components/Layout.jsx";
import Home from "../pages/Home.jsx";
import ProductDetail from "../pages/ProductDetail.jsx";
import Register from "../pages/Register.jsx";
import Login from "../pages/Login.jsx";
import ProductLists from "../pages/admin/ProductLists.jsx";
import AdminLayout from "../components/AdminLayout.jsx";
import ProductCreate from "../pages/admin/ProductCreate.jsx";



const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "/products/:id",
                element: <ProductDetail />,
            },
            {
                path: "/register",
                element: <Register />,
            },
            {
                path: "/login",
                element: <Login />,
            }
        ]
    },
    {
        path: "/admin",
        element: <AdminLayout />,
        children: [
            {
                path: "/admin",
                element: <ProductLists />,
            },
            {
                path: "/admin/create",
                element: <ProductCreate />,
            }
        ]
    }
])

export default router;