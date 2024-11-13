import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { OrderFormBase } from "@/Components/Order/OrderFormBase";
import { IOrder } from "@/types/order.interface";
import { User } from "@/types";
import { IProduct } from "@/types/product.interface";

interface Props {
    order: IOrder;
    users: User[];
    products: IProduct[];
}


export default function EditPage({ order, users, products }: Props) {
    return (
        <AuthenticatedLayout header="Editar Orden">
            <OrderFormBase
                mainTitle="Editar Orden"
                model={order}
                users={users}
                products={products}
                isOpen={true}
                toggleOpen={() => {}}
                onlyView={false}
            />
        </AuthenticatedLayout>
    );
}
