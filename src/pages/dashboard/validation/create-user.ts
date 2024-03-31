import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const createUserScheme = z.object({
	name: z.string(),
	email: z.string().email(),
	age: z.coerce.number(),
	role: z.enum(["ALL", "DELETE", "EDIT"]),
	password: z.string().min(6),
});

export type SchemeCreateUser = z.infer<typeof createUserScheme>;
export const resolver = zodResolver(createUserScheme);
