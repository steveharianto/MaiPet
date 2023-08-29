import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="*" element={<h1>PAGE NOT FOUND</h1>} />
            </Routes>
        </Router>
    );
}

export default App;
