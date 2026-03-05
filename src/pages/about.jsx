import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Heart, Users, Award, Sparkles, MapPin, Phone, Mail } from 'lucide-react';

export default function About() {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#FFFFFF', fontFamily: 'sans-serif' }}>

      {/* ── HEADER ───────────────────────────────────────────── */}
      <section style={{
        background: 'linear-gradient(180deg, #F5E6D3 0%, #EDD5BC 100%)',
        padding: '70px 24px',
        textAlign: 'center',
      }}>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '6px', marginBottom: '20px' }}>
          {[...Array(5)].map((_, i) => (
            <Star key={i} style={{ width: '28px', height: '28px', fill: '#D4735C', color: '#D4735C', opacity: 0.7 }} />
          ))}
        </div>
        <h1 style={{
          fontSize: 'clamp(2rem, 5vw, 3.2rem)',
          color: '#D4735C',
          fontWeight: '400',
          marginBottom: '14px',
          fontFamily: 'Georgia, serif',
        }}>
          About Us
        </h1>
        <p style={{ fontSize: '1.1rem', color: '#8D6E63', maxWidth: '560px', margin: '0 auto', lineHeight: '1.7' }}>
          Where luxury meets expertise in the heart of Manila
        </p>
      </section>

      {/* ── HERO IMAGE ───────────────────────────────────────── */}
      <div style={{ margin: '0', overflow: 'hidden', maxHeight: '420px' }}>
        <img
          src="https://images.unsplash.com/photo-1663519977857-a5849ca453c1?w=1400&q=80"
          alt="Our Salon"
          style={{ width: '100%', height: '420px', objectFit: 'cover', display: 'block' }}
        />
      </div>

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '64px 24px' }}>

        {/* ── OUR STORY ────────────────────────────────────────── */}
        <section style={{ marginBottom: '64px' }}>
          <div style={{
            backgroundColor: '#FFFFFF',
            border: '1px solid rgba(212,115,92,0.2)',
            borderRadius: '16px',
            padding: '48px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
          }}>
            <h2 style={{ fontSize: '1.8rem', color: '#D4735C', fontWeight: '400', marginBottom: '24px', fontFamily: 'Georgia, serif' }}>
              Our Story
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', color: '#5D4037', fontSize: '0.975rem', lineHeight: '1.8' }}>
              <p>
                The Five Star Salon was founded with a vision to provide world-class beauty
                services in an elegant and welcoming environment. Since our establishment,
                we have been committed to delivering excellence in every treatment we offer.
              </p>
              <p>
                Our team of highly skilled professionals brings years of experience and
                expertise to ensure that every client receives personalized care and
                attention. We use only premium products and the latest techniques to
                achieve outstanding results.
              </p>
              <p>
                At The Five Star Salon, we believe that beauty is not just about appearance—
                it's about confidence, self-care, and feeling your absolute best. We strive
                to create an experience that leaves you feeling refreshed, rejuvenated,
                and radiant.
              </p>
            </div>
          </div>
        </section>

        {/* ── OUR VALUES ───────────────────────────────────────── */}
        <section style={{ marginBottom: '64px' }}>
          <h2 style={{ fontSize: '1.8rem', color: '#D4735C', fontWeight: '400', textAlign: 'center', marginBottom: '36px', fontFamily: 'Georgia, serif' }}>
            Our Values
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
            {[
              { icon: <Heart style={{ width: '40px', height: '40px', color: '#D4735C' }} />, title: 'Passion', desc: 'We love what we do and it shows in every service.' },
              { icon: <Award style={{ width: '40px', height: '40px', color: '#D4735C' }} />, title: 'Excellence', desc: 'Committed to the highest standards of quality.' },
              { icon: <Users style={{ width: '40px', height: '40px', color: '#D4735C' }} />, title: 'Community', desc: 'Building lasting relationships with our clients.' },
              { icon: <Sparkles style={{ width: '40px', height: '40px', color: '#D4735C' }} />, title: 'Innovation', desc: 'Staying current with the latest trends and techniques.' },
            ].map(({ icon, title, desc }) => (
              <div key={title} style={{
                backgroundColor: '#FFFFFF',
                border: '1px solid rgba(212,115,92,0.2)',
                borderRadius: '14px',
                padding: '32px 24px',
                textAlign: 'center',
                boxShadow: '0 2px 12px rgba(0,0,0,0.05)',
              }}>
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '16px' }}>{icon}</div>
                <h3 style={{ fontSize: '1rem', fontWeight: '700', color: '#3E2723', marginBottom: '10px' }}>{title}</h3>
                <p style={{ color: '#8D6E63', fontSize: '0.875rem', lineHeight: '1.65' }}>{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── WHY CHOOSE US ────────────────────────────────────── */}
        <section>
          <div style={{
            background: 'linear-gradient(135deg, #FFF8F0 0%, #F5E6D3 100%)',
            border: '1px solid rgba(212,115,92,0.2)',
            borderRadius: '16px',
            padding: '48px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
          }}>
            <h2 style={{ fontSize: '1.8rem', color: '#D4735C', fontWeight: '400', textAlign: 'center', marginBottom: '40px', fontFamily: 'Georgia, serif' }}>
              Why Choose Us
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '28px' }}>
              {[
                { title: 'Expert Professionals', desc: 'Our team consists of certified and highly trained beauty experts.' },
                { title: 'Premium Products', desc: 'We use only the finest professional-grade products and equipment.' },
                { title: 'Hygienic Environment', desc: 'Maintaining the highest standards of cleanliness and safety.' },
                { title: 'Personalized Service', desc: 'Customized treatments tailored to your individual needs.' },
                { title: 'Convenient Booking', desc: 'Easy online appointment scheduling at your fingertips.' },
                { title: 'Competitive Pricing', desc: 'Quality services at fair and transparent prices.' },
              ].map(({ title, desc }) => (
                <div key={title} style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                  <div style={{
                    flexShrink: 0,
                    width: '44px', height: '44px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(212,115,92,0.12)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <Star style={{ width: '20px', height: '20px', fill: '#D4735C', color: '#D4735C' }} />
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1rem', fontWeight: '700', color: '#3E2723', marginBottom: '6px' }}>{title}</h3>
                    <p style={{ color: '#8D6E63', fontSize: '0.875rem', lineHeight: '1.65' }}>{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

      </div>

      {/* ── FOOTER ───────────────────────────────────────────── */}
      <footer>
        <div style={{
          backgroundColor: '#2C1810',
          padding: '56px 48px 40px',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '48px',
        }}>
          {/* Brand */}
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

          {/* Quick Links */}
          <div>
            <h4 style={{ color: '#D4735C', fontSize: '1rem', fontWeight: '700', marginBottom: '24px' }}>Quick Links</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {[{ label: 'Home', to: '/' }, { label: 'About', to: '/about' }, { label: 'Services', to: '/services' }, { label: 'Login', to: '/login' }].map(({ label, to }) => (
                <Link key={label} to={to} style={{ color: '#BCAAA4', textDecoration: 'none', fontSize: '0.9rem' }}>{label}</Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ color: '#D4735C', fontSize: '1rem', fontWeight: '700', marginBottom: '24px' }}>Contact Us</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <MapPin style={{ width: '18px', height: '18px', color: '#D4735C', flexShrink: 0, marginTop: '2px' }} />
                <span style={{ color: '#BCAAA4', fontSize: '0.875rem', lineHeight: '1.6' }}>123 Beauty Street, Manila,<br />Philippines</span>
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

        {/* Copyright */}
        <div style={{
          backgroundColor: '#2C1810',
          borderTop: '1px solid rgba(212,115,92,0.2)',
          padding: '20px 48px',
          textAlign: 'center',
        }}>
          <p style={{ color: '#8D6E63', fontSize: '0.85rem' }}>© 2026 The Five Star Salon. All rights reserved.</p>
        </div>
      </footer>

    </div>
  );
}