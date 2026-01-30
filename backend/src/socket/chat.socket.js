const chatSocket = (io) => {
  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    socket.on("join", (username) => {
      socket.username = username;
      console.log("Joined as:", username);
    });

    socket.on("sendMessage", (data) => {
      if (!socket.username) return;

      const message = {
        user: socket.username,
        ...data,
      };

      io.emit("newMessage", message);
    });

    socket.on("disconnect", () => {
      console.log("User disconnected");
    });
  });
};

export default chatSocket;
