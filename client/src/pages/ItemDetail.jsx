import { useParams, useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import api from '../services/axios';
import { AuthContext } from '../context/AuthContext';

function ItemDetail() {
  const { id, type } = useParams(); // type: lost/found
  const { token } = useContext(AuthContext);
  const [item, setItem] = useState(null);
  const [userItems, setUserItems] = useState([]);
  const [selectedItemId, setSelectedItemId] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchItem();
    fetchUserItems();
  }, []);

  const fetchItem = async () => {
    try {
      const res = await api.get(`/items/${type}/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setItem(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchUserItems = async () => {
    try {
      const oppositeType = type === 'lost' ? 'found' : 'lost';
      const res = await api.get(`/items/user/${oppositeType}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUserItems(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSendRequest = async () => {
    if (!selectedItemId) {
      const addRoute = type === 'lost' ? '/add/found' : '/add/lost';
      const confirm = window.confirm(`You don't have a ${type === 'lost' ? 'found' : 'lost'} item. Add one now?`);
      if (confirm) navigate(addRoute);
      return;
    }

    try {
      const payload = {
        lostItemId: type === 'lost' ? id : selectedItemId,
        foundItemId: type === 'found' ? id : selectedItemId
      };

      await api.post('/requests', payload, {
        headers: { Authorization: `Bearer ${token}` }
      });

      alert('Request sent successfully!');
      navigate('/profile');
    } catch (err) {
      alert('Failed to send request');
      console.error(err);
    }
  };

  if (!item) return <div>Loading...</div>;

  return (
    <div>
      <h2>Item Details</h2>
      <img src={`http://localhost:5000${item.imageUrl}`} alt={item.name} width="300" />
      <p><strong>Name:</strong> {item.name}</p>
      <p><strong>Brand:</strong> {item.brand}</p>
      <p><strong>Category:</strong> {item.category}</p>
      <p><strong>Location:</strong> {item.location}</p>
      <p><strong>Date:</strong> {new Date(item.date).toLocaleDateString()}</p>
      <p><strong>Code:</strong> {item.itemCode}</p>

      <hr />
      <h3>{type === 'lost' ? 'I Found This' : 'Claim This'} Item</h3>

      <label>
        Select your {type === 'lost' ? 'Found' : 'Lost'} Item:
        <select value={selectedItemId} onChange={e => setSelectedItemId(e.target.value)}>
          <option value="">-- Select --</option>
          {userItems.map(userItem => (
            <option key={userItem.id} value={userItem.id}>
              {userItem.name} (Code: {userItem.itemCode})
            </option>
          ))}
        </select>
      </label>

      <button onClick={handleSendRequest}>
        {type === 'lost' ? 'I Found This Item' : 'Claim This Item'}
      </button>
    </div>
  );
}

export default ItemDetail;
