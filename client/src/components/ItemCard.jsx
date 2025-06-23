function ItemCard({ item }) {
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

export default ItemCard;
