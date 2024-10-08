import { createBrowserRouter } from "react-router-dom";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import Product from "../Pages/Product/Product";

const router = createBrowserRouter([
    // {
    //     path: '/',
    //     element: <Home />
    // }

    // {
    //     path: '/',
    //     element: <Login />
    // }
    {
        path: '/',
        element: <Product />,
        loader: () => fetch('http://localhost:4000/products-count')
    }
])
export default router