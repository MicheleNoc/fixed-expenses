import React, { useEffect, useState, useCallback } from "react";
import { useAuth } from "../servers/AuthContext.js";
//import AddItems from "./AddItems";
import supabase from "../servers/supabaseClient.js";
import CardRata from "./CardRata.jsx";
import AddRata from "./AddRata.jsx";
import AddAbbonamento from "./AddAbbonamento.jsx";
import CardAbbonamento from "./CardAbbonamento.jsx";

export default function Dashboard() {
    const { user, getCurrentUserId } = useAuth();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const [rate, setRate] = useState([]); // Stato per mantenere le rate
    const [abbonamento, setAbbonamento] = useState([]); // Stato per mantenere gli abbonamenti

    const fetchData = useCallback(async () => {
        const userId = getCurrentUserId();
        console.log("User ID:", userId);
        if (!userId) {
            console.error("User ID is undefined");
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const { data, error } = await supabase
                .from("rate")
                .select("*")
                .eq("user_id", userId);
            if (error) throw error;

            setRate(data); // Aggiorna lo stato con i dati ricevuti
            console.log("Rate:", data);
        } catch (err) {
            console.error("Errore durante il fetch:", err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, [getCurrentUserId]);

    const fetchAbbonamento = useCallback(async () => {
        const userId = getCurrentUserId();
        console.log("User ID for Abbonamento:", userId);
        if (!userId) {
            console.error("User ID is undefined");
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const { data, error } = await supabase
                .from("abbonamenti")
                .select("*")
                .eq("user_id", userId);
            if (error) throw error; 

            setAbbonamento(data); // Aggiorna lo stato con i dati ricevuti
            console.log("Abbonamenti:", data);  
        } catch (err) {
            console.error("Errore durante il fetch:", err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, [getCurrentUserId]);

    useEffect(() => {
        fetchData();
        fetchAbbonamento();
    }, [fetchData, fetchAbbonamento]);

    return (
        <div className="relative h-screen flex flex-col justify-center bg-gray-100 dark:bg-gray-900 text-gray-900 pt-10 dark:text-gray-100">
            <div className="absolute inset-0 z-0">
                <img
                    src={`${process.env.PUBLIC_URL}/background.jpg`}
                    alt="background"
                    className="w-full h-full object-cover blur-sm opacity-70 dark:opacity-50"
                />
            </div>
            <div className="relative z-10 max-w-4xl mx-auto p-4">
                <h1 className="text-3xl font-bold text-center">
                    Benvenuto, {user?.email?.split('@')[0]}
                </h1>
                <button
                    className="bg-green-600 hover:bg-green-500 text-white font-bold py-2 px-4 rounded mt-4 mb-4 px-4 mr-4"
                    onClick={() => setIsOpen(true)}
                >
                    Aggiungi Rata
                </button>
                {isOpen && (
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
                        <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md mx-auto dark:bg-gray-800">
                            <AddRata onClose={() => setIsOpen(false)} />
                        </div>
                    </div>
                )}
                <button
                    className="bg-green-600 hover:bg-green-500 text-white font-bold py-2 px-4 rounded mt-4 mb-4"
                    onClick={() => setIsOpen(true)}
                >
                    Aggiungi Abbonamento
                </button>
                {isOpen && (
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
                        <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md mx-auto dark:bg-gray-800">
                            <AddAbbonamento onClose={() => setIsOpen(false)} />
                        </div>
                    </div>
                )}
                {loading ? (
                    <div className="flex justify-center mt-4">Caricamento...</div>
                ) : error ? (
                    <div className="text-red-600 text-center">{error}</div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {rate.length === 0 ? (
                            <p className="">Nessuna rata trovata nel database.</p>
                        ) : (
                            rate.map((rata) => (
                                <div key={rata.id}>
                                    <CardRata rate={rata} />
                                </div>
                            ))
                        )}
                    </div>
                )}
                {loading ? (
                    <div className="flex justify-center mt-4">Caricamento...</div>
                ) : error ? (
                    <div className="text-red-600 text-center">{error}</div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {abbonamento.length === 0 ? (
                            <p className="">Nessun abbonamento trovato nel database.</p>
                        ) : (
                            abbonamento.map((abb) => (
                                <div key={abb.id}>
                                    <CardAbbonamento abbonamento={abb} />
                                </div>
                            ))
                        )}
                    </div>
                    )}
            </div>
        </div>
    );
}
