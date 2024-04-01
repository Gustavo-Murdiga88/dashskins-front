import { z } from "zod";

const envScheme = z.object({
	VITE_SERVER_URL: z.string().url(),
	VITE_TOKEN_KEY: z.string(),
	VITE_REFRESH_TOKEN_KEY: z.string(),
	VITE_USER_KEY: z.string(),
});

const envValidate = envScheme.safeParse(import.meta.env);

if (!envValidate.success) {
	throw new Error(
		`❌ Invalid environment variables: ${envValidate.error.format()}`,
	);
}

export const env = envValidate.data;
