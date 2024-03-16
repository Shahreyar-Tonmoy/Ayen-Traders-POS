import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Home from "../Home/Home";
import AddAllItems from "../components/Add Items/AddAllItems";
import Error from "../Error/Error";
import AllItems from "../components/All Items/AllItems";
import Bills from "../components/Bills/Bills";
import AllCustomer from "../components/All Customer/AllCustomer";
import SignIn from "../components/Login/SignIn";
import PrivateRoute from "../components/Login/PrivateRoute";
import AllProduct from "../components/All Product/AllProduct";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    errorElement:<Error></Error>,
    children:[
        {
            path: "/",
            element:<PrivateRoute><Home></Home></PrivateRoute>
        },
        {
            path: "/additems",
            element:<PrivateRoute><AddAllItems></AddAllItems></PrivateRoute>
        },
        {
            path: "/allitems",
            element:<PrivateRoute><AllItems></AllItems></PrivateRoute>
        },
        {
            path: "/bills",
            element:<PrivateRoute><Bills></Bills></PrivateRoute>
        },
        {
            path: "/allcustomer",
            element:<PrivateRoute><AllCustomer></AllCustomer></PrivateRoute>
        },
        {
            path: "/SignIn",
            element:<SignIn></SignIn>
        },
        {
            path: "/allproduct",
            element:<AllProduct></AllProduct>
        },


        
    ]
  },
]);
export default Router;
