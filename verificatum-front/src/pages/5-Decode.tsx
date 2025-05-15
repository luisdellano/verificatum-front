import { useEffect, useState } from "react";
import {
  Label,
  TextInput,
  Button,
  Table,
  TableHead,
  TableRow,
  TableHeadCell,
  TableBody,
  TableCell
} from "flowbite-react";

export default function Decode() {
  const [chave1, setChave1] = useState("");
  const [chave2, setChave2] = useState("");
  const [cifrados, setCifrados] = useState<string[]>([]);
  const [decifrados, setDecifrados] = useState<string[]>([]);

  // 🔄 Carrega votos cifrados ao montar
  useEffect(() => {
    async function fetchVotos() {
      const res = await fetch("http://localhost:5000/api/cyphertexts");
      const data = await res.json();
      setCifrados(data.votos || []);
    }
    fetchVotos();
  }, []);

  const handleObterChaves = async () => {
    const res = await fetch("http://localhost:5000/api/keys");
    const data = await res.json();
    setChave1(data.key1);
    setChave2(data.key2);
  };

  const handleDecifrar = async () => {
    const res = await fetch("http://localhost:5000/api/decode", {
      method: "POST"
    });
    const data = await res.json();
    setDecifrados(data.votos || []);
  };

  return (
    <div className="p-8 flex flex-col gap-6">
      <h1 className="text-2xl font-bold text-white">🔐 Decifração</h1>

      {/* Botão + Chaves */}
      <div className="flex flex-col gap-4">
        <Button onClick={handleObterChaves} className="w-40">
          Obter Chaves
        </Button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="chave1">Mixnode 1 Key</Label>
            <TextInput id="chave1" value={chave1} readOnly />
          </div>
          <div>
            <Label htmlFor="chave2">Mixnode 2 Key</Label>
            <TextInput id="chave2" value={chave2} readOnly />
          </div>
        </div>
      </div>

      <Button className="w-32" onClick={handleDecifrar}>
        Decifrar
      </Button>

      {/* Tabelas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <div>
          <h2 className="font-semibold text-white mb-2">🔒 Cifrados</h2>
          <Table>
            <TableHead>
              <TableRow>
                <TableHeadCell>Texto Cifrado</TableHeadCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cifrados.map((v, i) => (
                <TableRow key={i}>
                  <TableCell>{v}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div>
          <h2 className="font-semibold text-white mb-2">🔓 Decifrados</h2>
          <Table>
            <TableHead>
              <TableRow>
                <TableHeadCell>Texto Decifrado</TableHeadCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {decifrados.map((v, i) => (
                <TableRow key={i}>
                  <TableCell>{v}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
