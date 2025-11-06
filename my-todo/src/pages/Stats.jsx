import { useTodos } from "../context/TodoContext";

export default function Stats() {
  const { stats } = useTodos();
  return (
    <section className="card">
      <h2>📊 Your Stats</h2>
      <div className="stats-grid">
        <div className="stat"><div className="label">Total</div><div className="value">{stats.total}</div></div>
        <div className="stat"><div className="label">Active</div><div className="value">{stats.active}</div></div>
        <div className="stat"><div className="label">Completed</div><div className="value">{stats.completed}</div></div>
        <div className="stat"><div className="label">Completion</div><div className="value">{stats.completionRate}%</div></div>
      </div>
      <p className="muted">Stats update automatically as you add/finish tasks.</p>
    </section>
  );
}
