import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

// 🔀 Shuffle helper
function shuffleArray(arr) {
  const array = [...arr];
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export default function Home() {
  const navigate = useNavigate();
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  // 📡 Fetch videos from backend (Cloudinary)
  useEffect(() => {
    fetch("http://localhost:5000/api/videos")
      .then((res) => res.json())
      .then((data) => {
        setVideos(shuffleArray(data));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const openReel = (index) => {
    navigate("/reels", {
      state: {
        startIndex: index,
        videos, // 👈 Cloudinary videos pass ho rahi hain
      },
    });
  };

  return (
    <div className="min-h-screen bg-black text-white pb-24">
      {/* HERO / ABOUT SECTION */}
      <div className="px-5 pt-8 pb-10 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">
          Anonymous Reels & Chat
        </h1>

        <p className="text-sm text-zinc-400 mt-3 leading-relaxed">
          Watch short videos, explore trending content, and join public chats —
          all without creating an account. No profiles, no followers, just
          content and conversations.
        </p>
      </div>

      {/* SECTION TITLE */}
      <div className="px-5 mb-3">
        <h2 className="text-sm font-medium text-zinc-300">
          Explore Reels
        </h2>
      </div>

      {/* LOADING STATE */}
      {loading && (
        <div className="px-5 text-sm text-zinc-500">
          Loading reels...
        </div>
      )}

      {/* VIDEO GRID (INSTAGRAM STYLE) */}
      <div className="grid grid-cols-3 gap-2px">
        {videos.map((video, index) => (
          <div
            key={video.id}
            onClick={() => openReel(index)}
            className="relative w-full aspect-9/16 bg-zinc-900 overflow-hidden cursor-pointer"
          >
            <video
              src={video.url}
              muted
              preload="metadata"
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
            />

            {/* Play overlay */}
            <div className="absolute bottom-1 right-1 text-xs bg-black/60 px-1.5 py-0.5 rounded">
              ▶
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
