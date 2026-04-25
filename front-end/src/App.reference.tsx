/**
 * App.tsx — wire-up reference
 *
 * Shows where NotFound and ErrorBoundary plug into your existing router.
 * Adapt to match your actual route structure.
 */

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { NotFound } from "./pages/NotFound";
import Home from "./pages/Home";
// ... your other page imports

const App = () => (
    <BrowserRouter>
        {/* Wrap the whole app — catches any unhandled runtime error */}
        <ErrorBoundary>
            {/* Your layout wrapper (Navbar, Footer etc.) goes here */}
            <Routes>
                <Route path="/" element={<Home />} />

                {/*
                 * Per-route error boundaries — optional but recommended.
                 * Wrap heavy pages so one route crashing doesn't kill the whole app.
                 *
                 * <Route path="/products" element={
                 *     <ErrorBoundary>
                 *         <ProductsPage />
                 *     </ErrorBoundary>
                 * } />
                 */}

                {/* 404 catch-all — must be last */}
                <Route path="*" element={<NotFound />} />
            </Routes>
        </ErrorBoundary>
    </BrowserRouter>
);

export default App;
