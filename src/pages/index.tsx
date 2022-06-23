const technologies = ["JavaScript", "Next.js", "Prisma"]

export default function Home() {
  return (
    <div className="grid grid-cols-2 items-center pt-8">
      <div className="flex justify-end ">
        <img
          className="hidden lg:block h-80 w-auto"
          src="https://i.imgur.com/H1uSjAD.png"
          alt="RpgManager"
        />
      </div>
      <div className="font-semibold text-gray-800">
        <h1 className="text-4xl pb-4">Rpg Manager</h1>
        <label className="pl-2">Gerenciador genérico para RPGs.</label>
        <div className="pl-2 pt-4">
          <span>Tecnologias utilizadas no projeto:</span>
          <div className="border-slate-200 border w-1/3 bg-white shadow rounded-md block overflow-auto">
            <table className="table-auto w-full">
              <thead>
                <tr className="bg-slate-100 text-sm text-slate-800 text-left border-b border-slate-200">
                  <th className="px-4 py-4 font-medium">Tecnologias</th>
                </tr>
              </thead>
              <tbody>
                {technologies.map(((techology, i) => (
                  <tr key={i} className="px-4 h-8 text-base">
                    <td className="px-4 py-2">✅{techology}</td>
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