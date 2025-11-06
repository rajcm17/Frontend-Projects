import { NavLink } from "react-router-dom";
import { useTodos } from "../context/TodoContext";

export default function NavBar() {
  const { stats } = useTodos();
  return (
    <nav className="nav">
      <div className="brand">✅ React To-Do</div>
      <div className="links">
        <NavLink to="/" end>Home</NavLink>
        <NavLink to="/stats">Stats</NavLink>
        <NavLink to="/about">About</NavLink>
      </div>
      <div className="badge" title="Total tasks">{stats.total}</div>
    </nav>
  );
}
