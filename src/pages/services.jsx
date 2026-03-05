import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, Search, MapPin, Phone, Mail } from 'lucide-react';

const categories = ['Hair Services', 'Nail Services', 'Facial & Skin Services', 'Other Beauty Services'];

const services = [
  // Hair Services
  { id: '1', category: 'Hair Services', name: 'Haircut (Women)', description: "Professional women's haircut with styling", price: 350, duration: '45 min', imageUrl: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&q=80' },
  { id: '2', category: 'Hair Services', name: 'Haircut (Men)', description: "Professional men's haircut with styling", price: 250, duration: '30 min', imageUrl: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=800&q=80' },
  { id: '3', category: 'Hair Services', name: 'Haircut (Kids)', description: 'Kid-friendly haircut service', price: 200, duration: '30 min', imageUrl: 'https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=800&q=80' },
  { id: '4', category: 'Hair Services', name: 'Balayage', description: 'Natural-looking highlights for a sun-kissed finish', price: 4500, duration: '180 min', imageUrl: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&q=80' },
  { id: '5', category: 'Hair Services', name: 'Keratin Treatment', description: 'Smoothing treatment for frizz-free, shiny hair', price: 3500, duration: '120 min', imageUrl: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?w=800&q=80' },
  { id: '6', category: 'Hair Services', name: 'Hair Rebonding', description: 'Permanent straightening for smooth, sleek hair', price: 2500, duration: '180 min', imageUrl: 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=800&q=80' },
  // Nail Services
  { id: '7', category: 'Nail Services', name: 'Gel Manicure', description: 'Long-lasting gel polish with cuticle care', price: 800, duration: '45 min', imageUrl: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=800&q=80' },
  { id: '8', category: 'Nail Services', name: 'Classic Pedicure', description: 'Relaxing pedicure with nail shaping and polish', price: 600, duration: '45 min', imageUrl: 'https://images.unsplash.com/photo-1519751138087-5bf79df62d5b?w=800&q=80' },
  { id: '9', category: 'Nail Services', name: 'Nail Art', description: 'Custom nail art designs for a unique look', price: 500, duration: '60 min', imageUrl: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=800&q=80' },
  // Facial & Skin Services
  { id: '10', category: 'Facial & Skin Services', name: 'Rejuvenating Facial', description: 'Deep cleansing and hydration for glowing skin', price: 2000, duration: '60 min', imageUrl: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&q=80' },
  { id: '11', category: 'Facial & Skin Services', name: 'Acne Treatment', description: 'Targeted treatment to reduce acne and blemishes', price: 1500, duration: '60 min', imageUrl: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=800&q=80' },
  { id: '12', category: 'Facial & Skin Services', name: 'Anti-Aging Facial', description: 'Firming and lifting treatment for youthful skin', price: 2500, duration: '75 min', imageUrl: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=800&q=80' },
  // Other Beauty Services
  { id: '13', category: 'Other Beauty Services', name: 'Swedish Massage', description: 'Relaxing full-body massage to melt tension', price: 1200, duration: '60 min', imageUrl: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&q=80' },
  { id: '14', category: 'Other Beauty Services', name: 'Eyebrow Threading', description: 'Precise eyebrow shaping using threading technique', price: 200, duration: '15 min', imageUrl: 'https://images.unsplash.com/photo-1487412947147-5cebf96ef394?w=800&q=80' },
  { id: '15', category: 'Other Beauty Services', name: 'Eyelash Extension', description: 'Fuller, longer lashes for a dramatic look', price: 1800, duration: '90 min', imageUrl: 'https://images.unsplash.com/photo-1583001931096-959e9a1a6223?w=800&q=80' },
];

export default function Services() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredServices = services.filter((service) => {
    const matchesCategory = !selectedCategory || service.category === selectedCategory;
    const matchesSearch =
      service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#FDFAF7', fontFamily: 'sans-serif' }}>

      {/* ── HEADER ── */}
      <section style={{
        background: 'linear-gradient(180deg, #F5E6D3 0%, #EDD5BC 100%)',
        padding: '64px 24px',
        textAlign: 'center',
      }}>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '6px', marginBottom: '20px' }}>
          {[...Array(5)].map((_, i) => (
            <Star key={i} style={{ width: '28px', height: '28px', fill: '#D4735C', color: '#D4735C', opacity: 0.7 }} />
          ))}
        </div>
        <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', color: '#D4735C', fontWeight: '400', marginBottom: '12px', fontFamily: 'Georgia, serif' }}>
          Our Services
        </h1>
        <p style={{ color: '#8D6E63', fontSize: '1.05rem', maxWidth: '560px', margin: '0 auto' }}>
          Explore our comprehensive range of luxury beauty treatments
        </p>
      </section>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '48px 24px' }}>

        {/* ── SEARCH ── */}
        <div style={{ maxWidth: '560px', margin: '0 auto 32px', position: 'relative' }}>
          <Search style={{
            position: 'absolute', left: '16px', top: '50%',
            transform: 'translateY(-50%)', width: '18px', height: '18px', color: '#D4735C',
          }} />
          <input
            type="text"
            placeholder="Search services..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%', padding: '14px 16px 14px 48px',
              border: '1px solid rgba(212,115,92,0.3)', borderRadius: '10px',
              fontSize: '0.95rem', color: '#3E2723', outline: 'none',
              backgroundColor: '#FFFFFF', boxSizing: 'border-box',
              fontFamily: 'sans-serif',
            }}
            onFocus={e => e.target.style.borderColor = '#D4735C'}
            onBlur={e => e.target.style.borderColor = 'rgba(212,115,92,0.3)'}
          />
        </div>

        {/* ── CATEGORY FILTER ── */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center', marginBottom: '48px' }}>
          {[null, ...categories].map((cat) => (
            <button
              key={cat ?? 'all'}
              onClick={() => setSelectedCategory(cat)}
              style={{
                padding: '9px 22px',
                borderRadius: '999px',
                border: '1px solid',
                fontSize: '0.875rem',
                fontWeight: '600',
                cursor: 'pointer',
                fontFamily: 'sans-serif',
                transition: 'all 0.2s',
                backgroundColor: selectedCategory === cat ? '#D4735C' : '#FFFFFF',
                color: selectedCategory === cat ? '#FFFFFF' : '#D4735C',
                borderColor: '#D4735C',
              }}
            >
              {cat ?? 'All Services'}
            </button>
          ))}
        </div>

        {/* ── SERVICES GRID ── */}
        {filteredServices.length > 0 ? (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '24px',
          }}>
            {filteredServices.map((service) => (
              <div key={service.id} style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '14px',
                overflow: 'hidden',
                border: '1px solid rgba(212,115,92,0.2)',
                boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
                display: 'flex',
                flexDirection: 'column',
              }}>
                {/* Image */}
                <div style={{ position: 'relative', height: '200px', overflow: 'hidden' }}>
                  <img
                    src={service.imageUrl}
                    alt={service.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <div style={{
                    position: 'absolute', inset: 0,
                    background: 'linear-gradient(to top, rgba(62,39,35,0.6) 0%, transparent 50%)',
                  }} />
                  <span style={{
                    position: 'absolute', top: '12px', left: '12px',
                    backgroundColor: 'rgba(255,255,255,0.92)',
                    color: '#D4735C', fontSize: '0.7rem', fontWeight: '700',
                    textTransform: 'uppercase', letterSpacing: '0.08em',
                    padding: '4px 12px', borderRadius: '999px',
                  }}>
                    {service.category}
                  </span>
                </div>

                {/* Content */}
                <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: '700', color: '#3E2723', marginBottom: '8px' }}>
                    {service.name}
                  </h3>
                  <p style={{ color: '#8D6E63', fontSize: '0.875rem', lineHeight: '1.65', marginBottom: '20px', flex: 1 }}>
                    {service.description}
                  </p>
                  <div style={{
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    borderTop: '1px solid #F5E6D3', paddingTop: '16px', marginBottom: '16px',
                  }}>
                    <span style={{ fontSize: '1.4rem', fontWeight: '700', color: '#D4735C' }}>
                      ₱{service.price.toLocaleString()}
                    </span>
                    <span style={{
                      fontSize: '0.78rem', color: '#8D6E63',
                      backgroundColor: '#F5E6D3', padding: '4px 12px', borderRadius: '999px',
                    }}>
                      {service.duration}
                    </span>
                  </div>
                  <Link to={`/services/${service.id}`} style={{ textDecoration: 'none' }}>
                    <button style={{
                      width: '100%', padding: '12px',
                      backgroundColor: '#D4735C', color: '#FFFFFF',
                      border: 'none', borderRadius: '8px',
                      fontSize: '0.95rem', fontWeight: '700',
                      cursor: 'pointer', fontFamily: 'sans-serif',
                    }}>
                      View Details
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '64px 24px' }}>
            <p style={{ color: '#8D6E63', fontSize: '1.1rem' }}>No services found matching your criteria.</p>
          </div>
        )}
      </div>

      {/* ── FOOTER ── */}
      <footer>
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