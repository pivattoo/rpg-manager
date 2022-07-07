import { useEffect, useState } from "react"
import Header from "../components/Header"
import CaracterCard from "../components/CaracterCard"
import CaracterModal from "../components/CaracterModal"
import { GetCaracters } from "../services/caracterService"
import { CaracterData } from "../types/common"
import Caracter from "../components/Caracter"

export default function CaracterPage() {
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [caracters, setCaracters] = useState<CaracterData[]>([])
  const [selectedCaracter, setSelectedCaracter] = useState<CaracterData | null>(null)


  useEffect(() => {
    GetCaracters().then((data) => {
      setCaracters(data.caracters)
    })
  }, [])

  return (
    <div className="px-16 pt-4">
      {!selectedCaracter ?
        <>
          <Header
            name="Gerenciar personagens"
            description="Nesta área você pode editar e criar seus próprios personagens"
            add_name="personagem"
            action={() => setOpenModal(true)}
          />
          <div className="flex flex-wrap">
            {caracters.length > 0 &&
              caracters.map((caracter) =>
                <div key={caracter.id} className="cursor-pointer mt-4" onClick={() => setSelectedCaracter(caracter)}>
                  <CaracterCard
                    caracter={caracter}
                  />
                </div>
              )}
          </div>
          <CaracterModal isOpen={openModal} setIsOpen={setOpenModal} caracters={caracters} setCaracters={setCaracters} />
        </>
        :
        <Caracter caracter={selectedCaracter} setCaracter={setSelectedCaracter} />
      }
    </div>
  )
}