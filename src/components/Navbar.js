import { NavLink } from "react-router-dom";
import "./Navbar.css"; 

export default function Navbar() {
  return (
    <header className="navbar-header">
      <div className="navbar-container">
        <strong className="navbar-brand">Card App</strong>
        <nav className="navbar-links">
          <NavLink to="/" end>
            Home
          </NavLink>
          <NavLink to="/cards">
            Card List
          </NavLink>
          <NavLink to="/add">
            Add Card
          </NavLink>
        </nav>
      </div>
    </header>
  );
}