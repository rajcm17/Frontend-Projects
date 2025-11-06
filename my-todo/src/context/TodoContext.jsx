import { createContext, useContext, useEffect, useMemo, useState } from "react";

const TodoContext = createContext(null);

export function TodoProvider({ children }) {
  const [todos, setTodos] = useState(() => {
    try {
      const raw = localStorage.getItem("todos");
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = (text) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    setTodos((t) => [{ id: Date.now(), text: trimmed, done: false }, ...t]);
  };

  const toggleDone = (id) => {
    setTodos((t) => t.map(item => item.id === id ? { ...item, done: !item.done } : item));
  };

  const deleteTodo = (id) => {
    setTodos((t) => t.filter(item => item.id !== id));
  };

  const clearCompleted = () => {
    setTodos((t) => t.filter(item => !item.done));
  };

  const stats = useMemo(() => {
    const total = todos.length;
    const completed = todos.filter(t => t.done).length;
    const active = total - completed;
    const completionRate = total ? Math.round((completed / total) * 100) : 0;
    return { total, completed, active, completionRate };
  }, [todos]);

  const value = { todos, addTodo, toggleDone, deleteTodo, clearCompleted, stats };
  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
}

export function useTodos() {
  const ctx = useContext(TodoContext);
  if (!ctx) throw new Error("useTodos must be used inside <TodoProvider>");
  return ctx;
}
