export default function AttributesInfos() {
    return (
        <div className="pl-8 flex flex-col">
            <label className="text-4xl font-bold text-gray-800">Atributos</label>
            <div className="grid grid-cols-3 gap-8 pl-8 mt-4">
                <div className="flex flex-col justify-center items-center border-4 rounded-2xl py-1">
                    <span className="text-4xl font-bold text-gray-800">3</span>
                    <span className="text-base text-gray-600">Agilidade</span>
                </div>
                <div className="flex flex-col justify-center items-center border-4 rounded-2xl py-1">
                    <span className="text-4xl font-bold text-gray-800">2</span>
                    <span className="text-base text-gray-600">Intelecto</span>
                </div>
                <div className="flex flex-col justify-center items-center border-4 rounded-2xl py-1">
                    <span className="text-4xl font-bold text-gray-800">1</span>
                    <span className="text-base text-gray-600">Força</span>
                </div>
            </div>
            <div className="grid grid-cols-2 gap-8 pl-8 mt-4">
                <div className="flex flex-col justify-center items-center border-4 rounded-2xl py-1">
                    <span className="text-4xl font-bold text-gray-800">2</span>
                    <span className="text-base text-gray-600">Vigor</span>
                </div>
                <div className="flex flex-col justify-center items-center border-4 rounded-2xl py-1">
                    <span className="text-4xl font-bold text-gray-800">3</span>
                    <span className="text-base text-gray-600">Presença</span>
                </div>
            </div>
        </div>
    )
}