import React from "react";
import DataTables from "views/admin/tables";
import SignIn from "views/auth/SignIn";
// Icon Imports
import {MdBarChart,MdLock} from "react-icons/md";
const routes = [
 {
    name: "Users",
    layout: "/admin",
    icon: <MdBarChart className="h-6 w-6" />,
    path: "data-tables",
    component: <DataTables />,
  },
 
  {
    name: "Logout",
    layout: "/auth",
    path: "sign-in",
    icon: <MdLock className="h-6 w-6" />,
    component: <SignIn />,
  },

];
export default routes;
