import { router, useForm } from "@inertiajs/react";
import { useState } from "react";
import { toast } from "react-toastify";
import { CustomModal } from "./CustomModal";

interface Props {
    route: any /* route(admin.services, id) */;
    id: number;
    handleDelete?: (id: number) => void;
}
export const ButtonConfirmDelete = ({ route, handleDelete, id }: Props) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleOpen = () => setIsOpen(!isOpen);

    const { processing } = useForm();

    const onDelete = () => {
        toast("✅ Se canceló con éxito");

        router.delete(route, {
            preserveScroll: true,
        });

        handleDelete && handleDelete(id);

        toggleOpen();
    };

    return (
        <div className="text-nowrap">
            <button className="btn btn-outline-danger" onClick={toggleOpen}>
                Cancelar
            </button>

            {isOpen && (
                <CustomModal
                    isOpen={isOpen}
                    toggleOpen={toggleOpen}
                    title={"¿Estás seguro?"}
                >
                    <div className="col-12 w-full bg-red-100 ">
                        <div className="w-100 d-flex align-items-center">
                            <button
                                onClick={onDelete}
                                className="bg-danger w-full text-white py-2 px-6 rounded-3xl"
                                type="submit"
                                disabled={processing}
                            >
                                Sí, cancelar
                            </button>
                        </div>
                    </div>
                </CustomModal>
            )}
        </div>
    );
};
