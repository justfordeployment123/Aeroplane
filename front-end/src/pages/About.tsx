import { useReducedMotion } from "framer-motion";
import { AboutHero } from "../components/about/AboutHero";
import { CompanyProfile } from "../components/about/CompanyProfile";
import { CoreValues } from "../components/about/CoreValues";
import { Qualifications } from "../components/about/Qualifications";
import { AcademicAffiliations } from "../components/about/AcademicAffiliations";
import { VisionSection } from "../components/about/VisionSection";
import { CTASection } from "../components/about/CTASection";

export const About = () => {
    // Respects OS/browser "prefers-reduced-motion" setting automatically
    const prefersReducedMotion = useReducedMotion() ?? false;

    return (
        <main className="min-h-screen text-white font-sans" style={{ background: "#161622" }}>
            <AboutHero reducedMotion={prefersReducedMotion} />
            <CompanyProfile reducedMotion={prefersReducedMotion} />
            <CoreValues reducedMotion={prefersReducedMotion} />
            <Qualifications reducedMotion={prefersReducedMotion} />
            <AcademicAffiliations reducedMotion={prefersReducedMotion} />
            <VisionSection reducedMotion={prefersReducedMotion} />
            <CTASection reducedMotion={prefersReducedMotion} />
        </main>
    );
};