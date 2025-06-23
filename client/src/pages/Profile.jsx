
/*

import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import api from '../services/axios';
import ItemCard from '../components/ItemCard';

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

  // ✅ Accept/Decline handlers
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
          {lostItems.map(item => (
            <div key={item.id}>
              <ItemCard item={item} />
              
              {requests.filter(r => r.lostItemId === item.id).map(req => (
                <div key={req.id} style={{ paddingLeft: '1rem', borderLeft: '3px solid #ccc', marginTop: '10px' }}>
                  <p>🧑 From: {req.sender.name} ({req.sender.email})</p>
                  <p>Status: <strong>{req.status}</strong></p>
                  {req.status === 'pending' && (
                    <>
                      <button onClick={() => handleAccept(req.id)}>✅ Accept</button>
                      <button onClick={() => handleDecline(req.id)}>❌ Decline</button>
                    </>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>

        <div style={{ flex: 1 }}>
          <h3>🔍 Your Found Items <button onClick={() => window.location.href = '/add/found'}>➕</button></h3>
          {foundItems.map(item => (
            <div key={item.id}>
              <ItemCard item={item} />
              
              {requests.filter(r => r.foundItemId === item.id).map(req => (
                <div key={req.id} style={{ paddingLeft: '1rem', borderLeft: '3px solid #ccc', marginTop: '10px' }}>
                  <p>🧑 From: {req.sender.name} ({req.sender.email})</p>
                  <p>Status: <strong>{req.status}</strong></p>
                  {req.status === 'pending' && (
                    <>
                      <button onClick={() => handleAccept(req.id)}>✅ Accept</button>
                      <button onClick={() => handleDecline(req.id)}>❌ Decline</button>
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
*/


import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import api from '../services/axios';
import ItemCard from '../components/ItemCard';

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
          {lostItems.map(item => (
            <div key={item.id}>
              <ItemCard item={item} />
              {/* ✅ Combined Request Block for Lost Item */}
              {requests
                .filter(r => r.lostItemId === item.id || r.foundItemId === item.id)
                .map(req => (
                  <div key={req.id} style={{ borderTop: '1px solid gray', marginTop: '10px', paddingLeft: '1rem' }}>
                    <p>🧑 From: {req.sender.name} ({req.sender.email})</p>
                    <p>Status: <strong>{req.status}</strong></p>

                    {req.status === 'pending' && (
                      <>
                        <button onClick={() => handleAccept(req.id)}>✅ Accept</button>
                        <button onClick={() => handleDecline(req.id)}>❌ Decline</button>
                      </>
                    )}

                    {req.status === 'accepted' && (
                      <>
                        <p><strong>🔗 Linked Item Details:</strong></p>
                        <p>Item Name: {req.lostItem?.name || req.foundItem?.name}</p>
                        <p>Brand: {req.lostItem?.brand || req.foundItem?.brand}</p>
                        <p>Contact: {req.sender.phone}</p>
                      </>
                    )}
                  </div>
              ))}
            </div>
          ))}
        </div>

        <div style={{ flex: 1 }}>
          <h3>🔍 Your Found Items <button onClick={() => window.location.href = '/add/found'}>➕</button></h3>
          {foundItems.map(item => (
            <div key={item.id}>
              <ItemCard item={item} />
              {/* ✅ Combined Request Block for Found Item */}
              {requests
                .filter(r => r.lostItemId === item.id || r.foundItemId === item.id)
                .map(req => (
                  <div key={req.id} style={{ borderTop: '1px solid gray', marginTop: '10px', paddingLeft: '1rem' }}>
                    <p>🧑 From: {req.sender.name} ({req.sender.email})</p>
                    <p>Status: <strong>{req.status}</strong></p>

                    {req.status === 'pending' && (
                      <>
                        <button onClick={() => handleAccept(req.id)}>✅ Accept</button>
                        <button onClick={() => handleDecline(req.id)}>❌ Decline</button>
                      </>
                    )}

                    {req.status === 'accepted' && (
                      <>
                        <p><strong>🔗 Linked Item Details:</strong></p>
                        <p>Item Name: {req.lostItem?.name || req.foundItem?.name}</p>
                        <p>Brand: {req.lostItem?.brand || req.foundItem?.brand}</p>
                        <p>Contact: {req.sender.phone}</p>
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
