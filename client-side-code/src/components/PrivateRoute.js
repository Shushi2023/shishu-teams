import {Route, Redirect} from 'react-router-dom';
import { useAuth } from '../contexts/Authcontex';


const PrivateRoute = ({component : Component, ...rest}) => { //This is a private route which allows the user to access a particular component only if he/she is logged In

    const {currUser} = useAuth();

    return(
        <Route {...rest} render = {props => {
            return currUser ? <Component {...props} /> : <Redirect to = '/login' /> 
        }}>

        </Route>
    )
}

export default PrivateRoute;