import { Button } from "flowbite-react"

interface ConfigProps {
  onConectado: () => void
}

export default function Config({ onConectado }: ConfigProps) {
  const conectar = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/connect", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        }
      })

      const data = await response.json()
      console.log("Resposta do servidor:", data)

      if (data.status === "ok") {
        alert(data.message)
        onConectado() // avança o wizard
      } else {
        alert("Erro na conexão.")
      }
    } catch (err) {
      alert("Erro ao conectar com o servidor.")
      console.error(err)
    }
  }

  return (
    <div className="flex flex-col items-center gap-6">
      <h2 className="text-2xl font-semibold">Etapa 1: Configuração Inicial</h2>
      <p className="text-gray-400 text-center max-w-md">
        Esta etapa conecta o sistema ao servidor de mixagem local.
      </p>
      <Button onClick={conectar} color="blue">
        Conectar
      </Button>
    </div>
  )
}
