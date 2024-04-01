import "./global.css";

import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { Toaster } from "sonner";

import { routes } from "./routes";

ReactDOM.createRoot(document.getElementById("root")!).render(
	// <React.StrictMode>
	<>
		<RouterProvider router={routes} />
		<Toaster
			toastOptions={{
				classNames: {
					toast: "bg-emerald-400",
					title: "text-zinc-950",
					description: "text-zinc-950",
					icon: "text-zinc-950",
				},
			}}
		/>
	</>,
	// </React.StrictMode>,
);
