import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { toast } from "sonner";

import { env } from "@/env/env";
import { api } from "@/lib/axios";

interface ICreateSessionProps {
	email: string;
	password: string;
}
export async function createSession({ email, password }: ICreateSessionProps) {
	const authResponse = await api.post<{
		token: string;
		refreshToken: string;
	}>("/session", {
		email,
		password,
	});

	const { refreshToken, token } = authResponse.data;

	Cookies.set(env.VITE_TOKEN_KEY, token, {
		path: "/",
		expires: 60 * 60 * 24 * 30,
	});

	Cookies.set(env.VITE_REFRESH_TOKEN_KEY, refreshToken, {
		path: "/",
		expires: 60 * 60 * 24 * 30, // 30 days
	});

	api.defaults.headers.common.Authorization = `Bearer ${token}`;

	const { id, name, avatarURL } = jwtDecode(token) as {
		id: string;
		email: string;
		name: string;
		avatarURL: string;
	};

	toast.success(`Bem vindo ao sistema, ${name}! Tenha uma ótima experiência!`);

	Cookies.set(
		"@dashskins:user",
		JSON.stringify({
			email,
			id,
			name,
			avatarURL: `${env.VITE_SERVER_URL}/${avatarURL}`,
		}),
		{
			path: "/",
			expires: 60 * 60 * 24 * 30, // 30 days
		},
	);
}
