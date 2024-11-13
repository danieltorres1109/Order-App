import React, { useEffect, useState } from "react";

interface Props {
    type: "crear" | "editar" | "ver";
    className?: string;
    route: string;
}

export const ButtonEnlace = React.memo(
    ({ type, className = "", route }: Props) => {
        const [isOpen, setIsOpen] = useState(false);

        const toggleOpen = () => {
            setIsOpen(!isOpen);
        };

        const classCustom = {
            crear: "bg-primaryClair text-primary font-bold py-2 px-6 rounded-3xl",
            editar: "btn btn-outline-info",
            ver: "btn btn-outline-success",
        };

        const title = {
            crear: "Crear",
            editar: "Editar",
            ver: "Ver",
        };

        return (
            <div className={`text-nowrap ${className}`}>
                <a
                    href={route}
                    className={`btn ${classCustom[type]}`}
                    onClick={toggleOpen}
                >
                    {title[type]}
                </a>
            </div>
        );
    }
);
