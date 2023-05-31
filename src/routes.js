import React from "react";
import DataTables from "views/admin/tables";
import Profile from "views/admin/profile";

import SignIn from "views/auth/SignIn";
// Icon Imports
import {MdBarChart,MdLock,MdPerson} from "react-icons/md";
const routes = [
  {
      name: "Wait List",
      layout: "/admin",
      icon: <MdBarChart className="h-6 w-6" />,
      path: "data-tables",
      component: <DataTables />,
    },
    {
      name: "Add Stuff",
      layout: "/admin",
      path: "profile",
      icon: <MdPerson className="h-6 w-6" />,
      component: <Profile />,
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
