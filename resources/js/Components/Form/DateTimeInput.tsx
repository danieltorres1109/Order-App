import { formatDateTime } from "@/utils/convertirFecha";
import React from "react";

interface Props {
    value: string;
    setData: (data: any) => void;
    errors: any;
}

const DateTimeInput = ({ value, setData, errors }: Props) => {
    const handleChange = (e: any) => {
        setData((prev: any) => ({
            ...prev,
            created_at: e.target.value,
        }));
    };

    console.log(value);

    return (
        <div className="col-span-6 my-1 ">
            <label
                htmlFor="created_at"
                className="block text-sm font-medium text-gray-700"
            >
                Fecha Compra y Hora
            </label>
            <input
                type="datetime-local"
                id="created_at"
                name="created_at"
                className={`input border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 ${
                    errors?.created_at ? "border-red-500" : ""
                }`}
                value={formatDateTime(value)}
                onChange={handleChange}
            />
            {errors?.created_at && (
                <p className="text-red-500 text-sm mt-1">{errors.created_at}</p>
            )}
        </div>
    );
};

export default DateTimeInput;
