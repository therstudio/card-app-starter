import { useEffect, useState } from "react";
import Card from "../components/Card";
import { getCards, deleteCard } from "../services/api";

export default function CardList() {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [busy, setBusy] = useState(false);

  // Fetch cards data when the component mounts
  useEffect(() => {
    const fetchCards = async () => {
      try {
        const data = await getCards();
        setCards(data);
      } catch (err) {
        setError("Failed to load cards");
      } finally {
        setLoading(false);
      }
    };

    fetchCards();
  }, []);

  // Handle card deletion
  const handleDelete = async (card) => {
    setBusy(true);
    try {
      await deleteCard(card.id); // Assuming card has an id
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
    <main>
      <div className="card-grid">
        {cards.map((card) => (
          <Card key={card.id} card={card} onDelete={() => handleDelete(card)} />
        ))}
      </div>
      {busy && <p>Deleting...</p>}
    </main>
  );
}
