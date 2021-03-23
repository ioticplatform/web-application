import './App.scss';
import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import Login from "./pages/login/Login";
import Devices from "./pages/devices/Devices";
import Menu from "./pages/menu/Menu";
import Device from "./pages/device/Device";
import Register from "./pages/register/Register";
import Sensor from "./pages/sensor/Sensor";
import Sensors from "./pages/sensors/Sensors";


function App() {
    return <div className="App">
        <Router>
            <div>
                <nav>
                    <ul>
                        <li>
                            <Link to="/login">Login</Link>
                        </li>
                        <li>
                            <Link to="/home">Home</Link>
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
                        <Menu/>
                    </Route>
                    <Route path="/devices">
                        <Devices/>
                    </Route>
                    <Route path="/device">
                        <Device/>
                    </Route>
                    <Route path="/sensors">
                        <Sensors/>
                    </Route>
                    <Route path="/sensor">
                        <Sensor/>
                    </Route>
                    <Route path="/register">
                        <Register/>
                    </Route>
                </Switch>
            </div>
        </Router>
    </div>

}

export default App;
