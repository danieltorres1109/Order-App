export interface IProduct {
    id: number;
    title: string;
    slug: string;
    sku: string;
    price: number;
    desc?: string;
    quantityStock: number;
    user_id?: number | null;
    is_visible: boolean;
    created_at: string;
    updated_at: string;
}
