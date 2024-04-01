import {
	ChevronLeft,
	ChevronRight,
	ChevronsLeft,
	ChevronsRight,
} from "lucide-react";
import { useSearchParams } from "react-router-dom";

import { Button } from "@/components/ui/button";

interface IPaginationPageProps {
	totalOfItems: number;
	itemsPerPage: number;
	currentPage: number;
}

export function Pagination({
	currentPage,
	itemsPerPage,
	totalOfItems,
}: IPaginationPageProps) {
	const [, searchParams] = useSearchParams();

	const totalOfPages = Math.ceil(totalOfItems / itemsPerPage);
	const userAreOnLastPage = currentPage === totalOfPages;
	const userAreOnFirstPage = currentPage === 1;
	const userIsOnPageSmallerThan2 = currentPage <= 2;
	const userAreOnPageBeforePenultOrInLastPage =
		currentPage === totalOfPages || totalOfPages - currentPage < 2;

	function goToLastPage() {
		const url = new URL(window.location.href);

		const page = totalOfPages;

		url.searchParams.set("page", String(page));

		searchParams(url.searchParams.toString());
	}
	function goToNextPage() {
		const url = new URL(window.location.href);

		const page = currentPage + 1;

		url.searchParams.set("page", String(page));

		searchParams(url.searchParams.toString());
	}

	function goToPreviousPage() {
		const url = new URL(window.location.href);

		const page = currentPage - 1;

		url.searchParams.set("page", String(page));

		searchParams(url.searchParams.toString());
	}

	function goToFirstPagePage() {
		const url = new URL(window.location.href);

		const page = 1;

		url.searchParams.set("page", String(page));

		searchParams(url.searchParams.toString());
	}

	return (
		<div className="mt-4 flex flex-col items-end justify-end gap-2 md:flex-row md:items-center">
			<span className="mr-4 text-sm font-semibold">
				Página(s) {currentPage} de {totalOfPages}
			</span>
			<div className="mt-2 flex items-center justify-end gap-2 md:mt-0">
				<Button
					aria-label="Ir para primeira página"
					disabled={userIsOnPageSmallerThan2}
					size="sm"
					onClick={goToFirstPagePage}
					variant="outline"
				>
					<span className="sr-only">Ir para primeira página</span>

					<ChevronsLeft />
				</Button>
				<Button
					aria-label="Ir para página anterior"
					disabled={userAreOnFirstPage}
					size="sm"
					variant="outline"
					onClick={goToPreviousPage}
				>
					<span className="sr-only">Ir para página anterior</span>
					<ChevronLeft />
				</Button>
				<strong className="mx-2 inline-block rounded-sm text-sm hover:underline hover:underline-offset-2">
					{currentPage}
				</strong>
				<Button
					onClick={goToNextPage}
					disabled={userAreOnLastPage}
					size="sm"
					variant="outline"
					aria-label="Ir para proxima página"
				>
					<span className="sr-only">Ir para a próxima página</span>
					<ChevronRight />
				</Button>
				<Button
					onClick={goToLastPage}
					disabled={userAreOnPageBeforePenultOrInLastPage}
					size="sm"
					variant="outline"
					aria-label="Ir para última página"
				>
					<span className="sr-only">Ir para última página</span>

					<ChevronsRight />
				</Button>
			</div>
		</div>
	);
}
