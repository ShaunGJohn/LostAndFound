import { useParams, useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import api from '../services/axios';
import { AuthContext } from '../context/AuthContext';
import './ItemDetail.css'; // Create this CSS file to style

function ItemDetail() {
  const { id, type } = useParams();
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

  if (!item) return <div className="container text-center mt-5">Loading...</div>;

  return (
    <div className="container item-detail-container mt-4">
      <div className="card shadow p-4">
        <div className="row">
          <div className="col-md-5 text-center">
            <img
              src={`http://localhost:5000${item.imageUrl}`}
              alt={item.name}
              className="img-fluid rounded item-image"
            />
          </div>
          <div className="col-md-7">
            <h2 className="item-title">{item.name}</h2>
            <p><strong>Brand:</strong> {item.brand}</p>
            <p><strong>Category:</strong> {item.category}</p>
            <p><strong>Location:</strong> {item.location}</p>
            <p><strong>Date:</strong> {new Date(item.date).toLocaleDateString()}</p>
            <p><strong>Code:</strong> {item.itemCode}</p>
          </div>
        </div>
      </div>

      <div className="card shadow p-4 mt-4">
        <h4 className="mb-3">
          {type === 'lost' ? 'I Found This' : 'Claim This'} Item
        </h4>

        <div className="mb-3">
          <label htmlFor="item-select" className="form-label">
            Select your {type === 'lost' ? 'Found' : 'Lost'} item:
          </label>
          <select
            className="form-select"
            id="item-select"
            value={selectedItemId}
            onChange={e => setSelectedItemId(e.target.value)}
          >
            <option value="">-- Select --</option>
            {userItems.map(userItem => (
              <option key={userItem.id} value={userItem.id}>
                {userItem.name} (Code: {userItem.itemCode})
              </option>
            ))}
          </select>
        </div>

        <button className="btn btn-purple" onClick={handleSendRequest}>
          {type === 'lost' ? '📤 I Found This Item' : '📩 Claim This Item'}
        </button>
      </div>
    </div>
  );
}

export default ItemDetail;
