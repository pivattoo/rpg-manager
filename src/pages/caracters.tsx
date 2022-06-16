import { useState } from "react"
import AddItemTabHeader from "../Components/AddItemTabHeader"
import CaracterModal from "../Components/CaracterModal"

export default function Caracter() {
  const [openModal, setOpenModal] = useState<boolean>(false)

  return (
    <div className="px-16 pt-4">
      <AddItemTabHeader
        name="Gerenciar personagens"
        description="Nesta área você pode editar e criar seus próprios personagens"
        add_name="personagem"
        action={() => setOpenModal(true)}
      />

      <CaracterModal isOpen={openModal} setIsOpen={setOpenModal} />
    </div>
  )
}