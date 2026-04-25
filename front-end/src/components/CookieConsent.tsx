import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cookie, Shield, BarChart3, Megaphone, ChevronDown, Check } from "lucide-react";
import { useTranslation } from "react-i18next";
import type { ConsentPreferences } from "../hooks/useCookieConsent";

interface CookieConsentProps {
    show: boolean;
    onAcceptAll: () => void;
    onDeclineAll: () => void;
    onSaveCustom: (prefs: Omit<ConsentPreferences, "necessary">) => void;
}

interface ToggleProps {
    checked: boolean;
    onChange: (v: boolean) => void;
    disabled?: boolean;
    accent?: string;
    label: string;
}

const Toggle = ({ checked, onChange, disabled = false, accent = "#00d2ff", label }: ToggleProps) => (
    <button
        role="switch"
        aria-checked={checked}
        aria-label={label}
        disabled={disabled}
        onClick={() => !disabled && onChange(!checked)}
        className="relative w-10 h-5 rounded-full transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-aero-blue/60 shrink-0"
        style={{
            background: checked ? accent : "rgba(255,255,255,0.1)",
            opacity: disabled ? 0.5 : 1,
            cursor: disabled ? "not-allowed" : "pointer",
        }}
    >
        <span
            className="absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform duration-200"
            style={{ transform: checked ? "translateX(20px)" : "translateX(0)" }}
            aria-hidden="true"
        />
    </button>
);

