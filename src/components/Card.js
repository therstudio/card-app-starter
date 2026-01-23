import { Link } from "react-router-dom";

export default function Card({ card, onDelete, busy }) {
  const img = card?.card_pic || "";
  const name = card?.card_name || "(No name)";

  return (
    <div className="card">
      <div className="card__imgWrap">
        {img ? (
          <img className="card__img" src={img} alt={name} />
        ) : (
          <div className="card__imgPlaceholder">No Image</div>
        )}
      </div>

      <div className="card__body">
        <div className="card__top">
          <span className="badge">#{card.id}</span>
        </div>

        <h3 className="card__title" title={name}>
          {name}
        </h3>

        <div className="card__actions">
          <Link className="btn" to={`/cards/${card.id}/edit`}>
            Edit
          </Link>
          <button
            className="btn btn--danger"
            onClick={() => onDelete(card)}
            disabled={busy}
          >
            {busy ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}
