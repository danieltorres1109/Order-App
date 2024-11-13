import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { OrderFormBase } from "@/Components/Order/OrderFormBase";
import { IOrder } from "@/types/order.interface";
import { User } from "@/types";
import { IProduct } from "@/types/products";

interface Props {
    users: User[];
    products: IProduct[];
}

export default function CreatePage({ users, products }: Props) {
    return (
        <AuthenticatedLayout header="Crear Orden">
            <OrderFormBase
                mainTitle="Crear Orden"
                model={null}
                users={users}
                products={products}
                isOpen={true}
                toggleOpen={() => {}}
                onlyView={false}
            />
        </AuthenticatedLayout>
    );
}
