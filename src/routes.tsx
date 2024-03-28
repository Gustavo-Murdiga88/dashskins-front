import { createBrowserRouter, redirect } from "react-router-dom";

import { Signin } from "@/pages/singin";

export const routes = createBrowserRouter([
	{
		path: "/",
		loader: () => redirect("/signin"),
	},
	{
		path: "/signin",
		element: <Signin />,
	},
]);
