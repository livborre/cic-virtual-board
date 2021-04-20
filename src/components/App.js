
import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { AuthProvider } from "../context/Auth";
import Feed from './Feed'
import Login from "./Login";
import SignUp from "./SignUp"
import PrivateRoute from './PrivateRoute'

function App() {
  return (
    <Router>
        <AuthProvider>
            <div>
                <PrivateRoute exact path="/" component={Feed} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/signup" component={SignUp} />
            </div>
        </AuthProvider>
    </Router>
  );
}

export default App;
