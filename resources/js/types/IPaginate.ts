// Definimos la interfaz IPagination para que acepte un tipo genérico T
export interface IPagination<T> {
    current_page: number;
    data: T[]; // Aquí usamos el tipo genérico T
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    links: ILink[];
    next_page_url: string;
    path: string;
    per_page: number;
    prev_page_url: null;
    to: number;
    total: number;
}

// Definimos la interfaz Link como antes
export interface ILink {
    url: null | string;
    label: string;
    active: boolean;
}
