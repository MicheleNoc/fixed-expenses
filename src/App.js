
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import HomePage from './pages/Homepage.jsx';
//import Login from './pages/Login.jsx';
//import Register from './pages/Register.jsx';
import { AuthProvider } from './servers/AuthContext.js';

function App() {
  return (
<Router>
      {/* Avvolgi il provider di autenticazione sotto il Router */}
      <AuthProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          {/* <Route path="/login" element={<Login />} />*/}
          {/* <Route path="/register" element={<Register />} /> */}
          {/* Aggiungi una route di fallback per percorsi non trovati */}
        </Routes>
        <Footer />
      </AuthProvider>
    </Router>
  );
}

export default App;
