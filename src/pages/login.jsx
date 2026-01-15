import { useState } from 'react';
import { auth } from '../firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  
  // State for inputs
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false); // Toggle between Login and Sign Up
  const [error, setError] = useState("");

  const handleAuth = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors

    try {
      if (isRegistering) {
        // --- SIGN UP LOGIC ---
        await createUserWithEmailAndPassword(auth, email, password);
        alert("Account created successfully! You are now logged in.");
      } else {
        // --- LOGIN LOGIC ---
        await signInWithEmailAndPassword(auth, email, password);
      }
      
      // Redirect after successful login/signup
      navigate('/book');
      
    } catch (err) {
      // Handle Errors (like wrong password, or email already in use)
      console.error(err);
      setError(err.message.replace("Firebase: ", ""));
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', textAlign: 'center', color: 'white' }}>
      <h1>{isRegistering ? "Create Account" : "Salon Login"}</h1>
      
      <form onSubmit={handleAuth} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        
        <input 
          type="email" 
          placeholder="Email Address" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required 
          style={{ padding: '10px' }}
        />
        
        <input 
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          required 
          style={{ padding: '10px' }}
        />

        <button type="submit" style={{ padding: '12px', backgroundColor: '#28a745', color: 'white', border: 'none', cursor: 'pointer', fontSize: '16px' }}>
          {isRegistering ? "Sign Up" : "Login"}
        </button>
      </form>

      {error && <p style={{ color: '#ff4d4d', marginTop: '10px' }}>{error}</p>}

      <p style={{ marginTop: '20px' }}>
        {isRegistering ? "Already have an account? " : "New to the Salon? "}
        <button 
          onClick={() => setIsRegistering(!isRegistering)} 
          style={{ background: 'none', border: 'none', color: '#4285F4', textDecoration: 'underline', cursor: 'pointer', fontSize: '15px' }}
        >
          {isRegistering ? "Login here" : "Create an account"}
        </button>
      </p>
    </div>
  );
}

export default Login;