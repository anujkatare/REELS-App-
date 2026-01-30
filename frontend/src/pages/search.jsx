import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Search() {
  const [videos, setVideos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/api/videos")
      .then((res) => res.json())
      .then((data) => setVideos(shuffle(data)));
  }, []);

  return (
    <div className="grid grid-cols-3 gap-2px bg-black">
      {videos.map((v, index) => (
        <div
          key={v.id}
          onClick={() =>
            navigate("/reels", {
              state: { startIndex: index },
            })
          }
          className="aspect-9/16 bg-zinc-900"
        >
          <video
            src={v.url}
            muted
            className="h-full w-full object-cover"
          />
        </div>
      ))}
    </div>
  );
}

function shuffle(arr) {
  return [...arr].sort(() => Math.random() - 0.5);
}
