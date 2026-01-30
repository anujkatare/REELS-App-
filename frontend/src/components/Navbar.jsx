import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();

  const activeClass = (path) =>
    location.pathname === path
      ? "text-pink-400"
      : "text-zinc-400";

  return (
    <nav
      id="bottom-navbar"
      className="fixed bottom-0 left-0 right-0 h-14 bg-black border-t border-zinc-800 flex justify-around items-center z-50"
    >
      <Link to="/" className={activeClass("/")}>
        Home
      </Link>

      <Link to="/anonymous" className={activeClass("/anonymous")}>
        Chat
      </Link>

      <Link to="/reels" className={activeClass("/reels")}>
        Reels
      </Link>

      <Link to="/search" className={activeClass("/search")}>
        Search
      </Link>

      <Link to="/app" className={activeClass("/app")}>
        App
      </Link>
    </nav>
  );
}
