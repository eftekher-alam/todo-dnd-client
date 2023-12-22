import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../components/home/Home";
import ErrorPage from "../components/error_page/ErrorPage";
import Login from "../components/login/Login";
import Register from "../components/register/Register";
import Dashboard from "../components/dashboard/Dashboard";
import PrivateRoute from './PrivateRoute';
import EditTask from "../components/edit_task/EditTask";
import Contact from "../components/contact/Contact";
import About from "../components/about/About";


const router = createBrowserRouter([
    {
        path: "/",
        element: <App></App>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                path: "/",
                element: <Home></Home>
            },
            {
                path: "/login",
                element: <Login></Login>
            },
            {
                path: "/register",
                element: <Register></Register>
            },
            {
                path: "/dashboard",
                element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>
            },
            {
                path: "/edit-task/:id",
                element: <PrivateRoute><EditTask></EditTask></PrivateRoute>
            },
            {
                path: "/contact",
                element: <Contact></Contact>
            },
            {
                path: "/about",
                element: <About></About>
            }
        ]
    }
])

export default router;