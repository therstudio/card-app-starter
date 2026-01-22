import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CardForm from "../components/CardForm";
import { addCard } from "../services/api";

export default function AddCard() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = async (cardData) => {
    setLoading(true);
    try {
      await addCard(cardData); // Assuming addCard takes the card data
      navigate("/cards"); // Navigate to the Cards page after successful addition
    } catch (err) {
      setError("Failed to add the card.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="add-card-form">
      <h1>Add New Card</h1>
      {error && <p className="error">{error}</p>}
      <CardForm onSubmit={handleSubmit} loading={loading} />
      {loading && <p>Submitting...</p>}
    </main>
  );
}
