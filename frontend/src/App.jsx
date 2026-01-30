import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";
import Reels from "./pages/reels";
import Chat from "./pages/chat";
import Search from "./pages/search";
import AppInfo from "./pages/app";
import Anonymous from "./pages/Anonymous";

// ---------- LAYOUT ----------
function Layout() {
  const location = useLocation();

  // ❌ Sirf chat page par navbar hide
  const hideNavbar = location.pathname === "/chat";

  return (
    <>
      {!hideNavbar && <Navbar />}

      <Routes>
        <Route path="/" element={<Reels />} />
        <Route path="/reels" element={<Reels />} />
        <Route path="/anonymous" element={<Anonymous />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/search" element={<Search />} />
        <Route path="/app" element={<AppInfo />} />
      </Routes>
    </>
  );
}

// ---------- APP ROOT ----------
export default function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}
