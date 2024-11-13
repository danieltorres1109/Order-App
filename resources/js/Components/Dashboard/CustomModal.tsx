import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";

interface Props {
    title: string;
    isOpen: boolean;
    toggleOpen: () => void;
    children: React.ReactNode;
    isBig?: boolean;
}
export function CustomModal({
    title,
    isOpen,
    toggleOpen,
    isBig,
    children,
}: Props) {
    const totalWidht = isBig ? "w-full md:w-3/5" : "w-96";
    return (
        <Transition show={isOpen} as={Fragment}>
            <Dialog
                open={isOpen}
                onClose={toggleOpen}
                className="relative z-50"
            >
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    {/* The backdrop, rendered as a fixed sibling to the panel container */}
                    <div
                        className="fixed inset-0 bg-black/30"
                        aria-hidden="true"
                    />
                </Transition.Child>

                {/* Full-screen scrollable container */}
                <div className="fixed inset-0 w-screen overflow-y-auto ">
                    {/* Container to center the panel */}
                    <div className="flex min-h-full items-center justify-center p-4">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            {/* The actual dialog panel  */}
                            <Dialog.Panel
                                className={`mx-auto bg-white px-4 py-2 rounded-2xl ${totalWidht}`}
                            >
                                <Dialog.Title>
                                    <div className="flex justify-between items-center mb-7 ">
                                        <h3 className="text-lg font-medium leading-6 text-gray-900">
                                            {title}
                                        </h3>
                                        <button
                                            className="text-2xl text-gray-500"
                                            onClick={toggleOpen}
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth={1.5}
                                                stroke="currentColor"
                                                className="w-6 h-6"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M6 18L18 6M6 6l12 12"
                                                />
                                            </svg>
                                        </button>
                                    </div>
                                </Dialog.Title>

                                {children}

                                <Dialog.Description></Dialog.Description>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
}
