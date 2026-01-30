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
    <div className="min-h-screen  flex items-center justify-center bg-black text-white font-primary">
      
      <div className="w-80   max-w-sm  backdrop-blur-xl   rounded-2xl  shadow-xl flex flex-col  gap-6 p-20">
        
        <div className="text-center">
          <h2 className="text-2xl font-semibold tracking-wide">
            Anonymous Chat
          </h2>
          <p className="text-sm text-zinc-400 mt-1 font-accent">
            no names. no history. just words.
          </p>
        </div>

        <input
          className="w-full p-5 pl-5 rounded bg-zinc-800 text-white placeholder-zinc-500
                     focus:outline-none focus:ring-2 focus:ring-pink-500/70 transition"
          placeholder="  Enter username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <button
          onClick={enterChat}
          className="w-full py-3 rounded bg-pink-500 hover:bg-pink-600
                     active:scale-[0.98] transition font-medium tracking-wide"
        >
          Enter Chat
        </button>

      </div>
    </div>
  );
}
