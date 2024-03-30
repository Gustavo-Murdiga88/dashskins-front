import { createBrowserRouter, redirect } from "react-router-dom";

import { Signin } from "@/pages/singin";

import { Dashboard } from "./pages/dashboard";
import { Root } from "./pages/root";
import { Signup } from "./pages/signup";

export const routes = createBrowserRouter([
	{
		path: "/",
		loader: () => redirect("/signin"),
	},
	{
		path: "/signin",
		element: <Root />,
		children: [
			{
				path: "/signin",
				element: <Signin />,
			},
		],
	},
	{
		path: "/signup",
		element: <Root />,
		children: [
			{
				path: "/signup",
				element: <Signup />,
			},
		],
	},
	{
		path: "/dashboard",
		element: <Dashboard />,
	},
]);
