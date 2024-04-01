import axios from "axios";
import Cookies from "js-cookie";

import { env } from "@/env/env";

export const api = axios.create({
	baseURL: env.VITE_SERVER_URL,
});

const token = Cookies.get(env.VITE_TOKEN_KEY);
if (token) {
	api.defaults.headers.common.Authorization = `Bearer ${token}`;
}
