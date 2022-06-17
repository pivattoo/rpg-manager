import { Dialog } from "@headlessui/react";
import { Dispatch, SetStateAction, useRef } from "react";
import Button from "./Button";
import Modal from "./Modal";
import TextInput from "./TextInput";
import toast, { Toaster } from 'react-hot-toast';
import { CreateCaracter } from "../services/caracterService";

interface CaracterModalProps {
    isOpen: boolean,
    setIsOpen: Dispatch<SetStateAction<boolean>>
}



export default function CaracterModal({ isOpen, setIsOpen }: CaracterModalProps) {
    const name = useRef<string | null>(null);
    const age = useRef<number>(0);
    const life = useRef<number>(0);
    const stamina = useRef<number>(0);
    const mana = useRef<number>(0);

    const handleSave = () => {
        if (!name.current || age.current < 0 || life.current < 0 || stamina.current < 0 || mana.current < 0) {
            return toast.error("Valores inválidos")
        }
        const payload = {
            name: name.current,
            age: age.current,
            life: life.current,
            stamina: stamina.current,
            mana: mana.current
        }
        
        toast.promise(
            CreateCaracter(payload),
             {
               loading: 'Criando...',
               success: <b>Personagem criado!</b>,
               error: <b>Erro ao criar personagem.</b>,
             }
           );

    }

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
                            <TextInput type="number" defaultValue={String(age.current)} setValue={(val) => age.current = Number(val)} placeholder="Idade" />
                        </div>
                    </div>
                    <div className="grid grid-cols-3 pb-4">
                        <div className="mr-2">
                            <label>Vida Máxima</label>
                            <TextInput type="number" defaultValue={String(life.current)} setValue={(val) => life.current = Number(val)} placeholder="Vida" />
                        </div>
                        <div className="mr-2">
                            <label>Estâmina</label>
                            <TextInput type="number" defaultValue={String(stamina.current)} setValue={(val) => stamina.current = Number(val)} placeholder="Estâmina" />
                        </div>
                        <div>
                            <label>Mana</label>
                            <TextInput type="number" defaultValue={String(mana.current)} setValue={(val) => mana.current = Number(val)} placeholder="Mana" />
                        </div>
                    </div>

                    <Button
                        text="Criar"
                        action={() => handleSave()}
                    />

                </div>
            </div>
        </Modal>

    )
}