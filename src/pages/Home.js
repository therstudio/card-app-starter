import { Link } from "react-router-dom";

export default function Home() {
  return (
    <>
      <main className="container">
        <section className="hero">
          <div className="hero__content">
            <h1 className="hero__title">
              Card Manager (Week 10 Problem Statement)
            </h1>
            <p className="hero__subtitle">
              A simple full-stack CRUD app (React + Express + MySQL) made by
              Team Nugget.
            </p>

            <div className="callout">
              <strong>How it works:</strong>
              <ul>
                <li>View all cards from the backend</li>
                <li>Add a new card (name + image URL)</li>
                <li>Edit existing cards</li>
                <li>Delete cards you don’t need</li>
              </ul>
            </div>

            <div className="hero__actions">
              <Link className="btn" to="/cards">
                View Cards
              </Link>
              <Link className="btn btn--primary" to="/cards/new">
                Add New Card
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
