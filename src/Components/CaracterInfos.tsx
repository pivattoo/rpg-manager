import { CaracterData } from "../types/common"

interface CaracterInfosProps {
    caracter: CaracterData
}

export default function CaracterInfos({caracter}: CaracterInfosProps) {
    return (
            <div className="flex ">
                <div className="ml-4">
                    <label className="text-4xl font-bold text-gray-800">{caracter.name}</label>
                    <div className="bg-gray-200 h-fit min-w-full text-justify px-4 py-2 rounded-lg mt-4">
                        <p className="text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit. In faucibus augue ipsum, et dapibus felis dictum quis. Mauris a placerat nisl. Praesent metus nunc, hendrerit non ornare a, faucibus a neque. Phasellus suscipit mattis nisi, at ultricies justo ultrices vel.</p>
                    </div>
                    <div className="flex justify-center min-w-full bg-red-600 mt-1">
                        <span className="text-white">{caracter.attributes.life}/{caracter.attributes.maxLife}</span>
                    </div>
                    <div className="flex justify-center min-w-full bg-blue-600 mt-1">
                        <span className="text-white">{caracter.attributes.sanity}/{caracter.attributes.maxSanity}</span>
                    </div>
                </div>
            </div>
            )
}