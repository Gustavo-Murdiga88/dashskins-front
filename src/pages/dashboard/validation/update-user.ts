import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const updateUser = z.object({
	name: z.string(),
	email: z.string().email(),
	age: z.coerce.number(),
	role: z.enum(["ALL", "DELETE", "EDIT"]),
});

export type SchemeUpdatedUser = z.infer<typeof updateUser>;
export const resolver = zodResolver(updateUser);
