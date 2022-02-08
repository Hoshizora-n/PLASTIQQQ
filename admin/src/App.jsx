import "./App.css";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Header from "./components/Header/header";
import Sidebar from "./components/Sidebar/sidebar";
import Dashboard from "./components/Dashboard/dashboard";
import Goods from "./components/Goods/goods";
import Sales from "./components/Sales/sales";
import Users from "./components/Users/users";

function App() {
    return (
        <Router>
            <div className="App">
                <main>
                    <Sidebar />
                    <Routes>
                        <Route exact path="/" element={<Dashboard />} />
                        <Route path="/goods" element={<Goods />} />
                        <Route path="/sales" element={<Sales />} />
                        <Route path="/users" element={<Users />} />
                    </Routes>
                </main>
            </div>
        </Router>
    );
}

export default App;
