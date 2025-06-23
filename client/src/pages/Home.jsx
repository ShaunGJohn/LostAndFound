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
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setItems(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (!token) navigate('/');
    fetchItems();
  }, [view]);

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
