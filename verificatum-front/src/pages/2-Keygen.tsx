import { useState } from "react"
import { Button, Spinner } from "flowbite-react"

export default function Keygen() {
  const [mensagem, setMensagem] = useState("Não gerada")
  const [carregando, setCarregando] = useState(false)
  const [status, setStatus] = useState("")

  const gerarChave = async () => {
    setCarregando(true)
    setMensagem("")

    try {
      // 1. Faz o POST para gerar a chave
      const response = await fetch("http://127.0.0.1:5000/api/keygen", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        }
      })

      if (!response.ok) {
        throw new Error("Erro ao gerar chave")
      }

      const data = await response.json()

      // 2. Se sucesso, faz o GET para buscar o conteúdo da chave
      const response_key = await fetch("http://127.0.0.1:5000/api/keygen", {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      })

      if (!response_key.ok) {
        throw new Error("Erro ao ler arquivo da publicKey")
      }

      const keydata = await response_key.json()

      // Tudo deu certo
      setStatus("Gerada com sucesso")
      setMensagem(keydata.publicKey || "Chave vazia")

    } catch (error) {
      setStatus("Erro ao gerar chave")
      setMensagem("Erro ao gerar ou obter a chave pública.")
      console.error(error)
    } finally {
      setCarregando(false)
    }
  }

  return (
    <div className="flex flex-col items-center gap-6">
      <h2 className="text-2xl font-semibold">Etapa 2: Geração de Chave Pública</h2>

      <div className="text-sm bg-gray-800 p-4 rounded w-full max-w-md text-center break-all">
        <strong>STATUS:</strong> {status || "Não gerada"}<br />
        <span className="text-blue-400">{mensagem}</span>
      </div>

      <Button onClick={gerarChave} disabled={carregando}>
        {carregando ? (
          <>
            <Spinner size="sm" light className="mr-2" />
            Gerando...
          </>
        ) : (
          "Gerar chave pública"
        )}
      </Button>
    </div>
  )
}
