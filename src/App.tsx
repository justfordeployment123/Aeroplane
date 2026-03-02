import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { Applications } from "./components/Applications";
import { Products } from "./components/Products";
import { CoreAdvantages } from "./components/CoreAdvantages";
import { Footer } from "./components/Footer";

function App() {
    return (
        <div className="min-h-screen bg-aero-dark font-sans text-white selection:bg-aero-blue selection:text-black">
            <Navbar />
            <Hero />
            <Products /> {/* The new drone grid */}
            <Applications />
            <CoreAdvantages />
            <Footer />
        </div>
    );
}

export default App;
