import { useEffect, useState } from "react"
import AddItemTabHeader from "../components/AddItemTabHeader"
import CaracterCard from "../components/CaracterCard"
import CaracterModal from "../components/CaracterModal"
import { GetCaracters } from "../services/caracterService"
import { Caracter } from "../types/common"

export default function CaracterPage() {
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [caracters, setCaracter] = useState<Caracter[]>([])

  useEffect(() => {
    GetCaracters().then((data) => {
      setCaracter(data.caracters)
    })
  }, [])

  return (
    <div className="px-16 pt-4">
      <AddItemTabHeader
        name="Gerenciar personagens"
        description="Nesta área você pode editar e criar seus próprios personagens"
        add_name="personagem"
        action={() => setOpenModal(true)}
      />
      <div className="flex">
        {caracters.length > 0 &&
          caracters.map((caracter) =>
            <div key={caracter.id}>
              <CaracterCard
                name={caracter.name}
                age={caracter.age}
                image={caracter.image}
              />
            </div>
          )}
      </div>


      <CaracterModal isOpen={openModal} setIsOpen={setOpenModal} />
    </div>
  )
}