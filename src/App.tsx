import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
    const location = useLocation();
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/Login" element={<Login />} />
                <Route path="/Register" element={<Register />} />
                <Route path="*" element={<h1>PAGE NOT FOUND {location.pathname}</h1>} />
            </Routes>
        </Router>
    );
}

export default App;
