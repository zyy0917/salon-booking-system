import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from './firebase';

// Make sure these match your actual file names! 
// If your files are capitalized (Login.jsx), keep these capitalized.
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
      <nav style={{ padding: '20px', backgroundColor: '#333', display: 'flex', justifyContent: 'center', gap: '20px', alignItems: 'center' }}>
        
        {/* If NOT logged in, show Login link */}
        {!user && (
          <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>Login</Link>
        )}

        {/* If logged in, show Booking link */}
        {user && (
          <>
            <Link to="/book" style={{ color: 'white', textDecoration: 'none' }}>Book Appointment</Link>
            <Link to="/services" style={{ color: 'white', textDecoration: 'none', marginRight: '15px' }}>Service Menu</Link>
            
            {/* If logged in AND email matches admin, show Admin Panel */}
            {user.email === ADMIN_EMAIL && (
              <Link to="/admin" style={{ color: '#ff4d4d', textDecoration: 'none', fontWeight: 'bold' }}>Admin Panel</Link>
            )}

            {/* Show Logout button */}
            <div style={{ marginLeft: '20px', color: '#aaa', fontSize: '14px' }}>
              {user.email} 
              <button 
                onClick={handleLogout} 
                style={{ marginLeft: '10px', padding: '5px 10px', cursor: 'pointer', backgroundColor: '#555', color: 'white', border: 'none', borderRadius: '4px' }}
              >
                Logout
              </button>
            </div>
          </>
        )}
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