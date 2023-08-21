import "./App.css";
import { Home } from "./Pages/Home";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
    return (
        <div className="App">
            hi
            <Router>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="*" element={<h1>PAGE NOT FOUND</h1>} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
