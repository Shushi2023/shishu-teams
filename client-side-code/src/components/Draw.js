import { Navigation } from "./navigation";
import Board from "./whiteboard/Board";

const Draw = () => {
  //This is the parent for our whiteboard component.
  return (
    <>
      <Navigation />
      <Board />
    </>
  );
};

export default Draw;
