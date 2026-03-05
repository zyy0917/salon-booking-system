import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Star, Lock, Mail, User, Phone, Shield } from 'lucide-react';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';
import emailjs from '@emailjs/browser';

const EMAILJS_SERVICE_ID = 'service_xzjaqdi';
const EMAILJS_TEMPLATE_ID = 'template_xzl4ki9';
const EMAILJS_PUBLIC_KEY = 'Yhi9mti-9w_h7X2Xy';

function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

function getExpiryTime() {
  const now = new Date();
  now.setMinutes(now.getMinutes() + 5);
  return now.toLocaleTimeString();
}

export default function SignUp() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', password: '', confirmPassword: '',
  });
  const [otpInput, setOtpInput] = useState('');
  const [generatedOTP, setGeneratedOTP] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    setLoading(true);
    try {
      const otp = generateOTP();
      setGeneratedOTP(otp);

      // ✅ Matching exactly what the template expects
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          email: formData.email,      // {{email}} — To Email field
          passcode: otp,              // {{passcode}} — the OTP code
          time: getExpiryTime(),      // {{time}} — expiry time
        },
        EMAILJS_PUBLIC_KEY
      );

      setStep(2);
    } catch (err) {
      console.error('EmailJS error:', err);
      setError('Failed to send verification code. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleOTPSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (otpInput !== generatedOTP) {
      setError('Incorrect code. Please check your email and try again.');
      return;
    }

    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      const user = userCredential.user;
      await updateProfile(user, { displayName: formData.name });
      await setDoc(doc(db, 'users', user.uid), {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        role: 'client',
        createdAt: new Date(),
      });
      navigate('/');
    } catch (err) {
      switch (err.code) {
        case 'auth/email-already-in-use':
          setError('An account with this email already exists.');
          break;
        case 'auth/invalid-email':
          setError('Please enter a valid email address.');
          break;
        default:
          setError('Something went wrong. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    setError('');
    setLoading(true);
    const otp = generateOTP();
    setGeneratedOTP(otp);
    setOtpInput('');
    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          email: formData.email,
          passcode: otp,
          time: getExpiryTime(),
        },
        EMAILJS_PUBLIC_KEY
      );
    } catch {
      setError('Failed to resend code. Please try again.');
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

  const fields = [
    { id: 'name',            type: 'text',     placeholder: 'Enter your full name',    icon: <User style={iconStyle} />,  label: 'Full Name' },
    { id: 'email',           type: 'email',    placeholder: 'Enter your email',        icon: <Mail style={iconStyle} />,  label: 'Email' },
    { id: 'phone',           type: 'tel',      placeholder: 'Enter your phone number', icon: <Phone style={iconStyle} />, label: 'Phone Number' },
    { id: 'password',        type: 'password', placeholder: 'Create a password',       icon: <Lock style={iconStyle} />,  label: 'Password' },
    { id: 'confirmPassword', type: 'password', placeholder: 'Confirm your password',   icon: <Lock style={iconStyle} />,  label: 'Confirm Password' },
  ];

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
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '4px', marginBottom: '16px' }}>
            {[...Array(5)].map((_, i) => (
              <Star key={i} style={{ width: '22px', height: '22px', fill: '#D4735C', color: '#D4735C' }} />
            ))}
          </div>
          <h1 style={{ fontSize: '1.8rem', color: '#D4735C', fontWeight: '400', marginBottom: '8px', fontFamily: 'Georgia, serif' }}>
            {step === 1 ? 'Create Account' : 'Verify Your Email'}
          </h1>
          <p style={{ color: '#8D6E63', fontSize: '0.95rem' }}>
            {step === 1 ? 'Join The Five Star Salon' : `We sent a 6-digit code to ${formData.email}`}
          </p>
        </div>

        {error && (
          <div style={{ backgroundColor: '#FEE2E2', border: '1px solid #FCA5A5', borderRadius: '8px', padding: '12px 16px', marginBottom: '20px' }}>
            <p style={{ color: '#DC2626', fontSize: '0.875rem', margin: 0 }}>{error}</p>
          </div>
        )}

        {step === 1 && (
          <form onSubmit={handleFormSubmit}>
            {fields.map(({ id, type, placeholder, icon, label }) => (
              <div key={id} style={{ marginBottom: '18px' }}>
                <label htmlFor={id} style={labelStyle}>{label}</label>
                <div style={{ position: 'relative' }}>
                  {icon}
                  <input id={id} type={type} placeholder={placeholder}
                    value={formData[id]} onChange={handleChange} required style={inputStyle}
                    onFocus={e => e.target.style.borderColor = '#D4735C'}
                    onBlur={e => e.target.style.borderColor = 'rgba(212,115,92,0.3)'}
                  />
                </div>
              </div>
            ))}
            <button type="submit" disabled={loading} style={{
              width: '100%', padding: '14px',
              backgroundColor: loading ? '#E8A090' : '#D4735C',
              color: '#FFFFFF', border: 'none', borderRadius: '8px',
              fontSize: '1rem', fontWeight: '700',
              cursor: loading ? 'not-allowed' : 'pointer',
              fontFamily: 'sans-serif', marginTop: '8px',
            }}>
              {loading ? 'Sending verification code...' : 'Create Account'}
            </button>
            <div style={{ textAlign: 'center', marginTop: '24px' }}>
              <p style={{ color: '#8D6E63', fontSize: '0.9rem' }}>
                Already have an account?{' '}
                <Link to="/login" style={{ color: '#D4735C', fontWeight: '700', textDecoration: 'none' }}>Sign in</Link>
              </p>
            </div>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={handleOTPSubmit}>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '24px' }}>
              <div style={{
                width: '64px', height: '64px', borderRadius: '50%',
                backgroundColor: 'rgba(212,115,92,0.12)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <Shield style={{ width: '32px', height: '32px', color: '#D4735C' }} />
              </div>
            </div>
            <div style={{ marginBottom: '28px' }}>
              <label style={labelStyle}>Verification Code</label>
              <input type="text" placeholder="000000" value={otpInput}
                onChange={(e) => setOtpInput(e.target.value.replace(/\D/g, '').slice(0, 6))}
                required maxLength={6}
                style={{
                  ...inputStyle, paddingLeft: '16px', textAlign: 'center',
                  fontSize: '1.8rem', letterSpacing: '0.4em', fontWeight: '700',
                }}
                onFocus={e => e.target.style.borderColor = '#D4735C'}
                onBlur={e => e.target.style.borderColor = 'rgba(212,115,92,0.3)'}
              />
              <p style={{ color: '#8D6E63', fontSize: '0.8rem', marginTop: '8px', textAlign: 'center' }}>
                Check your Gmail inbox for the 6-digit code
              </p>
            </div>
            <button type="submit" disabled={loading} style={{
              width: '100%', padding: '14px', backgroundColor: loading ? '#E8A090' : '#D4735C',
              color: '#FFFFFF', border: 'none', borderRadius: '8px',
              fontSize: '1rem', fontWeight: '700',
              cursor: loading ? 'not-allowed' : 'pointer', fontFamily: 'sans-serif',
            }}>
              {loading ? 'Creating your account...' : 'Verify & Create Account'}
            </button>
            <div style={{ textAlign: 'center', marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <button type="button" onClick={handleResendOTP} disabled={loading} style={{
                background: 'none', border: 'none', cursor: 'pointer',
                color: '#D4735C', fontWeight: '700', fontSize: '0.9rem', fontFamily: 'sans-serif',
              }}>
                {loading ? 'Resending...' : '📧 Resend Code'}
              </button>
              <button type="button" onClick={() => { setStep(1); setError(''); setOtpInput(''); }} style={{
                background: 'none', border: 'none', cursor: 'pointer',
                color: '#8D6E63', fontSize: '0.9rem', fontFamily: 'sans-serif', textDecoration: 'underline',
              }}>
                ← Back to sign up
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}