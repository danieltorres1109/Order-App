import { ILink } from "@/types/IPaginate";
import { Link } from "@inertiajs/react";
import { Inertia } from "@inertiajs/inertia";

interface Props {
    links: ILink[];
    current_page: number;
    last_page: number;
}

export const TabsTable = ({ links, current_page, last_page }: Props) => {
    const pageCount = last_page;
    const pageIndex = current_page;

    const buttonCount = 5;

    const range = (start: number, end: number) => {
        let length = end - start + 1;
        return Array.from({ length }, (_, idx) => idx + start);
    };

    const fetchPageNumbers = () => {
        const sideButtons =
            buttonCount % 2 === 0 ? buttonCount / 2 : (buttonCount - 1) / 2;
        const totalNumbers = sideButtons * 2 + 3;
        const totalBlocks = totalNumbers + 2;

        if (pageCount > totalBlocks) {
            let pages: any[] = [];

            // Determina si los puntos suspensivos son necesarios
            const hasLeftSpill = pageIndex > sideButtons + 2;
            const hasRightSpill = pageIndex < pageCount - sideButtons - 2;
            const spillOffset = sideButtons + 1;

            if (hasLeftSpill && !hasRightSpill) {
                const startPage = pageCount - (sideButtons * 2 + 2);
                pages = [1, "...", ...range(startPage, pageCount)];
            } else if (!hasLeftSpill && hasRightSpill) {
                const endPage = sideButtons * 2 + 3;
                pages = [...range(1, endPage), "...", pageCount];
            } else if (hasLeftSpill && hasRightSpill) {
                pages = [
                    1,
                    "...",
                    ...range(pageIndex - spillOffset, pageIndex + spillOffset),
                    "...",
                    pageCount,
                ];
            }

            return pages;
        }

        // No hay suficientes páginas para derrame: muestra todas
        return range(1, pageCount);
    };

    const pages = fetchPageNumbers();

    // Cambiado de links.map a pages.map para renderizar la paginación correctamente
    return (
        <>
            {pages.map((page, index) =>
                page === "..." ? (
                    <span key={index} className="px-2">
                        ...
                    </span>
                ) : (
                    <button
                        onClick={() => {
                            Inertia.reload({
                                only: ["page"],
                                data: { page },
                                preserveState: true,
                                preserveScroll: true,
                            });
                        }}
                        key={index}
                        className={`border w-10 rounded p-1 text-base md:text-md ${
                            page === pageIndex
                                ? "bg-primaryClair text-primary"
                                : "hover:bg-blue-100"
                        }`}
                    >
                        {page}
                    </button>
                )
            )}
        </>
    );
};
