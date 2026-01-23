import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CardForm from "../components/CardForm";
import { addCard } from "../services/api";

export default function AddCard() {
  const navigate = useNavigate();

  const [values, setValues] = useState({
    card_name: "",
    card_pic: "",
  });

  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  function handleChange(e) {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setBusy(true);
    try {
      await addCard(values);
      navigate("/cards");
    } catch (e2) {
      setError(e2.message || "Failed to add card.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <>
      <main className="container">
        <div className="pageHeader">
          <div>
            <h1>Add Card</h1>
            <p className="muted">
              Create a new card by providing name + image URL.
            </p>
          </div>
        </div>

        <CardForm
          values={values}
          onChange={handleChange}
          onSubmit={handleSubmit}
          busy={busy}
          error={error}
          submitText="Add Card"
        />
      </main>
    </>
  );
}
