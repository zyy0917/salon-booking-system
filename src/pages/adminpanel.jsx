import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, Calendar, Clock, Users, CheckCircle, XCircle, AlertCircle, Search, MapPin, Phone, Mail, RefreshCw } from 'lucide-react';
import { collection, getDocs, doc, updateDoc, orderBy, query } from 'firebase/firestore';
import { db } from '../firebase';

const statusColors = {
  pending:   { bg: '#FEF3C7', color: '#92400E', border: '#FCD34D' },
  confirmed: { bg: '#D1FAE5', color: '#065F46', border: '#6EE7B7' },
  completed: { bg: '#DBEAFE', color: '#1E40AF', border: '#93C5FD' },
  cancelled: { bg: '#FEE2E2', color: '#991B1B', border: '#FCA5A5' },
};

export default function AdminPanel() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [updating, setUpdating] = useState(null);

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const q = query(collection(db, 'bookings'), orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
      setBookings(data);
    } catch (err) {
      console.error('Error fetching bookings:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchBookings(); }, []);

  const handleStatusChange = async (bookingId, newStatus) => {
    setUpdating(bookingId);
    try {
      await updateDoc(doc(db, 'bookings', bookingId), { status: newStatus });
      setBookings(prev => prev.map(b => b.id === bookingId ? { ...b, status: newStatus } : b));
    } catch (err) {
      console.error('Error updating status:', err);
    } finally {
      setUpdating(null);
    }
  };

  // Stats
  const total     = bookings.length;
  const pending   = bookings.filter(b => b.status === 'pending').length;
  const confirmed = bookings.filter(b => b.status === 'confirmed').length;
  const completed = bookings.filter(b => b.status === 'completed').length;
  const cancelled = bookings.filter(b => b.status === 'cancelled').length;
  const totalRevenue = bookings
    .filter(b => b.status === 'confirmed' || b.status === 'completed')
    .reduce((sum, b) => sum + (b.totalPrice || 0), 0);

  // Filter
  const filtered = bookings.filter(b => {
    const matchStatus = filterStatus === 'all' || b.status === filterStatus;
    const q = searchQuery.toLowerCase();
    const matchSearch = !q ||
      (b.userName || '').toLowerCase().includes(q) ||
      (b.userEmail || '').toLowerCase().includes(q) ||
      (b.services || []).some(s => s.name.toLowerCase().includes(q)) ||
      (b.date || '').includes(q);
    return matchStatus && matchSearch;
  });

  const statCards = [
    { label: 'Total Bookings', value: total,     color: '#D4735C', icon: <Calendar style={{ width: '24px', height: '24px', color: '#D4735C' }} /> },
    { label: 'Pending',        value: pending,   color: '#D97706', icon: <AlertCircle style={{ width: '24px', height: '24px', color: '#D97706' }} /> },
    { label: 'Confirmed',      value: confirmed, color: '#059669', icon: <CheckCircle style={{ width: '24px', height: '24px', color: '#059669' }} /> },
    { label: 'Completed',      value: completed, color: '#2563EB', icon: <CheckCircle style={{ width: '24px', height: '24px', color: '#2563EB' }} /> },
    { label: 'Cancelled',      value: cancelled, color: '#DC2626', icon: <XCircle style={{ width: '24px', height: '24px', color: '#DC2626' }} /> },
    { label: 'Revenue',        value: `₱${totalRevenue.toLocaleString()}`, color: '#D4735C', icon: <Star style={{ width: '24px', height: '24px', color: '#D4735C' }} /> },
  ];

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#FDFAF7', fontFamily: 'sans-serif' }}>

      {/* ── HEADER ── */}
      <section style={{ background: 'linear-gradient(180deg, #F5E6D3 0%, #EDD5BC 100%)', padding: '48px 24px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div style={{ display: 'flex', gap: '4px', marginBottom: '12px' }}>
              {[...Array(5)].map((_, i) => (
                <Star key={i} style={{ width: '20px', height: '20px', fill: '#D4735C', color: '#D4735C' }} />
              ))}
            </div>
            <h1 style={{ fontSize: 'clamp(1.6rem, 4vw, 2.4rem)', color: '#D4735C', fontWeight: '400', fontFamily: 'Georgia, serif', marginBottom: '6px' }}>
              Admin Dashboard
            </h1>
            <p style={{ color: '#8D6E63', fontSize: '0.95rem' }}>Manage all bookings and appointments</p>
          </div>
          <button
            onClick={fetchBookings}
            style={{
              display: 'flex', alignItems: 'center', gap: '8px',
              backgroundColor: '#D4735C', color: '#FFFFFF', border: 'none',
              padding: '10px 20px', borderRadius: '8px', fontSize: '0.9rem',
              fontWeight: '700', cursor: 'pointer', fontFamily: 'sans-serif',
            }}
          >
            <RefreshCw style={{ width: '16px', height: '16px' }} />
            Refresh
          </button>
        </div>
      </section>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 24px' }}>

        {/* ── STATS ── */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '16px', marginBottom: '40px' }}>
          {statCards.map(({ label, value, color, icon }) => (
            <div key={label} style={{
              backgroundColor: '#FFFFFF', borderRadius: '12px', padding: '20px',
              border: '1px solid rgba(212,115,92,0.15)',
              boxShadow: '0 2px 12px rgba(0,0,0,0.05)',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: `${color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  {icon}
                </div>
              </div>
              <p style={{ color: '#8D6E63', fontSize: '0.78rem', marginBottom: '4px' }}>{label}</p>
              <p style={{ color, fontSize: '1.6rem', fontWeight: '700', margin: 0 }}>{value}</p>
            </div>
          ))}
        </div>

        {/* ── FILTERS ── */}
        <div style={{ backgroundColor: '#FFFFFF', borderRadius: '12px', padding: '24px', marginBottom: '24px', border: '1px solid rgba(212,115,92,0.15)', boxShadow: '0 2px 12px rgba(0,0,0,0.05)' }}>
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'center' }}>

            {/* Search */}
            <div style={{ position: 'relative', flex: 1, minWidth: '220px' }}>
              <Search style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', width: '16px', height: '16px', color: '#D4735C' }} />
              <input
                type="text"
                placeholder="Search by name, email, service..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                style={{
                  width: '100%', padding: '10px 12px 10px 38px',
                  border: '1px solid rgba(212,115,92,0.3)', borderRadius: '8px',
                  fontSize: '0.9rem', color: '#3E2723', outline: 'none',
                  boxSizing: 'border-box', fontFamily: 'sans-serif',
                }}
                onFocus={e => e.target.style.borderColor = '#D4735C'}
                onBlur={e => e.target.style.borderColor = 'rgba(212,115,92,0.3)'}
              />
            </div>

            {/* Status filter */}
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {['all', 'pending', 'confirmed', 'completed', 'cancelled'].map(s => (
                <button
                  key={s}
                  onClick={() => setFilterStatus(s)}
                  style={{
                    padding: '8px 16px', borderRadius: '999px', border: '1px solid',
                    fontSize: '0.8rem', fontWeight: '600', cursor: 'pointer', fontFamily: 'sans-serif',
                    backgroundColor: filterStatus === s ? '#D4735C' : '#FFFFFF',
                    color: filterStatus === s ? '#FFFFFF' : '#D4735C',
                    borderColor: '#D4735C', textTransform: 'capitalize',
                  }}
                >
                  {s === 'all' ? `All (${total})` : `${s.charAt(0).toUpperCase() + s.slice(1)} (${bookings.filter(b => b.status === s).length})`}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ── BOOKINGS TABLE ── */}
        <div style={{ backgroundColor: '#FFFFFF', borderRadius: '12px', border: '1px solid rgba(212,115,92,0.15)', boxShadow: '0 2px 12px rgba(0,0,0,0.05)', overflow: 'hidden' }}>

          {loading ? (
            <div style={{ padding: '64px', textAlign: 'center', color: '#8D6E63' }}>Loading bookings...</div>
          ) : filtered.length === 0 ? (
            <div style={{ padding: '64px', textAlign: 'center', color: '#8D6E63' }}>No bookings found.</div>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ backgroundColor: '#FFF8F0', borderBottom: '2px solid rgba(212,115,92,0.15)' }}>
                    {['Customer', 'Services', 'Date & Time', 'Total', 'Payment', 'Status', 'Actions'].map(h => (
                      <th key={h} style={{ padding: '14px 16px', textAlign: 'left', color: '#D4735C', fontSize: '0.8rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.06em', whiteSpace: 'nowrap' }}>
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((booking, idx) => {
                    const sc = statusColors[booking.status] || statusColors.pending;
                    return (
                      <tr key={booking.id} style={{ borderBottom: '1px solid rgba(212,115,92,0.1)', backgroundColor: idx % 2 === 0 ? '#FFFFFF' : '#FDFAF7' }}>

                        {/* Customer */}
                        <td style={{ padding: '16px' }}>
                          <p style={{ color: '#3E2723', fontWeight: '600', fontSize: '0.875rem', margin: 0 }}>{booking.userName || '—'}</p>
                          <p style={{ color: '#8D6E63', fontSize: '0.75rem', margin: '3px 0 0' }}>{booking.userEmail || '—'}</p>
                        </td>

                        {/* Services */}
                        <td style={{ padding: '16px', maxWidth: '200px' }}>
                          {(booking.services || []).map(s => (
                            <div key={s.id} style={{ fontSize: '0.8rem', color: '#3E2723', marginBottom: '3px' }}>
                              • {s.name}
                            </div>
                          ))}
                          <p style={{ color: '#8D6E63', fontSize: '0.75rem', margin: '4px 0 0' }}>{booking.totalDuration}</p>
                        </td>

                        {/* Date & Time */}
                        <td style={{ padding: '16px', whiteSpace: 'nowrap' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                            <Calendar style={{ width: '13px', height: '13px', color: '#D4735C' }} />
                            <span style={{ color: '#3E2723', fontSize: '0.85rem' }}>{booking.date}</span>
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <Clock style={{ width: '13px', height: '13px', color: '#D4735C' }} />
                            <span style={{ color: '#8D6E63', fontSize: '0.8rem' }}>{booking.time}</span>
                          </div>
                        </td>

                        {/* Total */}
                        <td style={{ padding: '16px', whiteSpace: 'nowrap' }}>
                          <span style={{ color: '#D4735C', fontWeight: '700', fontSize: '1rem' }}>
                            ₱{(booking.totalPrice || 0).toLocaleString()}
                          </span>
                        </td>

                        {/* Payment Method */}
                        <td style={{ padding: '16px' }}>
                          <span style={{ color: '#5D4037', fontSize: '0.85rem', textTransform: 'capitalize' }}>
                            {booking.paymentMethod || 'N/A'}
                          </span>
                        </td>

                        {/* Status badge */}
                        <td style={{ padding: '16px' }}>
                          <span style={{
                            backgroundColor: sc.bg, color: sc.color,
                            border: `1px solid ${sc.border}`,
                            padding: '4px 12px', borderRadius: '999px',
                            fontSize: '0.75rem', fontWeight: '700',
                            textTransform: 'capitalize', whiteSpace: 'nowrap',
                          }}>
                            {booking.status}
                          </span>
                        </td>

                        {/* Actions */}
                        <td style={{ padding: '16px' }}>
                          <select
                            value={booking.status}
                            disabled={updating === booking.id}
                            onChange={e => handleStatusChange(booking.id, e.target.value)}
                            style={{
                              padding: '7px 10px', borderRadius: '6px',
                              border: '1px solid rgba(212,115,92,0.3)',
                              fontSize: '0.8rem', color: '#3E2723',
                              fontFamily: 'sans-serif', cursor: 'pointer',
                              backgroundColor: updating === booking.id ? '#F5F5F5' : '#FFFFFF',
                              outline: 'none',
                            }}
                          >
                            <option value="pending">Pending</option>
                            <option value="confirmed">Confirmed</option>
                            <option value="completed">Completed</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                          {updating === booking.id && (
                            <p style={{ color: '#8D6E63', fontSize: '0.7rem', margin: '4px 0 0' }}>Saving...</p>
                          )}
                        </td>

                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Row count */}
        {!loading && (
          <p style={{ color: '#8D6E63', fontSize: '0.85rem', marginTop: '12px', textAlign: 'right' }}>
            Showing {filtered.length} of {total} booking{total !== 1 ? 's' : ''}
          </p>
        )}
      </div>

      {/* ── FOOTER ── */}
      <footer style={{ marginTop: '64px' }}>
        <div style={{ backgroundColor: '#2C1810', padding: '40px 48px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '40px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <div style={{ display: 'flex', gap: '2px' }}>
                {[...Array(5)].map((_, i) => (<Star key={i} style={{ width: '14px', height: '14px', fill: '#D4735C', color: '#D4735C' }} />))}
              </div>
              <span style={{ color: '#D4735C', fontFamily: 'Georgia, serif', fontSize: '1rem' }}>The Five Star Salon</span>
            </div>
            <p style={{ color: '#BCAAA4', fontSize: '0.875rem', lineHeight: '1.7', maxWidth: '280px' }}>Admin portal — manage bookings and appointments.</p>
          </div>
          <div>
            <h4 style={{ color: '#D4735C', fontSize: '0.95rem', fontWeight: '700', marginBottom: '20px' }}>Quick Links</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[{ label: 'Home', to: '/' }, { label: 'Services', to: '/services' }].map(({ label, to }) => (
                <Link key={label} to={to} style={{ color: '#BCAAA4', textDecoration: 'none', fontSize: '0.9rem' }}>{label}</Link>
              ))}
            </div>
          </div>
          <div>
            <h4 style={{ color: '#D4735C', fontSize: '0.95rem', fontWeight: '700', marginBottom: '20px' }}>Contact</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <Phone style={{ width: '16px', height: '16px', color: '#D4735C', flexShrink: 0 }} />
                <span style={{ color: '#BCAAA4', fontSize: '0.875rem' }}>+63 912 345 6789</span>
              </div>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <Mail style={{ width: '16px', height: '16px', color: '#D4735C', flexShrink: 0 }} />
                <span style={{ color: '#BCAAA4', fontSize: '0.875rem' }}>5starsalon.studio@gmail.com</span>
              </div>
            </div>
          </div>
        </div>
        <div style={{ backgroundColor: '#2C1810', borderTop: '1px solid rgba(212,115,92,0.2)', padding: '16px 48px', textAlign: 'center' }}>
          <p style={{ color: '#8D6E63', fontSize: '0.85rem', margin: 0 }}>© 2026 The Five Star Salon. All rights reserved.</p>
        </div>
      </footer>

    </div>
  );
}