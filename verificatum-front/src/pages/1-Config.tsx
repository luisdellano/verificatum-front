import { Button, Alert, Spinner } from "flowbite-react"
import { useState } from "react"

export default function Config() {
  const [mensagem, setMensagem] = useState("")
  const [tipo, setTipo] = useState<"success" | "error" | "">("")
  const [loading, setLoading] = useState(false)

  const conectar = async () => {
    setLoading(true)
    setMensagem("")
    setTipo("")

    try {
      const response = await fetch("http://127.0.0.1:5000/api/setup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        }
      })

      const data = await response.json()

      if (data.status === "Setup complete") {
        setMensagem("Setup Concluído")
        setTipo("success")
      } else {
        setMensagem("Erro na conexão.")
        setTipo("error")
      }
    } catch (err) {
      setMensagem("Erro ao conectar com o servidor.")
      setTipo("error")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col items-center gap-6">
      <h2 className="text-2xl font-semibold">Setup Geral</h2>
      <p className="text-gray-400 text-center max-w-md">
        Fazer o setup inicial do Verificatum
      </p>

      {mensagem && (
        <Alert color={tipo === "success" ? "success" : "failure"}>
          <span className="font-medium">{mensagem}</span>
        </Alert>
      )}

      <Button onClick={conectar} color="blue" disabled={loading}>
        {loading ? (
          <>
            <Spinner size="sm" light className="mr-2" />
            Carregando...
          </>
        ) : (
          "Iniciar"
        )}
      </Button>


    </div>
  )
}
