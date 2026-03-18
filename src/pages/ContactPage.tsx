import { motion } from "framer-motion";
import { MapPin, Phone, Mail } from "lucide-react";

const contactInfo = [
    { icon: Phone, label: "Hotline", value: "400-888-2062", accent: "#00d2ff" },
    { icon: Mail, label: "Email", value: "marketing@htsdfp.com", accent: "#a855f7" },
    { icon: MapPin, label: "Headquarters", value: "Building A7, International Innovation Port, Huaqiao Economic Development Zone, Kunshan City, Jiangsu Province", accent: "#10b981" },
    { icon: MapPin, label: "Beijing R&D Branch Center", value: "9F, Building 2, No. 55 Zique Road, Haidian District, Beijing", accent: "#f59e0b" },
];

export const ContactPage = () => {
    return (
        <div className="min-h-screen" style={{ background: "#161622" }}>
            {/* Hero */}
            <section className="relative pt-32 pb-20 overflow-hidden">
                <div className="absolute inset-0 opacity-[0.02]" style={{
                    backgroundImage: "linear-gradient(rgba(0,210,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(0,210,255,0.5) 1px, transparent 1px)",
                    backgroundSize: "60px 60px",
                }} />
                <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full blur-[200px] opacity-[0.06] bg-aero-blue pointer-events-none" />

                <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
                    <motion.span initial={{ y: 10 }} animate={{ y: 0 }} className="text-xs font-bold tracking-[0.25em] uppercase text-aero-blue mb-4 block">
                        Get in Touch
                    </motion.span>
                    <motion.h1 initial={{ y: 20 }} animate={{ y: 0 }} transition={{ delay: 0.1 }} className="text-4xl md:text-6xl font-black text-white tracking-tight mb-6">
                        Contact Us
                    </motion.h1>
                    <motion.p initial={{ y: 20 }} animate={{ y: 0 }} transition={{ delay: 0.2 }} className="text-gray-400 max-w-xl mx-auto text-lg">
                        Reach out for product inquiries, partnership opportunities, or technical support.
                    </motion.p>
                </div>
            </section>

            {/* Contact Cards + Form */}
            <section className="pb-24">
                <div className="max-w-7xl mx-auto px-6">
                    {/* Contact Info Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
                        {contactInfo.map((item, idx) => {
                            const Icon = item.icon;
                            return (
                                <motion.div
                                    key={idx}
                                    initial={{ y: 20 }}
                                    whileInView={{ y: 0 }}
                                    viewport={{ once: true, margin: "200px 0px" }}
                                    transition={{ delay: idx * 0.08 }}
                                    className="group rounded-2xl p-6 border border-white/[0.06] hover:border-white/[0.12] transition-all"
                                    style={{ background: "#1c1c2a" }}
                                >
                                    <div
                                        className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                                        style={{ background: `${item.accent}15`, border: `1px solid ${item.accent}25` }}
                                    >
                                        <Icon size={20} style={{ color: item.accent }} />
                                    </div>
                                    <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">{item.label}</p>
                                    <p className="text-sm font-semibold text-white">{item.value}</p>
                                </motion.div>
                            );
                        })}
                    </div>

                    {/* Contact Form */}
                    <motion.div
                        initial={{ y: 30 }}
                        whileInView={{ y: 0 }}
                        viewport={{ once: true, margin: "200px 0px" }}
                        className="max-w-2xl mx-auto rounded-3xl p-8 md:p-12 border border-white/[0.06]"
                        style={{ background: "#1c1c2a" }}
                    >
                        <h2 className="text-2xl font-bold text-white mb-2">Send us a message</h2>
                        <p className="text-sm text-gray-500 mb-8">We'll get back to you within 24 hours.</p>

                        <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                <input
                                    type="text"
                                    placeholder="Name"
                                    className="w-full px-5 py-3.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white text-sm placeholder-gray-600 outline-none focus:border-aero-blue/50 transition-colors"
                                />
                                <input
                                    type="email"
                                    placeholder="EMail"
                                    className="w-full px-5 py-3.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white text-sm placeholder-gray-600 outline-none focus:border-aero-blue/50 transition-colors"
                                />
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                <input
                                    type="tel"
                                    placeholder="Phone"
                                    className="w-full px-5 py-3.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white text-sm placeholder-gray-600 outline-none focus:border-aero-blue/50 transition-colors"
                                />
                                <input
                                    type="text"
                                    placeholder="CompanyName"
                                    className="w-full px-5 py-3.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white text-sm placeholder-gray-600 outline-none focus:border-aero-blue/50 transition-colors"
                                />
                            </div>
                            <input
                                type="text"
                                placeholder="Address"
                                className="w-full px-5 py-3.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white text-sm placeholder-gray-600 outline-none focus:border-aero-blue/50 transition-colors"
                            />
                            <textarea
                                rows={5}
                                placeholder="Message"
                                className="w-full px-5 py-3.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white text-sm placeholder-gray-600 outline-none focus:border-aero-blue/50 transition-colors resize-none"
                            />
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                type="submit"
                                className="w-full py-4 rounded-full bg-gradient-to-r from-aero-blue to-aero-purple text-white font-bold text-sm shadow-[0_0_20px_rgba(0,210,255,0.2)] hover:shadow-[0_0_30px_rgba(0,210,255,0.4)] transition-shadow"
                            >
                                Send Message
                            </motion.button>
                        </form>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};
