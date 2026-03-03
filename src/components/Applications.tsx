import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Truck, Siren, Wrench } from "lucide-react";
import { useState } from "react";

const apps = [
    {
        title: "Civil Logistics",
        desc: "Systematic solutions for trunk logistics, branch logistics and terminal logistics — connecting every mile with autonomous precision across smart city networks.",
        img: "/images/applications/civil-logistics.png",
        icon: <Truck className="w-5 h-5" />,
        stats: [
            { value: "3-Tier", label: "Network" },
            { value: "24/7", label: "Operation" },
            { value: "99.8%", label: "Delivery Rate" },
        ],
        color: "#00d2ff",
    },
    {
        title: "Emergency Rescue",
        desc: "Intelligent three-dimensional rescue system — rapid deployment, real-time thermal assessment, and autonomous life-saving supply delivery to disaster zones.",
        img: "/images/applications/emergency-rescue.png",
        icon: <Siren className="w-5 h-5" />,
        stats: [
            { value: "<15min", label: "Response" },
            { value: "3D", label: "Mapping" },
            { value: "500km", label: "Coverage" },
        ],
        color: "#ff4d6a",
    },
    {
        title: "Industry Service",
        desc: "Complete operational lifecycle management — from flight operations and diagnostics to maintenance, pilot training and fleet carrying services for all UAV models.",
        img: "/images/applications/industry-service.png",
        icon: <Wrench className="w-5 h-5" />,
        stats: [
            { value: "Full", label: "Lifecycle" },
            { value: "11+", label: "Models" },
            { value: "AOPA", label: "Certified" },
        ],
        color: "#f59e0b",
    },
];