export const CookieConsent = ({ show, onAcceptAll, onDeclineAll, onSaveCustom }: CookieConsentProps) => {
    const { t } = useTranslation("common");
    const [expanded, setExpanded] = useState(false);
    const [analytics, setAnalytics] = useState(false);
    const [marketing, setMarketing] = useState(false);

    const COOKIE_CATEGORIES = [
        {
            key: "necessary",
            icon: Shield,
            accent: "#10b981",
            required: true,
            checked: true,
            onChange: () => {},
        },
        {
            key: "analytics",
            icon: BarChart3,
            accent: "#00d2ff",
            required: false,
            checked: analytics,
            onChange: setAnalytics,
        },
        {
            key: "marketing",
            icon: Megaphone,
            accent: "#a855f7",
            required: false,
            checked: marketing,
            onChange: setMarketing,
        },
    ];

    return (
        <AnimatePresence>
            {show && (
                <>
                    {/* Backdrop blur — subtle, not blocking */}
                    <motion.div
                        className="fixed bottom-0 left-0 right-0 h-48 z-[90] pointer-events-none"
                        style={{ background: "linear-gradient(to top, rgba(0,0,0,0.5), transparent)" }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        aria-hidden="true"
                    />

                    {/* Banner */}
                    <motion.div
                        role="dialog"
                        aria-modal="false"
                        aria-label={t("cookies.bannerLabel", "Cookie consent")}
                        className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:bottom-6 sm:w-[420px] z-[91]"
                        initial={{ y: 40, opacity: 0, scale: 0.97 }}
                        animate={{ y: 0, opacity: 1, scale: 1 }}
                        exit={{ y: 30, opacity: 0, scale: 0.97 }}
                        transition={{ type: "spring", stiffness: 300, damping: 28 }}
                    >
                        <div
                            className="rounded-2xl overflow-hidden"
                            style={{
                                background: "#1c1c2a",
                                border: "1px solid rgba(0,210,255,0.18)",
                                boxShadow: "0 24px 60px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.04)",
                            }}
                        >
                            {/* Header */}
                            <div className="px-5 pt-5 pb-4 border-b border-white/[0.06]">
                                <div className="flex items-start gap-3">
                                    <div
                                        className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5"
                                        style={{ background: "rgba(0,210,255,0.1)", border: "1px solid rgba(0,210,255,0.22)" }}
                                        aria-hidden="true"
                                    >
                                        <Cookie size={16} className="text-aero-blue" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h2 className="text-sm font-bold text-white leading-snug">
                                            {t("cookies.title", "We use cookies")}
                                        </h2>
                                        <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                                            {t("cookies.description", "We use cookies to improve your experience, analyze traffic, and personalize content. You can manage your preferences below.")}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Expandable preferences */}
                            <div>
                                <button
                                    onClick={() => setExpanded((e) => !e)}
                                    className="w-full flex items-center justify-between px-5 py-3 text-xs text-gray-500 hover:text-gray-300 transition-colors focus-visible:outline-none"
                                    aria-expanded={expanded}
                                    aria-controls="cookie-preferences"
                                >
                                    <span className="font-medium tracking-wide uppercase text-[10px]">
                                        {t("cookies.managePreferences", "Manage preferences")}
                                    </span>
                                    <motion.span
                                        animate={{ rotate: expanded ? 180 : 0 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <ChevronDown size={14} aria-hidden="true" />
                                    </motion.span>
                                </button>

                                <AnimatePresence initial={false}>
                                    {expanded && (
                                        <motion.div
                                            id="cookie-preferences"
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.22 }}
                                            className="overflow-hidden"
                                        >
                                            <div className="px-5 pb-4 space-y-3 border-t border-white/[0.05]">
                                                {COOKIE_CATEGORIES.map(({ key, icon: Icon, accent, required, checked, onChange }) => (
                                                    <div key={key} className="flex items-start gap-3 pt-3">
                                                        <div
                                                            className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                                                            style={{ background: `${accent}12`, border: `1px solid ${accent}25` }}
                                                            aria-hidden="true"
                                                        >
                                                            <Icon size={13} style={{ color: accent }} />
                                                        </div>
                                                        <div className="flex-1 min-w-0">
                                                            <div className="flex items-center justify-between gap-2">
                                                                <span className="text-xs font-semibold text-white">
                                                                    {t(`cookies.${key}.title`, key)}
                                                                    {required && (
                                                                        <span className="ml-1.5 text-[9px] text-gray-600 font-normal uppercase tracking-wider">
                                                                            {t("cookies.required", "Required")}
                                                                        </span>
                                                                    )}
                                                                </span>
                                                                <Toggle
                                                                    checked={checked}
                                                                    onChange={onChange}
                                                                    disabled={required}
                                                                    accent={accent}
                                                                    label={t(`cookies.${key}.title`, key)}
                                                                />
                                                            </div>
                                                            <p className="text-[11px] text-gray-600 mt-0.5 leading-relaxed">
                                                                {t(`cookies.${key}.desc`, "")}
                                                            </p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            {/* Actions */}
                            <div className="px-5 pb-5 pt-3 flex flex-col gap-2.5">
                                {/* Accept all — primary */}
                                <button
                                    onClick={onAcceptAll}
                                    className="w-full py-2.5 rounded-xl bg-white text-black text-sm font-bold hover:bg-gray-100 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white flex items-center justify-center gap-1.5"
                                >
                                    <Check size={14} aria-hidden="true" />
                                    {t("cookies.acceptAll", "Accept all")}
                                </button>

                                <div className="flex gap-2">
                                    {/* Save custom (only visible when expanded) */}
                                    {expanded && (
                                        <button
                                            onClick={() => onSaveCustom({ analytics, marketing })}
                                            className="flex-1 py-2.5 rounded-xl text-xs font-semibold text-aero-blue border border-aero-blue/30 hover:bg-aero-blue/10 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-aero-blue/50"
                                        >
                                            {t("cookies.savePreferences", "Save preferences")}
                                        </button>
                                    )}

                                    {/* Decline */}
                                    <button
                                        onClick={onDeclineAll}
                                        className="flex-1 py-2.5 rounded-xl text-xs font-medium text-gray-500 hover:text-gray-300 border border-white/[0.07] hover:border-white/[0.14] transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-white/20"
                                    >
                                        {t("cookies.declineAll", "Decline all")}
                                    </button>
                                </div>

                                <p className="text-[10px] text-gray-700 text-center leading-relaxed">
                                    {t("cookies.policyNote", "By accepting, you agree to our")}{" "}
                                    <a
                                        href="/privacy"
                                        className="text-gray-500 hover:text-gray-300 underline underline-offset-2 transition-colors"
                                    >
                                        {t("cookies.privacyPolicy", "Privacy Policy")}
                                    </a>
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};