import Cookie from "js-cookie";
import { createBrowserRouter, redirect } from "react-router-dom";

import { Signin } from "@/pages/singin";

import { env } from "./env/env";
import { Dashboard } from "./pages/dashboard";
import { Root } from "./pages/root";
import { Signup } from "./pages/signup";

export const routes = createBrowserRouter([
	{
		path: "/",
		loader: () => {
			const authCookie = Cookie.get(env.VITE_TOKEN_KEY);

			if (authCookie) {
				return redirect("/dashboard");
			}

			return redirect("/signin");
		},
	},
	{
		path: "/signin",
		element: <Root />,
		loader: () => {
			const authCookie = Cookie.get(env.VITE_TOKEN_KEY);

			if (authCookie) {
				return redirect("/dashboard");
			}
			return null;
		},
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
		loader: () => {
			const authCookie = Cookie.get(env.VITE_TOKEN_KEY);

			if (authCookie) {
				return redirect("/dashboard");
			}
			return null;
		},
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
