import React, { useState } from 'react';
import supabase from '../servers/supabaseClient.js';
import { useAuth } from '../servers/AuthContext';

const AddAbbonamento = ({ onClose, onAdd }) => {
    const [titolo, setTitolo] = useState('');
    const [importo, setImporto] = useState('');
    const [annuale, setAnnuale] = useState(true);
    const [durata, setDurata] = useState(''); // Stato per la durata in mesi
    const [metododipagamento, setMetododipagamento] = useState('');
    const [message, setMessage] = useState('');
    const { getCurrentUserId } = useAuth();
    const authId = getCurrentUserId();

    const handleAddAbbonamento = async (e) => {
        e.preventDefault();

        if (!titolo || !importo || !metododipagamento || (!annuale && !durata)) {
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
                    durata: annuale ? null : durata, // Imposta la durata solo se non è annuale
                    metododipagamento
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
            setDurata(""); 
            setMetododipagamento("");
            onAdd(data[0]); // Aggiungi il nuovo abbonamento alla dashboard
            onClose(); // Chiudi la modale
        }
    };

    return (
        <div>
            <form onSubmit={handleAddAbbonamento} className="max-w-md mx-auto p-4 border border-gray-300 dark:border-gray-600 rounded-md shadow-md bg-white dark:bg-gray-800">
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
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Annuale</label>
                    <div className="flex items-center">
                        <input
                            type="radio"
                            id="annuale-yes"
                            name="annuale"
                            value="yes"
                            checked={annuale}
                            onChange={() => setAnnuale(true)}
                            className="mr-2"
                        />
                        <label htmlFor="annuale-yes" className="mr-4 text-sm text-gray-700 dark:text-gray-300">Sì</label>
                        <input
                            type="radio"
                            id="annuale-no"
                            name="annuale"
                            value="no"
                            checked={!annuale}
                            onChange={() => setAnnuale(false)}
                            className="mr-2"
                        />
                        <label htmlFor="annuale-no" className="text-sm text-gray-700 dark:text-gray-300">No</label>
                    </div>
                </div>
                {!annuale && (
                    <div className="mb-4">
                        <label htmlFor="durata" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Durata (mesi)</label>
                        <input
                            type="number"
                            id="durata"
                            value={durata}
                            onChange={(e) => setDurata(e.target.value)}
                            required={!annuale}
                            className="w-full px-4 py-2 text-sm text-gray-700 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
                        />
                    </div>
                )}
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

export default AddAbbonamento;