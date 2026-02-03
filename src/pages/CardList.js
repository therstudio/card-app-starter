import { useEffect, useState } from "react";
import Card from "../components/Card";
import { getCards, deleteCard } from "../services/api";

export default function CardList() {
  const token = localStorage.getItem("token");
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  // Fetch cards data when the component mounts
  // useEffect(() => {
  //   const fetchCards = async () => {
  //     try {
  //       const data = await getCards();
  //       setCards(data);
  //     } catch (err) {
  //       setError("Failed to load cards");
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchCards();
  // }, []);

  // I changed it outside so that i can use this async function to reload. if nest it in useEffect u cant reuse the function
  async function load() {
    setLoading(true);
    setError("");
    try {
      const data = await getCards();
      setCards(Array.isArray(data) ? data : []);
    } catch (e) {
      setError(e.message || "Failed to load cards.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);
  // Handle card deletion
  const handleDelete = async (card) => {
    // We protect this route by checking if the card has an id first
    if (!card?.id) return;
    setBusy(true);
    //Add confirmation window
    const ok = window.confirm(`Delete "${card.card_name}"?`);
    if (!ok) return;
    try {
      await deleteCard(card.id); // Assuming card has an id (protected via first statement)
      setCards(cards.filter((c) => c.id !== card.id));
    } catch (err) {
      setError("Failed to delete the card");
    } finally {
      setBusy(false);
    }
  };

  if (loading) return <p>Loading cards...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <main className="container">
        <div className="pageHeader">
          <div>
            <h1>Card List</h1>
            <p className="muted">Manage your cards (view, edit, delete).</p>
          </div>
          <button className="btn" onClick={load} disabled={loading || !!busy}>
            {loading ? "Loading..." : "Refresh"}
          </button>
        </div>

        {error ? <div className="alert alert--error">{error}</div> : null}

        {loading ? (
          <div className="status">Fetching cards…</div>
        ) : cards.length === 0 ? (
          <div className="status">No cards found. Add one!</div>
        ) : (
          <div className="grid">
            {cards.map((card) => (
              <Card
                key={card.id}
                card={card}
                busy={busy === card.id}
                onDelete={token ? handleDelete : null}
              />
            ))}
          </div>
        )}
      </main>
    </>
  );
}
