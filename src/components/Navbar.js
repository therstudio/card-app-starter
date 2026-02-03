import { NavLink, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  // Check if user is logged in
  const token = localStorage.getItem("token");

  function handleLogout() {
    localStorage.removeItem("token");
    navigate("/login");
  }

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

          {token ? (
            <button onClick={handleLogout}>Logout</button>
          ) : (
            <NavLink
              to="/login"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Login
            </NavLink>
          )}
        </nav>
      </div>
    </header>
  );
}
