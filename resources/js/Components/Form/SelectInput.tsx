import React from "react";
import InputError from "../InputError";

type TGrid =
    | "col-span-1"
    | "col-span-2"
    | "col-span-3"
    | "col-span-4"
    | "col-span-6"
    | "col-span-full";

interface Props {
    label: string;
    twoOptionsOnly?: boolean;
    name: string;
    options: { id: any; name: string }[]; // Asumiendo que las opciones tienen una estructura de 'id' y 'name'
    value: any;
    type?: "text" | "number";
    error?: string | any; // error puede ser opcional
    readOnly?: boolean;
    isTextArea?: boolean;
    customWidth?: TGrid;
    numRows?: number;
    setData: (name: string, value: any) => void;
}

export const SelectInput: React.FC<Props> = ({
    label,
    name,
    options,
    value,
    customWidth = "col-span-full",
    setData,
    readOnly = false,
    error,
    twoOptionsOnly = false,
}) => {
    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        if (twoOptionsOnly) {
            setData("active", event.target.value === "true");
        } else {
            setData(name, event.target.value);
        }
    };

    const selectClassName = `input ${customWidth} ${
        error ? "input-error" : ""
    }`; // Asumiendo 'input-error' es una clase para errores

    return (
        <div className={`mb-3 ${customWidth}`}>
            <label htmlFor={name} className="block text-gray-600">
                {label}
            </label>
            <select
                name={name}
                id={name}
                className={selectClassName}
                value={value}
                onChange={handleChange}
                disabled={readOnly} // 'readOnly' en select actúa como 'disabled'
            >
                <option value="">Seleccione una opción</option>
                {options.map((option) => (
                    <option key={option.id} value={option.id}>
                        {option.name}
                    </option>
                ))}
            </select>
            <InputError message={error || ""} className="mt-2" />
        </div>
    );
};
