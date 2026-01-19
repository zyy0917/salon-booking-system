import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  return (
    <div style={{ width: '100%' }}>
      
      {/* 1. HERO SECTION - Full Screen Image */}
      <div style={{ 
        height: '90vh', /* Takes up 90% of the screen height */
        width: '100%',
        backgroundImage: 'url("https://images.unsplash.com/photo-1633681926022-84c23e8cb2d6?q=80&w=2070&auto=format&fit=crop")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        
        {/* Dark Overlay so text is readable */}
        <div style={{
          position: 'absolute',
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.4)'
        }}></div>

        {/* Text Content */}
        <div style={{ 
          position: 'relative', 
          zIndex: 1, 
          textAlign: 'center', 
          color: 'white',
          padding: '20px'
        }}>
          <h1 style={{ fontSize: '4rem', marginBottom: '20px', fontWeight: '300', letterSpacing: '2px' }}>
            LUXE SALON
          </h1>
          <p style={{ fontSize: '1.5rem', marginBottom: '30px', fontWeight: '300' }}>
            Where beauty meets tranquility.
          </p>
          <button 
            onClick={() => navigate('/services')}
            style={{ 
              padding: '15px 40px', 
              fontSize: '18px', 
              backgroundColor: 'white', 
              color: 'black', 
              border: 'none', 
              borderRadius: '0px', 
              textTransform: 'uppercase',
              letterSpacing: '1px',
              transition: '0.3s'
            }}
          >
            View Services
          </button>
        </div>
      </div>

      {/* 2. WHITE SPACE / INTRO */}
      <div style={{ padding: '80px 20px', textAlign: 'center', backgroundColor: 'white' }}>
        <h2 style={{ fontSize: '2.5rem', marginBottom: '20px', fontWeight: '300' }}>Redefining Elegance</h2>
        <p style={{ maxWidth: '700px', margin: '0 auto', color: '#666', fontSize: '1.1rem', lineHeight: '1.8' }}>
          We provide a sanctuary from the hustle of everyday life. Our expert stylists and estheticians are dedicated to enhancing your natural beauty using only the finest sustainable products.
        </p>
      </div>

      {/* 3. IMAGE GRID (Visual Appeal) */}
      <div style={{ display: 'flex', flexWrap: 'wrap', width: '100%' }}>
        <div style={{ flex: '1 1 300px', height: '400px', backgroundImage: 'url("https://images.unsplash.com/photo-1562322140-8baeececf3df?q=80&w=2069")', backgroundSize: 'cover' }}></div>
        <div style={{ flex: '1 1 300px', height: '400px', backgroundImage: 'url("https://images.unsplash.com/photo-1600948836101-f9ffda59d250?q=80&w=2036")', backgroundSize: 'cover' }}></div>
        <div style={{ flex: '1 1 300px', height: '400px', backgroundImage: 'url("https://images.unsplash.com/photo-1522337660859-02fbefca4702?q=80&w=2069")', backgroundSize: 'cover' }}></div>
      </div>

    </div>
  );
}

export default Home;