import { createBrowserRouter } from "react-router";
import RootLayout from "../Layouts/RootLayout/RootLayout";
import Home from "../pages/Home/Home";
import AuthLayout from "../Layouts/AuthLayout/AuthLayout";
import Login from "../authItems/Login/Login";
import SignUp from "../authItems/SignUp/SignUp";
import DashboardLayout from "../Layouts/DashboardLayout/DashboardLayout";
import StudentDashboard from "../Dashboard/StudentDashboard/StudentDashboard";

export const route = createBrowserRouter([
    {
        path: "/",
        Component: RootLayout,
        children: [
            {
                index: true,
                Component: Home,
            }
        ]
    },
    {
        path: "/auth",
        Component: AuthLayout,
        children: [
            {
                path: "student/login",
                Component: Login,
            },
            {
                path: "student/signup",
                Component: SignUp,
            }
        ]
    },
    {
        path: "/dashboard",
        Component: DashboardLayout,
        children: [
            {
                path: "student",
                Component: StudentDashboard,
            }
        ]
    }
])