import { useReducedMotion } from "framer-motion";
import { EconomyHero } from "../components/economy/EconomyHero";
import { EconomyStats } from "../components/economy/EconomyStats";
import { ApplicationOverview } from "../components/economy/ApplicationOverview";
import { EcosystemPillars } from "../components/economy/EcosystemPillars";
import { KeyAdvantages } from "../components/economy/KeyAdvantages";
import { PolicyTimeline } from "../components/economy/PolicyTimeline";
import { WhitePaper } from "../components/economy/WhitePaper";
import { EconomyCTA } from "../components/economy/EconomyCTA";

export const LowAltitudeEconomy = () => {
    const prefersReducedMotion = useReducedMotion() ?? false;

    return (
        <main className="min-h-screen text-white font-sans" style={{ background: "#161622" }}>
            <EconomyHero reducedMotion={prefersReducedMotion} />
            <EconomyStats reducedMotion={prefersReducedMotion} />
            <ApplicationOverview reducedMotion={prefersReducedMotion} />
            <EcosystemPillars reducedMotion={prefersReducedMotion} />
            <KeyAdvantages reducedMotion={prefersReducedMotion} />
            <PolicyTimeline reducedMotion={prefersReducedMotion} />
            <WhitePaper reducedMotion={prefersReducedMotion} />
            <EconomyCTA reducedMotion={prefersReducedMotion} />
        </main>
    );
};

export default LowAltitudeEconomy;
