import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Reels from "./pages/Reels";
import Search from "./pages/search";
import Anonymous from "./pages/Anonymous";
import Chat from "./pages/chat";
import AppInfo from "./pages/App";

function Layout() {
  const location = useLocation();

  // Chat page par navbar hide
  const hideNavbar = location.pathname === "/chat";

  return (
    <>
      {!hideNavbar && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />        {/* ✅ HOME */}
        <Route path="/reels" element={<Reels />} />  {/* ✅ REELS */}
        <Route path="/search" element={<Search />} />
        <Route path="/anonymous" element={<Anonymous />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/app" element={<AppInfo />} />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}
