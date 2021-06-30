import React from 'react';
import Signup from './Signup';
import Login from './Login';

import { AuthProvider } from '../contexts/Authcontex';

import { BrowserRouter, Route, Switch } from 'react-router-dom';
import LandingPage from './LandingPage';
import ForgotPassword from './ForgotPassword';
import VideoCall from './VideoCall';
import PrivateRoute from './PrivateRoute';
import Draw from './Draw';
import Chatting from './chat/Chatting';

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
          <Switch>
            <Route exact path = "/" component = {LandingPage} />
            <Route exact path = "/signup" component = {Signup} />
            <Route exact path = "/login" component = {Login} />
            <Route exact path = "/forgotPassword" component = {ForgotPassword} />
            <PrivateRoute exact path = "/videoCall" component = {VideoCall} />
            <PrivateRoute exact path = "/draw" component = {Draw} />
            <PrivateRoute exact path = "/chat" component = {Chatting} />
          </Switch>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;

