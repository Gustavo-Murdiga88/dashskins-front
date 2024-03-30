import { TableRow } from "./table-row";

export function Table() {
	return (
		<table className="w-full text-center text-xs mt-10 table-fixed border-separate border-spacing-y-2">
			<thead>
				<tr className="[&_:is(th)]:border-y [&_:is(th)]:hover:bg-muted [&_:is(th)]:transition-colors [&_:is(th:first-child)]:rounded-s-lg [&_:is(th:last-child)]:rounded-e-lg [&_:is(th:first-child)]:border-l [&_:is(th:last-child)]:border-r">
					<th className="p-3">Nome</th>
					<th className="p-3">Email</th>
					<th className="p-3">idade</th>
					<th className="p-3">Regra</th>
					<th aria-label="control" className="w-[3.75rem]" />
				</tr>
			</thead>
			<tbody>
				<TableRow />
				<TableRow />
				<TableRow />
				<TableRow />
				<TableRow />
				<TableRow />
				<TableRow />
			</tbody>
		</table>
	);
}
