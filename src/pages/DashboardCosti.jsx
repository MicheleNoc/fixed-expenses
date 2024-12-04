import React, { useEffect, useState } from "react";
import { useAuth } from "../servers/AuthContext";
import supabase from "../servers/supabaseClient";

const DashboardCosti = () => {
    const { getCurrentUserId } = useAuth();
    const [costoTotaleMensile, setCostoTotaleMensile] = useState(0);
    const [costoTotaleAnnuale, setCostoTotaleAnnuale] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCosti = async () => {
            const userId = getCurrentUserId();
            if (!userId) {
                setError("Devi essere autenticato per visualizzare i costi.");
                setLoading(false);
                return;
            }

            setLoading(true);
            setError(null);

            try {
                // Recupera le rate
                const { data: rateData, error: rateError } = await supabase
                    .from("rate")
                    .select("*")
                    .eq("user_id", userId);

                if (rateError) throw rateError;

                // Recupera gli abbonamenti
                const { data: abbonamentiData, error: abbonamentiError } = await supabase
                    .from("abbonamenti")
                    .select("*")
                    .eq("user_id", userId);

                if (abbonamentiError) throw abbonamentiError;

                // Calcola i costi totali mensili
                const totaleMensileRate = rateData.reduce((acc, rata) => acc + rata.importo, 0);
                const totaleMensileAbbonamenti = abbonamentiData.reduce((acc, abbonamento) => acc + abbonamento.importo, 0);

                const totaleMensile = totaleMensileRate + totaleMensileAbbonamenti;
                const totaleAnnuale = totaleMensile * 12;

                setCostoTotaleMensile(totaleMensile);
                setCostoTotaleAnnuale(totaleAnnuale);
                setLoading(false);
            } catch (error) {
                console.error("Errore nel recupero dei costi:", error);
                setError("Errore nel recupero dei costi.");
                setLoading(false);
            }
        };

        fetchCosti();
    }, [getCurrentUserId]);

    if (loading) {
        return <div>Caricamento...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="relative h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 pt-10">
            <div className="absolute inset-0 z-0">
                <img
                    src={`${process.env.PUBLIC_URL}/background.jpg`}
                    alt="background"
                    className="w-full h-full object-cover blur-sm opacity-70 dark:opacity-50"
                />
            </div>
            <div className="relative z-10 max-w-4xl mx-auto p-4">
                <h2 className="text-3xl font-bold text-center mb-4">Costi Totali</h2>
                <div className="mb-6">
                    <h3 className="text-2xl font-semibold text-center mb-4">Spese Totali Mensili</h3>
                    <p className="text-center text-xl text-gray-900 dark:text-white">{costoTotaleMensile.toFixed(2)} €</p>
                </div>
                <div className="mb-6">
                    <h3 className="text-2xl font-semibold text-center mb-4">Spese Totali Annuali</h3>
                    <p className="text-center text-xl text-gray-900 dark:text-white">{costoTotaleAnnuale.toFixed(2)} €</p>
                </div>
            </div>
        </div>
    );
};

export default DashboardCosti;