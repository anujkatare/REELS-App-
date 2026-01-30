import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";

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

export default function Reels() {
  const { state } = useLocation();

  // 👇 If coming from Search, reuse same shuffled order
  const initialVideos =
    state?.shuffledVideos || shuffleArray(ALL_VIDEOS);

  const startIndex = state?.startIndex ?? 0;

  const [videos] = useState(initialVideos);

  const containerRef = useRef(null);
  const videoRefs = useRef([]);

  // ⬇️ Scroll to selected video
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    requestAnimationFrame(() => {
      container.scrollTo({
        top: startIndex * window.innerHeight,
        behavior: "auto",
      });
    });
  }, [startIndex]);

  // ▶️ Auto play / pause
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = Number(entry.target.dataset.index);
          const video = entry.target;

          if (entry.isIntersecting) {
            video.play().catch(() => {});
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.75 }
    );

    videoRefs.current.forEach((video) => {
      if (video) observer.observe(video);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className="h-screen overflow-y-scroll snap-y snap-mandatory bg-black"
    >
      {videos.map((src, index) => (
        <div
          key={index}
          className="h-screen w-full snap-start"
          style={{ scrollSnapStop: "always" }}
        >
          <video
            ref={(el) => (videoRefs.current[index] = el)}
            src={src}
            data-index={index}
            className="h-full w-full object-cover"
            muted
            loop
            playsInline
            preload="metadata"
            onClick={() => {
              const v = videoRefs.current[index];
              if (v) v.muted = !v.muted;
            }}
          />
        </div>
      ))}
    </div>
  );
}
