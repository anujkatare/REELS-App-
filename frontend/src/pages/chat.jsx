import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import socket from "../services/socket";
import MediaPreview from "../components/MediaPreview";

export default function Chat() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const username = state?.username;

  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [previewMedia, setPreviewMedia] = useState(null);

  const fileRef = useRef(null);
  const bottomRef = useRef(null);

  // 🔐 Protect route
  useEffect(() => {
    if (!username) {
      navigate("/anonymous");
    }
  }, [username, navigate]);

  // 🔌 SOCKET (FIXED – NO DUPLICATES)
  useEffect(() => {
    if (!username) return;

    if (!socket.connected) {
      socket.connect();
    }

    socket.emit("join", username);

    const handleNewMessage = (msg) => {
      setMessages((prev) => [...prev, msg]);
    };

    socket.on("newMessage", handleNewMessage);

    return () => {
      socket.off("newMessage", handleNewMessage);
    };
  }, [username]);

  // 📜 Auto scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // ✉️ Send text
  const sendText = () => {
    if (!text.trim()) return;

    socket.emit("sendMessage", {
      type: "text",
      text,
    });

    setText("");
  };

  // ⌨️ Enter to send
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendText();
    }
  };

  // 🖼️ Send media
  const sendMedia = async (file) => {
    if (!file) return;

    const fd = new FormData();
    fd.append("media", file);

    try {
      const res = await fetch("http://localhost:5000/api/media", {
        method: "POST",
        body: fd,
      });

      const data = await res.json();

      socket.emit("sendMessage", {
        type: "media",
        url: data.url,
        mediaType: data.type,
      });

      fileRef.current.value = "";
    } catch (err) {
      alert("Media upload failed");
    }
  };

  // ⬅️ Leave chat
  const leaveChat = () => {
    navigate("/anonymous");
  };

  return (
    <div className="h-screen flex flex-col bg-black text-white">
      {/* TOP BAR */}
      <div className="flex items-center px-3 py-2 border-b border-zinc-800">
        <button
          onClick={leaveChat}
          className="text-pink-400 text-sm"
        >
          ← Back
        </button>
        <span className="ml-3 text-sm text-zinc-400">
          Anonymous Chat
        </span>
      </div>

      {/* MESSAGES */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((m, i) => (
          <div
            key={i}
            className="bg-zinc-800 p-2.5 rounded-lg max-w-[85%]"
          >
            <p className="text-xs text-pink-400 mb-1">{m.user}</p>

            {m.type === "text" && (
              <p className="text-sm wrap-break-word">{m.text}</p>
            )}

            {m.type === "media" && m.mediaType === "image" && (
              <img
                src={m.url}
                className="mt-2 w-90px h-90px rounded-lg object-cover cursor-pointer"
                onClick={() =>
                  setPreviewMedia({ url: m.url, type: "image" })
                }
              />
            )}

            {m.type === "media" && m.mediaType === "video" && (
              <video
                src={m.url}
                muted
                className="mt-2 w-130px h-130px rounded-lg object-cover cursor-pointer"
                onClick={() =>
                  setPreviewMedia({ url: m.url, type: "video" })
                }
              />
            )}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* INPUT BAR */}
      <div className="flex items-center gap-2 px-3 py-2 border-t border-zinc-800">
        <button onClick={() => fileRef.current.click()}>📎</button>

        <input
          type="file"
          hidden
          ref={fileRef}
          accept="image/*,video/*"
          onChange={(e) => sendMedia(e.target.files[0])}
        />

        <input
          className="flex-1 bg-zinc-800 p-2 rounded"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Message"
        />

        <button
          onClick={sendText}
          className="bg-pink-500 px-3 py-1.5 rounded"
        >
          ➤
        </button>
      </div>

      <MediaPreview
        media={previewMedia}
        onClose={() => setPreviewMedia(null)}
      />
    </div>
  );
}
