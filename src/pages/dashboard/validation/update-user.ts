import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const updateUser = z.object({
	name: z.string().min(3, {
		message: "Campo obrigatório",
	}),
	email: z.string().email({
		message: "Email inválido",
	}),
	age: z.coerce.number().min(1, {
		message: "Campo obrigatório",
	}),
	role: z
		.enum(["ALL", "DELETE", "EDIT"])
		.refine((value) => ["ALL", "DELETE", "EDIT"].includes(value), {
			message: "Campo obrigatório",
		}),
});

export type SchemeUpdatedUser = z.infer<typeof updateUser>;
export const resolver = zodResolver(updateUser);
