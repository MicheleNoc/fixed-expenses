import React from "react";

function Homepage() {
    return( 
<div className="relative min-h-screen dark:bg-gray-900">
    {/* Immagine di sfondo */}
    <div className="absolute inset-0 z-0">
        <img
            src={`${process.env.PUBLIC_URL}/background.jpg`}
            alt="background"
            className="w-full h-full object-cover blur-sm opacity-90 dark:opacity-60"
        />
    </div>

    {/* Contenuto centrato */}
    <div className="relative z-10 flex items-center justify-center min-h-screen">
        <div className="text-center">
            <h1 className="text-3xl mb-4 text-black font-bold">Benvenuto in Fixed Expenses 💰</h1>
            <p className="mb-6 text-black font-bold dark:text-gray-300">Accedi o registrati per continuare.</p>
            <a
                className="bg-blue-500 shadow-md dark:shadow-lg text-white px-4 py-2 rounded mr-2 hover:bg-blue-600 dark:bg-blue-700 dark:hover:bg-blue-600"
                href="/login"
            >
                Login
            </a>
            <a
                className="bg-green-500 shadow-md dark:shadow-lg text-white px-4 py-2 rounded hover:bg-green-600 dark:bg-green-700 dark:hover:bg-green-600"
                href="/register"
            >
                Registrati
            </a>
        </div>
    </div>
</div>


    )
}

export default Homepage;