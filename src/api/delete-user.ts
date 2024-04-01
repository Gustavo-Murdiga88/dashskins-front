import { toast } from "sonner";

import { api } from "@/lib/axios";

export async function DeleteUser(id: string) {
	try {
		const response = await api.delete<{ message: string }>(`/user/${id}`);

		return {
			message: response.data.message,
		};
	} catch {
		toast.error("Erro ao deletar usuário");
	}
}
