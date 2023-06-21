import React from "react";
import DataTables from "views/admin/tables";
import Profile from "views/admin/profile";
import Stuff from "views/staff/Index";
import SignIn from "views/auth/SignIn";
import Member from "views/member/member";
import Dashboard from "views/dashboard/Index";

// Icon Imports
import {
  MdBarChart,
  MdLock,
  MdPerson,
  MdDashboard,
  MdManageAccounts,
} from "react-icons/md";
const routes = [
  {
    name: "Dashboard",
    layout: "/admin",
    icon: <MdDashboard className="h-6 w-6" />,
    path: "dashboard",
    component: <Dashboard />,
  },
  {
    name: "Card Member",
    layout: "/admin",
    path: "member",
    icon: <MdManageAccounts className="h-6 w-6" />,
    component: <Member />,
  },
  {
    name: "Wait List",
    layout: "/admin",
    icon: <MdBarChart className="h-6 w-6" />,
    path: "data-tables",
    component: <DataTables />,
  },

  {
    name: "Add Staff",
    layout: "/admin",
    path: "profile",
    icon: <MdPerson className="h-6 w-6" />,
    component: <Profile />,
  },

  {
    name: "Staff",
    layout: "/admin",
    path: "staff",
    icon: <MdPerson className="h-6 w-6" />,
    component: <Stuff />,
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
