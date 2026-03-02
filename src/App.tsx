import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { About } from "./pages/About"; // Import the new page
import Home from "./pages/Home";
import { LowAltitudeEconomy } from "./pages/LowAltitudeEconomy";

// We extract the home layout into a sub-component for clean routing

function App() {
    return (
        <Router>
            <div className="min-h-screen bg-aero-dark font-sans text-white selection:bg-aero-blue selection:text-black">
                <Navbar />

                {/* Route Configuration */}
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/economy" element={<LowAltitudeEconomy />} /> {/* Add this route */}
                </Routes>

                <Footer />
            </div>
        </Router>
    );
}

export default App;
