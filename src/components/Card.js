import { Link } from "react-router-dom";

export default function Card({ card, onDelete, busy }) {
  const handleDelete = () => {
    if (!busy) {
      onDelete(card); // Call the delete function with the card object
    }
  };

  return (
    <div className="card">
      <img src={card.image} alt={card.name} className="card-image" />
      <h2 className="card-name">{card.name}</h2>
      <p className="card-id">ID: {card.id}</p>

      <div className="card-actions">
        <Link to={`/edit/${card.id}`} className="edit-button">
          Edit
        </Link>
        <button
          onClick={handleDelete}
          className="delete-button"
          disabled={busy} // Disable the delete button while busy
        >
          {busy ? "Deleting..." : "Delete"}
        </button>
      </div>
    </div>
  );
}
