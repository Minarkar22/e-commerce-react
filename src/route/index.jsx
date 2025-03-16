import {createBrowserRouter} from "react-router-dom";
import Layout from "../components/Layout.jsx";
import Home from "../pages/Home.jsx";
import ProductDetail from "../pages/ProductDetail.jsx";
import Register from "../pages/Register.jsx";



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
            }
        ]
    },
])

export default router;