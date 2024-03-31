import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const scheme = z.object({
	name: z.string(),
	email: z.string().email(),
	age: z.coerce.number(),
	role: z.enum(["EDIT", "DELETE", "ALL"]).default("ALL"),
	password: z.string().min(6),
});

export type FormData = z.infer<typeof scheme>;

export const resolver = zodResolver(scheme);
