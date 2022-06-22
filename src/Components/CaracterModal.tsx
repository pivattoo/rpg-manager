import { Dialog } from "@headlessui/react";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import Button from "./Button";
import Modal from "./Modal";
import TextInput from "./TextInput";
import toast, { Toaster } from 'react-hot-toast';
import { CreateCaracter } from "../services/caracterService";
import FileInput from '../components/FileInput'
import { Caracter } from "../types/common";


interface CaracterModalProps {
    isOpen: boolean,
    setIsOpen: Dispatch<SetStateAction<boolean>>,
    caracters: Caracter[],
    setCaracters: Dispatch<SetStateAction<Caracter[]>>
}



export default function CaracterModal({ isOpen, setIsOpen, caracters, setCaracters }: CaracterModalProps) {
    const [image, setImage] = useState<string | null>(null);

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
            age: String(age.current),
            image: image,
            life: life.current,
            stamina: stamina.current,
            mana: mana.current,
        }
        let newCaracters = caracters
        toast.promise(
            CreateCaracter(payload).then((data) => {
                newCaracters = [...newCaracters, data.caracter]
                setCaracters(newCaracters)
            }),
            {
                loading: 'Criando...',
                success: <b>Personagem criado!</b>,
                error: <b>Erro ao criar personagem.</b>,
            }
        );
        closeModal()
    }

    const closeModal = () => {
        setIsOpen(false)
        setImage(null)
        name.current = null
        age.current = 0,
            life.current = 0,
            stamina.current = 0,
            mana.current = 0
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
                    <FileInput fileURL={image} setReadFile={(file) => setImage(file.url)} />

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