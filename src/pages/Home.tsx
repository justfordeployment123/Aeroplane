import { Applications } from "../components/Applications";
import { CoreAdvantages } from "../components/CoreAdvantages";
import { Hero } from "../components/Hero";
import { Products } from "../components/Products";
import { StatsBar } from "../components/StatsBar";
import { CTASection } from "../components/CTASection";

const Home = () => (
    <>
        <Hero />
        <StatsBar />
        <Products />
        <Applications />
        <CoreAdvantages />
        <CTASection />
    </>
);

export default Home;
