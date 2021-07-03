import React from "react";
import Signup from "./Signup";
import Login from "./Login";

import { AuthProvider } from "../contexts/Authcontex";

import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import LandingPage from "./LandingPage";
import ForgotPassword from "./ForgotPassword";
import VideoCall from "./VideoCall";
import PrivateRoute from "./PrivateRoute";
import Draw from "./Draw";
import Chatting from "./chat/Chatting";
import ColorContext from "./chessGame/context/colorcontext";
import Onboard from "./chessGame/onboard/onboard";
import JoinGame from "./chessGame/onboard/joingame";
import ChessGame from "./chessGame/chess/ui/chessgame";
import JoinRoom from "./chessGame/onboard/joinroom";
import WatchStream from "./stream/WatchStream";
import CreateRoom from "./groupVC/CreateRoom";
import Room from "./groupVC/Room";
import ParentVC from "./ParentVC";
import Youtube from "./youtube/Youtube";

const App = () => {
  const [didRedirect, setDidRedirect] = React.useState(false);

  const playerDidRedirect = React.useCallback(() => {
    setDidRedirect(true);
  }, []);

  const playerDidNotRedirect = React.useCallback(() => {
    setDidRedirect(false);
  }, []);

  const [userName, setUserName] = React.useState("");

  return (
    <ColorContext.Provider
      value={{
        didRedirect: didRedirect,
        playerDidRedirect: playerDidRedirect,
        playerDidNotRedirect: playerDidNotRedirect,
      }}
    >
      <BrowserRouter>
        <AuthProvider>
          <Switch>
            <Route exact path="/" component={LandingPage} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/forgotPassword" component={ForgotPassword} />
            <Route exact path="/stream" component={WatchStream} />
            <Route exact path="/youtube" component={Youtube} />
            <PrivateRoute path="/groupVC" exact component={CreateRoom} />
            <PrivateRoute path="/groupVC/room/:roomID" component={Room} />
            <PrivateRoute exact path="/parentVC" component={ParentVC} />
            <PrivateRoute exact path="/videoCall" component={VideoCall} />
            <PrivateRoute exact path="/draw" component={Draw} />
            <PrivateRoute exact path="/chat" component={Chatting} />
            <Route path="/playChess" exact>
              <Onboard setUserName={setUserName} />
            </Route>
            <Route path="/playChess/game/:gameid" exact>
              {didRedirect ? (
                <React.Fragment>
                  <JoinGame userName={userName} isCreator={true} />
                  <ChessGame myUserName={userName} />
                </React.Fragment>
              ) : (
                <JoinRoom />
              )}
            </Route>
            <Redirect to="/playChess" />
          </Switch>
        </AuthProvider>
      </BrowserRouter>
    </ColorContext.Provider>
  );
};

export default App;
