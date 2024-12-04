import React from 'react';

const CardRata = ({ rate, onDelete }) => {

    const handleDelete = () => {
        onDelete(rate.id);
    };

    return (
        <div className="bg-white rounded-lg shadow-md p-4">
            <h2 className="text-lg text-black font-semibold mb-2">{rate.titolo}</h2>
            <p className="text-black">Importo: {rate.importo} €</p>
            <p className="text-black">Durata: {rate.durata} mesi</p>
            <p className="text-black">Metodo di pagamento: {rate.metododipagamento}</p>
            <p className="text-black">Totale Spesa: {rate.importo * rate.durata} €</p>
            <button
                onClick={handleDelete}
                className="mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
                Elimina
            </button>
        </div>
    );
};

export default CardRata;