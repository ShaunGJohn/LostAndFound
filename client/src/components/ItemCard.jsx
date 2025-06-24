/*function ItemCard({ item }) {
  return (
    <div className="card">
      <img src={`http://localhost:5000${item.imageUrl}`} alt={item.name} width="200" />
      <h4>{item.name}</h4>
      <p><strong>Item ID:</strong> {item.itemCode}</p>
      <p>Brand: {item.brand}</p>
      <p>Category: {item.category}</p>
      <p>Place: {item.location}</p>
      <p>Date: {new Date(item.date).toLocaleDateString()}</p>
    </div>
  );
}

export default ItemCard;*/

/*
import { Link } from 'react-router-dom';

function ItemCard({ item }) {
  return (
    <div className="card">
      <Link to={`/item/${item.type}/${item.id}`}>
        <img src={item.imageUrl} alt={item.name} width="200" />
        <h4>{item.name}</h4>
      </Link>
      <p>Brand: {item.brand}</p>
      <p>Category: {item.category}</p>
      <p>Place: {item.location}</p>
      <p>Date: {new Date(item.date).toLocaleDateString()}</p>
    </div>
  );
}

export default ItemCard;
*/
/*
import { useNavigate } from 'react-router-dom';

function ItemCard({ item }) {
  const navigate = useNavigate();

  return (
    <div className="card" onClick={() => navigate(`/items/${item.type}/${item.id}`)} style={{ cursor: 'pointer' }}>
      
      <img src={`http://localhost:5000${item.imageUrl}`} alt={item.name} width="200" />

      <h4>{item.name}</h4>
      <p>Brand: {item.brand}</p>
      <p>Category: {item.category}</p>
      <p>Place: {item.location}</p>
      <p>Date: {new Date(item.date).toLocaleDateString()}</p>
      <p><strong>Code:</strong> {item.itemCode}</p>
    </div>
  );
}
  export default ItemCard;
*/



import { Link } from 'react-router-dom';

function ItemCard({ item }) {
  return (
    <Link to={`/items/${item.type}/${item.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
      <div className="card">
        <img src={`http://localhost:5000${item.imageUrl}`} alt={item.name} width="200" />
        <h4>{item.name}</h4>
        <p>Brand: {item.brand}</p>
        <p>Category: {item.category}</p>
        <p>Place: {item.location}</p>
        <p>Date: {new Date(item.date).toLocaleDateString()}</p>
        {item.user?.name && <p><strong>Posted by:</strong> {item.user.name}</p>}
      </div>
    </Link>
  );
}


export default ItemCard;