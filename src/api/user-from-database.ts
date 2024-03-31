import { api } from "@/lib/axios";

export type UserProps = {
	age: number;
	email: string;
	id: string;
	name: string;
	role: "ALL" | "DELETE" | "EDIT";
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
			avatar: {
				...user.avatar,
				url: `http://localhost:3000/${user.avatar.url}`,
			},
		})),
	};

	return data;
}
