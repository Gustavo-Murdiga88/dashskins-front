import axios, { AxiosResponse } from "axios";
import Cookies from "js-cookie";

export const api = axios.create({
	baseURL: "http://localhost:3000/",
});

const token = Cookies.get("@dashskins:token");
if (token) {
	api.defaults.headers.common.Authorization = `Bearer ${token}`;
}

api.interceptors.response.use(async (response) => {
	const promise = new Promise<AxiosResponse>((resolve) => {
		setTimeout(() => resolve(response), 2000);
	});

	return promise;
});
