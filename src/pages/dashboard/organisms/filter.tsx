import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { Label } from "@radix-ui/react-label";
import { CirclePlus } from "lucide-react";
import { FormEvent } from "react";
import { useNavigate } from "react-router-dom";

import { UserProps } from "@/api/user-from-database";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { CreateModal } from "./create-modal";

type FilterCallback = {
	callback?: ({ user }: { user: UserProps }) => void;
};

export function Filter({ callback }: FilterCallback) {
	const navigate = useNavigate();
	function handleSearch(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();

		const data = Object.fromEntries(
			new FormData(e.currentTarget).entries(),
		) as {
			name: string;
		};

		const url = new URL(window.location.href);

		url.searchParams.set("name", data.name);

		navigate(`/dashboard?${url.searchParams.toString()}`);
	}

	return (
		<section className="mt-10">
			<form onSubmit={handleSearch}>
				<div className="mt-4 max-w-[50%] flex items-end gap-4 ml-auto justify-end">
					<div>
						<h1 className="text-md font-semibold">
							Filtre pelo nome do usuário
						</h1>
						<Label htmlFor="name" className="text-xs">
							Nome
						</Label>
						<Input
							id="name"
							name="name"
							placeholder="Digite o nome do usuário"
							className="bg-foreground/[0.026] text-xs"
						/>
					</div>
					<Button variant="outline" className="flex gap-2 text-xs">
						<MagnifyingGlassIcon />
						Buscar
					</Button>

					<CreateModal callback={callback}>
						<Button
							variant="outline"
							className="flex gap-2 text-xs bg-emerald-600 hover:bg-emerald-500"
						>
							<CirclePlus size={16} />
							Criar usuários
						</Button>
					</CreateModal>
				</div>
			</form>
		</section>
	);
}
