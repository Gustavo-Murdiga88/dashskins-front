import { Outlet } from "react-router-dom";

export function Root() {
	return (
		<main className="h-screen w-full grid xl:grid-cols-[40%_1fr] md:grid-cols-[1fr_1fr] bg-background grid-cols-1">
			<Outlet />
			<main className="md:flex items-center justify-center hidden">
				<div
					id="dash"
					className="presenter bg-no-repeat bg-cover rounded-lg animate-in slide-in-from-bottom-20 fade-in-0 duration-700"
				/>
			</main>
		</main>
	);
}
