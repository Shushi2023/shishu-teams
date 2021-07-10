import { Route, Redirect } from "react-router-dom";
import { useAuth } from "../contexts/Authcontex";

const PrivateRoute = ({ component: Component, ...rest }) => {
  //This is a private route which allows the user to access a particular component only if he/she is logged In

  const { currUser } = useAuth();

  return (
    <Route
      {...rest}
      render={(props) => {
        return currUser ? <Component {...props} /> : <Redirect to="/login" />; //Here we have put up the condition which allows the component to return only if we have a user.
      }}
    ></Route>
  );
};

export default PrivateRoute;
