export function formateSlug(nombreProducto: string): string {
    let slug = nombreProducto.toLowerCase();

    if (nombreProducto != "") {
        slug = slug.replace(/[\s\W-]+/g, "-");

        const numeroAleatorio = Math.floor(Math.random() * 900) + 100;

        slug += "-" + numeroAleatorio;
    }else{
        slug=''
    }

    return slug;
}
