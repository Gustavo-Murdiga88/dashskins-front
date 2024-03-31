import { AxiosError } from "axios";
import { ArrowLeft } from "lucide-react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { api } from "@/lib/axios";

import { FormData, resolver } from "./validation";

export function Signup() {
	const navigate = useNavigate();

	const form = useForm<FormData>({
		resolver,
	});

	const { register } = form;

	async function handleSubmit(data: FormData) {
		try {
			const userCreated = await api.post("/account", {
				email: data.email,
				age: data.age,
				password: data.password,
				role: data.role,
				name: data.name,
			});

			if (userCreated.status === 201) {
				toast.success(
					"Usuário criado com sucesso! Você está sendo redirecionado para a tela de login",
				);

				navigate("/signin");
			}
		} catch (error) {
			if (error instanceof AxiosError) {
				toast.error(error.response?.data.message);
			}
		}
	}

	return (
		<div className="border-r-[0.125rem] p-4 flex flex-col items-center justify-center bg-zinc-1000 relative">
			<button
				onClick={() => navigate("/signin")}
				aria-label="voltar"
				title="voltar para a tela de login"
				className="absolute top-4 left-4 rounded-full p-3 hover:bg-muted border-[2px] border-transparent hover:border-border transition-colors"
			>
				<ArrowLeft />
			</button>

			<div className="md:w-[80%] xl:w-[60%] w-[90%]">
				<header className="mb-10">
					<h1 className="text-xl text-foreground font-bold">
						Se registre em nosso sistema e aproveite o melhor da{" "}
						<span className="text-purple-400 font-bold mt-2 underline underline-offset-8">
							Dashskins
						</span>
					</h1>
				</header>
				<form
					onSubmit={form.handleSubmit(handleSubmit)}
					className="w-full flex flex-col gap-4"
				>
					<Label htmlFor="name">Nome</Label>
					<Input
						id="name"
						{...register("name")}
						placeholder="John joe"
						className="bg-foreground/[0.026]"
					/>
					<Label htmlFor="email">Email</Label>
					<Input
						id="email"
						{...register("email")}
						placeholder="johndoe@gmail.com"
						className="bg-foreground/[0.026]"
					/>
					<Label htmlFor="age">Idade</Label>
					<Input
						id="age"
						{...register("age")}
						placeholder="insira sua sua senha"
						className="bg-foreground/[0.026]"
					/>
					<Label htmlFor="password">Senha</Label>
					<Input
						id="password"
						{...register("password")}
						placeholder="insira sua sua senha"
						className="bg-foreground/[0.026]"
					/>
					<Button
						className="w-full bg-purple-800 border border-purple-700 hover:bg-purple-600 mt-5"
						variant="outline"
					>
						Registrar-se
					</Button>
				</form>
			</div>
		</div>
	);
}
