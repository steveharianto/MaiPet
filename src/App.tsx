import "./App.css";
import Home from "./Pages/Home";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

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
