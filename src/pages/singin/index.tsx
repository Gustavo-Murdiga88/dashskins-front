import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function Signin() {
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
