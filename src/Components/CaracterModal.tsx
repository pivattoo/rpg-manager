import { Dialog } from "@headlessui/react";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import Button from "./Button";
import Modal from "./Modal";
import TextInput from "./TextInput";
import toast, { Toaster } from 'react-hot-toast';
import { CreateCaracter } from "../services/caracterService";
import FileInput from '../components/FileInput'
import { CaracterData } from "../types/common";


interface CaracterModalProps {
    isOpen: boolean,
    setIsOpen: Dispatch<SetStateAction<boolean>>,
    caracters: CaracterData[],
    setCaracters: Dispatch<SetStateAction<CaracterData[]>>
}



export default function CaracterModal({ isOpen, setIsOpen, caracters, setCaracters }: CaracterModalProps) {
    const [image, setImage] = useState<string | null>(null);

    const name = useRef<string | null>(null);
    const description = useRef<string | null>(null)
    const life = useRef<number>(0);
    const sanity = useRef<number>(0);

    const agility = useRef<number>(0)
    const intellect = useRef<number>(0)
    const strength = useRef<number>(0)
    const stamina = useRef<number>(0)
    const presence = useRef<number>(0)



    const handleSave = () => {
        if (!name.current || life.current < 0 || sanity.current < 0 || !description.current) {
            return toast.error("Valores inválidos")
        }
        const payload = {
            name: name.current,
            description: description.current,
            image: image,
            life: life.current,
            sanity: sanity.current,
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
        description.current = null
        name.current = null
        life.current = 0
        sanity.current = 0
    }

    return (
        <Modal open={isOpen} onClose={closeModal} className={"max-w-6xl"}>
            <div className="flex mb-4">
                <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                >
                    Novo Personagem
                </Dialog.Title>
                <i onClick={() => closeModal()} className="lg:hidden ml-auto fas fa-times-circle text-lg"></i>
            </div>
            <div className="grid grid-cols-2 gap-3">
                <div className="w-full">
                    <FileInput fileURL={image} setReadFile={(file) => setImage(file.url)} />
                    <div className="grid grid-cols-3 mt-2">
                        <div className="mr-2">
                            <label>Agilidade</label>
                            <TextInput type="number" defaultValue={String(agility.current)} setValue={(val) => agility.current = Number(val)} placeholder="Agilidade" />
                        </div>
                        <div className="mr-2">
                            <label>Força</label>
                            <TextInput type="number" defaultValue={String(strength.current)} setValue={(val) => strength.current = Number(val)} placeholder="Força" />
                        </div>
                        <div className="mr-2">
                            <label>Vigor</label>
                            <TextInput type="number" defaultValue={String(stamina.current)} setValue={(val) => stamina.current = Number(val)} placeholder="Vigor" />
                        </div>
                    </div>
                    <div className="grid grid-cols-2">
                        <div className="mr-2">
                            <label>Intelecto</label>
                            <TextInput type="number" defaultValue={String(intellect.current)} setValue={(val) => intellect.current = Number(val)} placeholder="Intelecto" />
                        </div>
                        <div className="mr-2">
                            <label>Presença</label>
                            <TextInput type="number" defaultValue={String(presence.current)} setValue={(val) => presence.current = Number(val)} placeholder="Presença" />
                        </div>
                    </div>
                </div>
                <div>
                    <div className="mr-2">
                        <label>Nome</label>
                        <TextInput setValue={(val) => name.current = val} placeholder="Nome" />
                    </div>
                    <div className="grid grid-cols-2 pb-4">
                        <div className="mr-2">
                            <label>Vida Máxima</label>
                            <TextInput type="number" defaultValue={String(life.current)} setValue={(val) => life.current = Number(val)} placeholder="Vida" />
                        </div>
                        <div className="mr-2">
                            <label>Sanidade</label>
                            <TextInput type="number" defaultValue={String(sanity.current)} setValue={(val) => sanity.current = Number(val)} placeholder="Estâmina" />
                        </div>
                    </div>
                    <div className="mr-2">
                        <label>Descrição</label>
                        <TextInput setValue={(val) => description.current = val} area={true} rows={8}/>
                    </div>
                </div>
            </div>
            <Button
                text="Criar"
                action={() => handleSave()}
            />
        </Modal>

    )
}