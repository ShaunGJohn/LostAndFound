import { useState, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../services/axios';
import { AuthContext } from '../context/AuthContext';
import './AddItem.css';

function AddItem() {
  const { type } = useParams();
  const { token } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    name: '',
    brand: '',
    category: '',
    location: '',
    date: '',
    image: null
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = e => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const data = new FormData();
      Object.keys(formData).forEach(key => {
        data.append(key, formData[key]);
      });

      await api.post(`/items/add/${type}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });

      navigate('/home');
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Failed to add item');
    }
  };

  return (
    <div className="add-item-container">
      <div className="add-item-card">
        <h2 className="form-title">Add {type === 'lost' ? 'Lost' : 'Found'} Item</h2>
        {error && <p className="form-error">{error}</p>}
        <form onSubmit={handleSubmit} className="form-grid">
          <input name="name" placeholder="Item Name" onChange={handleChange} required />
          <input name="brand" placeholder="Brand" onChange={handleChange} required />
          <input name="category" placeholder="Category" onChange={handleChange} required />
          <input name="location" placeholder="Location" onChange={handleChange} required />
          <input name="date" type="date" onChange={handleChange} required />
          <input type="file" accept="image/*" onChange={handleImageChange} required />
          <button type="submit" className="submit-btn">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default AddItem;
