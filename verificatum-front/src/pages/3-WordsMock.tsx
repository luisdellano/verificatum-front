import {
  Button,
  Label,
  TextInput,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "flowbite-react";
import { useState, useMemo } from "react";

export default function WordsMock() {
  const [candidatos, setCandidatos] = useState(3);
  const [votos, setVotos] = useState(10);
  const [duplicatas, setDuplicatas] = useState(2);
  const [votosGerados, setVotosGerados] = useState<any[]>([]);
  const [mensagem, setMensagem] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const reqBody = { candidatos, votos, duplicatas };

    try {
      const res = await fetch("http://localhost:5000/api/mock", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reqBody),
      });

      const data = await res.json();
      setVotosGerados(data.votos || []);
      setMensagem(data.message || "Mock criado com sucesso.");
    } catch (err) {
      setMensagem("Erro ao conectar com o backend.");
    }
  };

  // Tokens duplicados
  const tokensDuplicados = useMemo(() => {
    const contagem: Record<string, number> = {};
    votosGerados.forEach((v) => {
      contagem[v.token] = (contagem[v.token] || 0) + 1;
    });
    return Object.entries(contagem)
      .filter(([_, count]) => count > 1)
      .map(([token]) => token);
  }, [votosGerados]);

  return (
    <div className="flex flex-col md:flex-row justify-center gap-12 p-6">
      {/* Formulário */}
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm flex flex-col gap-4 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md"
      >
        <h2 className="text-lg font-bold text-gray-800 dark:text-white">Mock de Votos</h2>

        <div>
          <Label htmlFor="candidatos">Quantidade de candidatos</Label>
          <TextInput
            id="candidatos"
            type="number"
            required
            min={2}
            value={candidatos}
            onChange={(e) => setCandidatos(Number(e.target.value))}
          />
        </div>

        <div>
          <Label htmlFor="votos">Quantidade de votos</Label>
          <TextInput
            id="votos"
            type="number"
            required
            min={1}
            value={votos}
            onChange={(e) => setVotos(Number(e.target.value))}
          />
        </div>

        <div>
          <Label htmlFor="duplicatas">Quantidade de duplicatas</Label>
          <TextInput
            id="duplicatas"
            type="number"
            required
            min={0}
            value={duplicatas}
            onChange={(e) => setDuplicatas(Number(e.target.value))}
          />
        </div>

        <Button type="submit">Gerar</Button>
        {mensagem && (
          <p className="text-sm text-center text-blue-500 dark:text-blue-400">{mensagem}</p>
        )}
      </form>

      {/* Tabela */}
      <div className="w-full overflow-x-auto">
        <Table>
          <TableHead>
            <TableRow>
              <TableHeadCell>Token</TableHeadCell>
              <TableHeadCell>Voto</TableHeadCell>
              <TableHeadCell>Voto Cifrado</TableHeadCell>
            </TableRow>
          </TableHead>
          <TableBody className="divide-y">
            {votosGerados.map((voto, idx) => {
              const isDuplicado = tokensDuplicados.includes(voto.token);
              return (
                <TableRow
                  key={idx}
                  className={`bg-white dark:border-gray-700 ${
                    isDuplicado ? "bg-red-100 dark:bg-red-900" : "dark:bg-gray-800"
                  }`}
                >
                  <TableCell>{voto.token}</TableCell>
                  <TableCell>{voto.voto}</TableCell>
                  <TableCell>{voto.voto_cifrado}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
