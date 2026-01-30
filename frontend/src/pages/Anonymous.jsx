import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Anonymous() {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const enterChat = () => {
    if (!username.trim()) {
      alert("Enter username");
      return;
    }
    navigate("/chat", { state: { username } });
  };

  return (
    // ⬇️ IMPORTANT CHANGE HERE
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white px-4 pb-20">
      <h2 className="text-lg font-semibold mb-4">
        Anonymous Username
      </h2>

      <input
        className="w-full max-w-sm p-2 bg-zinc-800 rounded mb-4"
        placeholder="Enter username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <button
        onClick={enterChat}
        className="bg-pink-500 px-4 py-2 rounded"
      >
        Enter Chat
      </button>
    </div>
  );
}
