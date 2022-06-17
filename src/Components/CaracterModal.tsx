import { Dialog } from "@headlessui/react";
import { Dispatch, SetStateAction, useRef } from "react";
import Modal from "./Modal";
import TextInput from "./TextInput";

interface CaracterModalProps {
    isOpen: boolean,
    setIsOpen: Dispatch<SetStateAction<boolean>>
}



export default function CaracterModal({ isOpen, setIsOpen }: CaracterModalProps) {
    const name = useRef<string | null>(null);
    const age = useRef<string | null>(null);
    const life = useRef<string | null>(null);
    const stamina = useRef<string | null>(null);
    const mana = useRef<string | null>(null);

    const closeModal = () => {
        setIsOpen(false)
    }

    return (
        <Modal open={isOpen} onClose={closeModal}>
            <div className="flex mb-4">
                <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                >
                    Novo Personagem
                </Dialog.Title>
                <i onClick={() => closeModal()} className="lg:hidden ml-auto fas fa-times-circle text-lg"></i>
            </div>
            <div className="lg:flex mt-2 text-sm font-medium">
                <div className="w-full">
                    <div className="grid grid-cols-2">
                        <div className="mr-2">
                            <label>Nome</label>
                            <TextInput setValue={(val) => name.current = val} placeholder="Nome" />
                        </div>
                        <div>
                            <label>Idade</label>
                            <TextInput type="number" setValue={(val) => age.current = val} placeholder="Idade" />
                        </div>
                    </div>
                    <div className="grid grid-cols-3">
                        <div className="mr-2">
                            <label>Vida Máxima</label>
                            <TextInput type="number" setValue={(val) => life.current = val} placeholder="Vida" />
                        </div>
                        <div className="mr-2">
                            <label>Estâmina</label>
                            <TextInput type="number" setValue={(val) => stamina.current = val} placeholder="Estâmina" />
                        </div>
                        <div>
                            <label>Mana</label>
                            <TextInput type="number" setValue={(val) => mana.current = val} placeholder="Mana" />
                        </div>
                    </div>

                </div>
            </div>
        </Modal>

    )
}