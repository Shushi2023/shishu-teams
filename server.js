const express = require("express")
const app = express();
const server = require("http").createServer(app);
const cors = require("cors");

const io = require("socket.io")(server, {
	cors: { //Cors headers are set up to allow cross origin resource sharing
		origin: "*",
		methods: [ "GET", "POST" ]
	}
});

app.use(cors());

const PORT = process.env.PORT || 5000; //We have chosen port 5000 to run our server code in local

// app.get('/', (req, res) => {
// 	res.send('Running');
// });

io.on("connection", (socket) => {

	socket.on("disconnect", () => {
		socket.broadcast.emit("callEnded") //For when the call is cut
	});

	socket.on("callUser", ({ userToCall, signalData, from, name }) => {
		io.to(userToCall).emit("callUser", { signal: signalData, from, name }); //For calling a user
	});

	socket.on("answerCall", (data) => {
		io.to(data.to).emit("callAccepted", data.signal) //For answering the call coming from a user
	});

	socket.on("drawing", (data) => {
		socket.broadcast.emit("drawing", data) //For whiteboard functionality
	})
});

if(process.env.NODE_ENV === "production"){
	app.use(express.static("client-side-code/build"));
	const path = require("path");
	// app.get("*", (req, res) => {
	// 	res.sendFile(path.resolve)
	// })
}

server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
