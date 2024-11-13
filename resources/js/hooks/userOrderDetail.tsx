import { IProduct } from "@/types/products";
import { useState } from "react";

interface IOrderDetail {
    id: number;
    productName: string;
    priceUnit: number;
}

interface Props {
    products: IProduct[];
    data: {
        order_details: IOrderDetail[];
        totalSell: number;
    };
    setData: (key: string, value: any) => void;
}

export const useOrderDetails = ({ products, data, setData }: Props) => {
    const [total, setTotal] = useState<number>(data.totalSell || 0);

    const addProduct = (productId: string) => {
        const selectedProduct = products.find(
            (product) => product.id === parseInt(productId)
        );

        if (!selectedProduct) return;

        const newOrderDetails: IOrderDetail[] = data.order_details || [];
        newOrderDetails.unshift({
            // @ts-ignore
            product_id: selectedProduct.product_id ?? selectedProduct.id,
            productName: selectedProduct.title,
            priceUnit: Number(selectedProduct.price),
        });

        console.log(newOrderDetails);
        setData("order_details", newOrderDetails);
        updateTotal(newOrderDetails);
    };

    const removeProduct = (productId: number) => {
        const newOrderDetails: IOrderDetail[] = data.order_details.filter(
            (item) => item.id !== productId
        );
        setData("order_details", newOrderDetails);
        updateTotal(newOrderDetails);
    };

    const updateTotal = (orderDetails: IOrderDetail[]) => {
        const newTotal = orderDetails.reduce(
            (acc, detail) => acc + (Number(detail.priceUnit) || 0),
            0
        );
        setTotal(newTotal);
    };

    return {
        total,
        addProduct,
        removeProduct,
    };
};
