import { useEffect, useState } from "react"
import Header from "../components/Header"
import CaracterCard from "../components/CaracterCard"
import CaracterModal from "../components/CaracterModal"
import { GetCaracters } from "../services/caracterService"
import { Caracter } from "../types/common"

export default function CaracterPage() {
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [caracters, setCaracters] = useState<Caracter[]>([])

  useEffect(() => {
    GetCaracters().then((data) => {
      setCaracters(data.caracters)
    })
  }, [])

  return (
    <div className="px-16 pt-4">
      <Header
        name="Gerenciar personagens"
        description="Nesta área você pode editar e criar seus próprios personagens"
        add_name="personagem"
        action={() => setOpenModal(true)}
      />
      <div className="flex flex-wrap">
        {caracters.length > 0 &&
          caracters.map((caracter) =>
            <div key={caracter.id} className="mt-4" onClick={() => console.log(caracter.id)}>
              <CaracterCard
                name={caracter.name}
                level={caracter.level}
                image={caracter.image}
              />
            </div>
          )}
      </div>


      <CaracterModal isOpen={openModal} setIsOpen={setOpenModal} caracters={caracters} setCaracters={setCaracters} />
    </div>
  )
}