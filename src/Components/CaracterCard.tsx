import { CaracterData } from "../types/common"

interface CaracterCardProps {
    caracter: CaracterData
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
            <div className="grid grid-cols-2 ml-4 mr-2 pt-2 pb-8">
                <div className="flex mr-2 justify-center items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1 text-red-700/90" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                    </svg>
                    <span className="font-semibold text-red-700/90">{caracter.attributes.life}/{caracter.attributes.maxLife}</span>
                </div>
                <div className="flex mr-2 justify-center items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1 text-blue-700/90" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                    </svg>
                    <span className="font-semibold text-blue-700/90">{caracter.attributes.sanity}/{caracter.attributes.maxSanity}</span>
                </div>

            </div>
        </div>
    )
}