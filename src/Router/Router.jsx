import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Home from "../Home/Home";
import AddAllItems from "../components/Add Items/AddAllItems";
import Error from "../Error/Error";
import AllItems from "../components/All Items/AllItems";
import Bills from "../components/Bills/Bills";
import AllCustomer from "../components/All Customer/AllCustomer";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    errorElement:<Error></Error>,
    children:[
        {
            path: "/",
            element:<Home></Home>
        },
        {
            path: "/additems",
            element:<AddAllItems></AddAllItems>
        },
        {
            path: "/allitems",
            element:<AllItems></AllItems>
        },
        {
            path: "/bills",
            element:<Bills></Bills>
        },
        {
            path: "/allcustomer",
            element:<AllCustomer></AllCustomer>
        },


        
    ]
  },
]);
export default Router;
