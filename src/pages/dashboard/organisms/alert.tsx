import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface IModalDeleteProps {
	confirm: () => void;
	open: boolean;
	setOpen: (open: boolean) => void;
}
export function AlertModal({
	confirm,
	open = false,
	setOpen,
}: IModalDeleteProps) {
	return (
		<AlertDialog open={open} onOpenChange={setOpen}>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Deseja continuar?</AlertDialogTitle>
					<AlertDialogDescription className="text-xs">
						Após confirmar este processo não será mais possível recurar este
						informação
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel className="bg-red-500 text-zinc-950 hover:bg-red-400 hover:text-zinc-100">
						Cancelar
					</AlertDialogCancel>
					<AlertDialogAction
						className="bg-emerald-600 text-zinc-950 hover:bg-emerald-400 hover:text-zinc-100"
						onClick={confirm}
					>
						Confirmar
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
