import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

interface StepItem {
    step: string;
    title: string;
    desc: string;
}

const PROCESS_COLORS = ["#00d2ff", "#a855f7", "#10b981", "#f97316"];

interface ProcessStepsProps {
    reducedMotion?: boolean;
}

export const ProcessSteps = ({ reducedMotion = false }: ProcessStepsProps) => {
    const { t } = useTranslation("training");
    const steps = t("process.steps", { returnObjects: true }) as StepItem[];

    return (
        <section
            className="py-20 sm:py-24 relative overflow-hidden"
            style={{ background: "#111119" }}
            aria-labelledby="process-heading"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                {/* Header */}
                <motion.div
                    initial={reducedMotion ? false : { y: 18, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true, margin: "50px 0px" }}
                    className="mb-12 sm:mb-16"
                >
                    <div className="flex items-center gap-3 mb-4" aria-hidden="true">
                        <div className="h-px w-10 bg-gradient-to-r from-aero-blue to-transparent" />
                        <span className="text-aero-blue text-xs uppercase tracking-[0.2em] font-semibold">
                            {t("process.tag")}
                        </span>
                    </div>
                    <h2 id="process-heading" className="text-4xl md:text-5xl font-bold text-white tracking-tight">
                        {t("process.title")}{" "}
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-aero-blue to-aero-purple">
                            {t("process.titleHighlight")}
                        </span>
                    </h2>
                </motion.div>

                {/* Steps grid */}
                <div className="relative">
                    {/* Connector line — desktop only */}
                    <div
                        className="absolute top-1/2 left-0 right-0 h-[2px] hidden lg:block -translate-y-1/2 pointer-events-none"
                        style={{
                            background: "linear-gradient(to right, rgba(0,210,255,0.12), rgba(168,85,247,0.12), rgba(16,185,129,0.12), rgba(249,115,22,0.12))",
                        }}
                        aria-hidden="true"
                    />

                    <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5" aria-label={t("process.tag")}>
                        {steps.map((step, i) => (
                            <li key={i}>
                                <motion.div
                                    initial={reducedMotion ? false : { y: 32, opacity: 0 }}
                                    whileInView={{ y: 0, opacity: 1 }}
                                    viewport={{ once: true, margin: "50px 0px" }}
                                    transition={{ delay: i * 0.12, duration: 0.55 }}
                                    style={{ perspective: "800px" }}
                                >
                                    <motion.div
                                        whileHover={reducedMotion ? {} : { y: -6, rotateY: 4, scale: 1.01 }}
                                        transition={{ duration: 0.25 }}
                                        style={{ transformStyle: "preserve-3d" }}
                                        className="relative rounded-2xl p-6 sm:p-7 h-full"
                                    >
                                        <div
                                            className="absolute inset-0 rounded-2xl"
                                            style={{ background: "#1c1c2a", border: `1px solid ${PROCESS_COLORS[i]}15` }}
                                            aria-hidden="true"
                                        />
                                        <div className="relative z-10">
                                            <div
                                                className="w-11 h-11 sm:w-12 sm:h-12 rounded-full flex items-center justify-center mb-4 text-base sm:text-lg font-black"
                                                style={{
                                                    background: `${PROCESS_COLORS[i]}12`,
                                                    border: `2px solid ${PROCESS_COLORS[i]}38`,
                                                    color: PROCESS_COLORS[i],
                                                    boxShadow: `0 0 18px ${PROCESS_COLORS[i]}18`,
                                                }}
                                                aria-label={`Step ${step.step}`}
                                            >
                                                {step.step}
                                            </div>
                                            <h3 className="text-base sm:text-lg font-bold text-white mb-2">{step.title}</h3>
                                            <p className="text-sm text-gray-500 leading-relaxed">{step.desc}</p>
                                        </div>

                                        {/* Chevron connector */}
                                        {i < steps.length - 1 && (
                                            <div
                                                className="hidden lg:block absolute top-1/2 -right-3 z-20 w-2 h-2 border-t border-r border-white/12 rotate-45 -translate-y-1/2"
                                                aria-hidden="true"
                                            />
                                        )}
                                    </motion.div>
                                </motion.div>
                            </li>
                        ))}
                    </ol>
                </div>
            </div>
        </section>
    );
};