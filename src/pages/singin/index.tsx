import { AxiosError } from "axios";
import Cookie from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { api } from "@/lib/axios";

import { FormData, resolver } from "./validation";

export function Signin() {
	const navigate = useNavigate();
	const form = useForm<FormData>({
		resolver,
	});

	const { register } = form;

	async function handleSubmit(data: FormData) {
		try {
			const authResponse = await api.post<{
				token: string;
				refreshToken: string;
			}>("/session", {
				email: data.email,
				password: data.password,
			});

			const { refreshToken, token } = authResponse.data;

			Cookie.set("@dashskins:token", token, {
				path: "/",
				expires: 60 * 60 * 24 * 30,
			});

			Cookie.set("@dashskins:refreshToken", refreshToken, {
				path: "/",
				expires: 60 * 60 * 24 * 30, // 30 days
			});

			api.defaults.headers.common.Authorization = `Bearer ${token}`;

			const { email, id, name, avatarURL } = jwtDecode(token) as {
				id: string;
				email: string;
				name: string;
				avatarURL: string;
			};

			toast.success(
				`Bem vindo ao sistema, ${name}! Tenha uma ótima experiência!`,
			);

			Cookie.set(
				"@dashskins:user",
				JSON.stringify({ email, id, name, avatarURL }),
				{
					path: "/",
					expires: 60 * 60 * 24 * 30, // 30 days
				},
			);

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
						{...register("email")}
					/>
					<Label htmlFor="password">Senha</Label>
					<Input
						id="password"
						placeholder="insira sua sua senha"
						className="bg-foreground/[0.026]"
						{...register("password")}
					/>
					<Button
						className="w-full bg-purple-800 border border-purple-700 hover:bg-purple-600 mt-5"
						variant="outline"
					>
						Entrar
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
