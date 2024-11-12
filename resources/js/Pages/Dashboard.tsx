import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

export default function Dashboard() {
    return (
        <AuthenticatedLayout header="Ordenes">
            {/* <Head title="Dashboard" /> */}

            <p>Hola</p>
        </AuthenticatedLayout>
    );
}
