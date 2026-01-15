import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';

function Booking() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const preSelectedService = queryParams.get('service') || "Haircut"; 
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState(preSelectedService); 
  const [date, setDate] = useState("");
  const [message, setMessage] = useState("");

  const handleBooking = async (e) => {
    e.preventDefault();
    setMessage("Booking...");
    try {
      await addDoc(collection(db, "appointments"), {
        customerName: name,
        customerPhone: phone,
        serviceType: service,
        appointmentDate: date,
        createdAt: new Date()
      });
      setMessage(" Booking successful! See you soon.");
      setName(""); setPhone(""); setDate("");
    } catch (error) {
      setMessage(" Error: " + error.message);
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', textAlign: 'center', color: 'white' }}>
      <h1>Book an Appointment</h1>
      
      <form onSubmit={handleBooking} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        
        <label style={{textAlign: 'left', fontWeight: 'bold'}}>Service Selected:</label>
        <select 
          value={service} 
          onChange={(e) => setService(e.target.value)} 
          style={{ padding: '10px', fontSize: '16px' }}
        >
          {/* We added the `selected` attribute to make sure the right one shows up */}
          <option value={service}>{service}</option>
          <hr />
          <option value="Haircut">Haircut</option>
          <option value="Hair Color">Hair Color</option>
          <option value="Manicure">Manicure</option>
          <option value="Pedicure">Pedicure</option>
          <option value="Facial">Facial</option>
          <option value="Bridal party packages">Bridal party packages</option>
        </select>

        <input type="text" placeholder="Your Name" value={name} onChange={(e) => setName(e.target.value)} required style={{ padding: '10px' }} />
        <input type="tel" placeholder="Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)} required style={{ padding: '10px' }} />
        <input type="datetime-local" value={date} onChange={(e) => setDate(e.target.value)} required style={{ padding: '10px' }} />
        
        <button type="submit" style={{ padding: '12px', backgroundColor: '#28a745', color: 'white', border: 'none', cursor: 'pointer', fontSize: '16px' }}>
          Confirm Booking
        </button>
      </form>
      {message && <p style={{marginTop: '20px'}}>{message}</p>}
    </div>
  );
}

export default Booking;