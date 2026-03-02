import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { About } from "./pages/About"; // Import the new page
import Home from "./pages/Home";
import { LowAltitudeEconomy } from "./pages/LowAltitudeEconomy";
import { ApplicationsPage } from "./pages/ApplicationsPage";
import { ProductsPage } from "./pages/ProductsPage";
import { TrainingCenter } from "./pages/TrainingCenter";

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
                    <Route path="/applications" element={<ApplicationsPage />} /> {/* Add this route */}
                    <Route path="/products" element={<ProductsPage />} /> {/* Add Products Route */}
                    <Route path="/training" element={<TrainingCenter />} /> {/* Add Training Route */}
                </Routes>

                <Footer />
            </div>
        </Router>
    );
}

export default App;
