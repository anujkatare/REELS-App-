import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const ALL_VIDEOS = [
  "/videos/0710(3).mp4",
  "/videos/0710(4).mp4",
  "/videos/vid3.mp4",
  "/videos/vid4.mp4",
  "/videos/vid5.mp4",
  "/videos/vid3.mp4",
];

// 🔀 SHUFFLE FUNCTION
function shuffleArray(arr) {
  const array = [...arr];
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export default function Search() {
  const navigate = useNavigate();
  const [videos, setVideos] = useState([]);

  // 🔀 Shuffle on mount
  useEffect(() => {
    setVideos(shuffleArray(ALL_VIDEOS));
  }, []);

  const openReel = (index) => {
    navigate("/reels", {
      state: { startIndex: index, shuffledVideos: videos },
    });
  };

  return (
    <div className="min-h-screen bg-black text-white pb-20">
      {/* SEARCH BAR */}
      <div className="sticky top-0 bg-black z-40 p-3 border-b border-zinc-800">
        <input
          type="text"
          placeholder="Search"
          className="w-full p-2 rounded bg-zinc-800 outline-none"
        />
      </div>

      {/* VIDEO GRID */}
      <div className="grid grid-cols-3 gap-[2px]">
        {videos.map((src, index) => (
          <div
            key={index}
            onClick={() => openReel(index)}
            className="relative w-full aspect-[9/16] bg-zinc-900 overflow-hidden cursor-pointer"
          >
            <video
              src={src}
              muted
              preload="metadata"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute bottom-1 right-1 text-xs bg-black/60 px-1.5 py-0.5 rounded">
              ▶
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
