import { Edit, MoreVertical, Trash } from "lucide-react";
import { useState } from "react";

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { AlertModal } from "./alert";
import { ModalEditUser } from "./edit-modal";

export function TableRow() {
	const [modalDeleteOpen, setModalDeleteOpen] = useState(false);
	const [modalEditOpen, setModalEditOpen] = useState(false);

	return (
		<tr className="[&_:is(td)]:border-y [&_:is(td)]:hover:bg-muted [&_:is(td)]:transition-colors [&_:is(td:first-child)]:rounded-s-lg [&_:is(td:last-child)]:rounded-e-lg [&_:is(td:first-child)]:border-l [&_:is(td:last-child)]:border-r">
			<td className="py-3 pl-2">Gustavo Murdiga</td>
			<td className="py-3">gumurdiga@gmail.com</td>
			<td className="py-3">25</td>
			<td className="py-3">Admin</td>
			<td className="py-3 pr-2" aria-label="control">
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
				confirm={() => {}}
				open={modalDeleteOpen}
				setOpen={setModalDeleteOpen}
			/>

			<ModalEditUser setOpen={setModalEditOpen} open={modalEditOpen} />
		</tr>
	);
}
