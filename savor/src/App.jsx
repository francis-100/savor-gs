// import Dashboard from './components/Dashboard';
// import Inventory from './components/Inventory'

// function App() {
//     return (
//         <>
//             <div>
//                 <h1>Welcome</h1>
//             </div>
//             < Inventory />
//         </>
//     );
// };
// export default App; 
import React, { componrnts } from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
} from "react-router-dom";
import Home from "./components/home";
import Dashboard from "./components/dashboard";

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