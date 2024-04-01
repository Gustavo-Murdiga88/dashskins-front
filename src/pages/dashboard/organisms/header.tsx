import Cookies from "js-cookie";
import { ChevronDown, ChevronUp, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { env } from "@/env/env";
import { userStore } from "@/store/user-store";

export function Header() {
	const user = userStore((state) => state.user);

	const navigate = useNavigate();
	function logout() {
		Cookies.remove(env.VITE_TOKEN_KEY);
		Cookies.remove(env.VITE_REFRESH_TOKEN_KEY);

		navigate("/signin");
	}

	const [firstName = "J", lastName = "D"] = user
		? user.name.split(" ")
		: ["J", "D"];

	return (
		<header className="pb-2 pt-4 px-5 border-b flex flex-col md:flex-row md:justify-between items-center">
			<img
				loading="lazy"
				decoding="async"
				className="my-3 object-cover h-[50px]"
				src="https://dashskins.com.br/logo.png"
				alt="dash skins logos"
			/>

			<div className="flex gap-2 h-full md:items-center my-3 md:my-0 ">
				<Avatar className="mr-2">
					<AvatarImage src={user.avatarURL} />
					<AvatarFallback className="uppercase">
						{firstName[0]}
						{lastName[0]}
					</AvatarFallback>
				</Avatar>
				<div className="min-w-[2px] min-h-[20px] bg-muted rounded-sm" />
				<DropdownMenu>
					<DropdownMenuTrigger className="group">
						<strong className="capitalize">
							{user?.name ?? "John Doe"}
							<ChevronDown className="group-data-[state=open]:inline-block group-data-[state=closed]:hidden ml-2" />
							<ChevronUp className="group-data-[state=open]:hidden group-data-[state=closed]:inline-block ml-2" />
						</strong>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						<DropdownMenuItem
							onClick={logout}
							className="flex items-center justify-between text-xs font-semibold"
						>
							Logout <LogOut size={16} />
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
		</header>
	);
}
