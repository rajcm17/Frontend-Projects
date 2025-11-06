import { useMemo, useState } from "react";
import { useTodos } from "../context/TodoContext";

const FILTERS = {
  all: () => true,
  active: (t) => !t.done,
  completed: (t) => t.done,
};

export default function Todos() {
  const { todos, addTodo, toggleDone, deleteTodo, clearCompleted } = useTodos();
  const [text, setText] = useState("");
  const [filter, setFilter] = useState("all");

  const visible = useMemo(() => todos.filter(FILTERS[filter]), [todos, filter]);
  const remaining = todos.filter(t => !t.done).length;

  const onSubmit = (e) => {
    e.preventDefault();
    addTodo(text);
    setText("");
  };

  return (
    <>
      <form onSubmit={onSubmit} className="row">
        <input
          type="text"
          placeholder="Add a task…"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>

      <div className="row topbar">
        <div className="filters">
          <button className={filter === "all" ? "active" : ""} onClick={() => setFilter("all")}>All</button>
          <button className={filter === "active" ? "active" : ""} onClick={() => setFilter("active")}>Active</button>
          <button className={filter === "completed" ? "active" : ""} onClick={() => setFilter("completed")}>Completed</button>
        </div>
        <button className="ghost" onClick={clearCompleted}>Clear completed</button>
      </div>

      {visible.length === 0 ? (
        <div className="empty">Nothing here. Add your's daily task ✨</div>
      ) : (
        <>
          <ul className="list">
            {visible.map(t => (
              <li key={t.id} className="item">
                <input type="checkbox" checked={t.done} onChange={() => toggleDone(t.id)} />
                <span className={`text ${t.done ? "done" : ""}`}>{t.text}</span>
                <button className="delete" onClick={() => deleteTodo(t.id)}>Delete</button>
              </li>
            ))}
          </ul>
          <div className="count">
            {remaining} task(s) remaining , Add another task· <span className="muted">{todos.length} total</span>
          </div>
        </>
      )}
    </>
  );
}
