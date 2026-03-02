import { motion } from "framer-motion";
import { FileText, ArrowRight } from "lucide-react";

export const LowAltitudeEconomy = () => {
    return (
        <div className="bg-aero-dark min-h-screen text-white pt-20 font-sans">
            {/* Hero Section */}
            <section className="relative h-[50vh] flex items-center justify-center overflow-hidden">
                {/* Background Image */}
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
                    style={{ backgroundImage: "url('https://www.htsdfp.com/UploadFiles/2024-02-06/l5svpqacwcasliss.png')" }}
                />
                {/* Dark linear Overlay */}
                <div className="absolute inset-0 bg-linear-to-t from-aero-dark via-aero-dark/70 to-black/40 z-0" />

                <div className="relative z-10 text-center px-6 max-w-4xl">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
                            Low Altitude <span className="bg-clip-text text-transparent bg-linear-to-r from-aero-blue to-aero-purple">Economy</span>
                        </h1>
                        <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
                            The development of the low altitude economic industrial system will significantly promote the integration of national
                            transportation strategies, helping to build a strong country in science, technology, and transportation.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Breadcrumb Navigation
            <div className="border-b border-white/5 bg-black/40 backdrop-blur-md">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center text-sm text-gray-400">
                    <span className="hover:text-aero-blue cursor-pointer transition-colors">Home</span>
                    <span className="mx-2 text-gray-600">/</span>
                    <span className="hover:text-aero-blue cursor-pointer transition-colors">Low Altitude Economy</span>
                    <span className="mx-2 text-gray-600">/</span>
                    <span className="text-white font-medium">Overview</span>
                </div>
            </div> */}

            {/* Application Overview Section */}
            <section className="py-24 relative">
                {/* Subtle background glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 bg-aero-blue/5 rounded-full blur-[100px] pointer-events-none" />

                <div className="max-w-4xl mx-auto px-6 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="bg-aero-panel border border-white/10 rounded-3xl p-10 md:p-16 shadow-[0_0_40px_rgba(0,0,0,0.5)] text-center backdrop-blur-sm"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-6">Application Overview</h2>
                        <div className="h-1 w-16 bg-aero-purple mx-auto rounded-full mb-8" />
                        <p className="text-lg text-gray-300 leading-loose">
                            Through the continuous development of the low altitude economy, it is possible to achieve the convenience and intelligence
                            of air transportation, improve transportation efficiency, reduce traffic congestion, reduce energy consumption, and
                            provide revolutionary new solutions for emergency rescue, logistics distribution, and advanced industrial fields.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Scenario Application / White Paper Section */}
            <section className="py-24 bg-black border-t border-white/5">
                <div className="max-w-7xl mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl font-bold mb-4">Scenario Application</h2>
                        <div className="h-1 w-24 bg-linear-to-r from-aero-blue to-aero-purple mx-auto rounded-full" />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="group relative bg-linear-to-br from-[#0a0a0a] to-[#111] border border-white/10 hover:border-aero-blue/40 rounded-3xl overflow-hidden transition-all duration-500 shadow-2xl"
                    >
                        <div className="grid grid-cols-1 lg:grid-cols-2">
                            {/* Image Side */}
                            <div className="relative h-80 lg:h-auto overflow-hidden bg-white/5 flex items-center justify-center p-8">
                                <div className="absolute inset-0 bg-linear-to-tr from-aero-blue/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                <img
                                    src="https://www.htsdfp.com/UploadFiles/2024-02-28/beycmwcwnwhjfx6p.png"
                                    alt="Low Altitude Economic Industry White Paper"
                                    className="relative z-10 w-full max-w-sm object-contain drop-shadow-[0_10px_30px_rgba(0,210,255,0.15)] group-hover:scale-105 transition-transform duration-700 ease-out"
                                />
                            </div>

                            {/* Text Side */}
                            <div className="p-10 md:p-14 flex flex-col justify-center relative">
                                {/* Glowing accent in the corner */}
                                <div className="absolute top-0 right-0 w-32 h-32 bg-aero-blue/10 rounded-bl-full blur-2xl transition-colors group-hover:bg-aero-purple/20" />

                                <div className="flex items-center text-aero-blue mb-4">
                                    <FileText className="w-6 h-6 mr-2" />
                                    <span className="text-sm font-semibold tracking-wider uppercase">Official Publication</span>
                                </div>

                                <h3 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">
                                    Low Altitude Economic Industry White Paper
                                </h3>

                                <p className="text-gray-400 text-lg leading-relaxed mb-8">
                                    The low-altitude economic industrial system provides solutions around the radius of human life and work,
                                    integrating the results of various scientific and technological revolutions. It is characterized by advanced
                                    technology, high industrial level, huge scale, abundant employment opportunities, and a remarkable driving effect.
                                </p>
                                <p className="text-gray-400 text-lg leading-relaxed mb-10">
                                    Focusing on the development of this system will play a key role and have a long-term impact on improving the
                                    national transportation strategy.
                                </p>

                                <button className="inline-flex items-center w-fit px-6 py-3 bg-white/5 border border-white/10 hover:border-aero-blue hover:bg-aero-blue/10 text-white font-medium rounded-full transition-all duration-300 group/btn">
                                    Read White Paper
                                    <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};
