import { Navigation } from "../navigation";
import Chat from "./Chat";

const Chatting = () => {
  //This is the component that finally displays the chat room, we added the nav bar here.
  return (
    <>
      <Navigation />
      <Chat />
    </>
  );
};

export default Chatting;
