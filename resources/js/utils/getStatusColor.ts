export const getStatusColor = (status: string) => {
    switch (status) {
        case "pending":
            return "#fb6a0a";
        case "processing":
            return "#007BFF";
        case "shipped":
            return "#00aa28";
        case "delivered":
            return "#28A745";
        case "cancelled":
            return "#DC3545";
        case "return_requested":
            return "#c89809";
        case "return_accepted":
            return "#17A2B8";
        case "refunded":
            return "#6F42C1";
        case "failed":
            return "#721C24";
        default:
            return "#000000";
    }
};
