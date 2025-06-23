/*import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import api from '../services/axios';
import ItemCard from '../components/ItemCard';

function Home() {
  const { user, logout, token } = useContext(AuthContext);
  const [view, setView] = useState('lost'); // 'lost' or 'found'
  const [items, setItems] = useState([]);
  const navigate = useNavigate();

  

  const fetchItems = async () => {
  try {
    console.log("🟡 Fetching:", view);  // 👈 Add this
    const res = await api.get(`/items/${view}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    console.log("📦 Items received:", res.data); // 👈 Add this
    setItems(res.data);
  } catch (err) {
    console.error("❌ Fetch Error:", err);
  }
};


  useEffect(() => {
  if (!token) {
    navigate('/');
  } else {
    fetchItems(); // ✅ re-fetch when view or token changes
  }
}, [view, token]);


  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h2>Welcome, {user?.name}</h2>
        <button onClick={() => { logout(); navigate('/'); }}>Logout</button>
      </div>

      <div>
        <button onClick={() => setView('lost')}>Lost</button>
        <button onClick={() => setView('found')}>Found</button>

        <button onClick={() => navigate('/add/lost')}>➕ Add Lost Item</button>
        <button onClick={() => navigate('/add/found')}>➕ Add Found Item</button>

      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
        {items.map(item => (
          <ItemCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}

export default Home;
*/


import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import api from '../services/axios';
import ItemCard from '../components/ItemCard';

function Home() {
  const { user, logout, token } = useContext(AuthContext);
  const [view, setView] = useState('lost'); // 'lost' or 'found'
  const [items, setItems] = useState([]);
  const navigate = useNavigate();

  const fetchItems = async () => {
    try {
      const res = await api.get(`/items/${view}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setItems(res.data);
    } catch (err) {
      console.error('❌ Fetch Error:', err);
    }
  };

  useEffect(() => {
    if (!token) navigate('/');
    else fetchItems();
  }, [view, token]);

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h2>Welcome, {user?.name}</h2>
        <div>
          <button onClick={() => navigate('/profile')}>👤 View Profile</button>
          <button onClick={() => { logout(); navigate('/'); }}>Logout</button>
        </div>
      </div>

      <div>
        <button onClick={() => setView('lost')}>Lost</button>
        <button onClick={() => setView('found')}>Found</button>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
        {items.map(item => (
          <ItemCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}

export default Home;
