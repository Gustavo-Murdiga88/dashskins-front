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

interface IHeaderProps {
	user: { email: string; id: string; name: string; avatarURL: string };
}
export function Header({ user }: IHeaderProps) {
	const navigate = useNavigate();
	function logout() {
		Cookies.remove("@dashskins:token");
		Cookies.remove("@dashskins:refreshToken");

		navigate("/signin");
	}

	const [firstName, lastName] = user ? user.name.split(" ") : ["J", "D"];

	return (
		<header className="pb-2 pt-4 px-5 border-b flex justify-between items-center">
			<img
				loading="lazy"
				decoding="async"
				className="my-3 object-cover h-[50px]"
				src="https://dashskins.com.br/logo.png"
				alt="dash skins logos"
			/>

			<div className="flex gap-2 h-full items-center">
				<Avatar className="mr-2">
					<AvatarImage src={`http://localhost:3000/${user?.avatarURL}`} />
					<AvatarFallback>
						{firstName[0]}
						{lastName[0]}
					</AvatarFallback>
				</Avatar>
				<div className="min-w-[2px] min-h-[20px] bg-muted rounded-sm" />
				<DropdownMenu>
					<DropdownMenuTrigger className="group">
						<strong>
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
