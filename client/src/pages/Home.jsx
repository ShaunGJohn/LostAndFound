import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import api from '../services/axios';
import ItemCard from '../components/ItemCard';
import './Home.css';

function Home() {
  const { user, logout, token } = useContext(AuthContext);
  const [view, setView] = useState('lost');
  const [items, setItems] = useState([]);
  const navigate = useNavigate();

  const fetchItems = async () => {
    try {
      const res = await api.get(`/items/${view}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setItems(res.data.map(i => ({ ...i, type: view })));
    } catch (err) {
      console.error('❌ Fetch Error:', err);
    }
  };

  useEffect(() => {
    if (!token) navigate('/');
    else fetchItems();
  }, [view, token]);

  return (
    <div className="home-container container">
      {/* Welcome Header */}
      <div className="dashboard-card dashboard-header">
        <div className="dashboard-header w-100">
  <h2 className="dashboard-title">👋 Welcome, {user?.name}</h2>
  <div className="button-group ms-auto d-flex gap-2">
    <button className="btn btn-outline-purple" onClick={() => navigate('/profile')}>
      👤 View Profile
    </button>
    <button className="btn btn-danger" onClick={() => { logout(); navigate('/'); }}>
      🚪 Logout
    </button>
  </div>
</div>

      </div>

      {/* Action Buttons */}
      <div className="dashboard-card dashboard-buttons">
        <div className="d-flex flex-wrap gap-3 justify-content-start">
          <button
            className={`btn ${view === 'lost' ? 'btn-purple' : 'btn-outline-purple'}`}
            onClick={() => setView('lost')}
          >
            📦 View Lost Items
          </button>
          <button
            className={`btn ${view === 'found' ? 'btn-success' : 'btn-outline-success'}`}
            onClick={() => setView('found')}
          >
            🔍 View Found Items
          </button>
          <button
            className="btn btn-info text-white"
            onClick={() => navigate('/add/lost')}
          >
            ➕ Add Lost Item
          </button>
          <button
            className="btn btn-warning"
            onClick={() => navigate('/add/found')}
          >
            ➕ Add Found Item
          </button>
        </div>
      </div>

      {/* Item Grid */}
      <div className="row item-grid">
        {items.length > 0 ? (
          items.map(item => (
            <div className="col-md-4 mb-4" key={item.id}>
              <ItemCard item={item} />
            </div>
          ))
        ) : (
          <div className="col-12 text-center mt-5">
            <p className="empty-text">No {view} items to display.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
