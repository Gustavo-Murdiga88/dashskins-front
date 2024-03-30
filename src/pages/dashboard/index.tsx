import { ChevronDown, ChevronUp, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Filter } from "./organisms/filter";
import { Pagination } from "./organisms/pagination";
import { Table } from "./organisms/table";

export function Dashboard() {
	const navigate = useNavigate();
	function logout() {
		navigate("/signin");
	}

	return (
		<main className="max-w-[77.5rem] mx-auto">
			<header className="pb-2 pt-4 px-5 border-b flex justify-between items-center">
				<img
					loading="lazy"
					decoding="async"
					className="my-3 max-h-[50px] object-cover"
					src="https://dashskins.com.br/logo.png"
					alt="dash skins logos"
				/>

				<div className="flex gap-2 h-full items-center">
					<Avatar className="mr-2">
						<AvatarImage src="https://github.com/gustavo-murdiga88.png" />
						<AvatarFallback>GM</AvatarFallback>
					</Avatar>
					<div className="min-w-[2px] min-h-[20px] bg-muted rounded-sm" />
					<DropdownMenu>
						<DropdownMenuTrigger className="group">
							<strong>
								Gustavo Murdiga
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

			<section>
				<Filter />
				<Table />
				<Pagination currentPage={1} itemsPerPage={10} totalOfItems={100} />

				{/* <Loading /> */}
			</section>
		</main>
	);
}
