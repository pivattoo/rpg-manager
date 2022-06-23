import { Caracter } from "../types/common"

interface CaracterCardProps {
    caracter: Caracter
}

export default function CaracterCard({ caracter }: CaracterCardProps) {
    return (
        <div className="w-64 mr-4 h-fit rounded-md shadow-md">
            <div className="px-4">
                <div className="h-60 bg-cover bg-no-repeat bg-center rounded-xl" style={{ backgroundImage: `url(${caracter.image})` }}>
                </div>
            </div>
            <div className="flex mt-2">
                <label className="ml-3 font-medium text-lg">{caracter.name}</label>
                <label className="ml-1 font-light text-lg">{caracter.level}</label>
            </div>
            <div className="grid grid-cols-3 ml-4 mr-2 pt-2 pb-8">
                <div className="flex mr-2 justify-center items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1 text-red-700/90" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                    </svg>
                    <span className="font-semibold text-red-700/90">{caracter.status.life}/{caracter.status.maxLife}</span>
                </div>
                <div className="flex mr-2 justify-center items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1 text-green-700/90" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                    </svg>
                    <span className="font-semibold text-green-700/90">{caracter.status.stamina}/{caracter.status.maxStamina}</span>
                </div>
                <div className="flex mr-2 justify-center items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1 text-blue-700/90" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="font-semibold text-blue-700/90">{caracter.status.mana}/{caracter.status.maxMana}</span>
                </div>
            </div>
        </div>
    )
}