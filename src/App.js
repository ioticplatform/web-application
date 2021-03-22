import './App.scss';
import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import Login from "./pages/login/Login";
import Home from "./pages/home/Home";
import Device from "./pages/device/Device";

function App() {
    return <div className="App">
        <Router>
            <div>
                <nav>
                    <ul>
                        <li>
                            <Link to="/login">Login</Link>
                        </li>
                    </ul>
                </nav>

                {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
                <Switch>
                    <Route path="/login">
                        <Login/>
                    </Route>
                    <Route path="/home">
                        <Home/>
                    </Route>
                    <Route path="/device">
                        <Device/>
                    </Route>
                </Switch>
            </div>
        </Router>
    </div>

}

export default App;
