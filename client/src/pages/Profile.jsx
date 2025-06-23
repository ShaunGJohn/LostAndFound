import { useContext } from 'react';
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
        {/* TODO: Profile Picture, Edit Button */}
      </div>

      <hr />

      <div style={{ display: 'flex', gap: '2rem' }}>
        <div style={{ flex: 1 }}>
          <h3>📦 Your Lost Items <button onClick={() => window.location.href = '/add/lost'}>➕</button></h3>
          {/* TODO: Display user's lost items here */}
        </div>

        <div style={{ flex: 1 }}>
          <h3>🔍 Your Found Items <button onClick={() => window.location.href = '/add/found'}>➕</button></h3>
          {/* TODO: Display user's found items here */}
        </div>
      </div>
    </div>
  );
}

export default Profile;
