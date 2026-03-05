import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from './firebase';
import { Star } from 'lucide-react';

import Home from './pages/home';
import About from './pages/about';
import Login from './pages/login';
import SignUp from './pages/signup';
import Booking from './pages/booking';
import AdminPanel from './pages/adminpanel';
import Services from './pages/services';
import ServiceDetails from './pages/ServiceDetails';
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const ADMIN_EMAIL = "5starsalon.studio@gmail.com";

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
  };

  if (loading) return (
    <div style={{ textAlign: 'center', marginTop: '50px', color: '#D4735C', fontFamily: 'sans-serif' }}>
      Loading...
    </div>
  );

  const navLinkStyle = {
    color: '#5D4037', textDecoration: 'none',
    fontSize: '0.95rem', fontFamily: 'sans-serif', fontWeight: '500',
  };

  return (
    <Router>
      {/* ── NAVBAR ── */}
      <nav style={{
        position: 'sticky', top: 0, zIndex: 1000,
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '16px 48px', backgroundColor: '#FFFFFF',
        borderBottom: '1px solid #F0E0D0',
        boxShadow: '0 1px 8px rgba(212,115,92,0.08)',
      }}>
        <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ display: 'flex', gap: '2px' }}>
            {[...Array(5)].map((_, i) => (
              <Star key={i} style={{ width: '16px', height: '16px', fill: '#DCB91D', color: '#DCB91D' }} />
            ))}
          </div>
          <span style={{ color: '#DCB91D', fontFamily: 'Georgia, serif', fontSize: '1.1rem', fontWeight: '400' }}>
            The Five Star Salon
          </span>
        </Link>

        <div style={{ display: 'flex', alignItems: 'center', gap: '36px' }}>
          <Link to="/" style={navLinkStyle}>Home</Link>
          <Link to="/about" style={navLinkStyle}>About</Link>
          <Link to="/services" style={navLinkStyle}>Services</Link>

          {user && user.email === ADMIN_EMAIL && (
            <Link to="/admin" style={{ ...navLinkStyle, color: '#C0614D', fontWeight: '700' }}>Admin</Link>
          )}

          {user ? (
            <button onClick={handleLogout} style={{
              background: 'none', border: 'none', cursor: 'pointer',
              color: '#5D4037', fontSize: '0.95rem', fontFamily: 'sans-serif',
              fontWeight: '500', textDecoration: 'underline',
            }}>
              Logout
            </button>
          ) : (
            <Link to="/login" style={navLinkStyle}>Login</Link>
          )}

          <Link to="/book" style={{ textDecoration: 'none' }}>
            <button style={{
              backgroundColor: '#DCB91D', color: '#FFFFFF', border: 'none',
              padding: '10px 24px', borderRadius: '6px', fontSize: '0.95rem',
              fontWeight: '700', cursor: 'pointer', fontFamily: 'sans-serif',
            }}>
              Book Now
            </button>
          </Link>
        </div>
      </nav>

      {/* ── ROUTES ── */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/services/:serviceId" element={<ServiceDetails />} />

        <Route path="/login" element={
          !user ? <Login /> : (
            user.email === ADMIN_EMAIL ? <Navigate to="/admin" /> : <Navigate to="/" />
          )
        } />

        <Route path="/signup" element={!user ? <SignUp /> : <Navigate to="/" />} />
        <Route path="/book" element={user ? <Booking /> : <Navigate to="/login" />} />
        <Route path="/admin" element={
          user && user.email === ADMIN_EMAIL ? <AdminPanel /> : <Navigate to="/" />
        } />
      </Routes>
    </Router>
  );
}

export default App;