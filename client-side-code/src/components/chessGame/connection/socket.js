import io from "socket.io-client";

// const URL = "https://shishu-teams.herokuapp.com";
const URL = "localhost:5001";

const socket = io(URL);

var mySocketId;
// register preliminary event listeners here:

socket.on("createNewGame", (statusUpdate) => {
  console.log(
    "A new game has been created! Username: " +
      statusUpdate.userName +
      ", Game id: " +
      statusUpdate.gameId +
      " Socket id: " +
      statusUpdate.mySocketId
  );
  mySocketId = statusUpdate.mySocketId;
});

export { socket, mySocketId };
