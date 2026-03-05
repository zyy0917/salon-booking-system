import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Sparkles, Clock, Award, MapPin, Phone, Mail } from 'lucide-react';

const featuredServices = [
  { id: 1, category: "Hair", name: "Signature Haircut", description: "Precision cut and styling tailored to your face shape.", price: "1,500", duration: "60 mins" },
  { id: 2, category: "Color", name: "Balayage", description: "Natural-looking highlights for a sun-kissed finish.", price: "4,500", duration: "180 mins" },
  { id: 3, category: "Nails", name: "Gel Manicure", description: "Long-lasting gel polish with cuticle care.", price: "800", duration: "45 mins" },
  { id: 4, category: "Skin", name: "Rejuvenating Facial", description: "Deep cleansing and hydration for glowing skin.", price: "2,000", duration: "60 mins" },
  { id: 5, category: "Massage", name: "Swedish Massage", description: "Relaxing full-body massage to melt tension.", price: "1,200", duration: "60 mins" },
  { id: 6, category: "Hair", name: "Keratin Treatment", description: "Smoothing treatment for frizz-free hair.", price: "3,500", duration: "120 mins" },
];

const galleryItems = [
  { src: "https://images.unsplash.com/photo-1563798163029-5448a0ffd596?w=800&q=80", alt: "Haircut Services", label: "Hair Services" },
  { src: "https://images.unsplash.com/photo-1661267571825-45b3036a1aed?w=800&q=80", alt: "Nail Services", label: "Nail Care" },
  { src: "https://images.unsplash.com/photo-1664549761426-6a1cb1032854?w=800&q=80", alt: "Facial Treatments", label: "Facial & Skin Care" },
];

