import React, { createContext, useContext, useEffect, useState } from 'react';
import supabase from './supabaseClient.js'; 

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [session, setSession] = useState(null);
    const [loading, setLoading] = useState(true); // Stato per gestire il caricamento iniziale
  
    // Funzione per inizializzare la sessione dell'utente
    useEffect(() => {
        const initSession = async () => {
            const { data: { session: currentSession } } = await supabase.auth.getSession();

            if (currentSession?.user) {
                setSession(currentSession);
                setUser(currentSession.user);
                localStorage.setItem('token', currentSession.access_token);
                localStorage.setItem('userId', currentSession.user.id);
            } else {
                setSession(null);
                setUser(null);
                localStorage.removeItem('token');
                localStorage.removeItem('userId');
            }
            setLoading(false); // Caricamento finito
        };

        initSession();

        const { data: authListener } = supabase.auth.onAuthStateChange((event, newSession) => {
            if (newSession?.user) {
                setSession(newSession);
                setUser(newSession.user);
                localStorage.setItem('token', newSession.access_token);
                localStorage.setItem('userId', newSession.user.id);
            } else {
                setSession(null);
                setUser(null);
                localStorage.removeItem('token');
                localStorage.removeItem('userId');
            }
        });

        // Cleanup listener
        return () => {
            authListener?.subscription.unsubscribe();
        };
    }, []);

    // Funzione di login
    const login = async (email, password) => {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
     
        if (error) {
            // Gestione errori specifici
            if (error.message.includes('Invalid login credentials')) {
                throw new Error('Credenziali non valide.');
            }
            if (error.message.includes('Email not confirmed')) {
                throw new Error('Email non confermata. Controlla la tua casella di posta.');
            }
            throw error; // Rilancia errore generico
        }
     
        if (data.session?.access_token && data.session.user) {
            localStorage.setItem('token', data.session.access_token); // Token per sessione
            localStorage.setItem('userId', data.session.user.id); // ID dell'utente
        } else {
            throw new Error("Login riuscito, ma nessun token di sessione trovato.");
        }
    };

    const register = async (email, password) => {
        const { data, error } = await supabase.auth.signUp({ email, password });
     
        if (error) {
            if (error.message.includes('Email gia registrata')) {
                throw new Error('Questa email è già registrata.');
            }
            throw error;
        }
     
        if (data.user?.id) {
            localStorage.setItem('userId', data.user.id);  // Salva l'ID dell'utente
            console.log("Utente registrato con successo:", data.user);
        }
    };

    const logout = async () => {
        const session = supabase.auth.getSession();
        if (!session) {
            console.warn("No active session to log out from.");
            // Proceed with cleanup and redirection
            localStorage.removeItem('token');
            localStorage.removeItem('userId');
            setUser(null);
            setSession(null);
            window.location.href = '/';
            return;
        }
    
        const { error } = await supabase.auth.signOut();
        if (error) {
            console.error("Errore durante il logout:", error.message, error);
            return; // Termina la funzione se c'è un errore
        }
    
        // Continue with cleanup
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        setUser(null);
        setSession(null);
        setTimeout(() => {
            window.location.href = '/';
        }, 200);
    };
    
    

    // Verifica se il token è valido
    const isValidToken = () => {
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId');
        return typeof token === 'string' && token.length > 0 && userId;
    };

    // Ottieni l'ID dell'utente corrente
    const getCurrentUserId = () => {
        return localStorage.getItem('userId');
    };

    // Gestisci lo stato di caricamento
    if (loading) {
        return <div>Loading...</div>; // Oppure puoi usare una schermata di caricamento
    }

    return (
        <AuthContext.Provider value={{
            user,
            session,
            login,
            register,
            logout,
            isValidToken,
            getCurrentUserId,
            isAuthenticated: !!user && isValidToken()
        }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
