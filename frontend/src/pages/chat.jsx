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

  useEffect(() => {
    if (!username) {
      navigate("/anonymous");
    }
  }, [username, navigate]);

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

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendText = () => {
    if (!text.trim()) return;

    socket.emit("sendMessage", {
      type: "text",
      text,
    });

    setText("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendText();
    }
  };

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

  const leaveChat = () => {
    navigate("/anonymous");
  };

  return (
    <div className="h-screen flex flex-col gap-4 bg-black text-white">
      
      {/* TOP BAR */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-800">
        <span className="text-xl font-semibold">
          Anonymous Chat
        </span>
        <button
          onClick={leaveChat}
          className="px-4 py-2 rounded bg-pink-400 text-sm"
        >
          Leave
        </button>
      </div>

      {/* MESSAGES */}
      <div className="flex-1 overflow-y-auto p-10 space-y-4">
        {messages.map((m, i) => (
          <div
            key={i}
            className="p-10"
          >
            <p className="text-sm text-pink-400 mb-1">
              {m.user}
            </p>

            {m.type === "text" && (
              <p className="text-sm wrap-break-word">
                {m.text}
                <hr className="text-zinc-900"/>
              </p>
            )}

            {m.type === "media" && m.mediaType === "image" && (
              <img
                src={m.url}
                className="mt-3 w-32 h-48 rounded-lg object-cover cursor-pointer"
                onClick={() =>
                  setPreviewMedia({ url: m.url, type: "image" })
                }
                
              />
              
            )}
           
            {m.type === "media" && m.mediaType === "video" && (
              <video
                src={m.url}
                muted
                className="mt-3 w-32 h-48 rounded-lg object-cover cursor-pointer"
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
      <div className="flex items-center gap-3 px-4 py-3 border-t border-zinc-800">
        
        <button
          onClick={() => fileRef.current.click()}
          className="h-10 w-10 rounded-full bg-pink-400 flex items-center justify-center"
        >
          📷
        </button>

        <input
          type="file"
          hidden
          ref={fileRef}
          accept="image/*,video/*"
          onChange={(e) => sendMedia(e.target.files[0])}
        />

        <input
          className="flex-1 h-10 bg-zinc-800 px-3 rounded-lg text-sm"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Message..."
        />

        <button
          onClick={sendText}
          className="h-10 w-10 rounded-full bg-pink-500 flex items-center justify-center"
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
