const technologies = [
  { name: "Next.js", function: "Implementação da interface e API" },
  { name: "MySQL", function: "Banco de dados" },
  { name: "Prisma", function: "ORM" },
  {name: "TypeScript", function: "Tipagem para JavaScript"},
  {name: "React", function: "Inferface"}

]

export default function Home() {
  return (
    <div className="grid grid-cols-2 pt-8">
      <div className="flex justify-end ">
        <img
          className="hidden lg:block h-96 w-auto"
          src="https://i.imgur.com/H1uSjAD.png"
          alt="RpgManager"
        />
      </div>
      <div className="font-semibold text-gray-800">
        <h1 className="text-4xl pb-4">Rpg Manager</h1>
        <div className="flex flex-wrap max-w-sm ">
        <label >O RPG Manager é um projeto amador desenvolvido com o propósito de estudar tecnologias, o projeto visa criar um sistema genérico para o gerenciamento de sessões de RPG, com funcionalidades basicas como rolagem de dados, sistema de PVP e PVE, gerenciamento completo de personagens, entre outras funções.</label>

        </div>
        <div className="pl-2 pt-4">
          <span>Tecnologias utilizadas no projeto:</span>
          <div className="mt-2 border-gray-200 border w-2/3 bg-white shadow rounded-md block overflow-auto">
            <table className="table-auto w-full">
              <thead>
                <tr className="bg-gray-100 text-sm text-slate-800 text-left border-b border-slate-200">
                  <th className="px-4 py-4 font-medium">Tecnologias</th>
                  <th className="px-4 py-4 font-medium"></th>
                </tr>
              </thead>
              <tbody>
                {technologies.map(((techology, i) => (
                  <tr key={i} className="px-4 h-8">
                    <td className="px-4 py-2">✅{techology.name}</td>
                    <td className="px-4 py-2">{techology.function}</td>
                  </tr>
                )))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}