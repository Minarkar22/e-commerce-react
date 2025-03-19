import {createBrowserRouter} from "react-router-dom";
import Layout from "../components/Layout.jsx";
import Home from "../pages/Home.jsx";
import ProductDetail from "../pages/ProductDetail.jsx";
import Register from "../pages/Register.jsx";
import Login from "../pages/Login.jsx";
import ProductLists from "../pages/admin/ProductLists.jsx";
import AdminLayout from "../components/AdminLayout.jsx";
import ProductCreate from "../pages/admin/ProductCreate.jsx";
import ProductEdit from "../pages/admin/ProductEdit.jsx";



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
            },
            {
                path: "/admin/products/:id/edit",
                element: <ProductEdit />,
            }
        ]
    }
])

export default router;