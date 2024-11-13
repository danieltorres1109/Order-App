export const translateStatus = (status: string): string => {
    switch (status) {
        case "pending":
            return "Pendiente";
        case "processing":
            return "En proceso";
        case "shipped":
            return "Enviado";
        case "delivered":
            return "Entregado";
        case "cancelled":
            return "Cancelado";
        case "return_requested":
            return "Devolución solicitada";
        case "return_accepted":
            return "Devolución aceptada";
        case "refunded":
            return "Reembolsado";
        case "failed":
            return "Fallido";
        default:
            return "Desconocido";
    }
};


export const translateMethodPayment = (method: string): string => {
    switch (method) {
        case "cash":
            return "Efectivo";
        case "card":
            return "Tarjeta";
        default:
            return "Desconocido";
    }
};

