import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function Signin() {
	return (
		<main className="h-screen w-full grid md:grid-cols-[40%_1fr] bg-background grid-cols-1">
			<div className="border-r-[0.125rem] p-4 flex flex-col items-center justify-center bg-zinc-1000">
				<div className="md:w-[70%] lg:w-[55%] w-[90%]">
					<header className="mb-7">
						<h1 className="text-2xl text-foreground font-bold">
							Bem-vindo(a), ao sistema
							<img
								className="my-3"
								src="https://dashskins.com.br/logo.png"
								alt="dash skins logos"
							/>
						</h1>
						<span className="text-xs text-muted-foreground">
							Entre com sua conta na plataforma
						</span>
					</header>
					<form className="w-full flex flex-col gap-4">
						<Label htmlFor="email">Email</Label>
						<Input
							id="email"
							placeholder="johndoe@gmail.com"
							className="bg-foreground/[0.026]"
						/>
						<Label htmlFor="password">Senha</Label>
						<Input
							id="password"
							placeholder="insira sua sua senha"
							className="bg-foreground/[0.026]"
						/>
						<Button
							className="w-full bg-emerald-800 border border-emerald-700 hover:bg-emerald-600 mt-5"
							variant="outline"
						>
							Entrar
						</Button>

						<footer className="text-xs text-foreground">
							<span className="font-normal mr-2">Não tem conta?</span>
							<Link
								to="/signup"
								className="font-semibold hover:underline hover:underline-offset-2 hover:text-emerald-400 transition-colors"
							>
								Crie uma agora mesmo
							</Link>
						</footer>
					</form>
				</div>
			</div>
			<main className="md:flex items-center justify-center hidden">
				<div
					id="dash"
					className="presenter bg-no-repeat bg-cover rounded-lg animate-in slide-in-from-bottom-20 fade-in-0 duration-700"
				/>
			</main>
		</main>
	);
}
