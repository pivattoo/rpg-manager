
interface CaracterCardProps {
    name: string,
    level: number,
    image: string
}

export default function CaracterCard({ name, level, image }: CaracterCardProps) {
    return (
        <div className="w-64 mr-4 h-fit rounded-md shadow-md">
            <div className="px-4">
                <div className="h-60 bg-cover bg-no-repeat bg-center rounded-xl" style={{ backgroundImage: `url(${image})` }}>
                </div>
            </div>
            <div className="flex mt-2">
                <label className="ml-3 font-medium text-lg">{name}</label>
                <label className="ml-1 font-light text-lg">{level}</label>
            </div>
            <div className="grid grid-cols-3 ml-4 mr-2 pt-2 pb-8">
                <div className="mr-2 bg-red-700/90 rounded-full">
                    <div className="flex justify-center w-[100px] h-6" />
                </div>
                <div className="mr-2 bg-green-700/90 rounded-full">
                    <div className="flex justify-center w-[100px] h-6" />
                </div>
                <div className="mr-2 bg-blue-700/90 rounded-full">
                    <div className="flex justify-center w-[100px] h-6" />
                </div>
            </div>
        </div>
    )
}