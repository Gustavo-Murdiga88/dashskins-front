import "./global.css";

import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { Toaster } from "sonner";

import { routes } from "./routes";

ReactDOM.createRoot(document.getElementById("root")!).render(
	// <React.StrictMode>
	<>
		<RouterProvider router={routes} />
		<Toaster />
	</>,
	// </React.StrictMode>,
);
