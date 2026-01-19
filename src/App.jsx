import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from './firebase';
import { FaUserCircle } from "react-icons/fa";

import Login from './pages/login';
import Booking from './pages/booking';
import AdminPanel from './pages/adminpanel';
import Services from './pages/services';
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Only this email will be able to see the Admin Panel.
  const ADMIN_EMAIL = "5starsalon.studio@gmail.com"; 

  // This effect runs once when the app starts to check if you are logged in
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // Logout function
  const handleLogout = async () => {
    await signOut(auth);
  };

  if (loading) return <div style={{textAlign: 'center', marginTop: '50px', color:'white'}}>Loading...</div>;

  return (
    <Router>
     <nav style={{ 
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        padding: '20px 50px', 
        backgroundColor: 'white',
        borderBottom: '1px solid #eaeaea'
      }}>
        {/* LOGO */}
        <div style={{ fontSize: '1.5rem', fontWeight: 'bold', letterSpacing: '3px' }}>
          <Link to="/" style={{ color: 'black', textDecoration: 'none' }}>LUXE.</Link>
        </div>

        {/* LINKS */}
        <div style={{ display: 'flex', gap: '40px', alignItems: 'center' }}>
          <Link to="/" style={{ color: 'black', textDecoration: 'none', textTransform: 'uppercase', fontSize: '14px', letterSpacing: '1px' }}>Home</Link>
          <Link to="/services" style={{ color: 'black', textDecoration: 'none', textTransform: 'uppercase', fontSize: '14px', letterSpacing: '1px' }}>Services</Link>
          
          {user && user.email === ADMIN_EMAIL && (
            <Link to="/admin" style={{ color: 'red', textDecoration: 'none', textTransform: 'uppercase', fontSize: '14px', letterSpacing: '1px' }}>Admin</Link>
          )}

          {/* ICONS / ACTIONS */}
          {user ? (
            <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
               <button onClick={handleLogout} style={{ border: 'none', background: 'transparent', textDecoration: 'underline', color: '#666' }}>Logout</button>
            </div>
          ) : (
            <Link to="/login" style={{ fontSize: '24px', color: 'black' }}>
              <FaUserCircle />
            </Link>
          )}

          <Link to="/book" style={{ 
            padding: '10px 25px', 
            backgroundColor: 'black', 
            color: 'white', 
            textDecoration: 'none', 
            fontSize: '14px',
            textTransform: 'uppercase'
          }}>
            Book
          </Link>
        </div>
      </nav>
      <Routes>
        {/* 
           ROUTE RULES:
           1. If you go to Login (/) but are already logged in -> Go to Booking.
           2. If you go to Booking (/book) but are NOT logged in -> Go back to Login.
           3. If you go to Admin (/admin) but are NOT the admin -> Go back to Login.
        */}
        <Route path="/" element={
        !user ? <Login /> : (
         user.email === ADMIN_EMAIL ? <Navigate to="/admin" /> : <Navigate to="/services" />
        )
        } />
        
        <Route path="/book" element={user ? <Booking /> : <Navigate to="/" />} />
        
        <Route path="/admin" element={
          user && user.email === ADMIN_EMAIL ? <AdminPanel /> : <Navigate to="/" />
        } />
        <Route path="/services" element={user ? <Services /> : <Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;