import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Star, Lock, Mail } from 'lucide-react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/');
    } catch (err) {
      switch (err.code) {
        case 'auth/user-not-found':
        case 'auth/wrong-password':
        case 'auth/invalid-credential':
          setError('Invalid email or password. Please try again.');
          break;
        case 'auth/invalid-email':
          setError('Please enter a valid email address.');
          break;
        case 'auth/too-many-requests':
          setError('Too many attempts. Please try again later.');
          break;
        default:
          setError('Something went wrong. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    width: '100%', padding: '13px 16px 13px 44px',
    border: '1px solid rgba(212,115,92,0.3)', borderRadius: '8px',
    fontSize: '0.95rem', color: '#3E2723', outline: 'none',
    boxSizing: 'border-box', fontFamily: 'sans-serif', backgroundColor: '#FFFFFF',
  };

  const iconStyle = {
    position: 'absolute', left: '14px', top: '50%',
    transform: 'translateY(-50%)', width: '18px', height: '18px', color: '#D4735C',
  };

  const labelStyle = {
    display: 'block', color: '#3E2723', fontWeight: '600',
    fontSize: '0.9rem', marginBottom: '8px',
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #F5E6D3 0%, #EDD5BC 100%)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '48px 24px', fontFamily: 'sans-serif',
    }}>
      <div style={{
        width: '100%', maxWidth: '440px', backgroundColor: '#FFFFFF',
        borderRadius: '16px', padding: '48px 40px',
        boxShadow: '0 8px 40px rgba(62,39,35,0.12)',
        border: '1px solid rgba(212,115,92,0.15)',
      }}>

        {/* Stars + Title */}
        <div style={{ textAlign: 'center', marginBottom: '36px' }}>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '4px', marginBottom: '16px' }}>
            {[...Array(5)].map((_, i) => (
              <Star key={i} style={{ width: '22px', height: '22px', fill: '#D4735C', color: '#D4735C' }} />
            ))}
          </div>
          <h1 style={{ fontSize: '1.8rem', color: '#D4735C', fontWeight: '400', marginBottom: '8px', fontFamily: 'Georgia, serif' }}>
            Welcome Back
          </h1>
          <p style={{ color: '#8D6E63', fontSize: '0.95rem' }}>Sign in to your account</p>
        </div>

        {/* Error */}
        {error && (
          <div style={{ backgroundColor: '#FEE2E2', border: '1px solid #FCA5A5', borderRadius: '8px', padding: '12px 16px', marginBottom: '20px' }}>
            <p style={{ color: '#DC2626', fontSize: '0.875rem', margin: 0 }}>{error}</p>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '20px' }}>
            <label style={labelStyle}>Email</label>
            <div style={{ position: 'relative' }}>
              <Mail style={iconStyle} />
              <input type="email" placeholder="Enter your email" value={email}
                onChange={(e) => setEmail(e.target.value)} required style={inputStyle}
                onFocus={e => e.target.style.borderColor = '#D4735C'}
                onBlur={e => e.target.style.borderColor = 'rgba(212,115,92,0.3)'}
              />
            </div>
          </div>

          <div style={{ marginBottom: '28px' }}>
            <label style={labelStyle}>Password</label>
            <div style={{ position: 'relative' }}>
              <Lock style={iconStyle} />
              <input type="password" placeholder="Enter your password" value={password}
                onChange={(e) => setPassword(e.target.value)} required style={inputStyle}
                onFocus={e => e.target.style.borderColor = '#D4735C'}
                onBlur={e => e.target.style.borderColor = 'rgba(212,115,92,0.3)'}
              />
            </div>
          </div>

          <button type="submit" disabled={loading} style={{
            width: '100%', padding: '14px',
            backgroundColor: loading ? '#E8A090' : '#D4735C',
            color: '#FFFFFF', border: 'none', borderRadius: '8px',
            fontSize: '1rem', fontWeight: '700',
            cursor: loading ? 'not-allowed' : 'pointer', fontFamily: 'sans-serif',
          }}>
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        {/* Sign up link */}
        <div style={{ textAlign: 'center', marginTop: '24px' }}>
          <p style={{ color: '#8D6E63', fontSize: '0.9rem' }}>
            Don't have an account?{' '}
            <Link to="/signup" style={{ color: '#D4735C', fontWeight: '700', textDecoration: 'none' }}>
              Sign up
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
}