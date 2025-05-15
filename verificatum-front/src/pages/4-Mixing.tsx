import { useEffect, useState } from "react";
import { Button, Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from "flowbite-react";

export default function Mixing() {
  const [cyphertexts, setCyphertexts] = useState<string[]>([]);
  const [mix1, setMix1] = useState<string[]>([]);
  const [mix2, setMix2] = useState<string[]>([]);
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);

  // GET inicial dos votos cifrados
  useEffect(() => {
    fetch("http://localhost:5000/api/cyphertexts")
      .then((res) => res.json())
      .then((data) => setCyphertexts(data.votos || []))
      .catch(() => console.error("Erro ao buscar votos cifrados"));
  }, []);

  const handleMix = async () => {
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:5000/api/mix/${step + 1}`, {
        method: "POST",
      });
      const data = await res.json();

      if (step === 0) {
        setMix1(data.votos || []);
        setStep(1);
      } else if (step === 1) {
        setMix2(data.votos || []);
        setStep(2);
      }
    } catch (err) {
      console.error("Erro ao fazer mix", err);
    } finally {
      setLoading(false);
    }
  };

  const renderCol = (title: string, data: string[]) => (
    <div className="flex-1 px-4">
      <h2 className="text-lg font-bold text-center text-white mb-2">{title}</h2>
      <Table striped>
        <TableHead>
          <TableRow>
            <TableHeadCell>Voto cifrado</TableHeadCell>
          </TableRow>
        </TableHead>
        <TableBody className="divide-y">
          {data.map((voto, idx) => (
            <TableRow key={idx} className="bg-white dark:bg-gray-800">
              <TableCell className="text-center">{voto}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );

  return (
    <div className="flex flex-col items-center gap-6 px-8 py-4">
      <div className="flex w-full gap-4">
        {renderCol("Votos Cifrados", cyphertexts)}
        {renderCol("Output Node 1", mix1)}
        {renderCol("Output Node 2", mix2)}
      </div>

      <Button
        onClick={handleMix}
        disabled={step >= 2 || loading}
        isProcessing={loading}
      >
        {step === 0 ? "Executar Mix 1" : step === 1 ? "Executar Mix 2" : "Mix finalizado"}
      </Button>
    </div>
  );
}
