import { motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";
import { useTranslation } from "react-i18next";

interface TrainingIntroProps {
    reducedMotion?: boolean;
}

export const TrainingIntro = ({ reducedMotion = false }: TrainingIntroProps) => {
    const { t } = useTranslation("training");

    // Parse <highlight>...</highlight> tag from translation string
    const body = t("intro.body");
    const [before, rest] = body.split("<highlight>");
    const [highlighted, after] = (rest ?? "").split("</highlight>");

    return (
        <section className="py-20 sm:py-24 relative overflow-hidden" aria-labelledby="intro-text">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
                <motion.div
                    initial={reducedMotion ? false : { y: 24, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true, margin: "50px 0px" }}
                    className="relative rounded-3xl p-8 sm:p-10 md:p-16 text-center overflow-hidden"
                    style={{
                        background: "linear-gradient(160deg, rgba(0,210,255,0.05) 0%, rgba(168,85,247,0.03) 100%)",
                        border: "1px solid rgba(0,210,255,0.12)",
                        boxShadow: "0 0 60px rgba(0,210,255,0.04)",
                    }}
                >
                    {/* Corner brackets */}
                    {[
                        "top-5 left-5 border-t-2 border-l-2",
                        "top-5 right-5 border-t-2 border-r-2",
                        "bottom-5 left-5 border-b-2 border-l-2",
                        "bottom-5 right-5 border-b-2 border-r-2",
                    ].map((cls, i) => (
                        <div key={i} className={`absolute w-5 h-5 sm:w-6 sm:h-6 ${cls} border-aero-blue/28`} aria-hidden="true" />
                    ))}

                    <div
                        className="inline-flex items-center justify-center w-14 h-14 rounded-2xl mx-auto mb-7 bg-aero-blue/10 border border-aero-blue/22"
                        aria-hidden="true"
                    >
                        <ShieldCheck size={28} className="text-aero-blue" />
                    </div>

                    <p id="intro-text" className="text-base sm:text-lg md:text-xl text-gray-300 leading-relaxed">
                        {before}
                        {highlighted && <span className="text-aero-blue font-semibold">{highlighted}</span>}
                        {after}
                    </p>
                </motion.div>
            </div>
        </section>
    );
};
