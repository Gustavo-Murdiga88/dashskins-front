import Cookies from "js-cookie";
import { create } from "zustand";

import { env } from "@/env/env";

interface IUserProps {
	email: string;
	id: string;
	name: string;
	avatarURL: string;
}
interface IUserStoreProps {
	user: IUserProps;
	setUser: (user: IUserProps) => void;
	getAvatar: () => string;
	setAvatarURL: (url: string) => void;
}

export const userStore = create<IUserStoreProps>((set, get) => ({
	user: {} as IUserProps,
	getAvatar: () => get().user.avatarURL,
	setAvatarURL: (url: string) => {
		const { user } = get();
		user.avatarURL = url;
		Cookies.set(env.VITE_USER_KEY, JSON.stringify(user), {
			path: "/",
			expires: 60 * 60 * 24 * 30, // 30 days
		});
		set({ user: { ...get().user, avatarURL: url } });
	},
	setUser: (user) => {
		Cookies.set(env.VITE_USER_KEY, JSON.stringify(user), {
			path: "/",
			expires: 60 * 60 * 24 * 30, // 30 days
		});
		set({
			user: {
				...user,
				name: user.name.toLowerCase(),
			},
		});
	},
}));
