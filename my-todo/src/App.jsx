import { Routes, Route, Outlet } from "react-router-dom";
import NavBar from "./components/NavBar";
import Todos from "./pages/Todos";
import Stats from "./pages/Stats";
import About from "./pages/About";

function Layout() {
  return (
    <div className="app">
      <NavBar />
      <main className="content">
        <Outlet />
      </main>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Todos />} />
        <Route path="/stats" element={<Stats />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<div className="empty">Page not found</div>} />
      </Route>
    </Routes>
  );
}
