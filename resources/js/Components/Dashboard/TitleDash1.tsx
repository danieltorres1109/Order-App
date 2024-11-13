import { Link } from "@inertiajs/react";
import { useEffect, useState } from "react";
import { MdEmojiEvents } from "react-icons/md";
import { Inertia } from "@inertiajs/inertia";

interface TitleDash1Props {
    title?: string;
    icon?: React.ElementType;
    showSearch?: boolean;
    children?: React.ReactNode;

    onSearch?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onAdd?: () => void;
}

export const TitleDash1: React.FC<TitleDash1Props> = ({
    title,
    icon: Icon,
    showSearch = false,
    onSearch,
    children,
}) => {
    const [term, setTerm] = useState("");
    const [hasFilters, setHasFilters] = useState(false);

    const hadleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.trim();

        setTerm(e.target.value);
        onSearch && onSearch(e);
    };

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);

        // Filtra y verifica si hay parámetros distintos a 'page'
        const hasOtherParams = Array.from(params.entries()).some(
            ([key]) => key !== "page"
        );
        setHasFilters(hasOtherParams);

        const filterTitle = params.get("filter[title]");
        if (filterTitle) {
            setTerm(filterTitle);
        }
    }, []);

    const handleClearFilters = () => {
        const baseUrl = window.location.pathname;
        const urlWithPaginationReset = `${baseUrl}?page=1`;
        Inertia.visit(urlWithPaginationReset, { preserveState: true });
    };

    return (
        <div className="md:flex  items-center justify-between   mb-3 md:mb-4 border-b-2 ">
            {title && (
                <div className="flex space-x-3 items-center">
                    {Icon && (
                        <Icon className="text-primary text-xl md:text-2xl" />
                    )}
                    <h2 className="text-base  md:text-md text-wider tracking-tight">
                        {title}
                    </h2>
                </div>
            )}

            {(showSearch || children) && (
                <div className="flex space-x-3 text-sm  items-center justify-between mt-2 md:mt-0">
                    {hasFilters && (
                        <button onClick={handleClearFilters}>
                            Eliminar Filtros
                        </button>
                    )}
                    {showSearch && (
                        <div className="relative  md:w-64">
                            <div
                                className="flex absolute space-x-4 inset-y-0
                                    left-0 items-center pl-3 pointer-events-none"
                            >
                                <svg
                                    className="w-6 h-6 text-purple-500 dark:text-gray-400"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                    ></path>
                                </svg>
                            </div>
                            <input
                                className="md:ml-2 text-gray-900 border-transparent text-sm rounded-lg block w-full pl-10 p-2.5
                                 focus:outline-none focus:border-transparent !important bg-transparent"
                                type="text"
                                id="search"
                                value={term}
                                name="Search"
                                onChange={hadleSearch}
                            />
                        </div>
                    )}

                    {children && children}
                </div>
            )}
        </div>
    );
};
