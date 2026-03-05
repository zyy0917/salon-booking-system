import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Star, CreditCard, Wallet, Building, MapPin, Phone, Mail, Clock, Calendar } from 'lucide-react';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';

// Payment is passed booking data via location state
// navigate('/payment', { state: { booking, bookingDocId } })

export default function Payment({ booking, bookingDocId, onBack }) {
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [isProcessing, setIsProcessing] = useState(false);
  const [success, setSuccess] = useState(false);

  if (!booking) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'sans-serif' }}>
        <div style={{ textAlign: 'center' }}>
          <h1 style={{ color: '#D4735C', marginBottom: '20px', fontFamily: 'Georgia, serif' }}>No Booking Found</h1>
          <Link to="/book" style={{ textDecoration: 'none' }}>
            <button style={{
              backgroundColor: '#D4735C', color: '#FFFFFF', border: 'none',
              padding: '12px 32px', borderRadius: '8px', fontSize: '1rem',
              fontWeight: '700', cursor: 'pointer',
            }}>
              Go to Booking
            </button>
          </Link>
        </div>
      </div>
    );
  }

  const handlePayment = async () => {
    setIsProcessing(true);
    try {
      // Update booking in Firestore with payment method + confirmed status
      if (bookingDocId) {
        await updateDoc(doc(db, 'bookings', bookingDocId), {
          status: 'confirmed',
          paymentMethod,
          paidAt: new Date(),
        });
      }
      setSuccess(true);
    } catch (err) {
      console.error('Payment error:', err);
    } finally {
      setIsProcessing(false);
    }
  };

  const paymentOptions = [
    { value: 'cash',  icon: <Wallet style={{ width: '24px', height: '24px', color: '#D4735C' }} />,   label: 'Cash Payment',  desc: 'Pay at the salon on your appointment date' },
    { value: 'gcash', icon: <CreditCard style={{ width: '24px', height: '24px', color: '#D4735C' }} />, label: 'GCash',         desc: 'Pay via GCash — 09XX XXX XXXX' },
    { value: 'bank',  icon: <Building style={{ width: '24px', height: '24px', color: '#D4735C' }} />,  label: 'Bank Transfer', desc: 'BDO — Account No. 1234 5678 9012' },
  ];

  // ── SUCCESS SCREEN ───────────────────────────────────────
  if (success) {
    return (
      <div style={{
        minHeight: '100vh', background: 'linear-gradient(180deg, #F5E6D3 0%, #EDD5BC 100%)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '48px 24px', fontFamily: 'sans-serif',
      }}>
        <div style={{
          backgroundColor: '#FFFFFF', borderRadius: '16px', padding: '56px 48px',
          textAlign: 'center', maxWidth: '500px', width: '100%',
          boxShadow: '0 8px 40px rgba(62,39,35,0.12)',
          border: '1px solid rgba(212,115,92,0.15)',
        }}>
          <div style={{
            width: '72px', height: '72px', borderRadius: '50%',
            backgroundColor: 'rgba(212,115,92,0.12)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 24px', fontSize: '2rem',
          }}>✓</div>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '4px', marginBottom: '16px' }}>
            {[...Array(5)].map((_, i) => (
              <Star key={i} style={{ width: '20px', height: '20px', fill: '#D4735C', color: '#D4735C' }} />
            ))}
          </div>

          <h1 style={{ fontSize: '1.8rem', color: '#D4735C', fontWeight: '400', marginBottom: '8px', fontFamily: 'Georgia, serif' }}>
            Booking Confirmed!
          </h1>
          <p style={{ color: '#8D6E63', marginBottom: '24px' }}>
            Your appointment has been successfully booked and confirmed.
          </p>

          {/* Summary */}
          <div style={{ backgroundColor: '#FFF8F0', borderRadius: '10px', padding: '20px', marginBottom: '24px', textAlign: 'left' }}>
            {/* Services */}
            {booking.services?.map(s => (
              <div key={s.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ color: '#5D4037', fontSize: '0.875rem' }}>{s.name}</span>
                <span style={{ color: '#D4735C', fontWeight: '600', fontSize: '0.875rem' }}>₱{s.price.toLocaleString()}</span>
              </div>
            ))}
            <div style={{ borderTop: '1px solid #F5E6D3', paddingTop: '12px', marginTop: '8px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#8D6E63', fontSize: '0.875rem' }}>Date & Time</span>
                <span style={{ color: '#3E2723', fontWeight: '600', fontSize: '0.875rem' }}>{booking.date} · {booking.time}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#8D6E63', fontSize: '0.875rem' }}>Payment</span>
                <span style={{ color: '#3E2723', fontWeight: '600', fontSize: '0.875rem', textTransform: 'capitalize' }}>{paymentMethod}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '4px' }}>
                <span style={{ color: '#3E2723', fontWeight: '700' }}>Total</span>
                <span style={{ color: '#D4735C', fontWeight: '700', fontSize: '1.2rem' }}>₱{booking.totalPrice?.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {paymentMethod !== 'cash' && (
            <div style={{ backgroundColor: '#FEF3C7', border: '1px solid #FCD34D', borderRadius: '8px', padding: '12px 16px', marginBottom: '24px' }}>
              <p style={{ color: '#92400E', fontSize: '0.875rem', margin: 0 }}>
                📋 Please bring your payment confirmation when you visit the salon.
              </p>
            </div>
          )}

          <p style={{ color: '#8D6E63', fontSize: '0.875rem', marginBottom: '28px' }}>
            Please arrive 10 minutes early. We'll see you soon! 💆‍♀️
          </p>

          <Link to="/" style={{ textDecoration: 'none' }}>
            <button style={{
              backgroundColor: '#D4735C', color: '#FFFFFF', border: 'none',
              padding: '14px 40px', borderRadius: '8px', fontSize: '1rem',
              fontWeight: '700', cursor: 'pointer', fontFamily: 'sans-serif',
            }}>
              Back to Home
            </button>
          </Link>
        </div>
      </div>
    );
  }

  // ── PAYMENT FORM ─────────────────────────────────────────
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#FDFAF7', fontFamily: 'sans-serif' }}>

      {/* Header */}
      <section style={{ background: 'linear-gradient(180deg, #F5E6D3 0%, #EDD5BC 100%)', padding: '56px 24px', textAlign: 'center' }}>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '4px', marginBottom: '16px' }}>
          {[...Array(5)].map((_, i) => (
            <Star key={i} style={{ width: '24px', height: '24px', fill: '#D4735C', color: '#D4735C', opacity: 0.7 }} />
          ))}
        </div>
        <h1 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', color: '#D4735C', fontWeight: '400', marginBottom: '10px', fontFamily: 'Georgia, serif' }}>
          Payment
        </h1>
        <p style={{ color: '#8D6E63', fontSize: '1rem' }}>Complete your booking</p>
      </section>

      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '48px 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 2fr) minmax(0, 1fr)', gap: '24px', alignItems: 'start' }}>

          {/* ── PAYMENT METHOD ── */}
          <div style={{
            backgroundColor: '#FFFFFF', borderRadius: '16px', padding: '40px',
            border: '1px solid rgba(212,115,92,0.2)',
            boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
          }}>
            <h2 style={{ fontSize: '1.3rem', color: '#3E2723', fontWeight: '700', marginBottom: '28px' }}>
              Select Payment Method
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '28px' }}>
              {paymentOptions.map(({ value, icon, label, desc }) => (
                <div
                  key={value}
                  onClick={() => setPaymentMethod(value)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '16px',
                    padding: '18px 20px', borderRadius: '10px', cursor: 'pointer',
                    border: `2px solid ${paymentMethod === value ? '#D4735C' : 'rgba(212,115,92,0.2)'}`,
                    backgroundColor: paymentMethod === value ? '#FFF8F0' : '#FFFFFF',
                    transition: 'all 0.2s',
                  }}
                >
                  {/* Radio circle */}
                  <div style={{
                    width: '20px', height: '20px', borderRadius: '50%', flexShrink: 0,
                    border: `2px solid ${paymentMethod === value ? '#D4735C' : '#BCAAA4'}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    {paymentMethod === value && (
                      <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#D4735C' }} />
                    )}
                  </div>
                  {icon}
                  <div>
                    <p style={{ color: '#3E2723', fontWeight: '600', fontSize: '0.95rem', margin: 0 }}>{label}</p>
                    <p style={{ color: '#8D6E63', fontSize: '0.82rem', margin: '3px 0 0' }}>{desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Note */}
            <div style={{
              backgroundColor: '#FFF8F0', border: '1px solid rgba(212,115,92,0.25)',
              borderRadius: '10px', padding: '16px 20px', marginBottom: '28px',
            }}>
              <p style={{ color: '#5D4037', fontSize: '0.875rem', margin: 0, lineHeight: '1.6' }}>
                <strong style={{ color: '#D4735C' }}>Note: </strong>
                For online payments (GCash / Bank Transfer), please bring your payment confirmation when you visit the salon.
                Cash payment can be made directly at the salon on your appointment date.
              </p>
            </div>

            <button
              onClick={handlePayment}
              disabled={isProcessing}
              style={{
                width: '100%', padding: '15px',
                backgroundColor: isProcessing ? '#E8A090' : '#D4735C',
                color: '#FFFFFF', border: 'none', borderRadius: '8px',
                fontSize: '1rem', fontWeight: '700',
                cursor: isProcessing ? 'not-allowed' : 'pointer', fontFamily: 'sans-serif',
              }}
            >
              {isProcessing ? 'Processing...' : 'Confirm Booking'}
            </button>

            {onBack && (
              <button
                onClick={onBack}
                style={{
                  width: '100%', padding: '13px', marginTop: '12px',
                  backgroundColor: 'transparent', color: '#D4735C',
                  border: '2px solid #D4735C', borderRadius: '8px',
                  fontSize: '1rem', fontWeight: '600',
                  cursor: 'pointer', fontFamily: 'sans-serif',
                }}
              >
                ← Back to Booking
              </button>
            )}
          </div>

          {/* ── ORDER SUMMARY ── */}
          <div style={{
            backgroundColor: '#FFFFFF', borderRadius: '16px', padding: '28px',
            border: '1px solid rgba(212,115,92,0.2)',
            boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
            position: 'sticky', top: '88px',
          }}>
            <h2 style={{ fontSize: '1.1rem', color: '#D4735C', fontWeight: '700', marginBottom: '20px' }}>
              Order Summary
            </h2>

            {/* Services */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '16px' }}>
              {booking.services?.map(s => (
                <div key={s.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <p style={{ color: '#3E2723', fontSize: '0.875rem', fontWeight: '600', margin: 0 }}>{s.name}</p>
                    <p style={{ color: '#8D6E63', fontSize: '0.75rem', margin: '2px 0 0' }}>{s.duration}</p>
                  </div>
                  <span style={{ color: '#D4735C', fontWeight: '600', fontSize: '0.875rem' }}>₱{s.price.toLocaleString()}</span>
                </div>
              ))}
            </div>

            {/* Date / Time / Duration */}
            <div style={{ borderTop: '1px solid #F5E6D3', paddingTop: '14px', marginBottom: '14px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <Calendar style={{ width: '15px', height: '15px', color: '#D4735C', flexShrink: 0 }} />
                <span style={{ color: '#5D4037', fontSize: '0.85rem' }}>{booking.date}</span>
              </div>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <Clock style={{ width: '15px', height: '15px', color: '#D4735C', flexShrink: 0 }} />
                <span style={{ color: '#5D4037', fontSize: '0.85rem' }}>{booking.time}</span>
              </div>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <Clock style={{ width: '15px', height: '15px', color: '#D4735C', flexShrink: 0 }} />
                <span style={{ color: '#5D4037', fontSize: '0.85rem' }}>Total: {booking.totalDuration}</span>
              </div>
            </div>

            {/* Total */}
            <div style={{ borderTop: '1px solid #F5E6D3', paddingTop: '14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ color: '#3E2723', fontWeight: '700' }}>Total</span>
              <span style={{ color: '#D4735C', fontSize: '1.5rem', fontWeight: '700' }}>
                ₱{booking.totalPrice?.toLocaleString()}
              </span>
            </div>
          </div>

        </div>
      </div>

      {/* ── FOOTER ── */}
      <footer style={{ marginTop: '64px' }}>
        <div style={{
          backgroundColor: '#2C1810', padding: '56px 48px 40px',
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '48px',
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
              <div style={{ display: 'flex', gap: '2px' }}>
                {[...Array(5)].map((_, i) => (
                  <Star key={i} style={{ width: '15px', height: '15px', fill: '#D4735C', color: '#D4735C' }} />
                ))}
              </div>
              <span style={{ color: '#D4735C', fontFamily: 'Georgia, serif', fontSize: '1rem' }}>The Five Star Salon</span>
            </div>
            <p style={{ color: '#BCAAA4', fontSize: '0.875rem', lineHeight: '1.7', maxWidth: '300px' }}>
              Experience luxury beauty services with our professional team in a relaxing, elegant environment.
            </p>
          </div>
          <div>
            <h4 style={{ color: '#D4735C', fontSize: '1rem', fontWeight: '700', marginBottom: '24px' }}>Quick Links</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {[{ label: 'Home', to: '/' }, { label: 'About', to: '/about' }, { label: 'Services', to: '/services' }, { label: 'Login', to: '/login' }].map(({ label, to }) => (
                <Link key={label} to={to} style={{ color: '#BCAAA4', textDecoration: 'none', fontSize: '0.9rem' }}>{label}</Link>
              ))}
            </div>
          </div>
          <div>
            <h4 style={{ color: '#D4735C', fontSize: '1rem', fontWeight: '700', marginBottom: '24px' }}>Contact Us</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <MapPin style={{ width: '18px', height: '18px', color: '#D4735C', flexShrink: 0, marginTop: '2px' }} />
                <span style={{ color: '#BCAAA4', fontSize: '0.875rem', lineHeight: '1.6' }}>123 Beauty Street, Manila, Philippines</span>
              </div>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <Phone style={{ width: '18px', height: '18px', color: '#D4735C', flexShrink: 0 }} />
                <span style={{ color: '#BCAAA4', fontSize: '0.875rem' }}>+63 912 345 6789</span>
              </div>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <Mail style={{ width: '18px', height: '18px', color: '#D4735C', flexShrink: 0 }} />
                <span style={{ color: '#BCAAA4', fontSize: '0.875rem' }}>info@fivestarsalon.com</span>
              </div>
            </div>
          </div>
        </div>
        <div style={{ backgroundColor: '#2C1810', borderTop: '1px solid rgba(212,115,92,0.2)', padding: '20px 48px', textAlign: 'center' }}>
          <p style={{ color: '#8D6E63', fontSize: '0.85rem', margin: 0 }}>© 2026 The Five Star Salon. All rights reserved.</p>
        </div>
      </footer>

    </div>
  );
}