import Cookies from "js-cookie";
import { useRef } from "react";

import { UserProps } from "@/api/user-from-database";

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
	const userCookie = Cookies.get("@dashskins:user");
	const user: UserCookieProps = userCookie ? JSON.parse(userCookie) : undefined;

	const tableRef = useRef<TableRef>(null);

	function callbackUser({ user }: { user: UserProps }) {
		tableRef.current?.callback({ user });
	}

	return (
		<main className="max-w-[77.5rem] mx-auto">
			<Header user={user} />
			<section>
				<Filter callback={callbackUser} />

				<Table ref={tableRef} userLoggedId={user!.id} />
			</section>
		</main>
	);
}
