import { useState, useCallback, lazy, Suspense, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { IntroAnimation } from "./components/IntroAnimation";

// Lazy-load all pages for code splitting
const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About").then(m => ({ default: m.About })));
const LowAltitudeEconomy = lazy(() => import("./pages/LowAltitudeEconomy").then(m => ({ default: m.LowAltitudeEconomy })));
const ApplicationsPage = lazy(() => import("./pages/ApplicationsPage").then(m => ({ default: m.ApplicationsPage })));
const ProductsPage = lazy(() => import("./pages/ProductsPage").then(m => ({ default: m.ProductsPage })));
const TrainingCenter = lazy(() => import("./pages/TrainingCenter").then(m => ({ default: m.TrainingCenter })));
const ContactPage = lazy(() => import("./pages/ContactPage").then(m => ({ default: m.ContactPage })));
const ScenarioDetail = lazy(() => import("./pages/ScenarioDetail").then(m => ({ default: m.ScenarioDetail })));

// Scroll to top on route change
const ScrollToTop = () => {
    const { pathname } = useLocation();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);
    return null;
};

// Minimal loading fallback
const PageLoader = () => (
    <div className="min-h-screen flex items-center justify-center bg-aero-dark">
        <div className="w-8 h-8 border-2 border-aero-blue/30 border-t-aero-blue rounded-full animate-spin" />
    </div>
);

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

                <Suspense fallback={<PageLoader />}>
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
                </Suspense>

                <Footer />
            </div>
        </Router>
    );
}

export default App;
