import { FormEventHandler } from "react";
import { useForm } from "@inertiajs/react";
import { IOrder } from "@/types/order.interface";
import { SelectInput } from "../Form/SelectInput";
import { formatMoned } from "@/utils/currency";
import { translateStatus } from "@/utils/statusTranslate";
import { User } from "@/types";
import { IProduct } from "@/types/products";
import DateTimeInput from "../Form/DateTimeInput";
import { useOrderDetails } from "@/hooks/userOrderDetail";
import { statusOption } from "@/Constants/constants";
import { toast } from "react-toastify";

interface Props {
    users: User[];
    products: IProduct[];
    model?: any | null;
    onlyView?: boolean;
    mainTitle: string;
    isOpen: boolean;
    toggleOpen: () => void;
}

const initialData: IOrder = {
    user_id: null,
    status: "pending",
    order_details: [],
    totalSell: 0,
};

export const OrderFormBase = ({
    model = null,
    users,
    products,
    onlyView,
}: Props) => {
    const { data, setData, post, processing, progress, errors, reset } =
        useForm<IOrder>(model ?? initialData);

    const { total, addProduct, removeProduct } = useOrderDetails({
        products,
        data,
        setData,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        console.log("data");
        console.log(data);

        const url = data.id ? `/edit-order/${data.id}` : "/orders";

        post(url, {
            preserveScroll: true,
            forceFormData: true,
            onSuccess: () => {
                toast.success(
                    data.id
                        ? "Orden actualizada correctamente"
                        : "Orden creada correctamente"
                );
            },
            onError: () => {
                toast.error(
                    data.id
                        ? "Error al actualizar la orden"
                        : "Error al crear la orden"
                );
            },
        });
    };

    const availableProducts = products.filter(
        (product) =>
            !data.order_details?.some((item) => item.product_id === product.id)
    );

    return (
        <form onSubmit={submit} className="grid  grid-cols-12 gap-x-10">
            {/* First Column */}
            <div className="col-span-10">
                <div className="col-span-12">
                    <div className="flex justify-end">
                        <p className="font-bold text-2xl">
                            <span>Total: </span>
                            <span className="text-green-600">
                                {formatMoned(Number(total))}
                            </span>
                        </p>
                    </div>
                </div>

                <SelectInput
                    label="Comprador"
                    setData={setData}
                    readOnly={onlyView}
                    error={errors.user_id}
                    name="user_id"
                    value={data.user_id}
                    options={users.map((user) => ({
                        id: user.id,
                        name: user.name,
                    }))}
                    customWidth="col-span-6"
                />

                <SelectInput
                    label="Estado Compra"
                    setData={setData}
                    readOnly={onlyView}
                    error={errors.status}
                    name="status"
                    value={data.status}
                    options={statusOption.map((status) => ({
                        id: status,
                        name: translateStatus(status),
                    }))}
                    customWidth="col-span-6"
                />

                <DateTimeInput
                    value={data.created_at ?? ""}
                    setData={setData}
                    errors={errors}
                />

                <div className="col-span-full my-4">
                    <label htmlFor="addProduct">Add Product</label>
                    <select
                        name="addProduct"
                        id="addProduct"
                        className="input"
                        onChange={(e) => {
                            addProduct(e.target.value);
                            console.log("agregando producto");
                            console.log(e.target.value);

                            e.target.value = "";
                        }}
                        defaultValue=""
                    >
                        <option value="" disabled>
                            Selecciona un producto
                        </option>
                        {availableProducts.map((product) => (
                            <option key={product.id} value={product.id}>
                                {product.title}
                            </option>
                        ))}
                    </select>
                </div>

                {errors.order_details && (
                    <div className="col-span-12 text-red-500">
                        {errors.order_details}
                    </div>
                )}

                {data.order_details && data.order_details.length > 0 ? (
                    <div className="col-span-12">
                        {/* Contenedor con desplazamiento */}
                        <div className="space-y-4  overflow-y-auto">
                            {data.order_details.map((detail) => (
                                <div
                                    key={detail.id}
                                    className="flex relative justify-between items-center px-4 py-2 border rounded-lg shadow-sm bg-white"
                                >
                                    <div className="flex flex-col sm:flex-row sm:items-center">
                                        <div className="text-lg font-semibold mr-4 ml-4">
                                            {detail.product_id}
                                        </div>
                                    </div>
                                    <div className="flex flex-col sm:flex-row sm:items-center">
                                        <div className="text-lg font-semibold mr-4 ml-4">
                                            {detail.productName}
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-sm text-gray-500">
                                            Precio unitario:
                                        </div>
                                        <div className="text-lg font-medium">
                                            {formatMoned(
                                                Number(detail.priceUnit)
                                            )}
                                        </div>
                                    </div>

                                    {/* Eliminar */}
                                    {!onlyView && (
                                        <button
                                            type="button"
                                            onClick={() =>
                                                removeProduct(detail.id)
                                            }
                                            className="absolute top-4 text-3xl font-bold  left-2  text-red-500"
                                        >
                                            x
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="col-span-12 text-center">
                        No hay detalles de la compra disponibles.
                    </div>
                )}
            </div>

            {/* Second Column */}
            <div className="col-span-2">
                {onlyView ? null : (
                    <div className="w-full col-span-12 flex items-center space-x-5 pt-2">
                        <button
                            type="submit"
                            disabled={processing}
                            className="bg-primary w-full text-white font-semibold  py-2
                    rounded-2xl px-10"
                        >
                            {model ? "Actualizar" : "Crear"}
                        </button>
                    </div>
                )}
            </div>
        </form>
    );
};
