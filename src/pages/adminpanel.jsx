import { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';

function AdminPanel() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "appointments"));
        const loadedAppointments = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setAppointments(loadedAppointments);
      } catch (error) {
        console.error("Error loading appointments:", error);
      }
    };
    fetchAppointments();
  }, []);

  return (
    <div style={{ maxWidth: '600px', margin: '50px auto' }}>
      <h1 style={{ textAlign: 'center' }}>Admin Dashboard</h1>
      <div style={{ display: 'grid', gap: '15px' }}>
        {appointments.length === 0 ? <p>No appointments yet.</p> : appointments.map((booking) => (
          <div key={booking.id} style={{ border: '1px solid #ddd', padding: '15px', borderRadius: '8px', backgroundColor: '#242424' }}>
            <h3>{booking.serviceType}</h3>
            <p><strong>Customer:</strong> {booking.customerName}</p>
            <p><strong>Date:</strong> {new Date(booking.appointmentDate).toLocaleString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminPanel;