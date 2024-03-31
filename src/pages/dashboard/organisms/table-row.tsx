import { AvatarFallback } from "@radix-ui/react-avatar";
import { Edit, MoreVertical, Trash } from "lucide-react";
import { useCallback, useState } from "react";
import { toast } from "sonner";

import { UserProps } from "@/api/user-from-database";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { api } from "@/lib/axios";

import { AlertModal } from "./alert";
import { ModalEditUser } from "./edit-modal";

interface ITableRowProps {
	user: UserProps;
	userLoggedId: string;
	deleteCallback: ({ index }: { index: number }) => void;
	update: ({ user, index }: { user: UserProps; index: number }) => void;
	index: number;
}
export function TableRow({
	user,
	userLoggedId,
	deleteCallback,
	update,
	index,
}: ITableRowProps) {
	const [modalDeleteOpen, setModalDeleteOpen] = useState(false);
	const [modalEditOpen, setModalEditOpen] = useState(false);

	const deleteUser = useCallback(
		async ({ index }: { index: number }) => {
			try {
				deleteCallback?.({ index });

				const userDeleted = await api.delete<{ message: string }>(
					`/user/${user.id}`,
				);

				toast.success(userDeleted.data.message);
			} catch (error) {
				toast.error("Erro ao deletar usuário");
			}
		},
		[deleteCallback, user.id],
	);

	const updateUser = useCallback(
		({ user, index }: { user: UserProps; index: number }) => {
			update({ user, index });
		},
		[update],
	);

	return (
		<tr
			data-isuserlogged={user.id === userLoggedId}
			className="group [&_:is(td)]:border-y [&_:is(td)]:hover:bg-muted [&_:is(td)]:transition-colors [&_:is(td:first-child)]:rounded-s-lg [&_:is(td:last-child)]:rounded-e-lg [&_:is(td:first-child)]:border-l [&_:is(td:last-child)]:border-r"
		>
			<td className="group-data-[isuserlogged=true]:border-emerald-300 py-3 pl-2">
				<Avatar className="border mx-auto flex items-center justify-center group-hover:border-zinc-500">
					<AvatarImage src={user.avatar?.url} />
					<AvatarFallback className="font-semibold">D S</AvatarFallback>
				</Avatar>
			</td>
			<td className="group-data-[isuserlogged=true]:border-emerald-300 py-3 pl-2">
				{user.name}
			</td>
			<td className="group-data-[isuserlogged=true]:border-emerald-300 py-3">
				{user.email}
			</td>
			<td className="group-data-[isuserlogged=true]:border-emerald-300 py-3">
				{user.age}
			</td>
			<td className="group-data-[isuserlogged=true]:border-emerald-300 py-3">
				{user.role}
			</td>
			<td
				className="group-data-[isuserlogged=true]:border-emerald-300 py-3 pr-2"
				aria-label="control"
			>
				<div className="flex items-center justify-center">
					<DropdownMenu>
						<DropdownMenuTrigger>
							<MoreVertical />
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end" sideOffset={8}>
							<DropdownMenuItem
								onClick={() => {
									setModalEditOpen(true);
								}}
								className="text-xs flex justify-between items-center data-[highlighted]:text-emerald-400"
							>
								Editar <Edit size={16} />
							</DropdownMenuItem>
							<DropdownMenuItem
								disabled={user.id === userLoggedId}
								onClick={() => {
									setModalDeleteOpen(true);
								}}
								className="text-xs flex justify-between items-center data-[highlighted]:text-red-400"
							>
								Excluir <Trash size={16} />
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</td>
			<AlertModal
				confirm={() => deleteUser({ index })}
				open={modalDeleteOpen}
				setOpen={setModalDeleteOpen}
			/>

			<ModalEditUser
				callback={({ user }) => updateUser({ user, index })}
				user={user}
				setOpen={setModalEditOpen}
				open={modalEditOpen}
			/>
		</tr>
	);
}
