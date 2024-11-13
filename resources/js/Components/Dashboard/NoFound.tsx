import { Link } from "@inertiajs/react";
import React from "react";

interface Props {
    text: string;
}

export const NoFound = ({ text }: Props) => {
    return (
        <div className=" w-full flex justify-center items-center ">
            <div className="text-center">
                <p className="mx-4 text-2xl font-bold my-3 text-gray-600">
                    No tienes aún {text}
                </p>
                <img
                    src="/images/general/empty2.svg"
                    alt="no encontrado"
                    className="w-96 h-96"
                />
            </div>
        </div>
    );
};