export const Applications = () => {
    const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

    return (
        <section className="py-32 relative overflow-hidden bg-aero-dark">
            <div className="max-w-[1400px] mx-auto px-6 relative">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-16"
                >
                    <span className="text-aero-blue/70 text-[11px] uppercase tracking-[0.2em] mb-4 block font-semibold">Use Cases</span>
                    <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
                        <h2 className="text-4xl md:text-6xl font-bold text-white leading-tight">
                            Application Scenarios
                        </h2>
                        <Link to="/applications">
                            <button className="flex items-center gap-2 text-gray-500 hover:text-white transition-colors text-sm font-medium group">
                                View all scenarios
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </Link>
                    </div>
                </motion.div>

                {/* Featured card - first item takes full width */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="mb-6"
                >
                    <Link to="/applications" className="block">
                        <div
                            className="group relative h-[500px] md:h-[550px] rounded-2xl overflow-hidden border border-white/[0.06] hover:border-white/[0.12] transition-all duration-700"
                            onMouseEnter={() => setHoveredIdx(0)}
                            onMouseLeave={() => setHoveredIdx(null)}
                        >
                            {/* Image */}
                            <img
                                src={apps[0].img}
                                alt={apps[0].title}
                                loading="lazy"
                                decoding="async"
                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-[2s] ease-out group-hover:scale-105"
                            />
                            {/* Overlays */}
                            <div className="absolute inset-0 bg-linear-to-t from-black via-black/40 to-transparent" />
                            <div className="absolute inset-0 bg-linear-to-r from-black/70 via-transparent to-transparent" />

                            {/* Content */}
                            <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-between">
                                {/* Top */}
                                <div className="flex items-start justify-between">
                                    <div className="flex items-center gap-3">
                                        <div
                                            className="w-11 h-11 rounded-xl backdrop-blur-xl border border-white/10 flex items-center justify-center transition-all duration-500"
                                            style={{ background: `${apps[0].color}15`, color: apps[0].color }}
                                        >
                                            {apps[0].icon}
                                        </div>
                                        <span className="text-xs uppercase tracking-[0.15em] font-semibold text-white/50">Featured</span>
                                    </div>
                                    <div className="w-12 h-12 rounded-full border border-white/[0.08] flex items-center justify-center group-hover:border-white/20 group-hover:bg-white/5 transition-all duration-500">
                                        <ArrowRight className="w-5 h-5 text-gray-500 group-hover:text-white group-hover:translate-x-0.5 transition-all" />
                                    </div>
                                </div>

                                {/* Bottom */}
                                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                                    <div className="max-w-xl">
                                        <h3 className="text-4xl md:text-5xl font-bold text-white mb-4">{apps[0].title}</h3>
                                        <motion.p
                                            className="text-gray-300 leading-relaxed text-base"
                                            animate={{ opacity: hoveredIdx === 0 ? 1 : 0.6 }}
                                            transition={{ duration: 0.4 }}
                                        >
                                            {apps[0].desc}
                                        </motion.p>
                                    </div>

                                    {/* Stats */}
                                    <div className="flex gap-8 shrink-0">
                                        {apps[0].stats.map((stat, si) => (
                                            <motion.div
                                                key={si}
                                                className="text-center"
                                                initial={false}
                                                animate={{ y: hoveredIdx === 0 ? 0 : 5, opacity: hoveredIdx === 0 ? 1 : 0.5 }}
                                                transition={{ duration: 0.4, delay: si * 0.05 }}
                                            >
                                                <div className="text-white font-bold text-2xl md:text-3xl">{stat.value}</div>
                                                <div className="text-gray-500 text-[10px] uppercase tracking-wider mt-1">{stat.label}</div>
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Link>
                </motion.div>

                {/* Two cards side by side */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {apps.slice(1).map((app, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.15, duration: 0.8 }}
                        >
                            <Link to="/applications" className="block">
                                <div
                                    className="group relative h-[400px] md:h-[420px] rounded-2xl overflow-hidden border border-white/[0.06] hover:border-white/[0.12] transition-all duration-700"
                                    onMouseEnter={() => setHoveredIdx(idx + 1)}
                                    onMouseLeave={() => setHoveredIdx(null)}
                                >
                                    {/* Image */}
                                    <img
                                        src={app.img}
                                        alt={app.title}
                                        loading="lazy"
                                        decoding="async"
                                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-[2s] ease-out group-hover:scale-105"
                                    />
                                    {/* Overlays */}
                                    <div className="absolute inset-0 bg-linear-to-t from-black via-black/50 to-black/20" />

                                    {/* Content */}
                                    <div className="absolute inset-0 p-7 md:p-8 flex flex-col justify-between">
                                        {/* Top */}
                                        <div className="flex items-start justify-between">
                                            <div
                                                className="w-11 h-11 rounded-xl backdrop-blur-xl border border-white/10 flex items-center justify-center transition-all duration-500"
                                                style={{ background: `${app.color}15`, color: app.color }}
                                            >
                                                {app.icon}
                                            </div>
                                            <div className="w-10 h-10 rounded-full border border-white/[0.08] flex items-center justify-center group-hover:border-white/20 group-hover:bg-white/5 transition-all duration-500">
                                                <ArrowRight className="w-4 h-4 text-gray-500 group-hover:text-white group-hover:translate-x-0.5 transition-all" />
                                            </div>
                                        </div>

                                        {/* Bottom */}
                                        <div>
                                            <h3 className="text-3xl md:text-4xl font-bold text-white mb-3">{app.title}</h3>
                                            <motion.p
                                                className="text-gray-300/80 leading-relaxed text-sm mb-5 max-w-md"
                                                animate={{ opacity: hoveredIdx === idx + 1 ? 1 : 0.5 }}
                                                transition={{ duration: 0.4 }}
                                            >
                                                {app.desc}
                                            </motion.p>

                                            {/* Stats row */}
                                            <div className="flex gap-6">
                                                {app.stats.map((stat, si) => (
                                                    <motion.div
                                                        key={si}
                                                        initial={false}
                                                        animate={{
                                                            y: hoveredIdx === idx + 1 ? 0 : 5,
                                                            opacity: hoveredIdx === idx + 1 ? 1 : 0.4,
                                                        }}
                                                        transition={{ duration: 0.4, delay: si * 0.05 }}
                                                    >
                                                        <div className="text-white font-bold text-xl">{stat.value}</div>
                                                        <div className="text-gray-500 text-[10px] uppercase tracking-wider">{stat.label}</div>
                                                    </motion.div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
