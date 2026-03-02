// src/components/Applications.tsx
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const apps = [
    {
        title: "Civil Logistic",
        desc: "Provides systematic solutions for typical operation scenarios such as trunk logistics, branch logistics and terminal logistics.",
        bgImg: "https://www.htsdfp.com/UploadFiles/2024-10-10/tsfdemhrijza6ejq.png",
    },
    {
        title: "Emergency Rescue",
        desc: "Innovate the UAVs emergency rescue mode. Build an intelligent three-dimensional rescue system. Provide systematic solutions for different disaster scenarios.",
        bgImg: "https://www.htsdfp.com/UploadFiles/2024-05-15/wxzhgujhcrs7dwzb.png",
    },
    {
        title: "Industry Service",
        desc: "A complete operational system for flight carrying. Provide customers with services such as operation, testing, and carrying of various models.",
        bgImg: "https://www.htsdfp.com/UploadFiles/2024-05-15/g8shx7utz55qhupr.png",
    },
];

export const Applications = () => {
    return (
        <section className="py-24 bg-aero-dark relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl font-bold text-white mb-4 tracking-wide">Application Scenarios</h2>
                    <div className="h-1 w-24 bg-linear-to-r from-aero-blue to-aero-purple mx-auto rounded-full" />
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {apps.map((app, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.2, duration: 0.6 }}
                            className="group relative h-112.5 rounded-3xl overflow-hidden cursor-pointer shadow-2xl border border-white/10"
                        >
                            {/* Background Image with Hover Zoom */}
                            <div
                                className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 ease-in-out group-hover:scale-110"
                                style={{ backgroundImage: `url(${app.bgImg})` }}
                            />

                            {/* Heavy Gradient Overlay for Text Readability */}
                            <div className="absolute inset-0 bg-linear-to-t from-black via-black/50 to-transparent opacity-90 transition-opacity duration-500" />

                            {/* Blue Tint Overlay on Hover */}
                            <div className="absolute inset-0 bg-aero-blue/20 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                            {/* Content Container */}
                            <div className="absolute inset-0 p-8 flex flex-col justify-end translate-y-8 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                                <h3 className="text-3xl font-bold mb-3 text-white">{app.title}</h3>

                                {/* Description - Fades in and slides up on hover */}
                                <p className="text-gray-300 leading-relaxed opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100 line-clamp-3 mb-4">
                                    {app.desc}
                                </p>

                                {/* Learn More Link */}
                                <div className="opacity-0 group-hover:opacity-100 transition-all duration-500 delay-200">
                                    <Link to="/applications">
                                        <span className="inline-flex items-center text-aero-blue font-semibold uppercase tracking-wider text-sm cursor-pointer">
                                            Learn More
                                            <svg
                                                className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                            </svg>
                                        </span>
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
