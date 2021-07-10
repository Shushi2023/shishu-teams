import { createContext } from "react";

const ColorContext = createContext({
  didRedirect: false,
  playerDidRedirect: () => {},
  playerDidNotRedirect: () => {},
});

export default ColorContext;
