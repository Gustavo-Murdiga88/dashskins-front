import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const scheme = z.object({
	email: z
		.string({
			required_error: "Campo obrigatório",
		})
		.email({
			message: "Email inválido",
		}),
	password: z.string().min(6, {
		message: "A senha dever ter pelo menos 6 caracteres",
	}),
});

export type FormData = z.infer<typeof scheme>;
export const resolver = zodResolver(scheme);
