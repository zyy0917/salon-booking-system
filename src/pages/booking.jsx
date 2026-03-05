import { useState } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { Star, Calendar as CalendarIcon, Clock, MessageSquare, MapPin, Phone, Mail, Plus, X } from 'lucide-react';
import { collection, addDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';
import Payment from './Payment';

const allServices = [
  { id: '1',  category: 'Hair Services',          name: 'Haircut (Women)',      price: 350,  duration: '45 min' },
  { id: '2',  category: 'Hair Services',          name: 'Haircut (Men)',        price: 250,  duration: '30 min' },
  { id: '3',  category: 'Hair Services',          name: 'Haircut (Kids)',       price: 200,  duration: '30 min' },
  { id: '4',  category: 'Hair Services',          name: 'Balayage',             price: 4500, duration: '180 min' },
  { id: '5',  category: 'Hair Services',          name: 'Keratin Treatment',    price: 3500, duration: '120 min' },
  { id: '6',  category: 'Hair Services',          name: 'Hair Rebonding',       price: 2500, duration: '180 min' },
  { id: '7',  category: 'Nail Services',          name: 'Gel Manicure',         price: 800,  duration: '45 min' },
  { id: '8',  category: 'Nail Services',          name: 'Classic Pedicure',     price: 600,  duration: '45 min' },
  { id: '9',  category: 'Nail Services',          name: 'Nail Art',             price: 500,  duration: '60 min' },
  { id: '10', category: 'Facial & Skin Services', name: 'Rejuvenating Facial',  price: 2000, duration: '60 min' },
  { id: '11', category: 'Facial & Skin Services', name: 'Acne Treatment',       price: 1500, duration: '60 min' },
  { id: '12', category: 'Facial & Skin Services', name: 'Anti-Aging Facial',    price: 2500, duration: '75 min' },
  { id: '13', category: 'Other Beauty Services',  name: 'Swedish Massage',      price: 1200, duration: '60 min' },
  { id: '14', category: 'Other Beauty Services',  name: 'Eyebrow Threading',    price: 200,  duration: '15 min' },
  { id: '15', category: 'Other Beauty Services',  name: 'Eyelash Extension',    price: 1800, duration: '90 min' },
];

const timeSlots = [
  '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
  '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM',
  '05:00 PM', '06:00 PM', '07:00 PM',
];

export default function Booking() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const serviceId = searchParams.get('service');

  const [selectedServices, setSelectedServices] = useState(serviceId ? [serviceId] : []);
  const [currentPick, setCurrentPick] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Payment step state
  const [showPayment, setShowPayment] = useState(false);
  const [bookingData, setBookingData] = useState(null);
  const [bookingDocId, setBookingDocId] = useState(null);

  const today = new Date().toISOString().split('T')[0];
  const selectedServiceObjects = selectedServices.map(id => allServices.find(s => s.id === id)).filter(Boolean);
  const totalPrice = selectedServiceObjects.reduce((sum, s) => sum + s.price, 0);
  const totalMins = selectedServiceObjects.reduce((sum, s) => sum + parseInt(s.duration), 0);
  const availableToAdd = allServices.filter(s => !selectedServices.includes(s.id));

  const handleAddService = () => {
    if (!currentPick || selectedServices.includes(currentPick)) return;
    setSelectedServices([...selectedServices, currentPick]);
    setCurrentPick('');
  };

  const handleRemoveService = (id) => setSelectedServices(selectedServices.filter(s => s !== id));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (selectedServices.length === 0) { setError('Please select at least one service.'); return; }
    if (!date || !time) { setError('Please fill in all required fields.'); return; }

    const user = auth.currentUser;
    if (!user) { navigate('/login'); return; }

    setLoading(true);
    try {
      const bookingPayload = {
        userId: user.uid,
        userEmail: user.email,
        userName: user.displayName || user.email,
        services: selectedServiceObjects.map(s => ({
          id: s.id, name: s.name, category: s.category, price: s.price, duration: s.duration,
        })),
        totalPrice,
        totalDuration: `${totalMins} min`,
        date,
        time,
        specialRequests,
        status: 'pending',
        createdAt: new Date(),
      };

      // Save to Firestore first
      const docRef = await addDoc(collection(db, 'bookings'), bookingPayload);
      setBookingDocId(docRef.id);
      setBookingData(bookingPayload);

      // Go to payment step
      setShowPayment(true);
      window.scrollTo(0, 0);
    } catch (err) {
      console.error('Booking error:', err);
      setError('Failed to save booking. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // ── SHOW PAYMENT STEP ────────────────────────────────────
  if (showPayment && bookingData) {
    return (
      <Payment
        booking={bookingData}
        bookingDocId={bookingDocId}
        onBack={() => { setShowPayment(false); window.scrollTo(0, 0); }}
      />
    );
  }

  const inputStyle = {
    width: '100%', padding: '12px 16px',
    border: '1px solid rgba(212,115,92,0.3)', borderRadius: '8px',
    fontSize: '0.95rem', color: '#3E2723', outline: 'none',
    boxSizing: 'border-box', fontFamily: 'sans-serif', backgroundColor: '#FFFFFF',
  };

  const labelStyle = {
    display: 'block', color: '#3E2723',
    fontWeight: '600', fontSize: '0.9rem', marginBottom: '8px',
  };

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
          Book Appointment
        </h1>
        <p style={{ color: '#8D6E63', fontSize: '1rem' }}>Schedule your beauty treatment</p>

        {/* Step indicator */}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '12px', marginTop: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: '#D4735C', color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.85rem', fontWeight: '700' }}>1</div>
            <span style={{ color: '#D4735C', fontWeight: '700', fontSize: '0.9rem' }}>Booking Details</span>
          </div>
          <div style={{ width: '40px', height: '2px', backgroundColor: 'rgba(212,115,92,0.3)' }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: 'rgba(212,115,92,0.2)', color: '#D4735C', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.85rem', fontWeight: '700' }}>2</div>
            <span style={{ color: '#8D6E63', fontSize: '0.9rem' }}>Payment</span>
          </div>
        </div>
      </section>

      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '48px 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 2fr) minmax(0, 1fr)', gap: '24px', alignItems: 'start' }}>

          {/* ── FORM ── */}
          <div style={{
            backgroundColor: '#FFFFFF', borderRadius: '16px', padding: '40px',
            border: '1px solid rgba(212,115,92,0.2)',
            boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
          }}>
            <h2 style={{ fontSize: '1.3rem', color: '#3E2723', fontWeight: '700', marginBottom: '28px' }}>
              Appointment Details
            </h2>

            <form onSubmit={handleSubmit}>
              {error && (
                <div style={{ backgroundColor: '#FEE2E2', border: '1px solid #FCA5A5', borderRadius: '8px', padding: '12px 16px', marginBottom: '20px' }}>
                  <p style={{ color: '#DC2626', fontSize: '0.875rem', margin: 0 }}>{error}</p>
                </div>
              )}

              {/* Services */}
              <div style={{ marginBottom: '20px' }}>
                <label style={labelStyle}>Selected Services *</label>
                {selectedServiceObjects.length > 0 && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '12px' }}>
                    {selectedServiceObjects.map(s => (
                      <div key={s.id} style={{
                        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                        backgroundColor: '#FFF8F0', border: '1px solid rgba(212,115,92,0.25)',
                        borderRadius: '8px', padding: '12px 16px',
                      }}>
                        <div>
                          <p style={{ color: '#3E2723', fontWeight: '600', fontSize: '0.9rem', margin: 0 }}>{s.name}</p>
                          <p style={{ color: '#8D6E63', fontSize: '0.78rem', margin: '2px 0 0' }}>₱{s.price.toLocaleString()} · {s.duration}</p>
                        </div>
                        <button type="button" onClick={() => handleRemoveService(s.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#D4735C', padding: '4px' }}>
                          <X style={{ width: '18px', height: '18px' }} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
                {availableToAdd.length > 0 && (
                  <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                    <select value={currentPick} onChange={(e) => setCurrentPick(e.target.value)} style={{ ...inputStyle, flex: 1 }}
                      onFocus={e => e.target.style.borderColor = '#D4735C'}
                      onBlur={e => e.target.style.borderColor = 'rgba(212,115,92,0.3)'}
                    >
                      <option value="">Add a service...</option>
                      {availableToAdd.map(s => (
                        <option key={s.id} value={s.id}>{s.name} — ₱{s.price.toLocaleString()}</option>
                      ))}
                    </select>
                    <button type="button" onClick={handleAddService} disabled={!currentPick} style={{
                      backgroundColor: currentPick ? '#D4735C' : '#E8C4B8', color: '#FFFFFF',
                      border: 'none', borderRadius: '8px', padding: '12px 16px',
                      cursor: currentPick ? 'pointer' : 'not-allowed',
                      display: 'flex', alignItems: 'center', gap: '6px',
                      fontFamily: 'sans-serif', fontWeight: '700', fontSize: '0.9rem', whiteSpace: 'nowrap',
                    }}>
                      <Plus style={{ width: '16px', height: '16px' }} /> Add
                    </button>
                  </div>
                )}
              </div>

              {/* Date */}
              <div style={{ marginBottom: '20px' }}>
                <label style={labelStyle}>Select Date *</label>
                <div style={{ position: 'relative' }}>
                  <CalendarIcon style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', width: '18px', height: '18px', color: '#D4735C' }} />
                  <input type="date" value={date} min={today} onChange={(e) => setDate(e.target.value)} required
                    style={{ ...inputStyle, paddingLeft: '44px' }}
                    onFocus={e => e.target.style.borderColor = '#D4735C'}
                    onBlur={e => e.target.style.borderColor = 'rgba(212,115,92,0.3)'}
                  />
                </div>
              </div>

              {/* Time */}
              <div style={{ marginBottom: '20px' }}>
                <label style={labelStyle}>Select Time *</label>
                <div style={{ position: 'relative' }}>
                  <Clock style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', width: '18px', height: '18px', color: '#D4735C' }} />
                  <select value={time} onChange={(e) => setTime(e.target.value)} required
                    style={{ ...inputStyle, paddingLeft: '44px' }}
                    onFocus={e => e.target.style.borderColor = '#D4735C'}
                    onBlur={e => e.target.style.borderColor = 'rgba(212,115,92,0.3)'}
                  >
                    <option value="">Choose a time slot</option>
                    {timeSlots.map(slot => <option key={slot} value={slot}>{slot}</option>)}
                  </select>
                </div>
              </div>

              {/* Special Requests */}
              <div style={{ marginBottom: '28px' }}>
                <label style={labelStyle}>
                  <MessageSquare style={{ width: '16px', height: '16px', display: 'inline', marginRight: '6px', verticalAlign: 'middle' }} />
                  Special Requests (Optional)
                </label>
                <textarea placeholder="Any special requests or notes..." value={specialRequests}
                  onChange={(e) => setSpecialRequests(e.target.value)} rows={4}
                  style={{ ...inputStyle, resize: 'vertical', minHeight: '100px' }}
                  onFocus={e => e.target.style.borderColor = '#D4735C'}
                  onBlur={e => e.target.style.borderColor = 'rgba(212,115,92,0.3)'}
                />
              </div>

              <button type="submit" disabled={loading} style={{
                width: '100%', padding: '15px',
                backgroundColor: loading ? '#E8A090' : '#D4735C',
                color: '#FFFFFF', border: 'none', borderRadius: '8px',
                fontSize: '1rem', fontWeight: '700',
                cursor: loading ? 'not-allowed' : 'pointer', fontFamily: 'sans-serif',
              }}>
                {loading ? 'Saving...' : 'Continue to Payment →'}
              </button>
            </form>
          </div>

          {/* ── BOOKING SUMMARY ── */}
          <div style={{
            backgroundColor: '#FFFFFF', borderRadius: '16px', padding: '28px',
            border: '1px solid rgba(212,115,92,0.2)',
            boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
            position: 'sticky', top: '88px',
          }}>
            <h2 style={{ fontSize: '1.1rem', color: '#D4735C', fontWeight: '700', marginBottom: '20px' }}>Booking Summary</h2>

            {selectedServiceObjects.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {selectedServiceObjects.map(s => (
                  <div key={s.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                      <p style={{ color: '#3E2723', fontSize: '0.875rem', fontWeight: '600', margin: 0 }}>{s.name}</p>
                      <p style={{ color: '#8D6E63', fontSize: '0.75rem', margin: '2px 0 0' }}>{s.duration}</p>
                    </div>
                    <span style={{ color: '#D4735C', fontWeight: '600', fontSize: '0.875rem' }}>₱{s.price.toLocaleString()}</span>
                  </div>
                ))}
                <div style={{ borderTop: '1px solid #F5E6D3', paddingTop: '12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {date && (
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                      <CalendarIcon style={{ width: '14px', height: '14px', color: '#D4735C', flexShrink: 0 }} />
                      <span style={{ color: '#5D4037', fontSize: '0.85rem' }}>{date}</span>
                    </div>
                  )}
                  {time && (
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                      <Clock style={{ width: '14px', height: '14px', color: '#D4735C', flexShrink: 0 }} />
                      <span style={{ color: '#5D4037', fontSize: '0.85rem' }}>{time}</span>
                    </div>
                  )}
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <Clock style={{ width: '14px', height: '14px', color: '#D4735C', flexShrink: 0 }} />
                    <span style={{ color: '#5D4037', fontSize: '0.85rem' }}>Total: {totalMins} min</span>
                  </div>
                </div>
                <div style={{ borderTop: '1px solid #F5E6D3', paddingTop: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: '#3E2723', fontWeight: '700' }}>Total</span>
                  <span style={{ color: '#D4735C', fontSize: '1.4rem', fontWeight: '700' }}>₱{totalPrice.toLocaleString()}</span>
                </div>
              </div>
            ) : (
              <p style={{ color: '#8D6E63', fontSize: '0.875rem' }}>Add a service to see your summary</p>
            )}
          </div>

        </div>
      </div>

      {/* ── FOOTER ── */}
      <footer style={{ marginTop: '64px' }}>
        <div style={{ backgroundColor: '#2C1810', padding: '56px 48px 40px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '48px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
              <div style={{ display: 'flex', gap: '2px' }}>
                {[...Array(5)].map((_, i) => (<Star key={i} style={{ width: '15px', height: '15px', fill: '#D4735C', color: '#D4735C' }} />))}
              </div>
              <span style={{ color: '#D4735C', fontFamily: 'Georgia, serif', fontSize: '1rem' }}>The Five Star Salon</span>
            </div>
            <p style={{ color: '#BCAAA4', fontSize: '0.875rem', lineHeight: '1.7', maxWidth: '300px' }}>Experience luxury beauty services with our professional team in a relaxing, elegant environment.</p>
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