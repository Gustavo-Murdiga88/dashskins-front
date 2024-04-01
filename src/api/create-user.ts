import { AxiosError } from "axios";
import { toast } from "sonner";

import { api } from "@/lib/axios";

import { UserProps } from "./user-from-database";

interface ISchemeCreateUser {
	email: string;
	name: string;
	age: number;
	role: "ALL" | "DELETE" | "EDIT";
	password: string;
}
export async function CreateUserToDataBase({
	age,
	email,
	name,
	password,
	role,
}: ISchemeCreateUser) {
	try {
		const { data, status } = await api.post<{ user: UserProps }>("/user", {
			email,
			name,
			age,
			role,
			password,
		});

		return {
			user: data.user,
			status,
		};
	} catch (error) {
		if (error instanceof AxiosError && error.response?.status === 401) {
			toast.error("Usuário já existe");
		} else {
			toast.error("Erro ao criar o novo usuário");
		}
		return {
			user: undefined,
			status: 401,
		};
	}
}
