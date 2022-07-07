import { Dispatch, SetStateAction } from "react"
import { CaracterData } from "../types/common"
import AttributesInfos from "./AttributesInfos"
import Button from "./Button"
import CaracterInfos from "./CaracterInfos"
import Header from "./Header"

interface CaracterInfosProps {
    caracter: CaracterData | null,
    setCaracter: Dispatch<SetStateAction<CaracterData | null>>

}

export default function Caracter({ caracter, setCaracter }: CaracterInfosProps) {
    return (
        <div className="pt-2">
            <div className="flex items-center mb-8">
                <div onClick={() => setCaracter(null)} className='flex w-8 h-8 rounded-full bg-gray-200 justify-center items-center cursor-pointer text-gray-400 hover:bg-gray-400 hover:text-gray-100'>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                    </svg>                        </div>
                <span className="pl-2 text-base font-semibold text-gray-700">Voltar</span>
            </div>
            {caracter ?
                <>
                    <div className="grid grid-cols-[1fr_4fr] border-b-2 pb-6">
                        <img src={caracter.image} className="rounded-full h-64 w-64" />
                        <div className="grid grid-cols-2">
                            <CaracterInfos caracter={caracter} />
                            <AttributesInfos />
                        </div>
                    </div>
                    <div className="mt-2">
                        <Header
                            name="Inventário"
                            description="Gerencie os itens do jogador"
                            add_name="item"
                            action={() => { }}
                        />
                    </div>
                </>
                :
                <div>Algo deu errado</div>
            }
        </div >
    )
}