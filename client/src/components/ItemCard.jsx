import { Link } from 'react-router-dom';

function ItemCard({ item }) {
  return (
    <Link to={`/items/${item.type}/${item.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
      <div className="card shadow-sm h-100">
        <img
          src={`http://localhost:5000${item.imageUrl}`}
          alt={item.name}
          className="card-img-top"
          style={{ height: '200px', objectFit: 'cover' }}
        />
        <div className="card-body">
          <h5 className="card-title">{item.name}</h5>
          <p className="card-text">Brand: {item.brand}</p>
          <p className="card-text">Category: {item.category}</p>
          <p className="card-text">Place: {item.location}</p>
          <p className="card-text">Date: {new Date(item.date).toLocaleDateString()}</p>
          {item.user?.name && (
            <p className="card-text"><strong>Posted by:</strong> {item.user.name}</p>
          )}
        </div>
      </div>
    </Link>
  );
}

export default ItemCard;
