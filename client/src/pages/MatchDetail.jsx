import { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/axios';
import { AuthContext } from '../context/AuthContext';

function MatchDetail() {
  const { id } = useParams(); // requestId
  const { token } = useContext(AuthContext);
  const [match, setMatch] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMatch = async () => {
      try {
        const res = await api.get(`/requests/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setMatch(res.data);
      } catch (err) {
        console.error('Error fetching match:', err);
        setError('Failed to fetch match details');
      }
    };

    fetchMatch();
  }, [id, token]);

  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  if (!match) return <p>Loading match details...</p>;

  const { sender, lostItem, foundItem, status } = match;

  return (
    <div>
      <h2>🎯 Matched Items</h2>
      <p><strong>Status:</strong> {status}</p>

      <hr />

      <h3>👤 Matched With</h3>
      <p><strong>Name:</strong> {sender.name}</p>
      <p><strong>Email:</strong> {sender.email}</p>
      <p><strong>Phone:</strong> {sender.phone}</p>

      <hr />

      <div style={{ display: 'flex', gap: '2rem' }}>
        {lostItem && (
          <div style={{ flex: 1 }}>
            <h3>📦 Lost Item</h3>
            <p><strong>Name:</strong> {lostItem.name}</p>
            <p><strong>Brand:</strong> {lostItem.brand}</p>
            <p><strong>Category:</strong> {lostItem.category}</p>
            <p><strong>Location:</strong> {lostItem.location}</p>
            <p><strong>Date:</strong> {new Date(lostItem.date).toLocaleDateString()}</p>
            {lostItem.imageUrl && <img src={lostItem.imageUrl} alt="Lost" width="150" />}
          </div>
        )}

        {foundItem && (
          <div style={{ flex: 1 }}>
            <h3>🔍 Found Item</h3>
            <p><strong>Name:</strong> {foundItem.name}</p>
            <p><strong>Brand:</strong> {foundItem.brand}</p>
            <p><strong>Category:</strong> {foundItem.category}</p>
            <p><strong>Location:</strong> {foundItem.location}</p>
            <p><strong>Date:</strong> {new Date(foundItem.date).toLocaleDateString()}</p>
            {foundItem.imageUrl && <img src={foundItem.imageUrl} alt="Found" width="150" />}
          </div>
        )}
      </div>
    </div>
  );
}

export default MatchDetail;
