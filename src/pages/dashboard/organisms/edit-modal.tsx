import { AvatarFallback } from "@radix-ui/react-avatar";
import { Label } from "@radix-ui/react-label";
import { Loader } from "lucide-react";
import { ChangeEvent, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { sendAvatarToDatabase } from "@/api/send-avatar";
import { UpdateUserToDataBase } from "@/api/update-user";
import { UserProps } from "@/api/user-from-database";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
	Dialog,
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
import { env } from "@/env/env";
import { userStore } from "@/store/user-store";

import { resolver, SchemeUpdatedUser } from "../validation/update-user";

interface IModalEditProps {
	open: boolean;
	user: UserProps;
	setOpen: (open: boolean) => void;
	callback: ({ user }: { user: UserProps }) => void;
}
export function ModalEditUser({
	open,
	setOpen,
	user,
	callback,
}: IModalEditProps) {
	const { currentUser, setAvatarURLState, setUser } = userStore((state) => ({
		currentUser: state.user,
		setAvatarURLState: state.setAvatarURL,
		setUser: state.setUser,
	}));

	const [avatarURL, setAvatarURL] = useState(user.avatar.url ?? "");
	const [avatarFile, setAvatarFile] = useState<File | undefined>(undefined);

	const form = useForm<SchemeUpdatedUser>({
		resolver,
		defaultValues: {
			name: user.name,
			age: user.age,
			email: user.email,
			role: user.role,
		},
	});

	const {
		register,
		formState: { errors, isSubmitting },
	} = form;

	function handleChangeFile(e: ChangeEvent<HTMLInputElement>) {
		const file = e.currentTarget.files?.[0];

		if (!(file instanceof File)) {
			return;
		}

		const url = URL.createObjectURL(file);
		setAvatarURL(url);
		setAvatarFile(file);
	}

	const handleSubmit = form.handleSubmit(async ({ age, email, name, role }) => {
		try {
			const userEdited = await UpdateUserToDataBase({
				age,
				email,
				id: user.id,
				name,
				role,
			});

			if (!userEdited) {
				return;
			}

			if (user.id === currentUser.id) {
				setUser({
					...currentUser,
					email,
					name,
				});
			}

			toast.success("Usuário atualizado com sucesso");
			setOpen(false);

			const userToDatabase: UserProps = {
				age,
				email,
				isNew: false,
				id: user.id,
				avatar: user.avatar,
				name,
				role,
			};

			if (avatarFile === undefined) {
				callback?.({
					user: userToDatabase,
				});
				return;
			}

			const avatarCreated = await sendAvatarToDatabase({
				avatar: avatarFile,
				userId: user.id,
			});

			if (currentUser.id === user.id && avatarCreated) {
				setAvatarURLState(avatarCreated.url);
			}

			URL.revokeObjectURL(avatarURL);
			setAvatarURL(avatarCreated?.url || "");
			setAvatarFile(undefined);

			userToDatabase.avatar = {
				url: avatarCreated?.url || user.avatar.url,
				id: avatarCreated?.id || user.avatar.id,
				userId: user.id,
			};
			callback?.({
				user: userToDatabase,
			});
		} catch (error) {
			toast.error("Erro ao atualizar o usuário");
		}
	});

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
							data-disabled={user.avatar.url !== env.VITE_SERVER_URL}
							className="data-[disabled=true]:cursor-not-allowed h-32 w-32 mx-auto flex items-center justify-center border rounded-full hover:cursor-pointer hover:bg-muted"
							title={
								user.avatar.url
									? "Não é possível alterar a foto pois o usuário já possuí uma"
									: "clique para alterar sua foto"
							}
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
							disabled={user.avatar.url !== env.VITE_SERVER_URL}
							accept="image/png, image/jpeg"
						/>
					</Label>

					<div>
						<Label htmlFor="name">Nome</Label>
						<Input
							id="name"
							{...register("name")}
							placeholder="John joe"
							disabled={isSubmitting}
						/>
						<p className="text-red-500 font-semibold mt-1">
							{errors.name?.message}
						</p>
					</div>
					<div>
						<Label htmlFor="email">Email</Label>
						<Input
							{...register("email")}
							id="email"
							placeholder="johndoe@gmail.com"
							disabled={isSubmitting}
						/>
						<p className="text-red-500 font-semibold mt-1">
							{errors.email?.message}
						</p>
					</div>
					<div>
						<Label htmlFor="age">Idade</Label>
						<Input
							{...register("age")}
							id="age"
							placeholder="30"
							type="number"
							maxLength={3}
							disabled={isSubmitting}
						/>
						<p className="text-red-500 font-semibold mt-1">
							{errors.name?.message}
						</p>
					</div>
					<div>
						<Select
							defaultValue={user.role}
							onValueChange={(value) => {
								form.setValue("role", value as never);
							}}
						>
							<SelectTrigger className="text-xs">
								<SelectValue placeholder="Selecione uma regra" />
							</SelectTrigger>
							<SelectContent>
								<SelectGroup>
									<SelectLabel>Selecione uma regra</SelectLabel>
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
						<p className="text-red-500 font-semibold mt-1">
							{errors.role?.message}
						</p>
					</div>
				</form>
				<DialogFooter className="mt-4 flex flex-col gap-4 md:flex-row">
					<Button
						className="bg-red-500 text-zinc-100 hover:bg-red-400 hover:text-zinc-950"
						onClick={() => setOpen(false)}
					>
						Cancelar
					</Button>
					<Button
						onClick={handleSubmit}
						className="bg-emerald-500 text-zinc-100 hover:bg-emerald-400 hover:text-zinc-950"
					>
						Confirmar
						<Loader
							data-loading={isSubmitting}
							size={16}
							className="animate-spin data-[loading=false]:hidden ml-2"
						/>
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
