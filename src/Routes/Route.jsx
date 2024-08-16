import { createBrowserRouter } from "react-router-dom";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";

const router = createBrowserRouter([
    // {
    //     path: '/',
    //     element: <Home />
    // }

    {
        path: '/',
        element: <Login />
    }
])
export default router