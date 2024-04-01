import Cookies from "js-cookie";
import { useRef } from "react";

import { UserProps } from "@/api/user-from-database";
import { env } from "@/env/env";
import { userStore } from "@/store/user-store";

import { Filter } from "./organisms/filter";
import { Header } from "./organisms/header";
import { Table, TableRef } from "./organisms/table";

type UserCookieProps = {
	email: string;
	id: string;
	name: string;
	avatarURL: string;
};

export function Dashboard() {
	const { setUser, user } = userStore((state) => ({
		setUser: state.setUser,
		user: state.user,
	}));

	const userCookie = Cookies.get(env.VITE_USER_KEY);
	const userFromCookieStore: UserCookieProps = userCookie
		? JSON.parse(userCookie)
		: undefined;

	const tableRef = useRef<TableRef>(null);

	if (!user.email) {
		setUser({
			email: userFromCookieStore.email,
			id: userFromCookieStore.id,
			name: userFromCookieStore.name,
			avatarURL: userFromCookieStore.avatarURL,
		});
	}

	function callbackUser({ user }: { user: UserProps }) {
		tableRef.current?.callback({ user });
	}

	return (
		<main className="max-w-[77.5rem] mx-auto mb-10 px-3">
			<Header />
			<section>
				<Filter callback={callbackUser} />

				<Table ref={tableRef} userLoggedId={user!.id} />
			</section>
		</main>
	);
}
