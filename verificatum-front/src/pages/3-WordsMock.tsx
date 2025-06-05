import {
  Button,
  Label,
  TextInput,
  Select,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "flowbite-react";
import { useMemo, useState } from "react";

const cargosNacionais = ["Deputado Federal", "Deputado Estadual", "Senador", "Governador", "Presidente"];
const cargosMunicipais = ["Vereador", "Prefeito"];

export default function WordsMock() {
  const [tipoEleicao, setTipoEleicao] = useState("municipal");
  const [nUrnas, setNUrnas] = useState(1);
  const [nTotalVotes, setNTotalVotes] = useState(10);
  const [nAnyVotes, setNAnyVotes] = useState(1);
  const [nDoubleVotes, setNDoubleVotes] = useState(1);
  const [nContestOptions, setNContestOptions] = useState<number[]>([5, 5]);
  const [gavs, setGavs] = useState<any[]>([]);
  const [mensagem, setMensagem] = useState("");

  const cargos = tipoEleicao === "municipal" ? cargosMunicipais : cargosNacionais;

  const handleCargoChange = (index: number, value: number) => {
    const updated = [...nContestOptions];
    updated[index] = value;
    setNContestOptions(updated);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const reqBody = {
      nMachines: nUrnas,
      nContestOptions,
      nTotalVotes,
      nAnyVotes,
      nDoubleVotes,
    };

    try {
      const res = await fetch("http://localhost:5000/api/mock", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reqBody),
      });

      const data = await res.json();
      setGavs(data.GAVT || []);
      setMensagem(data.message || "Mock criado com sucesso.");
    } catch (err) {
      setMensagem("Erro ao conectar com o backend.");
    }
  };

  const maxCandidatos = useMemo(() => Math.max(...gavs.map(g => g.candidates?.length || 0), 0), [gavs]);

  return (
    <div className="flex flex-col md:flex-row justify-center gap-12 p-6">
      {/* Formulário */}
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-4xl grid md:grid-cols-2 gap-6 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md"
      >
        {/* Coluna 1: campos gerais */}
        <div className="flex flex-col gap-4">
          <h2 className="text-lg font-bold text-gray-800 dark:text-white">Mock de Votos</h2>

          <div>
            <Label htmlFor="eleicao">Tipo de eleição</Label>
            <Select
              id="eleicao"
              value={tipoEleicao}
              onChange={(e) => {
                const novoTipo = e.target.value;
                setTipoEleicao(novoTipo);
                const novaQtd = novoTipo === "municipal" ? 2 : 5;
                setNContestOptions(Array(novaQtd).fill(5));
              }}
            >
              <option value="municipal">Municipal</option>
              <option value="nacional">Nacional</option>
            </Select>
          </div>

          <div>
            <Label htmlFor="urnas">Número de urnas</Label>
            <TextInput
              id="urnas"
              type="number"
              min={1}
              required
              value={nUrnas}
              onChange={(e) => setNUrnas(Number(e.target.value))}
            />
          </div>

          <div>
            <Label htmlFor="total">Total de votos</Label>
            <TextInput
              id="total"
              type="number"
              required
              min={1}
              value={nTotalVotes}
              onChange={(e) => setNTotalVotes(Number(e.target.value))}
            />
          </div>

          <div>
            <Label htmlFor="any">Any Votes</Label>
            <TextInput
              id="any"
              type="number"
              required
              min={0}
              value={nAnyVotes}
              onChange={(e) => setNAnyVotes(Number(e.target.value))}
            />
          </div>

          <div>
            <Label htmlFor="duplicados">Duplicados</Label>
            <TextInput
              id="duplicados"
              type="number"
              required
              min={0}
              value={nDoubleVotes}
              onChange={(e) => setNDoubleVotes(Number(e.target.value))}
            />
          </div>

          <Button type="submit">Gerar</Button>
          {mensagem && (
            <p className="text-sm text-center text-blue-500 dark:text-blue-400">{mensagem}</p>
          )}
        </div>

        {/* Coluna 2: candidatos por cargo */}
        <div className="flex flex-col gap-4 mt-7 md:mt-11">
          {cargos.map((cargo, index) => (
            <div key={index}>
              <Label htmlFor={`cargo-${index}`}>Candidatos para {cargo}</Label>
              <TextInput
                id={`cargo-${index}`}
                type="number"
                required
                min={1}
                value={nContestOptions[index]}
                onChange={(e) => handleCargoChange(index, Number(e.target.value))}
              />
            </div>
          ))}
        </div>
      </form>

      {/* Tabela GAVT */}
      <div className="w-full overflow-x-auto">
        <Table>
          <TableHead>
            <TableRow>
              <TableHeadCell>Token</TableHeadCell>
              {Array.from({ length: maxCandidatos }).map((_, idx) => (
                <TableHeadCell key={idx}>Candidato {idx + 1}</TableHeadCell>
              ))}
              <TableHeadCell>Biometria</TableHeadCell>
              <TableHeadCell>Máquina</TableHeadCell>
            </TableRow>
          </TableHead>
          <TableBody className="divide-y">
            {gavs.map((voto, idx) => (
              <TableRow key={idx} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <TableCell>{voto.tokenID || "-"}</TableCell>
                {voto.candidates?.map((c, i) => (
                  <TableCell key={i}>{c}</TableCell>
                ))}
                {Array.from({ length: maxCandidatos - (voto.candidates?.length || 0) }).map((_, i) => (
                  <TableCell key={`empty-${i}`} />
                ))}
                <TableCell>{voto.metadata?.hasbiometry ? "Sim" : "Não"}</TableCell>
                <TableCell>{voto.metadata?.votingMachineID ?? "-"}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
