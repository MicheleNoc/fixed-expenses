import React, { useState } from "react";
import { useAuth } from "../servers/AuthContext.js";
import supabase from "../servers/supabaseClient.js";

const AddRata = ({ onClose, onAdd }) => {
  // Aggiungi refreshVehicles come prop
  const [titolo, setTitolo] = useState("");
  const [importo, setImporto] = useState("");
  const [durata, setDurata] = useState("");
  const [metododipagamento, setMetododipagamento] = useState("");
  const [message, setMessage] = useState("");
  const { getCurrentUserId } = useAuth();

  const handleAddRata = async (event) => {
    event.preventDefault();

    const authId = getCurrentUserId();
    console.log("User ID:", authId);
    if (!authId) {
      setMessage("Devi essere autenticato per aggiungere un veicolo.");
      return;
    }

    if (!titolo || !importo || !durata || !metododipagamento) {
      setMessage("Per favore, compila tutti i campi.");
      return;
    }

    const { data, error } = await supabase
      .from("rate")
      .insert([
        {
          user_id: authId, // L'UUID dell'utente
          titolo,
          importo,
          durata,
          metododipagamento, //
        },
      ])
      .select(); // Seleziona i dati inseriti, se necessario

    if (error) {
      console.error("Errore durante l'aggiunta della rata:", error);
      setMessage("Errore durante l'aggiunta della rata.");
    } else {
      console.log("Rata aggiunta con successo:", data);
      setTitolo("");
      setDurata("");
      setImporto("");
      setMetododipagamento("");
      onAdd(data[0]); // Aggiungi il nuovo abbonamento alla dashboard
      onClose(); // Chiudi la modale
    }
  };

  return (
    <div>
      <form onSubmit={handleAddRata} className="max-w-md mx-auto p-4 border border-gray-300 dark:border-gray-600 rounded-md shadow-md bg-white dark:bg-gray-800">
                <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">Aggiungi Abbonamento</h2>
                {message && <p className="text-red-500 mb-4">{message}</p>}
                <div className="mb-4">
                    <label htmlFor="titolo" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Titolo</label>
                    <input
                        type="text"
                        id="titolo"
                        value={titolo}
                        onChange={(e) => setTitolo(e.target.value)}
                        required
                        className="w-full px-4 py-2 text-sm text-gray-700 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="importo" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Importo (€)</label>
                    <input
                        type="number"
                        id="importo"
                        value={importo}
                        onChange={(e) => setImporto(e.target.value)}
                        required
                        className="w-full px-4 py-2 text-sm text-gray-700 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Durata</label>
                    <div className="flex items-center">
                        <input
                            type="number"
                            id="durata"
                            name="annuale"
                            value={durata}
                            onChange={(e) => setDurata(e.target.value)}
                             className="w-full px-4 py-2 text-sm text-gray-700 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
                        />
                    </div>
                </div>
                <div className="mb-4">
                    <label htmlFor="metododipagamento" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Metodo di Pagamento</label>
                    <input
                        type="text"
                        id="metododipagamento"
                        value={metododipagamento}
                        onChange={(e) => setMetododipagamento(e.target.value)}
                        required
                        className="w-full px-4 py-2 text-sm text-gray-700 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
                    />
                </div>
                <div className="mt-6 flex justify-end space-x-2">
                    <button
                        type="button"
                        onClick={onClose}
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Annulla
                    </button>
                    <button
                        type="submit"
                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Salva
                    </button>
                </div>
            </form>
        </div>
  );
};

export default AddRata;
