import { env } from "@/env/env";
import { api } from "@/lib/axios";

export type UserProps = {
	age: number;
	email: string;
	id: string;
	name: string;
	role: "ALL" | "DELETE" | "EDIT";
	isNew: boolean;
	avatar: {
		url: string;
		id: string;
		userId: string;
	};
};
export type ResponseUserProps = {
	totalPages: number;
	totalElements: number;
	data: UserProps[];
};

export async function getUsers({
	name,
	page,
}: {
	name?: string | null;
	page?: string | null;
}) {
	const users = await api.get<ResponseUserProps>("/users", {
		params: {
			name: name || undefined,
			page: Number(page || 1) - 1 || 0,
		},
	});

	const data = {
		totalPages: users.data.totalPages,
		totalElements: users.data.totalElements,
		data: users.data.data.map((user) => ({
			...user,
			isNew: false,
			avatar: {
				...user.avatar,
				url: `${env.VITE_SERVER_URL}/${user.avatar.url}`,
			},
		})),
	};

	return data;
}
