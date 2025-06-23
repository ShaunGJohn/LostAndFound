/*import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

function Profile() {
  const { user } = useContext(AuthContext);

  return (
    <div>
      <h2>👤 User Profile</h2>
      <div>
        <p><strong>Name:</strong> {user?.name}</p>
        <p><strong>Email:</strong> {user?.email}</p>
        <p><strong>Phone:</strong> {user?.phone}</p>
        
      </div>

      <hr />

      <div style={{ display: 'flex', gap: '2rem' }}>
        <div style={{ flex: 1 }}>
          <h3>📦 Your Lost Items <button onClick={() => window.location.href = '/add/lost'}>➕</button></h3>
          
        </div>

        <div style={{ flex: 1 }}>
          <h3>🔍 Your Found Items <button onClick={() => window.location.href = '/add/found'}>➕</button></h3>
          
        </div>
      </div>
    </div>
  );
}

export default Profile;
*/



import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import api from '../services/axios';
import ItemCard from '../components/ItemCard';

function Profile() {
  const { token, user } = useContext(AuthContext);
  const [profile, setProfile] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [pic, setPic] = useState(null);
  const [lostItems, setLostItems] = useState([]);
  const [foundItems, setFoundItems] = useState([]);

  useEffect(() => {
    fetchProfile();
    fetchUserItems();
  }, []);

  const fetchProfile = async () => {
    const res = await api.get('/user/me', {
      headers: { Authorization: `Bearer ${token}` }
    });
    setProfile(res.data);
  };

  const fetchUserItems = async () => {
    const lost = await api.get(`/items/user/lost`, { headers: { Authorization: `Bearer ${token}` } });
    const found = await api.get(`/items/user/found`, { headers: { Authorization: `Bearer ${token}` } });
    setLostItems(lost.data);
    setFoundItems(found.data);
  };

  const handleUpdate = async () => {
    await api.put('/user/me', {
      name: profile.name,
      phone: profile.phone
    }, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setEditMode(false);
  };

  const handlePicUpload = async () => {
    const data = new FormData();
    data.append('profilePic', pic);
    await api.post('/user/me/profile-pic', data, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data'
      }
    });
    fetchProfile();
  };

  return (
    <div>
      <h2>👤 User Profile</h2>
      <div>
        {profile.profilePic && (
          <img src={profile.profilePic} alt="Profile" width="100" />
        )}
        <input type="file" onChange={e => setPic(e.target.files[0])} />
        <button onClick={handlePicUpload}>Upload Pic</button>
      </div>

      {editMode ? (
        <>
          <input value={profile.name} onChange={e => setProfile({ ...profile, name: e.target.value })} />
          <input value={profile.phone} onChange={e => setProfile({ ...profile, phone: e.target.value })} />
          <button onClick={handleUpdate}>Save</button>
        </>
      ) : (
        <>
          <p><strong>Name:</strong> {profile.name}</p>
          <p><strong>Email:</strong> {profile.email}</p>
          <p><strong>Phone:</strong> {profile.phone}</p>
          <button onClick={() => setEditMode(true)}>Edit Profile</button>
        </>
      )}

      <hr />

      <div style={{ display: 'flex', gap: '2rem' }}>
        <div style={{ flex: 1 }}>
          <h3>📦 Your Lost Items <button onClick={() => window.location.href = '/add/lost'}>➕</button></h3>
          {lostItems.map(item => <ItemCard key={item.id} item={item} />)}
        </div>

        <div style={{ flex: 1 }}>
          <h3>🔍 Your Found Items <button onClick={() => window.location.href = '/add/found'}>➕</button></h3>
          {foundItems.map(item => <ItemCard key={item.id} item={item} />)}
        </div>
      </div>
    </div>
  );
}

export default Profile;
