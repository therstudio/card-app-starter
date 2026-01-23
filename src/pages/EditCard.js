import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";

import CardForm from "../components/CardForm";
import { getCards, updateCard } from "../services/api";

export default function EditCard() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [values, setValues] = useState({
    card_name: "",
    card_pic: "",
  });

  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadCard() {
      setLoading(true);
      setError("");
      try {
        const data = await getCards();
        const found = (Array.isArray(data) ? data : []).find(
          (c) => String(c.id) === String(id),
        );

        if (!found) {
          setError("Card not found.");
        } else {
          setValues({
            card_name: found.card_name || "",
            card_pic: found.card_pic || "",
          });
        }
      } catch (e) {
        setError(e.message || "Failed to load card.");
      } finally {
        setLoading(false);
      }
    }

    loadCard();
  }, [id]);

  function handleChange(e) {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setBusy(true);
    try {
      await updateCard(id, values);
      navigate("/cards");
    } catch (e2) {
      setError(e2.message || "Failed to update card.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <>
      <main className="container">
        <div className="pageHeader">
          <div>
            <h1>Edit Card</h1>
            <p className="muted">
              Editing card <span className="badge">#{id}</span>
            </p>
          </div>
          <Link className="btn" to="/cards">
            Back
          </Link>
        </div>

        {loading ? (
          <div className="status">Loading card…</div>
        ) : error === "Card not found." ? (
          <div className="alert alert--error">{error}</div>
        ) : (
          <CardForm
            values={values}
            onChange={handleChange}
            onSubmit={handleSubmit}
            busy={busy}
            error={error}
            submitText="Save Changes"
          />
        )}
      </main>
    </>
  );
}
