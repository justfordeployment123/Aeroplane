import { motion } from "framer-motion";
import { ArrowRight, MapPin, Phone, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const navRoutes = [
    { key: "about", to: "/about" },
    { key: "economy", to: "/economy" },
    { key: "applications", to: "/applications" },
    { key: "products", to: "/products" },
    { key: "training", to: "/training" },
    { key: "contact", to: "/contact" },
];

interface SupportLink {
    label: string;
    to?: string;
}

export const Footer = () => {
    const { t } = useTranslation("layout");

    const supportLinks = t("footer.support.links", { returnObjects: true }) as SupportLink[];

    return (
        <footer className="relative overflow-hidden" style={{ background: "#111119" }}>
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-aero-blue/20 to-transparent" />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-aero-blue/[0.03] rounded-full blur-[200px] pointer-events-none" />
            <div
                className="absolute inset-0 opacity-[0.015]"
                style={{
                    backgroundImage:
                        "linear-gradient(rgba(0,210,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(0,210,255,0.3) 1px, transparent 1px)",
                    backgroundSize: "60px 60px",
                }}
            />

            {/* Newsletter strip */}
            <div className="relative border-b border-white/5">
                <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row items-center justify-between gap-6">
                    <div>
                        <h3 className="text-xl font-bold text-white mb-1">{t("footer.newsletter.title")}</h3>
                        <p className="text-sm text-gray-500">{t("footer.newsletter.subtitle")}</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <input
                            type="email"
                            placeholder={t("footer.newsletter.placeholder")}
                            className="w-64 px-5 py-3 rounded-full bg-white/[0.04] border border-white/10 text-white text-sm placeholder-gray-600 outline-none focus:border-aero-blue/50 focus:bg-white/[0.06] transition-all duration-300"
                        />
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.98 }}
                            className="px-6 py-3 rounded-full bg-gradient-to-r from-aero-blue to-aero-purple text-white font-semibold text-sm flex items-center gap-2 shadow-[0_0_20px_rgba(0,210,255,0.2)] hover:shadow-[0_0_30px_rgba(0,210,255,0.4)] transition-shadow"
                        >
                            {t("footer.newsletter.subscribe")}
                            <ArrowRight className="w-4 h-4" />
                        </motion.button>
                    </div>
                </div>
            </div>

            {/* Main footer */}
            <div className="relative max-w-7xl mx-auto px-6 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    {/* Brand */}
                    <div className="lg:col-span-1">
                        <Link to="/" className="inline-flex items-center gap-3 mb-5">
                            <img src="/drone_logo.png" alt="GAADT" className="h-14 w-auto object-contain" />
                            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-aero-blue to-aero-purple tracking-tighter">
                                GAADT
                            </span>
                        </Link>
                        <p className="text-sm text-gray-500 mb-6 leading-relaxed max-w-xs">{t("footer.tagline")}</p>
                        <div className="text-3xl font-light text-white mb-1">{t("footer.contact.phone")}</div>
                        <p className="text-xs text-gray-600">{t("footer.hotlineLabel")}</p>
                    </div>

                    {/* Navigation */}
                    <div>
                        <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-5">{t("footer.nav.title")}</h4>
                        <ul className="space-y-3">
                            {navRoutes.map((link) => (
                                <li key={link.to}>
                                    <Link
                                        to={link.to}
                                        className="group flex items-center text-sm text-gray-500 hover:text-aero-blue transition-colors duration-200"
                                    >
                                        <span className="w-0 group-hover:w-3 h-px bg-aero-blue mr-0 group-hover:mr-2 transition-all duration-200" />
                                        {t(`nav.${link.key}`)}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-5">{t("footer.support.title")}</h4>
                        <ul className="space-y-3">
                            {supportLinks.map((link) => (
                                <li key={link.label}>
                                    {link.to ? (
                                        <Link
                                            to={link.to}
                                            className="group flex items-center text-sm text-gray-500 hover:text-aero-blue transition-colors duration-200"
                                        >
                                            <span className="w-0 group-hover:w-3 h-px bg-aero-blue mr-0 group-hover:mr-2 transition-all duration-200" />
                                            {link.label}
                                        </Link>
                                    ) : (
                                        <span className="group flex items-center text-sm text-gray-500 hover:text-aero-blue cursor-pointer transition-colors duration-200">
                                            <span className="w-0 group-hover:w-3 h-px bg-aero-blue mr-0 group-hover:mr-2 transition-all duration-200" />
                                            {link.label}
                                        </span>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-5">{t("footer.contact.title")}</h4>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3 text-sm text-gray-500">
                                <MapPin className="w-4 h-4 text-aero-blue shrink-0 mt-0.5" />
                                <span>{t("footer.contact.hq")}</span>
                            </li>
                            <li className="flex items-start gap-3 text-sm text-gray-500">
                                <MapPin className="w-4 h-4 text-aero-blue shrink-0 mt-0.5" />
                                <span>{t("footer.contact.beijing")}</span>
                            </li>
                            <li className="flex items-center gap-3 text-sm text-gray-500">
                                <Phone className="w-4 h-4 text-aero-blue shrink-0" />
                                <span>{t("footer.contact.phone")}</span>
                            </li>
                            <li className="flex items-center gap-3 text-sm text-gray-500">
                                <Mail className="w-4 h-4 text-aero-blue shrink-0" />
                                <span>{t("footer.contact.email")}</span>
                            </li>
                        </ul>

                        {/* QR Codes */}
                        <div className="mt-6 flex gap-4">
                            <div className="text-center">
                                <img
                                    src="/images/footer/qr-enterprise.png"
                                    alt={t("footer.contact.qrEnterprise")}
                                    className="w-20 h-20 rounded-lg border border-white/10 bg-white p-1"
                                />
                                <span className="text-[9px] text-gray-600 mt-1 block">{t("footer.contact.qrEnterprise")}</span>
                            </div>
                            <div className="text-center">
                                <img
                                    src="/images/footer/qr-wechat.png"
                                    alt={t("footer.contact.qrWechat")}
                                    className="w-20 h-20 rounded-lg border border-white/10 bg-white p-1"
                                />
                                <span className="text-[9px] text-gray-600 mt-1 block">{t("footer.contact.qrWechat")}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom bar */}
            <div className="relative border-t border-white/5">
                <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-xs text-gray-600">{t("footer.bottom.copyright", { year: new Date().getFullYear() })}</p>
                    <div className="flex items-center gap-6">
                        <span className="text-xs text-gray-600 hover:text-gray-400 cursor-pointer transition-colors">
                            {t("footer.bottom.disclaimers")}
                        </span>
                        <span className="text-xs text-gray-600 hover:text-gray-400 cursor-pointer transition-colors">
                            {t("footer.bottom.copyright_notice")}
                        </span>
                    </div>
                </div>
            </div>
        </footer>
    );
};
