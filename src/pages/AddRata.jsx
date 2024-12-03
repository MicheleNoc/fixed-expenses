import React, { useState } from 'react';
import { useAuth } from '../servers/AuthContext.js';
import supabase from '../servers/supabaseClient.js';

const AddRata = ({ onClose, refreshVehicles }) => {  // Aggiungi refreshVehicles come prop
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
        .from('rate')
        .insert([
          {
            user_id: authId,     // L'UUID dell'utente
            titolo,              
            importo,          
            durata,
            metododipagamento                 // 
          }
        ])
        .select();  // Seleziona i dati inseriti, se necessario

        if (error) {
            console.error("Errore durante l'aggiunta della rata:", error);
            setMessage("Errore durante l'aggiunta della rata.");
        } else {
            console.log("Rata aggiunta con successo:", data);
            setTitolo("");
            setDurata("");
            setImporto("");
            setMetododipagamento("");
            //refreshVehicles(); // Chiama la funzione per aggiornare i veicoli
            onClose(); // Chiudi la modale
        }
    };

    return (
        <div>
            <form onSubmit={handleAddRata} className="max-w-md mx-auto p-4 border border-gray-300 dark:border-gray-600 rounded-md shadow-md bg-white dark:bg-gray-800">
                <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">Aggiungi Rata</h2>

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
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Durata (mesi)</label>
                    <input
                        value={durata}
                        onChange={(e) => setDurata(e.target.value)}
                        required
                        type="number"
                        className="mt-1 block text-black w-full border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:focus:border-indigo-400 dark:focus:ring-indigo-400"
                    />
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
                    Aggiungi Rata
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

export default AddRata;
