import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import supabase from '../servers/supabaseClient.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
export default function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [redirect, setRedirect] = useState(false);
    const [error, setError] = useState(""); // Stato per gestire gli errori
    const [showPassword, setShowPassword] = useState(false);
    async function handleRegister(event) {
        event.preventDefault();

        setError(""); // Resetta l'errore all'inizio

        try {
            // Usa Supabase Auth per registrare l'utente
            const {  error: signupError } = await supabase.auth.signUp({
                email: email,
                password: password,
            });

            if (signupError) {
                // Gestione degli errori restituiti da Supabase Auth
                setError(signupError.message);
                return;
            }

            // Se la registrazione ha successo, possiamo reindirizzare l'utente
            alert("Registrazione riuscita");
            setRedirect(true); // Imposta il flag di reindirizzamento
        } catch (error) {
            setError("Errore durante la registrazione. Riprova.");
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
                    src={`${process.env.PUBLIC_URL}/background.jpg`}
                    alt="background"
                    className="w-full h-full object-cover blur-sm opacity-90 dark:opacity-60"
                />
            </div>

            {/* Contenitore del form */}
            <div className="relative z-10 w-full max-w-md p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-6">Registrati</h2>
                <form onSubmit={handleRegister} className="space-y-4">
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
                        className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-1 dark:focus:ring-offset-gray-900"
                    >
                        Registrati
                    </button>
                </form>
            </div>
        </div>
    );
}
