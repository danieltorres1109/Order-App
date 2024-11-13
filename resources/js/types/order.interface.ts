import { User } from ".";

export type OrderStatus =
    | "pending"
    | "processing"
    | "shipped"
    | "delivered"
    | "cancelled"
    | "return_requested"
    | "return_accepted"
    | "refunded"
    | "failed";

export interface IOrder {
    id?: number;
    user_id: number | null;
    status: OrderStatus;
    totalSell: number;
    created_at?: string;
    updated_at?: string;

    /* Relations */
    user?: User;
    order_details: any[];
}
