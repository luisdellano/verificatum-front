import { useState } from "react";
import Stepper from "./components/Stepper";
import { Button } from "flowbite-react";
import { Pagination } from "flowbite-react";

import Config from "./pages/1-Config";
import Keygen from "./pages/2-Keygen";
import WordsMock from "./pages/3-WordsMock";
import Mixing from "./pages/4-Mixing";
import Decode from "./pages/5-Decode";

const etapas = [
  { numero: 1,  descricao: "Set Up" },
  { numero: 2, descricao: "Keygen" },
  { numero: 3,  descricao: "Geração de Votos" },
  { numero: 4,  descricao: "Mixing" },
  { numero: 5,  descricao: "Decifração" },
  { numero: 6,  descricao: "Soma" },
]

export default function App() {

  const [step, setStep] = useState(1)

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      <Stepper stepAtual={step} etapas={etapas} />
      
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-12">

      {step === 1 && <Config onConectado={() => setStep(2)} />}

{step === 2 && <Keygen  />}
{step === 3 && <WordsMock  />}
{step === 4 && <Mixing  />}
{step === 5 && <Decode  />}
   
    </main>
    <div className="flex overflow-x-auto sm:justify-center">
      <Pagination
        layout="navigation"
        currentPage={step}
        totalPages={6}
        onPageChange={setStep}
        showIcons
      />
      </div>
    </div>
  );
}
