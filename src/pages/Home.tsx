import { Applications } from "../components/Applications";
import { CoreAdvantages } from "../components/CoreAdvantages";
import { Hero } from "../components/Hero";
import { Products } from "../components/Products";
import { StatsBar } from "../components/StatsBar";
import { CTASection } from "../components/CTASection";
import { TrainingPromo } from "../components/TrainingPromo";

const Home = () => (
    <>
        <Hero />
        <StatsBar />
        <Applications />
        <Products />
        <CoreAdvantages />
        <TrainingPromo />
        <CTASection />
    </>
);

export default Home;
