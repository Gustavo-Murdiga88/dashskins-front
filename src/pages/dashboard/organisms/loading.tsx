import { Skeleton } from "@/components/ui/skeleton";

interface ILoadingProps {
	amount: number;
}
export function Loading({ amount = 8 }: ILoadingProps) {
	return (
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
				{Array(amount)
					.fill("")
					.map((_, index) => (
						<tr
							// eslint-disable-next-line react/no-array-index-key
							key={index}
							className="[&_:is(td)]:border-y [&_:is(td)]:transition-colors [&_:is(td:first-child)]:rounded-s-lg [&_:is(td:last-child)]:rounded-e-lg [&_:is(td:first-child)]:border-l [&_:is(td:last-child)]:border-r"
						>
							<td className="py-3 pl-2" aria-label="loading">
								<Skeleton className="h-10 w-10 rounded-full mx-auto" />
							</td>
							<td className="py-3 pl-2" aria-label="loading">
								<Skeleton className="h-8 w-[95%] mx-2" />
							</td>
							<td className="py-3" aria-label="loading">
								<Skeleton className="h-8 w-[95%] mx-2" />
							</td>
							<td className="py-3" aria-label="loading">
								<Skeleton className="h-8 w-[95%] mx-2" />
							</td>
							<td className="py-3" aria-label="loading">
								<Skeleton className="h-8 w-[95%] mx-2" />
							</td>
							<td className="py-3 pr-2" aria-label="control">
								<div className="flex items-center justify-center">
									<Skeleton className="h-8 w-[95%] mx-2" />
								</div>
							</td>
						</tr>
					))}
			</tbody>
		</table>
	);
}
