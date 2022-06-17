import { useState } from "react"
import AddItemTabHeader from "../Components/AddItemTabHeader"
import CaracterCard from "../Components/CaracterCard"
import CaracterModal from "../Components/CaracterModal"

const CARDS = [
  { name: "Miau", age: "4", image: "https://i.pinimg.com/564x/cc/c4/06/ccc406dbafc09f3ac2f066a494af21e7.jpg" },
  { name: "Miau", age: "7", image: "https://i.pinimg.com/564x/c4/6e/33/c46e33f4de48e4d7d7643dd7b19a912c.jpg" },
  { name: "Miau", age: "9", image: "https://i.pinimg.com/564x/e5/d4/c6/e5d4c638618adc393ca8701ebb1b50a2.jpg" }
]

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
      <div className="flex">
        {CARDS.map((card, i) =>
          <div key={i}>
            <CaracterCard
              name={card.name}
              age={card.age}
              image={card.image}
            />
          </div>
        )}
      </div>


      <CaracterModal isOpen={openModal} setIsOpen={setOpenModal} />
    </div>
  )
}