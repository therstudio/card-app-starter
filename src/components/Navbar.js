import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="nav">
      <div className="nav__inner">
        <strong className="nav__brand">Card App</strong>

        <nav className="nav__links">
          <NavLink
            to="/"
            end
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Home
          </NavLink>
          <NavLink
            to="/cards"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Card List
          </NavLink>
          <NavLink
            to="/cards/new"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Add Card
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
