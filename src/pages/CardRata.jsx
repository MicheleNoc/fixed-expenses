//componente react a cardviews per visualizzare le rate
import React from 'react';

const CardRata = ({ rate }) => {

    return (
        <div className="bg-white rounded-lg shadow-md p-4">
            <h2 className="text-lg text-black font-semibold mb-2">{rate.titolo}</h2>
            <p className="text-black">Importo: {rate.importo} €</p>
            <p className="text-black">Durata: {rate.durata} mesi</p>
            <p className="text-black">Metodo di pagamento: {rate.metododipagamento}</p>
            <p className="text-black">Totale Spesa: {rate.importo * rate.durata} €</p>
        </div>
    );
};

export default CardRata;