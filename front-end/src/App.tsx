import { useState, useCallback, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation, Outlet } from "react-router-dom";

import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { IntroAnimation } from "./components/IntroAnimation";
import { ErrorBoundary } from "./components/ErrorBoundary";
import Home from "./pages/Home";
import { About } from "./pages/About";
import { LowAltitudeEconomy } from "./pages/LowAltitudeEconomy";
import { ApplicationsPage } from "./pages/ApplicationsPage";
import { ProductsPage } from "./pages/ProductsPage";
import { TrainingCenter } from "./pages/TrainingCenter";
import { ContactPage } from "./pages/ContactPage";
import { ScenarioDetail } from "./pages/ScenarioDetail";
import { NotFound } from "./pages/NotFound";

// Scroll to top on every route change
const ScrollToTop = () => {
    const { pathname } = useLocation();
    useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
    return null;
};

// Layout shell — wraps all real pages with Navbar + Footer
const Layout = () => (
    <div className="min-h-screen bg-aero-dark font-sans text-white selection:bg-aero-blue selection:text-black">
        <Navbar />
        <Outlet />   {/* child route renders here */}
        <Footer />
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

            <ErrorBoundary>
                <Routes>
                    {/*
                     * Layout route — Navbar + Footer wrap all children via <Outlet />.
                     * Any path NOT listed here falls through to the * route below.
                     */}
                    <Route element={<Layout />}>
                        <Route path="/"                  element={<Home />} />
                        <Route path="/about"             element={<About />} />
                        <Route path="/economy"           element={<LowAltitudeEconomy />} />
                        <Route path="/applications"      element={<ApplicationsPage />} />
                        <Route path="/applications/:id"  element={<ScenarioDetail />} />
                        <Route path="/products"          element={<ProductsPage />} />
                        <Route path="/training"          element={<TrainingCenter />} />
                        <Route path="/contact"           element={<ContactPage />} />
                    </Route>

                    {/* 404 — outside Layout, so NO Navbar or Footer */}
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </ErrorBoundary>
        </Router>
    );
}

export default App;