import { useState } from "react"
import { Button, Spinner } from "flowbite-react"



export default function Keygen() {
  const [carregando, setCarregando] = useState(false)
  const [chave, setChave] = useState<string | null>(null)

  const gerarChave = async () => {
    setCarregando(true)
    try {
      const response = await fetch("http://127.0.0.1:5000/api/keygen", {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      })

      const data = await response.json()

      setChave(data.key || "Chave não retornada.")
      alert("Chave gerada com sucesso!")

    } catch (error) {
      alert("Erro ao gerar chave pública.")
      console.error(error)
    } finally {
      setCarregando(false)
    }
  }

  return (
    <div className="flex flex-col items-center gap-6">
      <h2 className="text-2xl font-semibold">Etapa 2: Geração de Chave Pública</h2>


      {chave && (
        <div className="text-sm bg-gray-800 p-4 rounded w-full max-w-md text-center break-all">
          🔐 Chave gerada:<br />
          <span className="text-blue-400">{chave}</span>
        </div>
      )}

      <Button onClick={gerarChave} disabled={carregando}>
        {carregando ? <Spinner size="sm" /> : "Gerar chave pública"}
      </Button>
    </div>
  )
}
