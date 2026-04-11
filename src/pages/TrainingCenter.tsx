import { useReducedMotion } from "framer-motion";
import { TrainingHero } from "../components/training/TrainingHero";
import { TrainingStats } from "../components/training/TrainingStats";
import { TrainingIntro } from "../components/training/TrainingIntro";
import { ProcessSteps } from "../components/training/ProcessSteps";
import { VisualPanels } from "../components/training/VisualPanels";
import { CourseFeatures } from "../components/training/CourseFeatures";
import { TrainingCTA } from "../components/training/TrainingCTA";

export const TrainingCenter = () => {
    const prefersReducedMotion = useReducedMotion() ?? false;

    return (
        <main className="min-h-screen text-white font-sans" style={{ background: "#161622" }}>
            <TrainingHero reducedMotion={prefersReducedMotion} />
            <TrainingStats reducedMotion={prefersReducedMotion} />
            <TrainingIntro reducedMotion={prefersReducedMotion} />
            <ProcessSteps reducedMotion={prefersReducedMotion} />
            <VisualPanels reducedMotion={prefersReducedMotion} />
            <CourseFeatures reducedMotion={prefersReducedMotion} />
            <TrainingCTA reducedMotion={prefersReducedMotion} />
        </main>
    );
};

export default TrainingCenter;