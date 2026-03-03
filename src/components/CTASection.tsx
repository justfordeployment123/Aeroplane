import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export const CTASection = () => {
    return (
        <section className="py-32 relative overflow-hidden bg-aero-dark">
            {/* 3D depth rings */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <motion.div
                    className="w-[900px] h-[900px] rounded-full border border-white/[0.015]"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
                />
            </div>
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <motion.div
                    className="w-[600px] h-[600px] rounded-full border border-white/[0.02]"
                    animate={{ rotate: -360 }}
                    transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
                />
            </div>
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-[350px] h-[350px] rounded-full bg-aero-blue/[0.04] blur-[120px]" />
            </div>

            <div className="relative max-w-4xl mx-auto px-6 text-center" style={{ perspective: "800px" }}>
                <motion.div
                    initial={{ opacity: 0, y: 50, rotateX: 10 }}
                    whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.9 }}
                >
                    <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
                        Ready to Transform
                        <br />
                        Your Operations?
                    </h2>
                    <p className="text-gray-500 text-lg max-w-xl mx-auto mb-14 leading-relaxed">
                        Discover how our autonomous aviation systems can revolutionize your logistics,
                        rescue operations, and industrial services.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link to="/products">
                            <motion.button
                                whileHover={{ scale: 1.04, y: -2 }}
                                whileTap={{ scale: 0.97 }}
                                className="group relative px-10 py-4.5 bg-white text-black font-bold rounded-full overflow-hidden shadow-[0_0_40px_rgba(255,255,255,0.1)] hover:shadow-[0_0_60px_rgba(255,255,255,0.2)] transition-shadow duration-500"
                            >
                                <span className="relative flex items-center gap-2 text-base">
                                    Explore Products
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </span>
                            </motion.button>
                        </Link>
                        <Link to="/training">
                            <motion.button
                                whileHover={{ scale: 1.04, y: -2 }}
                                whileTap={{ scale: 0.97 }}
                                className="px-10 py-4.5 border border-white/10 text-gray-400 hover:text-white hover:border-white/25 font-medium rounded-full transition-all duration-300 text-base"
                            >
                                Training Center
                            </motion.button>
                        </Link>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};
