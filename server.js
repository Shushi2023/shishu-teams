const express = require("express");
const app = express();
const server = require("http").createServer(app);
const cors = require("cors");
const chessLogic = require("./chessGameLogic");

const users = {};

const socketToRoom = {};

const io = require("socket.io")(server, {
  cors: {
    //Cors headers are set up to allow cross origin resource sharing
    origin: "*",
    methods: ["GET", "POST"],
  },
});

app.use(cors());

const PORT = process.env.PORT || 5001; //We have chosen port 5000 to run our server code in local

io.on("connection", (socket) => {
  socket.on("disconnect", () => {
    socket.broadcast.emit("callEnded"); //For when the call is cut
  });

  socket.on("callUser", ({ userToCall, signalData, from, name }) => {
    io.to(userToCall).emit("callUser", { signal: signalData, from, name }); //For calling a user
  });

  socket.on("answerCall", (data) => {
    io.to(data.to).emit("callAccepted", data.signal); //For answering the call coming from a user
  });

  socket.on("drawing", (data) => {
    socket.broadcast.emit("drawing", data); //For whiteboard functionality
  });

  socket.on("message", (payload) => {
    io.emit("message", payload);
  });

  //For chess
  chessLogic.initializeGame(io, socket);

  //For Group VC
  socket.on("join room", (roomID) => {
    if (users[roomID]) {
      const length = users[roomID].length;
      if (length === 4) {
        socket.emit("room full");
        return;
      }
      users[roomID].push(socket.id);
    } else {
      users[roomID] = [socket.id];
    }
    socketToRoom[socket.id] = roomID;
    const usersInThisRoom = users[roomID].filter((id) => id !== socket.id);

    socket.emit("all users", usersInThisRoom);
  });

  socket.on("sending signal", (payload) => {
    io.to(payload.userToSignal).emit("user joined", {
      signal: payload.signal,
      callerID: payload.callerID,
    });
  });

  socket.on("returning signal", (payload) => {
    io.to(payload.callerID).emit("receiving returned signal", {
      signal: payload.signal,
      id: socket.id,
    });
  });
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client-side-code/build"));
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(
      path.resolve(__dirname, "client-side-code", "build", "index.html")
    );
  });
}

server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
