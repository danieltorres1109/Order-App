import { ButtonEnlace } from "@/Components/Dashboard/ButtonEnlace";
import { TitleDash1 } from "@/Components/Dashboard/TitleDash1";
import { CustomTable } from "@/Components/Dashboard/table/CustomTable";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { IOrder } from "@/types/order.interface";
import { formatMoned } from "@/utils/currency";
import { getStatusColor } from "@/utils/getStatusColor";
import { translateStatus } from "@/utils/statusTranslate";
import { createColumnHelper } from "@tanstack/react-table";
import { useMemo } from "react";
import { IoMdWatch } from "react-icons/io";
import { route } from "../../../../vendor/tightenco/ziggy/src/js/index";
import { ButtonConfirmDelete } from "@/Components/Dashboard/ButtonConfirmDelete";
import { useForm } from "@inertiajs/react";

interface Props {
    orders: IOrder[];
}

export default function Dashboard({ orders: data }: Props) {
    const { data: data2, post } = useForm({
        status: "cancelled",
    });

    const changeStatus = (id: number) => {
        post(route("orders.updateStatus", id), {
            preserveScroll: true,
            onSuccess: () => {
                alert("Orden cancelada correctamente");
            },
            onError: () => {
                alert("Error al cancelar la orden");
            },
        });
    };

    const columnHelper = createColumnHelper<IOrder>();

    const columns = [
        columnHelper.accessor("id", {
            cell: (info) => info.getValue(),
            header: () => <span>Id</span>,
        }),
        columnHelper.accessor("user_id", {
            id: "accion",
            header: () => <span>Usuario</span>,
            cell: (info: any) => (
                <div className="flex justify-center items-center">
                    <span className="text-sm font-medium">
                        {info.row.original.user.name}
                    </span>
                </div>
            ),
        }),
        columnHelper.accessor("status", {
            cell: (info) => {
                const status = info.getValue();
                const color = getStatusColor(status);
                const translatedStatus = translateStatus(status);
                return (
                    <span
                        className="px-2 text-white rounded-lg py-2"
                        style={{ background: color }}
                    >
                        {translatedStatus}
                    </span>
                );
            },
            header: () => <span>Estado</span>,
        }),
        columnHelper.accessor("totalSell", {
            cell: (info) => formatMoned(info.row.original.totalSell),
            header: () => <span>Total</span>,
        }),
        columnHelper.accessor("totalSell", {
            id: "accion",
            header: () => <span>Acción</span>,
            cell: (info) => (
                <div className="flex justify-center items-center">
                    <ButtonEnlace
                        type="editar"
                        route={route("orders.edit", info.row.original.id)}
                    />
                    <button
                        onClick={() => {
                            changeStatus(info.row.original.id);
                        }}
                    >
                        Cancelar
                    </button>
                </div>
            ),
        }),
    ];

    const memoColumns = useMemo(() => columns, []);

    return (
        <AuthenticatedLayout header="Ordenes">
            <CustomTable
                data={data}
                columns={memoColumns}
                TitleDashComponent={
                    <TitleDash1
                        title="Ordenes"
                        icon={IoMdWatch}
                        showSearch={false}
                        onSearch={(e) => {}}
                    >
                        <ButtonEnlace
                            type="crear"
                            route={route("orders.create")}
                        />
                    </TitleDash1>
                }
            />
        </AuthenticatedLayout>
    );
}
