import { AvatarFallback } from "@radix-ui/react-avatar";
import { Label } from "@radix-ui/react-label";
import { ChangeEvent, InputHTMLAttributes, useState } from "react";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

interface IModalEditProps {
	open: boolean;
	setOpen: (open: boolean) => void;
}
export function ModalEditUser({ open, setOpen }: IModalEditProps) {
	const [avatarURL, setAvatarURL] = useState("");
	const [avatarFile, setAvatarFile] = useState<File | undefined>(undefined);

	function handleChangeFile(e: ChangeEvent<HTMLInputElement>) {
		const file = e.currentTarget.files?.[0];

		if (!(file instanceof File)) {
			return;
		}

		const url = URL.createObjectURL(file);
		setAvatarURL(url);
		setAvatarFile(file);
	}

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Edição de usuários</DialogTitle>
					<DialogDescription className="text-xs font-semibold">
						Aqui você poderá editar algumas de suas informações
					</DialogDescription>
				</DialogHeader>
				<form className="flex flex-col gap-4 text-xs">
					<Label htmlFor="avatar">
						<Avatar
							className="h-32 w-32 mx-auto flex items-center justify-center border rounded-full hover:cursor-pointer hover:bg-muted"
							title="clique para alterar sua foto"
						>
							<AvatarImage src={avatarURL} className="object-cover" />
							<AvatarFallback className="text-2xl font-semibold">
								GM
							</AvatarFallback>
						</Avatar>
						<input
							onChange={handleChangeFile}
							id="avatar"
							type="file"
							className="sr-only"
							accept="image/png, image/jpeg"
						/>
					</Label>

					<div>
						<Label htmlFor="name">Nome</Label>
						<Input id="name" placeholder="John joe" />
					</div>
					<div>
						<Label htmlFor="email">Email</Label>
						<Input id="email" placeholder="johndoe@gmail.com" />
					</div>
					<div>
						<Label htmlFor="age">Idade</Label>
						<Input id="age" placeholder="30" type="number" maxLength={3} />
					</div>
					<div>
						<Label>Regra</Label>
						<Select>
							<SelectTrigger className="text-xs">
								<SelectValue placeholder="Selecione uma regra" />
							</SelectTrigger>
							<SelectContent>
								<SelectGroup>
									<SelectItem value="EDIT" className="text-xs">
										Apenas Edição
									</SelectItem>
									<SelectItem value="DELETE" className="text-xs">
										Apenas exclusão
									</SelectItem>
									<SelectItem value="ALL" className="text-xs">
										Exclusão e Edição
									</SelectItem>
								</SelectGroup>
							</SelectContent>
						</Select>
					</div>
				</form>
				<DialogFooter className="mt-4">
					<Button
						className="bg-red-500 text-zinc-100 hover:bg-red-400 hover:text-zinc-950"
						onClick={() => setOpen(false)}
					>
						Cancelar
					</Button>
					<Button className="bg-emerald-500 text-zinc-100 hover:bg-emerald-400 hover:text-zinc-950">
						Confirmar
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
