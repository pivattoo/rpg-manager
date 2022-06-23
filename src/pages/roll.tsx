import { useState } from "react";
import Header from "../components/Header";
import Button from "../components/Button";
import { DiceResultType, DiceType } from "../types";
import toast from "react-hot-toast";

const TYPES_DICE = [
    { name: "D2", icon: "", side: 2 },
    { name: "D4", icon: "", side: 4 },
    { name: "D6", icon: "", side: 6 },
    { name: "D8", icon: "", side: 8 },
    { name: "D12", icon: "", side: 12 },
    { name: "D20", icon: "", side: 20 },
    { name: "D100", icon: "", side: 100 }
]

export default function RollADice() {
    const [results, setResults] = useState<DiceResultType[] | null>(null)
    const [selectedDice, setSelectedDice] = useState<DiceType[] | null>(null)

    function addDice(index: number) {
        if (selectedDice) {
            setSelectedDice([...selectedDice, TYPES_DICE[index]])
        } else {
            setSelectedDice([TYPES_DICE[index]])
        }
    }

    const resetDice = () => {
        setResults(null)
        setSelectedDice(null)
    }

    const getResults = () => {
        if (!selectedDice) {
            return toast.error("Nenhum dado selecionado.")
        }
        let result: DiceResultType[] = selectedDice.map((x) => {
            return {
                value: Math.round(Math.random() * (x.side - 1) + 1),
                type: x.name
            }
        })
        setResults(result)
    }

    const getTotal = () => {
        if (!results) {
            return toast.error("Erro")
        }

        let total = 0

        for (let x of results) {
            total += x.value
        }

        return total
    }

    return (
        <div className="px-16 pt-4">
            <Header
                name="Rolar dados"
                description="Selecione quais dados deseja utilizar e tente a sorte."
                edit_name="Rolar dados"
                action={() => getResults()}
            />
            <div className="flex flex-wrap justify-center">
                {TYPES_DICE.map((dice, i) => (
                    <div key={i} className="cursor-pointer flex flex-col border-2 p-6 rounded-2xl my-2 mx-2 justify-center items-center" onClick={() => addDice(i)}>
                        <span className="font-semibold text-gray-600">{dice.name}</span>
                    </div>
                ))}

            </div>


            <div className="flex flex-col justify-center">
                <Header
                    name="Dados selecionados"
                    description="Aqui estão os dados que você selecionou."
                    edit_name="Limpar Dados"
                    action={() => resetDice()}
                />
                {selectedDice ?
                    <div className="flex justify-center">
                        {selectedDice.map((dice, i) => (
                            <div key={i} className="cursor-pointer flex flex-col border-2 p-6 rounded-2xl my-2 mx-2 justify-center items-center">
                                <span className="font-semibold text-gray-600">{dice.name}</span>
                            </div>
                        ))}
                    </div>
                    :
                    <div className="flex justify-center">
                        <span className="font-semibold text-gray-600">Nenhum dado selecionado.</span>
                    </div>
                }
                {results &&
                    <div className="flex justify-center">
                        <div className="cursor-pointer flex flex-col border-2 p-6 rounded-2xl my-2 mx-2 justify-center items-center">
                            {results.map((x, i) => (
                                <span key={i} className="font-semibold text-gray-600">{x.type} = {x.value}</span>
                            ))}
                            <span className="font-semibold text-gray-600">Total = {getTotal()}</span>

                        </div>

                    </div>
                }
            </div>
        </div>
    )
}