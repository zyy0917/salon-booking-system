import { useParams, useNavigate, Link } from 'react-router-dom';
import { Star, Clock, ArrowLeft, Sparkles, PhilippinePeso, MapPin, Phone, Mail } from 'lucide-react';
import { useEffect } from 'react';

const services = [
  { id: '1', category: 'Hair Services', name: 'Haircut (Women)', description: "Professional women's haircut with styling", price: 350, duration: '45 min', imageUrl: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&q=80' },
  { id: '2', category: 'Hair Services', name: 'Haircut (Men)', description: "Professional men's haircut with styling", price: 250, duration: '30 min', imageUrl: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=800&q=80' },
  { id: '3', category: 'Hair Services', name: 'Haircut (Kids)', description: 'Kid-friendly haircut service', price: 200, duration: '30 min', imageUrl: 'https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=800&q=80' },
  { id: '4', category: 'Hair Services', name: 'Balayage', description: 'Natural-looking highlights for a sun-kissed finish', price: 4500, duration: '180 min', imageUrl: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&q=80' },
  { id: '5', category: 'Hair Services', name: 'Keratin Treatment', description: 'Smoothing treatment for frizz-free, shiny hair', price: 3500, duration: '120 min', imageUrl: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?w=800&q=80' },
  { id: '6', category: 'Hair Services', name: 'Hair Rebonding', description: 'Permanent straightening for smooth, sleek hair', price: 2500, duration: '180 min', imageUrl: 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=800&q=80' },
  { id: '7', category: 'Nail Services', name: 'Gel Manicure', description: 'Long-lasting gel polish with cuticle care', price: 800, duration: '45 min', imageUrl: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=800&q=80' },
  { id: '8', category: 'Nail Services', name: 'Classic Pedicure', description: 'Relaxing pedicure with nail shaping and polish', price: 600, duration: '45 min', imageUrl: 'https://images.unsplash.com/photo-1519751138087-5bf79df62d5b?w=800&q=80' },
  { id: '9', category: 'Nail Services', name: 'Nail Art', description: 'Custom nail art designs for a unique look', price: 500, duration: '60 min', imageUrl: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=800&q=80' },
  { id: '10', category: 'Facial & Skin Services', name: 'Rejuvenating Facial', description: 'Deep cleansing and hydration for glowing skin', price: 2000, duration: '60 min', imageUrl: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&q=80' },
  { id: '11', category: 'Facial & Skin Services', name: 'Acne Treatment', description: 'Targeted treatment to reduce acne and blemishes', price: 1500, duration: '60 min', imageUrl: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=800&q=80' },
  { id: '12', category: 'Facial & Skin Services', name: 'Anti-Aging Facial', description: 'Firming and lifting treatment for youthful skin', price: 2500, duration: '75 min', imageUrl: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=800&q=80' },
  { id: '13', category: 'Other Beauty Services', name: 'Swedish Massage', description: 'Relaxing full-body massage to melt tension', price: 1200, duration: '60 min', imageUrl: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&q=80' },
  { id: '14', category: 'Other Beauty Services', name: 'Eyebrow Threading', description: 'Precise eyebrow shaping using threading technique', price: 200, duration: '15 min', imageUrl: 'https://images.unsplash.com/photo-1487412947147-5cebf96ef394?w=800&q=80' },
  { id: '15', category: 'Other Beauty Services', name: 'Eyelash Extension', description: 'Fuller, longer lashes for a dramatic look', price: 1800, duration: '90 min', imageUrl: 'https://images.unsplash.com/photo-1583001931096-959e9a1a6223?w=800&q=80' },
];

export default function ServiceDetails() {
  const { serviceId } = useParams();
  const navigate = useNavigate();
  const service = services.find((s) => s.id === serviceId);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  if (!service) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'sans-serif' }}>
        <div style={{ textAlign: 'center' }}>
          <h1 style={{ color: '#D4735C', marginBottom: '20px', fontFamily: 'Georgia, serif' }}>Service Not Found</h1>
          <Link to="/services" style={{ textDecoration: 'none' }}>
            <button style={{
              backgroundColor: '#D4735C', color: '#FFFFFF', border: 'none',
              padding: '12px 32px', borderRadius: '8px', fontSize: '1rem',
              fontWeight: '700', cursor: 'pointer',
            }}>
              Back to Services
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#FDFAF7', fontFamily: 'sans-serif' }}>

      {/* ── HERO IMAGE ── */}
      <div style={{ position: 'relative', height: '380px', overflow: 'hidden' }}>
        <img src={service.imageUrl} alt={service.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(44,24,16,0.85) 0%, rgba(44,24,16,0.2) 60%, transparent 100%)' }} />
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '40px 48px' }}>
          <span style={{
            backgroundColor: 'rgba(212,115,92,0.9)', color: '#FFFFFF',
            fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase',
            letterSpacing: '0.1em', padding: '5px 14px', borderRadius: '999px',
            marginBottom: '12px', display: 'inline-block',
          }}>
            {service.category}
          </span>
          <h1 style={{ color: '#FFFFFF', fontFamily: 'Georgia, serif', fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: '400', margin: 0 }}>
            {service.name}
          </h1>
        </div>
      </div>

      <div style={{ maxWidth: '860px', margin: '0 auto', padding: '40px 24px' }}>

        {/* Back button */}
        <Link to="/services" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#D4735C', fontWeight: '600', marginBottom: '32px', fontSize: '0.95rem' }}>
          <ArrowLeft style={{ width: '18px', height: '18px' }} />
          Back to Services
        </Link>

        {/* Price + Duration cards */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '36px' }}>
          <div style={{
            backgroundColor: '#FFFFFF', borderRadius: '14px', padding: '24px',
            border: '1px solid rgba(212,115,92,0.2)', display: 'flex', alignItems: 'center', gap: '16px',
            boxShadow: '0 2px 12px rgba(0,0,0,0.05)',
          }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: 'rgba(212,115,92,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <span style={{ color: '#D4735C', fontSize: '1.2rem', fontWeight: '700' }}>₱</span>
            </div>
            <div>
              <p style={{ color: '#8D6E63', fontSize: '0.8rem', margin: '0 0 4px' }}>Price</p>
              <p style={{ color: '#D4735C', fontSize: '1.6rem', fontWeight: '700', margin: 0 }}>₱{service.price.toLocaleString()}</p>
            </div>
          </div>
          <div style={{
            backgroundColor: '#FFFFFF', borderRadius: '14px', padding: '24px',
            border: '1px solid rgba(212,115,92,0.2)', display: 'flex', alignItems: 'center', gap: '16px',
            boxShadow: '0 2px 12px rgba(0,0,0,0.05)',
          }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: 'rgba(212,115,92,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Clock style={{ width: '22px', height: '22px', color: '#D4735C' }} />
            </div>
            <div>
              <p style={{ color: '#8D6E63', fontSize: '0.8rem', margin: '0 0 4px' }}>Duration</p>
              <p style={{ color: '#3E2723', fontSize: '1.6rem', fontWeight: '700', margin: 0 }}>{service.duration}</p>
            </div>
          </div>
        </div>

        {/* Description */}
        <div style={{ backgroundColor: '#FFFFFF', borderRadius: '14px', padding: '32px', marginBottom: '24px', border: '1px solid rgba(212,115,92,0.15)', boxShadow: '0 2px 12px rgba(0,0,0,0.05)' }}>
          <h2 style={{ color: '#D4735C', fontFamily: 'Georgia, serif', fontWeight: '400', fontSize: '1.4rem', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Sparkles style={{ width: '22px', height: '22px' }} />
            Service Description
          </h2>
          <p style={{ color: '#5D4037', lineHeight: '1.8', fontSize: '0.975rem', margin: 0 }}>{service.description}</p>
        </div>

        {/* What's Included */}
        <div style={{ backgroundColor: '#FFFFFF', borderRadius: '14px', padding: '32px', marginBottom: '36px', border: '1px solid rgba(212,115,92,0.15)', boxShadow: '0 2px 12px rgba(0,0,0,0.05)' }}>
          <h2 style={{ color: '#D4735C', fontFamily: 'Georgia, serif', fontWeight: '400', fontSize: '1.4rem', marginBottom: '20px' }}>
            What's Included
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {[
              'Professional consultation before treatment',
              'Premium products and equipment',
              'Expert service by certified professionals',
              'Aftercare advice and tips',
            ].map((item) => (
              <div key={item} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <Star style={{ width: '18px', height: '18px', fill: '#D4735C', color: '#D4735C', flexShrink: 0, marginTop: '2px' }} />
                <span style={{ color: '#5D4037', fontSize: '0.95rem', lineHeight: '1.6' }}>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Buttons */}
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
          <button
            onClick={() => navigate(`/book?service=${service.id}`)}
            style={{
              flex: 1, minWidth: '200px', padding: '16px',
              backgroundColor: '#D4735C', color: '#FFFFFF',
              border: 'none', borderRadius: '10px',
              fontSize: '1rem', fontWeight: '700', cursor: 'pointer', fontFamily: 'sans-serif',
            }}
          >
            Book This Service
          </button>
          <Link to="/services" style={{ flex: 1, minWidth: '200px', textDecoration: 'none' }}>
            <button style={{
              width: '100%', padding: '16px',
              backgroundColor: 'transparent', color: '#D4735C',
              border: '2px solid #D4735C', borderRadius: '10px',
              fontSize: '1rem', fontWeight: '700', cursor: 'pointer', fontFamily: 'sans-serif',
            }}>
              Browse More Services
            </button>
          </Link>
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