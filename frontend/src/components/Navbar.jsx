import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 h-14 bg-black border-t border-zinc-800 flex justify-around items-center z-50 text-white">
      <Link to="/reels">Home</Link>
      <Link to="/anonymous">Chat</Link>   {/* ✅ FIX */}
      <Link to="/reels">Reels</Link>
      <Link to="/search">Search</Link>
      <Link to="/app">App</Link>
    </nav>
  );
}
