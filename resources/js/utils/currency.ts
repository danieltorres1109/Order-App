export const formatMoned = (value: number) => {
    const formatter = new Intl.NumberFormat('es-MX', {
        style: "currency",
        currency: "MXN",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    })
    return formatter.format(value);
}

// Lo mismo pero sin simbolo
export const formatMonedWC = (value: number) => {
    const formatter = new Intl.NumberFormat('es-MX', {
        style: "currency",
        currency: "MXN",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    })
    let number = formatter.format(value);
    number = number.toString().substring(1,)
    return number
}
