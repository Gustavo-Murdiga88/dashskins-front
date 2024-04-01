import { api } from "@/lib/axios";

interface ISchemeEditUser {
	age: number;
	email: string;
	name: string;
	role: "ALL" | "EDIT" | "DELETE";
	id: string;
}

export async function UpdateUserToDataBase({
	age,
	email,
	name,
	id,
	role,
}: ISchemeEditUser) {
	const userEdited = await api.put<{ message: string }>("/user", {
		id,
		email,
		name,
		age,
		role,
	});

	return {
		message: userEdited.data.message,
	};
}
