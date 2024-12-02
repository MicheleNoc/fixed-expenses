import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from '../servers/AuthContext.js'; // Importa il contesto di autenticazione
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [redirect, setRedirect] = useState(false);
    const [error, setError] = useState(""); // Stato per gestire gli errori
    const { login } = useAuth(); // Usa il contesto di autenticazione
    const [showPassword, setShowPassword] = useState(false);
    async function handleLogin(event) {
        event.preventDefault();

        setError(""); // Resetta l'errore all'inizio

        try {
            await login(email, password);
            setRedirect(true);
        } catch (error) {
            console.error("Errore durante il login:", error); // Log dell'errore
            console.log("Errore dettagliato:", JSON.stringify(error, null, 2)); // Dettagli leggibili
            handleLoginError(error);
        }
        
    }
    function handleLoginError(error) {
        console.log("Messaggio di errore ricevuto:", error.message);
        if (error.message === "invalid_grant") {
            setError("Email o password non corretti.");
        } else if (error.message === "Email not confirmed") {
            setError("Email non confermata. Controlla la tua casella di posta per confermare l'email.");
        } else {
            setError("Login fallito. Riprova."); // Messaggio di errore generico
        }
    }
    

    if (redirect) {
        return <Navigate to="/dashboard" />; // Reindirizza alla dashboard
    }

    return (
        <div className="relative min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
    {/* Immagine di sfondo */}
    <div className="absolute inset-0 z-0">
        <img
            src={`${process.env.PUBLIC_URL}/backgroundmotorcare.jpg`}
            alt="background"
            className="w-full h-full object-cover blur-sm opacity-90 dark:opacity-60"
        />
    </div>

    {/* Contenitore del form */}
    <div className="relative z-10 w-full max-w-md p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-6">Login</h2>
        <form onSubmit={handleLogin} className="space-y-4">
            {/* Email Field */}
            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Email
                </label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-4 py-2 text-sm text-gray-700 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
                />
            </div>
            {/* Password Field */}
            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Password
                </label>
                <div className="relative w-full">
                    <input
                        type={showPassword ? "text" : "password"} // Cambia il tipo di input in base allo stato
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="w-full px-4 py-2 text-sm text-gray-700 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)} // Alterna la visibilità della password
                        className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-600 dark:text-gray-300 focus:outline-none"
                    >
                        <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                    </button>
                </div>

            </div>
            {/* Error Message */}
            {error && <p className="text-sm text-red-500">{error}</p>}
            {/* Submit Button */}
            <button
                type="submit"
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 dark:focus:ring-offset-gray-900"
            >
                Login
            </button>
        </form>
    </div>
</div>

    );
}
