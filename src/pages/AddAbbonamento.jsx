import React, { useState } from 'react';
import { useAuth } from '../servers/AuthContext.js';
import supabase from '../servers/supabaseClient.js';

const AddAbbonamento = ({ onClose, refreshVehicles }) => {  // Aggiungi refreshVehicles come prop
    const [titolo, setTitolo] = useState("");
    const [importo, setImporto] = useState("");
    const [annuale, setAnnuale] = useState(true);
    const [metododipagamento, setMetododipagamento] = useState("");
    const [message, setMessage] = useState("");
    const { getCurrentUserId } = useAuth();

    const handleAddAbbonamento = async (event) => {
        event.preventDefault();

        const authId = getCurrentUserId();
        console.log("User ID:", authId);
        if (!authId) {
            setMessage("Devi essere autenticato per aggiungere un veicolo.");
            return;
        }

        if (!titolo || !importo || !annuale || !metododipagamento) {
            setMessage("Per favore, compila tutti i campi.");
            return;
        }

        const { data, error } = await supabase
        .from('abbonamenti')
        .insert([
          {
            user_id: authId,     // L'UUID dell'utente
            titolo,              
            importo,          
            annuale,
            metododipagamento                 // 
          }
        ])
        .select();  // Seleziona i dati inseriti, se necessario

        if (error) {
            console.error("Errore durante l'aggiunta dell'abbonamento:", error);
            setMessage("Errore durante l'aggiunta dell'abbonamento.");
        } else {
            console.log("Abbonamento aggiunto con successo:", data);
            setTitolo("");
            setAnnuale(true);
            setImporto("");
            setMetododipagamento("");
            //refreshVehicles(); // Chiama la funzione per aggiornare i veicoli
            onClose(); // Chiudi la modale
        }
    };

    return (
        <div>
            <form onSubmit={handleAddAbbonamento} className="max-w-md mx-auto p-4 border border-gray-300 dark:border-gray-600 rounded-md shadow-md bg-white dark:bg-gray-800">
                <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">Aggiungi Abbonamento</h2>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Titolo</label>
                    <input
                        value={titolo}
                        onChange={(e) => setTitolo(e.target.value)}
                        required
                        className="text-black mt-1 block w-full border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:focus:border-indigo-400 dark:focus:ring-indigo-400"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Importo (mensile)</label>
                    <input
                        value={importo}
                        onChange={(e) => setImporto(e.target.value)}
                        required
                        className="mt-1 text-black block w-full border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:focus:border-indigo-400 dark:focus:ring-indigo-400"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Annuale si/no</label>
                    <select
                        value={annuale}
                        onChange={(e) => setAnnuale(e.target.value)}
                        required
                        type="number"
                        className="mt-1 block text-black w-full border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:focus:border-indigo-400 dark:focus:ring-indigo-400"
                    >
                   <option value="true">Si</option>
                     <option value="false">No</option>
                     </select> 
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Metodo di Pagamento</label>
                    <input
                        value={metododipagamento}
                        onChange={(e) => setMetododipagamento(e.target.value)}
                        required
                        className="mt-1 block text-black w-full border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:focus:border-indigo-400 dark:focus:ring-indigo-400"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full flex justify-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:bg-indigo-500 dark:hover:bg-indigo-400 dark:focus:ring-indigo-300"
                >
                    Aggiungi Abbonamento
                </button>

                {message && <p className="mt-2 text-red-600 dark:text-red-400">{message}</p>}
            </form>

            <button
                className="mt-4 bg-red-600 hover:bg-red-500 text-white font-bold py-2 px-4 rounded w-full"
                onClick={onClose}
                aria-label="Chiudi il modal per aggiungere veicolo"
            >
                Chiudi
            </button>
        </div>
    );
};

export default AddAbbonamento;
