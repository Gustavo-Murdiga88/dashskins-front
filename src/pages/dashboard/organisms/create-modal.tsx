import { AvatarFallback } from "@radix-ui/react-avatar";
import { DialogClose } from "@radix-ui/react-dialog";
import { Label } from "@radix-ui/react-label";
import { ChangeEvent, ElementRef, ReactNode, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

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
	DialogTrigger,
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
import { api } from "@/lib/axios";

import { resolver, SchemeCreateUser } from "../validation/create-user";

interface IModalEditProps {
	children: ReactNode;
	callback?: ({ user }: { user: UserProps }) => void;
}
export function CreateModal({ children, callback }: IModalEditProps) {
	const triggerRef = useRef<ElementRef<typeof DialogTrigger>>(null);

	const [avatarURL, setAvatarURL] = useState("");
	const [avatarFile, setAvatarFile] = useState<File | undefined>(undefined);

	const form = useForm<SchemeCreateUser>({
		resolver,
	});

	const { register, setValue } = form;

	async function sendAvatar(userId: string) {
		const data = new FormData();

		data.append("file", avatarFile!);

		try {
			const avatarCreated = await api.post<{ url: string; id: string }>(
				`/user/avatar/${userId}`,
				data,
			);

			return {
				url: `http://localhost:3000/${avatarCreated.data.url}`,
				id: avatarCreated.data.id,
			};
		} catch (err) {
			toast.error("Erro ao enviar imagem");
			return null;
		}
	}

	const handleSubmit = form.handleSubmit(
		async ({ age, email, name, role, password }) => {
			try {
				const userCreated = await api.post<{ user: UserProps }>("/user", {
					email,
					name,
					age,
					role,
					password,
				});

				if (userCreated.status !== 201) {
					return;
				}

				if (avatarFile === undefined) {
					callback?.({
						user: {
							age,
							email,
							name,
							role,
							id: userCreated.data.user.id,
							avatar: {
								id: userCreated.data.user.avatar.id,
								userId: userCreated.data.user.id,
								url:
									userCreated.data.user.avatar.url || "http://localhost:3000",
							},
						},
					});
					triggerRef.current?.click();
					return;
				}

				const { id } = userCreated.data.user;
				const avatarCreated = await sendAvatar(id);

				triggerRef.current?.click();

				toast.success("Usuários criado com sucesso");
				form.reset({
					age: "",
					email: "",
					name: "",
					password: "",
					role: "",
				} as never);

				URL.revokeObjectURL(avatarURL);
				setAvatarURL("");
				setAvatarFile(undefined);
				callback?.({
					user: {
						age,
						email,
						name,
						role,
						id: userCreated.data.user.id,
						avatar: {
							id: avatarCreated?.id || userCreated.data.user.avatar.id,
							userId: userCreated.data.user.id,
							url: avatarCreated?.url || userCreated.data.user.avatar.url,
						},
					},
				});
				triggerRef.current?.click();
			} catch (error) {
				toast.error("Erro ao criar o novo usuário");
			}
		},
	);

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
		<Dialog>
			<DialogTrigger asChild ref={triggerRef}>
				{children}
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Edição de usuários</DialogTitle>
					<DialogDescription className="text-xs font-semibold">
						Aqui você poderá editar algumas de suas informações
					</DialogDescription>
				</DialogHeader>
				<form className="flex flex-col gap-4 text-xs">
					<Label htmlFor="avatar" className="h-32 w-32 mx-auto rounded-full">
						<Avatar
							className="flex size-full items-center justify-center border rounded-full hover:cursor-pointer hover:bg-muted"
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
						<Input id="name" placeholder="John joe" {...register("name")} />
					</div>
					<div>
						<Label htmlFor="email">Email</Label>
						<Input
							id="email"
							{...register("email")}
							placeholder="johndoe@gmail.com"
						/>
					</div>
					<div>
						<Label htmlFor="age">Idade</Label>
						<Input
							{...register("age")}
							id="age"
							placeholder="30"
							type="number"
							maxLength={3}
						/>
					</div>
					<div>
						<Label htmlFor="password">Senha</Label>
						<Input
							{...register("password")}
							id="password"
							placeholder="*****"
							type="password"
						/>
					</div>
					<div>
						<Select onValueChange={(value) => setValue("role", value as never)}>
							<SelectTrigger className="text-xs">
								<SelectValue placeholder="Selecione uma regra" />
							</SelectTrigger>
							<SelectContent>
								<SelectGroup>
									<SelectLabel className="text-xs">
										Selecione uma regra
									</SelectLabel>
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
					<DialogClose asChild>
						<Button className="bg-red-500 text-zinc-100 hover:bg-red-400 hover:text-zinc-950">
							Cancelar
						</Button>
					</DialogClose>
					<Button
						onClick={() => handleSubmit()}
						className="bg-emerald-500 text-zinc-100 hover:bg-emerald-400 hover:text-zinc-950"
					>
						Confirmar
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
