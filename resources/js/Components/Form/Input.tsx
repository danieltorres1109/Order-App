import InputError from "@/Components/InputError";
import { FaEye } from "react-icons/fa";

type TGrid =
    | "col-span-1"
    | "col-span-2"
    | "col-span-3"
    | "col-span-3"
    | "col-span-4"
    | "col-span-6"
    | "col-span-full";

interface Props {
    label: string;
    name: string;
    className?: string;
    placeholder?: string;
    value: any;
    type?: "text" | "number" | "password" | "date" | "time" | "datetime-local";
    error: string | any;
    readOnly?: boolean;
    isTextArea?: boolean;
    customWidth?: TGrid;
    numRows?: number;
    minDate?: string;
    maxNumer?: number;
    minNumber?: number;
    setData: (name: string, value: any) => void;
}

export const Input = ({
    name,
    value,
    setData,
    error,
    label,
    customWidth = "col-span-full",
    type = "text",
    readOnly = false,
    isTextArea = false,
    numRows = 4,
    minDate,
    maxNumer,
    minNumber,
    ...props
}: Props) => {
    return (
        <div className={`mb-3  ${customWidth}`}>
            <label htmlFor={name} className="block text-gray-900">
                {label}
            </label>
            {isTextArea ? (
                <textarea
                    id={name}
                    value={value}
                    name={name}
                    rows={numRows}
                    className={`input `}
                    readOnly={readOnly}
                    onChange={(e) => setData(name, e.target.value)}
                ></textarea>
            ) : (
                <div className="w-full relative">
                    <input
                        type={type}
                        {...(type === "number" && {
                            min: minNumber,
                            max: maxNumer,
                        })}
                        {...(type === "date" && minDate && { min: minDate })}
                        id={name}
                        value={value}
                        name={name}
                        className={`input border-gray-300 rounded-md w-full`}
                        autoComplete="off"
                        readOnly={readOnly}
                        onChange={(e) => setData(name, e.target.value)}
                    />
                    {type === "password" && (
                        <FaEye
                            className="absolute bg-red top-3 right-2 cursor-pointer"
                            onClick={() => {
                                const input = document.getElementById(name);
                                if (input) {
                                    if (
                                        input.getAttribute("type") ===
                                        "password"
                                    ) {
                                        input.setAttribute("type", "text");
                                    } else {
                                        input.setAttribute("type", "password");
                                    }
                                }
                            }}
                        />
                    )}
                </div>
            )}
            <InputError message={error || ""} className="mt-2" />

            {/* Si es password mostrar ojo */}
        </div>
    );
};
