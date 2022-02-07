import "./App.css";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Header from "./components/Header/header";
import Sidebar from "./components/Sidebar/sidebar";
import Dashboard from "./components/Dashboard/dashboard";
import Goods from "./components/Goods/goods";

function App() {
    return (
        <Router>
            <div className="App">
                <Header />
                <div>
                    <Sidebar />
                    <Routes>
                    <Route exact path="/goods" element={<Goods />} />
                        <Route exact path="/" element={<Dashboard />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;