export default function Home() {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#FFFFFF', fontFamily: 'sans-serif' }}>

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section style={{
        background: 'linear-gradient(180deg, #F5E6D3 0%, #C0A66C 100%)',
        padding: '90px 24px',
        textAlign: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <div style={{ maxWidth: '700px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '6px', marginBottom: '28px' }}>
            {[...Array(5)].map((_, i) => (
              <Star key={i} style={{ width: '30px', height: '30px', fill: '#DCB91D', color: '#DCB91D', opacity: 0.65 }} />
            ))}
          </div>
          <h1 style={{
            fontSize: 'clamp(2.4rem, 6vw, 3.8rem)',
            color: '#000000',
            fontWeight: '400',
            marginBottom: '18px',
            lineHeight: '1.2',
            fontFamily: 'Georgia, "Times New Roman", serif',
          }}>
            The Five Star Salon
          </h1>
          <p style={{ fontSize: '1.05rem', color: '#5D4037', marginBottom: '40px', lineHeight: '1.7' }}>
            Experience luxury and elegance with our premium beauty services
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/login">
              <button style={{
                backgroundColor: '#DCB91D', color: '#FFFFFF', border: 'none',
                padding: '15px 40px', fontSize: '1rem', fontWeight: '700',
                borderRadius: '6px', cursor: 'pointer',
              }}>
                Book Appointment
              </button>
            </Link>
            <Link to="/services">
              <button style={{
                backgroundColor: 'transparent', color: '#000000',
                border: '2px solid #000000', padding: '15px 40px',
                fontSize: '1rem', fontWeight: '600', borderRadius: '6px', cursor: 'pointer',
              }}>
                View Services
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── FEATURES ─────────────────────────────────────────── */}
      <section style={{ padding: '64px 24px', backgroundColor: '#FFFFFF' }}>
        <div style={{
          maxWidth: '1100px', margin: '0 auto',
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px',
        }}>
          {[
            { icon: <Award style={{ width: '42px', height: '42px', color: '#D4735C' }} />, title: "Professional Team", desc: "Highly trained and experienced beauty professionals dedicated to your satisfaction." },
            { icon: <Sparkles style={{ width: '42px', height: '42px', color: '#D4735C' }} />, title: "Premium Products", desc: "Only the finest, salon-grade products carefully selected for your beauty needs." },
            { icon: <Clock style={{ width: '42px', height: '42px', color: '#D4735C' }} />, title: "Flexible Scheduling", desc: "Easy online booking available 24/7 at your convenience." },
          ].map(({ icon, title, desc }) => (
            <div key={title} style={{
              backgroundColor: '#FFF3EC', border: '1px solid #F5D5C5',
              borderRadius: '14px', padding: '44px 32px', textAlign: 'center',
            }}>
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>{icon}</div>
              <h3 style={{ color: '#D4735C', fontSize: '1.05rem', fontWeight: '700', marginBottom: '12px' }}>{title}</h3>
              <p style={{ color: '#8D6E63', fontSize: '0.9rem', lineHeight: '1.65' }}>{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── GALLERY ──────────────────────────────────────────── */}
      <section style={{ padding: '64px 24px', background: 'linear-gradient(180deg, #FFFFFF 0%, #F5E6D3 100%)' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <h2 style={{ fontSize: '2rem', color: '#3E2723', fontWeight: '400', marginBottom: '10px', fontFamily: 'Georgia, serif' }}>Our Gallery</h2>
            <div style={{ width: '48px', height: '3px', backgroundColor: '#D4735C', margin: '0 auto 14px' }} />
            <p style={{ color: '#8D6E63' }}>Get a glimpse of our salon and services</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
            {galleryItems.map(({ src, alt, label }) => (
              <div key={label} style={{
                position: 'relative', height: '260px',
                borderRadius: '12px', overflow: 'hidden',
                boxShadow: '0 4px 20px rgba(0,0,0,0.12)',
              }}>
                <img src={src} alt={alt} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(to top, rgba(62,39,35,0.78) 0%, transparent 55%)',
                  display: 'flex', alignItems: 'flex-end', padding: '20px',
                }}>
                  <p style={{ color: '#FFFFFF', fontWeight: '700', fontSize: '1.05rem' }}>{label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED SERVICES ────────────────────────────────── */}
      <section style={{ padding: '64px 24px', backgroundColor: '#FFF8F0' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <h2 style={{ fontSize: '2rem', color: '#3E2723', fontWeight: '400', marginBottom: '10px', fontFamily: 'Georgia, serif' }}>Featured Services</h2>
            <div style={{ width: '48px', height: '3px', backgroundColor: '#D4735C', margin: '0 auto 14px' }} />
            <p style={{ color: '#8D6E63' }}>Discover our most popular beauty treatments</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', marginBottom: '40px' }}>
            {featuredServices.map((service) => (
              <div key={service.id} style={{
                backgroundColor: '#FFFFFF', border: '1px solid rgba(212,115,92,0.2)',
                borderRadius: '12px', padding: '24px',
              }}>
                <span style={{
                  fontSize: '0.7rem', fontWeight: '700', textTransform: 'uppercase',
                  letterSpacing: '0.1em', color: '#D4735C', backgroundColor: '#F5E6D3',
                  padding: '4px 12px', borderRadius: '999px',
                }}>
                  {service.category}
                </span>
                <h3 style={{ fontSize: '1.05rem', fontWeight: '700', color: '#3E2723', margin: '14px 0 8px' }}>{service.name}</h3>
                <p style={{ color: '#8D6E63', fontSize: '0.875rem', lineHeight: '1.65', marginBottom: '20px' }}>{service.description}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #F5E6D3', paddingTop: '16px' }}>
                  <span style={{ fontSize: '1.35rem', fontWeight: '700', color: '#D4735C' }}>₱{service.price}</span>
                  <span style={{ fontSize: '0.78rem', color: '#8D6E63', backgroundColor: '#F5E6D3', padding: '4px 12px', borderRadius: '999px' }}>{service.duration}</span>
                </div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center' }}>
            <Link to="/services">
              <button style={{
                backgroundColor: '#C0614D', color: '#FFFFFF', border: 'none',
                padding: '14px 44px', fontSize: '1rem', fontWeight: '700',
                borderRadius: '6px', cursor: 'pointer',
              }}>
                View All Services
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── CTA with salon photo background ──────────────────── */}
      <section style={{ position: 'relative', overflow: 'hidden', textAlign: 'center' }}>
        <img
          src="https://images.unsplash.com/photo-1560066984-138dadb4c035?w=1400&q=80"
          alt="Salon Interior"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(245, 230, 211, 0.82)' }} />
        <div style={{ position: 'relative', zIndex: 1, padding: '90px 24px', maxWidth: '700px', margin: '0 auto' }}>
          <h2 style={{
            fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', color: '#D4735C',
            fontWeight: '400', marginBottom: '16px',
            fontFamily: 'Georgia, serif', lineHeight: '1.3',
          }}>
            Ready to Transform Your Look?
          </h2>
          <p style={{ color: '#5D4037', fontSize: '1rem', marginBottom: '36px', lineHeight: '1.7' }}>
            Book your appointment today and experience the Five Star difference
          </p>
          <Link to="/login">
            <button style={{
              backgroundColor: '#C0614D', color: '#FFFFFF', border: 'none',
              padding: '16px 56px', fontSize: '1.05rem', fontWeight: '700',
              borderRadius: '6px', cursor: 'pointer',
            }}>
              Get Started
            </button>
          </Link>
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────────────────── */}
      <footer>
        {/* Main footer */}
        <div style={{
          backgroundColor: '#2C1810',
          padding: '56px 48px 40px',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '48px',
        }}>

          {/* Column 1: Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
              <div style={{ display: 'flex', gap: '2px' }}>
                {[...Array(5)].map((_, i) => (
                  <Star key={i} style={{ width: '15px', height: '15px', fill: '#D4735C', color: '#D4735C' }} />
                ))}
              </div>
              <span style={{ color: '#D4735C', fontFamily: 'Georgia, serif', fontSize: '1rem' }}>
                The Five Star Salon
              </span>
            </div>
            <p style={{ color: '#BCAAA4', fontSize: '0.875rem', lineHeight: '1.7', marginBottom: '24px', maxWidth: '300px' }}>
              Experience luxury beauty services with our professional team. We provide the finest
              salon treatments in a relaxing, elegant environment.
            </p>
            {/* Social icons */}
            <div style={{ display: 'flex', gap: '16px' }}>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" style={{ color: '#BCAAA4' }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" style={{ color: '#BCAAA4' }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 style={{ color: '#D4735C', fontSize: '1rem', fontWeight: '700', marginBottom: '24px' }}>
              Quick Links
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {[{ label: 'Home', to: '/' }, { label: 'About', to: '/' }, { label: 'Services', to: '/services' }, { label: 'Login', to: '/login' }].map(({ label, to }) => (
                <Link key={label} to={to} style={{ color: '#BCAAA4', textDecoration: 'none', fontSize: '0.9rem' }}>
                  {label}
                </Link>
              ))}
            </div>
          </div>

          {/* Column 3: Contact */}
          <div>
            <h4 style={{ color: '#D4735C', fontSize: '1rem', fontWeight: '700', marginBottom: '24px' }}>
              Contact Us
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <MapPin style={{ width: '18px', height: '18px', color: '#D4735C', flexShrink: 0, marginTop: '2px' }} />
                <span style={{ color: '#BCAAA4', fontSize: '0.875rem', lineHeight: '1.6' }}>
                  123 Beauty Street, Manila,<br />Philippines
                </span>
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

        {/* Copyright bar */}
        <div style={{
          backgroundColor: '#2C1810',
          borderTop: '1px solid rgba(212, 115, 92, 0.2)',
          padding: '20px 48px',
          textAlign: 'center',
        }}>
          <p style={{ color: '#8D6E63', fontSize: '0.85rem' }}>
            © 2026 The Five Star Salon. All rights reserved.
          </p>
        </div>
      </footer>

    </div>
  );
}