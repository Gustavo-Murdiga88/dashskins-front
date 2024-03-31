import {
	forwardRef,
	useCallback,
	useEffect,
	useImperativeHandle,
	useState,
} from "react";
import { useSearchParams } from "react-router-dom";

import {
	getUsers,
	ResponseUserProps,
	UserProps,
} from "@/api/user-from-database";

import { Loading } from "./loading";
import { Pagination } from "./pagination";
import { TableRow } from "./table-row";

interface ITableProps {
	userLoggedId: string;
}

export type TableRef = {
	callback: ({ user }: { user: UserProps }) => void;
};

export const Table = forwardRef<TableRef, ITableProps>(
	({ userLoggedId }, ref) => {
		const [params] = useSearchParams();
		const page = params.get("page");
		const name = params.get("name");

		const [isLoading, setIsLoading] = useState(true);
		const [listUser, setUsersList] = useState<ResponseUserProps>({
			data: [],
			totalElements: 0,
			totalPages: 0,
		});

		const getUserFromDataBase = useCallback(async () => {
			try {
				setIsLoading(true);

				const data = await getUsers({
					name,
					page,
				});

				setUsersList(data);
				setIsLoading(false);
			} catch {
				setIsLoading(false);
			}
		}, [page, name]);

		const updateUser = useCallback(
			({ user, index }: { user: UserProps; index: number }) => {
				const list = [...listUser.data];
				list[index] = user;

				setUsersList((prev) => ({
					...prev,
					data: list,
				}));
			},
			[listUser.data],
		);

		const deleterUser = useCallback(
			({ index }: { index: number }) => {
				const list = [...listUser.data];
				list.splice(index, 1);

				setUsersList((prev) => ({
					...prev,
					data: list,
				}));
			},
			[listUser.data],
		);

		useImperativeHandle(ref, () => ({
			callback({ user }: { user: UserProps }) {
				const list = [user, ...listUser.data].slice(0, 10);
				setUsersList((prev) => ({
					...prev,
					data: list,
				}));
			},
		}));

		useEffect(() => {
			getUserFromDataBase();
		}, [getUserFromDataBase]);

		if (isLoading) {
			return (
				<Loading
					amount={listUser.data.length === 0 ? 8 : listUser.data.length}
				/>
			);
		}

		return (
			<>
				<table className="w-full text-center text-xs mt-10 table-fixed border-separate border-spacing-y-2">
					<thead>
						<tr className="[&_:is(th)]:border-y [&_:is(th)]:hover:bg-muted [&_:is(th)]:transition-colors [&_:is(th:first-child)]:rounded-s-lg [&_:is(th:last-child)]:rounded-e-lg [&_:is(th:first-child)]:border-l [&_:is(th:last-child)]:border-r">
							<th className="p-3">Avatar</th>
							<th className="p-3">Nome</th>
							<th className="p-3">Email</th>
							<th className="p-3">idade</th>
							<th className="p-3">Regra</th>
							<th aria-label="control" className="w-[3.75rem]" />
						</tr>
					</thead>
					<tbody>
						{listUser.data.map((user, index) => (
							<TableRow
								index={index}
								update={updateUser}
								deleteCallback={deleterUser}
								user={user}
								key={user.id}
								userLoggedId={userLoggedId}
							/>
						))}
					</tbody>
				</table>
				<Pagination
					currentPage={Number(page) || 1}
					itemsPerPage={10}
					totalOfItems={listUser.totalElements}
				/>
			</>
		);
	},
);
