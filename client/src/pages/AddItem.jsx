import { useState, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../services/axios';
import { AuthContext } from '../context/AuthContext';

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
      for (let key in formData) {
        data.append(key, formData[key]);
      }

      const res = await api.post(`/items/add/${type}`, data, {
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
    <div>
      <h2>Add {type === 'lost' ? 'Lost' : 'Found'} Item</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Item Name" onChange={handleChange} required />
        <input name="brand" placeholder="Brand" onChange={handleChange} required />
        <input name="category" placeholder="Category" onChange={handleChange} required />
        <input name="location" placeholder="Location" onChange={handleChange} required />
        <input name="date" type="date" onChange={handleChange} required />
        <input type="file" accept="image/*" onChange={handleImageChange} required />
        <button type="submit">Add Item</button>
      </form>
    </div>
  );
}

export default AddItem;
