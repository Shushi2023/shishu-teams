import Chat from "./Chat";
import { Button } from "@material-ui/core";
import { Close } from "@material-ui/icons";
import { useHistory } from "react-router";

const Chatting = () => {
  const history = useHistory(); //This is used for redirecting when the close button is clicked.
  //This is the component that finally displays the chat room, we added the nav bar here.
  return (
    <>
      <Button
        style={{
          marginRight: "5px",
          position: "absolute",
          right: "0px",
          top: "0px",
          zIndex: "1",
        }}
        variant="contained"
        color="secondary"
        onClick={() => history.push("/")}
      >
        <Close />
      </Button>
      <Chat />
    </>
  );
};

export default Chatting;
