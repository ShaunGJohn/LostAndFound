import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import api from '../services/axios';
import ItemCard from '../components/ItemCard';
import './Profile.css';

function Profile() {
  const { token } = useContext(AuthContext);
  const [profile, setProfile] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [pic, setPic] = useState(null);
  const [lostItems, setLostItems] = useState([]);
  const [foundItems, setFoundItems] = useState([]);
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    fetchProfile();
    fetchUserItems();
    fetchRequests();
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

  const fetchRequests = async () => {
    const res = await api.get('/requests/received', {
      headers: { Authorization: `Bearer ${token}` }
    });
    setRequests(res.data);
  };

  const handleAccept = async (id) => {
    await api.post(`/requests/${id}/accept`, {}, {
      headers: { Authorization: `Bearer ${token}` }
    });
    fetchRequests();
  };

  const handleDecline = async (id) => {
    await api.post(`/requests/${id}/decline`, {}, {
      headers: { Authorization: `Bearer ${token}` }
    });
    fetchRequests();
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
    <div className="profile-container">
      <h2 className="profile-header">👤 My Profile</h2>

      <div className="profile-section">
        <div className="profile-pic-box">
          {profile.profilePic && (
          <img
            src={profile.profilePic || '/images/profilepic.png'}
            alt="Profile"
            className="profile-pic"
          />
          )}
          <input type="file" onChange={e => setPic(e.target.files[0])} />
          <button className="btn btn-purple mt-2" onClick={handlePicUpload}>Upload Picture</button>
        </div>

        <div className="profile-info-box">
          {editMode ? (
            <>
              <input value={profile.name} onChange={e => setProfile({ ...profile, name: e.target.value })} className="form-control mb-2" />
              <input value={profile.phone} onChange={e => setProfile({ ...profile, phone: e.target.value })} className="form-control mb-2" />
              <button className="btn btn-success me-2" onClick={handleUpdate}>Save</button>
              <button className="btn btn-secondary" onClick={() => setEditMode(false)}>Cancel</button>
            </>
          ) : (
            <>
              <p><strong>Name:</strong> {profile.name}</p>
              <p><strong>Email:</strong> {profile.email}</p>
              <p><strong>Phone:</strong> {profile.phone}</p>
              <button className="btn btn-outline-purple" onClick={() => setEditMode(true)}>Edit Profile</button>
            </>
          )}
        </div>
      </div>

      <div className="item-sections">
        <div className="item-box">
          <h4>📦 Your Lost Items <button className="btn btn-sm btn-outline-purple" onClick={() => window.location.href = '/add/lost'}>➕</button></h4>
          {lostItems.map(item => (
            <div key={item.id} className="mt-3">
              <ItemCard item={item} />
              {requests
                .filter(r => r.lostItemId === item.id)
                .map(req => (
                  <div key={req.id} className="request-box">
                    <p><strong>From:</strong> {req.sender.name} ({req.sender.email})</p>
                    <p><strong>Status:</strong> {req.status}</p>
                    {req.status === 'pending' && (
                      <>
                        <button className="btn btn-success btn-sm me-2" onClick={() => handleAccept(req.id)}>✅ Accept</button>
                        <button className="btn btn-danger btn-sm" onClick={() => handleDecline(req.id)}>❌ Decline</button>
                      </>
                    )}
                  </div>
              ))}
            </div>
          ))}
        </div>

        <div className="item-box">
          <h4>🔍 Your Found Items <button className="btn btn-sm btn-outline-purple" onClick={() => window.location.href = '/add/found'}>➕</button></h4>
          {foundItems.map(item => (
            <div key={item.id} className="mt-3">
              <ItemCard item={item} />
              {requests
                .filter(r => r.foundItemId === item.id)
                .map(req => (
                  <div key={req.id} className="request-box">
                    <p><strong>From:</strong> {req.sender.name} ({req.sender.email})</p>
                    <p><strong>Status:</strong> {req.status}</p>
                    {req.status === 'pending' && (
                      <>
                        <button className="btn btn-success btn-sm me-2" onClick={() => handleAccept(req.id)}>✅ Accept</button>
                        <button className="btn btn-danger btn-sm" onClick={() => handleDecline(req.id)}>❌ Decline</button>
                      </>
                    )}
                  </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Profile;
