import { Applications } from "../components/home/Applications";
import { CoreAdvantages } from "../components/home/CoreAdvantages";
import { Hero } from "../components/home/Hero";
import { Products } from "../components/home/Products";
import { StatsBar } from "../components/home/StatsBar";
import { CTASection } from "../components/home/CTASection";
import { TrainingPromo } from "../components/home/TrainingPromo";
import { CookieConsent } from "../components/CookieConsent";
import { useCookieConsent } from "../hooks/useCookieConsent";

const Home = () => {
    const { showBanner, acceptAll, declineAll, saveCustom } = useCookieConsent();

    return (
        <>
            <Hero />
            <StatsBar />
            <Applications />
            <Products />
            <CoreAdvantages />
            <TrainingPromo />
            <CTASection />

            <CookieConsent
                show={showBanner}
                onAcceptAll={acceptAll}
                onDeclineAll={declineAll}
                onSaveCustom={saveCustom}
            />
        </>
    );
};

export default Home;