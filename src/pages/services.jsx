import { useNavigate } from 'react-router-dom';

function Services() {
  const navigate = useNavigate();

  // Your Service Data
  const categories = [
    {
      title: "Hair Services",
      services: [
        "Women's cuts and styling", "Men's cuts and styling", "Teen cuts", 
        "Color services (highlights, balayage, ombre)", "Blowouts and styling",
        "Hair treatments (deep conditioning, keratin)", "Special occasion styling"
      ]
    },
    {
      title: "Nail Services",
      services: [
        "Classic manicure & pedicure", "Gel manicure & pedicure", "Acrylic nails",
        "Nail art and designs", "French manicure", "Nail repair and removal"
      ]
    },
    {
      title: "Hand & Foot Spa",
      services: [
        "Luxury spa pedicure", "Paraffin wax treatments", "Callus removal",
        "Foot massage and reflexology", "Hand rejuvenation treatments"
      ]
    },
    {
      title: "Skincare & Esthetics",
      services: [
        "Customized facials", "Teen facials (acne treatment)", "Anti-aging facials",
        "Brow shaping, tinting, lamination", "Lash lifts and tints", "Waxing services", "Basic makeup application"
      ]
    },
    {
      title: "Packages",
      services: [
        "Prom Ready package", "Mother-daughter spa day", "Glow Up teen package", "Bridal party packages"
      ]
    }
  ];

  // When user clicks a service, go to Booking page with that service name
  const handleBook = (serviceName) => {
    navigate(`/book?service=${encodeURIComponent(serviceName)}`);
  };

  return (
    <div style={{ padding: '40px 20px', maxWidth: '1000px', margin: '0 auto', color: 'white' }}>
      <h1 style={{ textAlign: 'center', fontSize: '3rem', marginBottom: '10px' }}>Our Services</h1>
      <p style={{ textAlign: 'center', marginBottom: '40px', color: '#ccc' }}>Select a service to book your appointment.</p>

      {categories.map((cat, index) => (
        <div key={index} style={{ marginBottom: '40px' }}>
          <h2 style={{ borderBottom: '2px solid #28a745', paddingBottom: '10px', marginBottom: '20px' }}>
            {cat.title}
          </h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px' }}>
            {cat.services.map((service, i) => (
              <div key={i} style={{ 
                backgroundColor: '#242424', 
                padding: '20px', 
                borderRadius: '10px', 
                border: '1px solid #444',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}>
                <h3 style={{ fontSize: '1.1rem', marginBottom: '15px' }}>{service}</h3>
                <button 
                  onClick={() => handleBook(service)}
                  style={{ 
                    padding: '10px', 
                    backgroundColor: '#28a745', 
                    color: 'white', 
                    border: 'none', 
                    borderRadius: '5px', 
                    cursor: 'pointer',
                    fontWeight: 'bold'
                  }}
                >
                  Book Now
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Services;