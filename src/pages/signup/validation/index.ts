import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const scheme = z.object({
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
		.enum(["ALL", "DELETE", "EDIT"], {
			required_error: "Campo obrigatório",
		})
		.refine((value) => ["ALL", "DELETE", "EDIT"].includes(value), {
			message: "Campo obrigatório",
		}),
	password: z.string().min(6, {
		message: "Senha dever conter pelo menos 6 caracteres",
	}),
});

export type FormData = z.infer<typeof scheme>;

export const resolver = zodResolver(scheme);
