//componente react a cardviews per visualizzare le rate
import React from 'react';

const CardAbbonamento = ({ abbonamento , onDelete }) => {
    const handleDelete = () => {
        onDelete(abbonamento.id);
    };

    return (
<div className="bg-white rounded-lg shadow-md p-4">
    <h2 className="text-lg text-black font-semibold mb-2">{abbonamento.titolo}</h2>
    <p className="text-black">Importo: {abbonamento.importo} €</p>
    <p className="text-black">
        Durata: {abbonamento.annuale ? "Annuale" : `${abbonamento.durata} mesi`}
    </p>
    <p className="text-black">Metodo di pagamento: {abbonamento.metododipagamento}</p>
    <p className="text-black">
        Totale Spesa:{" "}
        {abbonamento.annuale
            ? abbonamento.importo * 12 // Moltiplica per 12 se è annuale
            : abbonamento.importo * (abbonamento.durata || 1)}{" "}
        €
    </p>
    <button
                onClick={handleDelete}
                className="mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
                Elimina
            </button>
</div>

    );
};

export default CardAbbonamento;