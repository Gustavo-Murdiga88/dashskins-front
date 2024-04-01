import { AxiosError } from "axios";
import { Loader } from "lucide-react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { createSession } from "@/api/create-session";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { FormData, resolver } from "./validation";

export function Signin() {
	const navigate = useNavigate();
	const form = useForm<FormData>({
		resolver,
	});

	const {
		register,
		formState: { errors, isSubmitting },
	} = form;

	async function handleSubmit(data: FormData) {
		try {
			await createSession({
				email: data.email,
				password: data.password,
			});

			navigate("/dashboard");
		} catch (err) {
			if (err instanceof AxiosError && err.response?.status === 401) {
				toast.error("Email ou senha inválido");
			}
		}
	}

	return (
		<div className="border-r-[0.125rem] p-4 flex flex-col items-center justify-center bg-zinc-1000">
			<div className="md:w-[80%] xl:w-[60%] w-[90%]">
				<header className="mb-7">
					<h1 className="text-2xl text-foreground font-bold">
						Bem-vindo(a), ao sistema
						<img
							loading="lazy"
							decoding="async"
							className="my-3 min-h-[90px]"
							src="https://dashskins.com.br/logo.png"
							alt="dash skins logos"
						/>
					</h1>
					<span className="text-xs text-muted-foreground">
						Entre com sua conta na plataforma
					</span>
				</header>
				<form
					onSubmit={form.handleSubmit(handleSubmit)}
					className="w-full flex flex-col gap-4"
				>
					<Label htmlFor="email">Email</Label>
					<Input
						id="email"
						placeholder="johndoe@gmail.com"
						className="bg-foreground/[0.026]"
						disabled={isSubmitting}
						{...register("email")}
					/>
					<p className="text-red-500 text-xs font-semibold">
						{errors.email?.message}
					</p>
					<Label htmlFor="password">Senha</Label>
					<Input
						id="password"
						placeholder="insira sua sua senha"
						className="bg-foreground/[0.026]"
						disabled={isSubmitting}
						{...register("password")}
					/>
					<p className="text-red-500 text-xs font-semibold">
						{errors.password?.message}
					</p>
					<Button
						disabled={isSubmitting}
						className="w-full bg-purple-800 border border-purple-700 hover:bg-purple-600 mt-5"
						variant="outline"
					>
						Entrar
						<Loader
							data-loading={isSubmitting}
							size={16}
							className="animate-spin data-[loading=false]:hidden ml-2"
						/>
					</Button>

					<footer className="text-xs text-foreground">
						<span className="font-normal mr-2">Não tem conta?</span>
						<Link
							to="/signup"
							className="font-semibold hover:underline hover:underline-offset-2 hover:text-purple-400 transition-colors"
						>
							Crie uma agora mesmo
						</Link>
					</footer>
				</form>
			</div>
		</div>
	);
}
