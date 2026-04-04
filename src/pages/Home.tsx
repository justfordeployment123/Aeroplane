import { Applications } from "../components/home/Applications";
import { CoreAdvantages } from "../components/home/CoreAdvantages";
import { Hero } from "../components/home/Hero";
import { Products } from "../components/home/Products";
import { StatsBar } from "../components/home/StatsBar";
import { CTASection } from "../components/home/CTASection";
import { TrainingPromo } from "../components/home/TrainingPromo";

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
