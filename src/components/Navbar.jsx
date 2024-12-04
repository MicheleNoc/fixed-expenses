import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../servers/AuthContext.js"; // Importa il contesto di autenticazione

function Navbar() {
    const { user, logout } = useAuth(); // Usa il contesto per ottenere l'utente e il logout

    const handleLogout = async () => {
        try {
            await logout();
        } catch (error) {
            console.error("Errore durante il logout:", error);
        }
    };

    return (
<div className="flex flex-col md:flex-row items-center justify-between dark:bg-gray-800 bg-white dark:text-white p-4 space-y-2 md:space-y-0">
    {/* Prima sezione con logo e link */}
    <div className="flex flex-row items-center space-x-2 md:space-x-4">
        <Link 
            to={user ? "/dashboard" : "/"} 
            className="text-base md:text-xl rounded dark:shadow-none font-bold leading-none text-black dark:text-white"
        >
            <h3 className="text-base md:text-xl font-bold bg-transparent leading-none text-black dark:text-white"> 
                <strong>Fixed Expenses   |</strong>
            </h3>
        </Link>
        <Link 
            to="/dashboardcosti"
            className="text-sm md:text-lg rounded dark:shadow-none font-bold leading-none text-black dark:text-white"
        >
           Dashboard Costi 
        </Link>

    </div>

    {/* Seconda sezione con login/logout */}
    <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 space-x-0 md:space-x-4">
        {user ? (
            <>
                <span className="text-sm md:text-lg font-bold bg-transparent leading-none text-black dark:text-white">
                {user?.email?.split('@')[0]}
                </span>
                <button
                    onClick={handleLogout}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 md:py-2 px-3 md:px-4 rounded text-sm md:text-base"
                >
                    Logout
                </button>
            </>
        ) : (
            <>
                <Link 
                    to="/login"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 md:py-2 px-3 md:px-4 rounded text-sm md:text-base"
                >
                    Login
                </Link>
                <Link 
                    to="/register"
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 md:py-2 px-3 md:px-4 rounded text-sm md:text-base"
                >
                    Registrati
                </Link>
            </>
        )}
    </div>
</div>


    );
}

export default Navbar;