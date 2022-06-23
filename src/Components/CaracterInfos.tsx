import { Dispatch, SetStateAction } from "react"
import { Caracter } from "../types/common"

interface CaracterInfosProps {
    caracter: Caracter | null,
    setCaracter: Dispatch<SetStateAction<Caracter | null>>

}

export default function CaracterInfos({ caracter, setCaracter }: CaracterInfosProps) {
    return (
        <div className="px-16 pt-4">
            <div className="flex items-center mb-8">
                <div onClick={() => setCaracter(null)} className='flex w-8 h-8 rounded-full bg-gray-200 justify-center items-center cursor-pointer text-gray-400 hover:bg-gray-400 hover:text-gray-100'>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                    </svg>                        </div>
                <span className="pl-2 text-base font-semibold text-gray-700">Voltar</span>
            </div>
            {caracter ?
                <div className="flex">

                </div>
                :
                <div>sexo2</div>
            }
        </div>
    )
}