import { toast } from "sonner";

import { env } from "@/env/env";
import { api } from "@/lib/axios";

export async function sendAvatarToDatabase({
	avatar,
	userId,
}: {
	userId: string;
	avatar: File;
}) {
	const data = new FormData();

	data.append("file", avatar);

	try {
		const avatarCreated = await api.post<{ url: string; id: string }>(
			`/user/avatar/${userId}`,
			data,
		);

		return {
			url: `${env.VITE_SERVER_URL}/${avatarCreated.data.url}`,
			id: avatarCreated.data.id,
		};
	} catch (err) {
		toast.error("Erro ao enviar imagem");
		return null;
	}
}
