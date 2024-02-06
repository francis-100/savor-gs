import React, { components } from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
} from "react-router-dom";
import Home from "./components/Home";
import Dashboard from "./components/Dashboard";

function App() {
    return (
        <Router>
            <div className="App">
                <ul className="App-header">
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/dashboard">Dashboard</Link>
                    </li>
                </ul>
                <Routes>
                    <Route
                        exact
                        path="/"
                        element={<Home />}
                    ></Route>
                    <Route
                        exact
                        path="/dashboard"
                        element={<Dashboard />}
                    ></Route>
                </Routes>
            </div>
        </Router>
    );
};

export default App;