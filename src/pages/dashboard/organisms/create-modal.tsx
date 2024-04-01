import { AvatarFallback } from "@radix-ui/react-avatar";
import { DialogClose } from "@radix-ui/react-dialog";
import { Label } from "@radix-ui/react-label";
import { Loader } from "lucide-react";
import { ChangeEvent, ElementRef, ReactNode, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { CreateUserToDataBase } from "@/api/create-user";
import { sendAvatarToDatabase } from "@/api/send-avatar";
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
import { env } from "@/env/env";

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
		defaultValues: {
			age: "",
			email: "",
			name: "",
			password: "",
		} as never,
	});

	const {
		register,
		setValue,
		formState: { errors, isSubmitting },
	} = form;

	const handleSubmit = form.handleSubmit(
		async ({ age, email, name, role, password }) => {
			const { status, user: userCreated } = await CreateUserToDataBase({
				age,
				email,
				name,
				password,
				role,
			});

			if (status !== 201) {
				return;
			}

			const userToDatabase: UserProps = {
				...userCreated!,
				isNew: true,
				avatar: {
					id: userCreated!.avatar.id,
					userId: userCreated!.id,
					url: userCreated!.avatar.url || env.VITE_SERVER_URL,
				},
			};

			if (avatarFile === undefined) {
				callback?.({
					user: userToDatabase,
				});

				toast.success("Usuário criado com sucesso");
				form.reset();
				triggerRef.current?.click();
				return;
			}

			const { id } = userCreated!;
			const avatarCreated = await sendAvatarToDatabase({
				avatar: avatarFile,
				userId: id,
			});

			if (!avatarCreated) {
				return;
			}

			callback?.({
				user: {
					...userToDatabase,
					avatar: {
						id: avatarCreated?.id || userCreated!.avatar.id,
						userId: userCreated!.id,
						url: avatarCreated?.url || userCreated!.avatar.url,
					},
				},
			});
			toast.success("Usuários criado com sucesso");
			triggerRef.current?.click();

			form.reset();
			URL.revokeObjectURL(avatarURL);
			setAvatarURL("");
			setAvatarFile(undefined);
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
					<DialogTitle>Criar novos usuários</DialogTitle>
					<DialogDescription className="text-xs font-semibold">
						Aqui você poderá criar novos usuários
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
								DS
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
						<Input
							id="name"
							placeholder="John joe"
							{...register("name")}
							disabled={isSubmitting}
						/>
						<p className="text-red-500 font-semibold mt-1">
							{errors.name?.message}
						</p>
					</div>
					<div>
						<Label htmlFor="email">Email</Label>
						<Input
							id="email"
							{...register("email")}
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
							{errors.age?.message}
						</p>
					</div>
					<div>
						<Label htmlFor="password">Senha</Label>
						<Input
							{...register("password")}
							id="password"
							placeholder="*****"
							type="password"
							disabled={isSubmitting}
						/>
						<p className="text-red-500 font-semibold mt-1">
							{errors.password?.message}
						</p>
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
						<p className="text-red-500 font-semibold mt-1">
							{errors.role?.message}
						</p>
					</div>
				</form>
				<DialogFooter className="mt-4 flex flex-col gap-4 md:flex-row">
					<DialogClose asChild>
						<Button className="bg-red-500 text-zinc-100 hover:bg-red-400 hover:text-zinc-950">
							Cancelar
						</Button>
					</DialogClose>
					<Button
						disabled={isSubmitting}
						onClick={() => handleSubmit()}
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
