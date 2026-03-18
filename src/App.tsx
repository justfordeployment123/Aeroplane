import { useState, useCallback, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { IntroAnimation } from "./components/IntroAnimation";
import Home from "./pages/Home";
import { About } from "./pages/About";
import { LowAltitudeEconomy } from "./pages/LowAltitudeEconomy";
import { ApplicationsPage } from "./pages/ApplicationsPage";
import { ProductsPage } from "./pages/ProductsPage";
import { TrainingCenter } from "./pages/TrainingCenter";
import { ContactPage } from "./pages/ContactPage";
import { ScenarioDetail } from "./pages/ScenarioDetail";

// Scroll to top on route change
const ScrollToTop = () => {
    const { pathname } = useLocation();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);
    return null;
};

function App() {
    const [introComplete, setIntroComplete] = useState(
        () => sessionStorage.getItem("intro-seen") === "true"
    );

    const handleIntroComplete = useCallback(() => {
        sessionStorage.setItem("intro-seen", "true");
        setIntroComplete(true);
    }, []);

    return (
        <Router>
            <ScrollToTop />
            {!introComplete && <IntroAnimation onComplete={handleIntroComplete} />}
            <div className="min-h-screen bg-aero-dark font-sans text-white selection:bg-aero-blue selection:text-black">
                <Navbar />

                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/economy" element={<LowAltitudeEconomy />} />
                    <Route path="/applications" element={<ApplicationsPage />} />
                    <Route path="/applications/:id" element={<ScenarioDetail />} />
                    <Route path="/products" element={<ProductsPage />} />
                    <Route path="/training" element={<TrainingCenter />} />
                    <Route path="/contact" element={<ContactPage />} />
                </Routes>

                <Footer />
            </div>
        </Router>
    );
}

export default App;
