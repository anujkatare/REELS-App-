import { useEffect, useRef, useState } from "react";

export default function Reels() {
  const [videos, setVideos] = useState([]);
  const videoRefs = useRef([]);
  const [userInteracted, setUserInteracted] = useState(false);

  useEffect(() => {
    fetch("http://localhost:5000/api/videos")
      .then((res) => res.json())
      .then((data) => setVideos(shuffle(data)));
  }, []);

  // 👆 Detect first user interaction
  useEffect(() => {
    const enableSound = () => {
      setUserInteracted(true);
      window.removeEventListener("click", enableSound);
    };

    window.addEventListener("click", enableSound);
    return () => window.removeEventListener("click", enableSound);
  }, []);

  // 🎯 One video at a time (SAFE)
  useEffect(() => {
    if (!videos.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target;

          if (entry.isIntersecting) {
            video.play().catch(() => {});
            video.muted = !userInteracted; // 🔑 KEY LINE
          } else {
            video.pause();
            video.muted = true;
          }
        });
      },
      { threshold: 0.6 }
    );

    videoRefs.current.forEach((v) => v && observer.observe(v));

    return () => {
      videoRefs.current.forEach((v) => v && observer.unobserve(v));
    };
  }, [videos, userInteracted]);

  return (
    <div className="h-screen overflow-y-scroll snap-y snap-mandatory bg-black">
      {videos.map((v, index) => (
        <div
          key={v.id}
          className="h-screen snap-start flex items-center justify-center"
        >
          <video
            ref={(el) => (videoRefs.current[index] = el)}
            src={v.url}
            loop
            playsInline
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
