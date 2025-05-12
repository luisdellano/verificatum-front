import { useState } from "react";

export default function WordsMock() {
  const [numVotos, setNumVotos] = useState(10);
  const [numDuplicatas, setNumDuplicatas] = useState(2);
  const [status, setStatus] = useState("");

  const handleSubmit = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/mock-votos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          votos: numVotos,
          duplicatas: numDuplicatas,
        }),
      });

      const result = await response.json();
      setStatus(result.message || "Votos gerados com sucesso!");
    } catch (error) {
      setStatus("Erro ao comunicar com backend.");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 space-y-4">
      <h2 className="text-xl font-bold text-gray-800 dark:text-white">Mock de Votos</h2>

      <div>
        <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
          Quantidade de votos:
        </label>
        <input
          type="number"
          className="w-full px-3 py-2 border rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
          value={numVotos}
          onChange={(e) => setNumVotos(Number(e.target.value))}
        />
      </div>

      <div>
        <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
          Quantidade de duplicatas:
        </label>
        <input
          type="number"
          className="w-full px-3 py-2 border rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
          value={numDuplicatas}
          onChange={(e) => setNumDuplicatas(Number(e.target.value))}
        />
      </div>

      <button
        onClick={handleSubmit}
        className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700"
      >
        Gerar
      </button>

      {status && (
        <p className="text-sm text-center text-green-500 dark:text-green-400 mt-2">{status}</p>
      )}
    </div>
  );
}
