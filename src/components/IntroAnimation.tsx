import { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface IntroAnimationProps {
    onComplete: () => void;
}

export const IntroAnimation = ({ onComplete }: IntroAnimationProps) => {
    const [phase, setPhase] = useState<"loading" | "playing" | "branding" | "fadeout">("loading");
    const videoRef = useRef<HTMLVideoElement>(null);
    const hasTriggeredBranding = useRef(false);
    const timeoutRef = useRef<ReturnType<typeof setTimeout>>(undefined);

    // Fallback: if video hasn't loaded within 4s, skip intro entirely
    useEffect(() => {
        timeoutRef.current = setTimeout(() => {
            if (phase === "loading") {
                setPhase("fadeout");
                setTimeout(() => onComplete(), 600);
            }
        }, 4000);
        return () => clearTimeout(timeoutRef.current);
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const handleCanPlay = useCallback(() => {
        clearTimeout(timeoutRef.current);
        setPhase("playing");
        videoRef.current?.play();
    }, []);

    const handleTimeUpdate = useCallback(() => {
        const video = videoRef.current;
        if (!video) return;

        if (!hasTriggeredBranding.current && video.duration - video.currentTime <= 4.5) {
            hasTriggeredBranding.current = true;
            setPhase("branding");
        }
    }, []);

    const handleVideoEnd = useCallback(() => {
        // Hold company name visible for 2.5s after video ends before fading out
        setTimeout(() => {
            setPhase("fadeout");
            setTimeout(() => onComplete(), 900);
        }, 2500);
    }, [onComplete]);

    const handleSkip = useCallback(() => {
        clearTimeout(timeoutRef.current);
        if (videoRef.current) videoRef.current.pause();
        setPhase("fadeout");
        setTimeout(() => onComplete(), 600);
    }, [onComplete]);

    return (
        <AnimatePresence>
            {phase !== "fadeout" ? (
                <motion.div
                    key="intro"
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8 }}
                    className="fixed inset-0 z-[9999] bg-aero-darker overflow-hidden cursor-pointer"
                    onClick={handleSkip}
                >
                    {/* ── Loading state: instant CSS animation while video buffers ── */}
                    {phase === "loading" && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center z-20">
                            {/* Pulsing ring */}
                            <div className="relative w-24 h-24 mb-10">
                                <div
                                    className="absolute inset-0 rounded-full animate-ping"
                                    style={{
                                        border: "2px solid rgba(0,210,255,0.3)",
                                        animationDuration: "1.5s",
                                    }}
                                />
                                <div
                                    className="absolute inset-2 rounded-full animate-ping"
                                    style={{
                                        border: "1px solid rgba(168,85,247,0.2)",
                                        animationDuration: "2s",
                                        animationDelay: "0.3s",
                                    }}
                                />
                                {/* Spinning arc */}
                                <svg className="absolute inset-0 w-full h-full animate-spin" style={{ animationDuration: "2s" }} viewBox="0 0 96 96">
                                    <circle
                                        cx="48" cy="48" r="40"
                                        fill="none"
                                        stroke="url(#arc-grad)"
                                        strokeWidth="2"
                                        strokeDasharray="60 200"
                                        strokeLinecap="round"
                                    />
                                    <defs>
                                        <linearGradient id="arc-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                                            <stop offset="0%" stopColor="#00d2ff" />
                                            <stop offset="100%" stopColor="#a855f7" />
                                        </linearGradient>
                                    </defs>
                                </svg>
                            </div>

                            {/* Brand name */}
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6 }}
                                className="text-center"
                            >
                                <h1 className="text-2xl md:text-4xl font-bold tracking-wider">
                                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-aero-blue to-aero-purple">
                                        GERMAN AVIATION
                                    </span>
                                </h1>
                                <p className="text-xs md:text-sm text-gray-400 tracking-[0.4em] mt-2 font-light">
                                    & DRONE TECHNOLOGY
                                </p>
                            </motion.div>
                        </div>
                    )}

                    {/* ── Video (loads in background, hidden until ready) ── */}
                    <video
                        ref={videoRef}
                        muted
                        playsInline
                        preload="auto"
                        onCanPlay={handleCanPlay}
                        onTimeUpdate={handleTimeUpdate}
                        onEnded={handleVideoEnd}
                        className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500"
                        style={{ opacity: phase === "loading" ? 0 : 1 }}
                    >
                        <source src="/videos/intro.mp4" type="video/mp4" />
                    </video>

                    {/* Subtle vignette overlay */}
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_50%,rgba(0,0,0,0.6)_100%)]" />

                    {/* Bottom gradient for text readability */}
                    <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-linear-to-t from-black/80 via-black/40 to-transparent" />

                    {/* Company name - appears during branding phase */}
                    <motion.div
                        className="absolute inset-0 flex flex-col items-center justify-end pb-24 md:pb-28"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: phase === "branding" ? 1 : 0 }}
                        transition={{ duration: 1 }}
                    >
                        <motion.h1
                            className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-wider text-center"
                            initial={{ y: 30, opacity: 0 }}
                            animate={phase === "branding" ? { y: 0, opacity: 1 } : {}}
                            transition={{ duration: 1.2, delay: 0.3 }}
                        >
                            <span className="bg-clip-text text-transparent bg-linear-to-r from-aero-blue to-aero-purple drop-shadow-[0_0_30px_rgba(0,210,255,0.4)]">
                                GERMAN AVIATION
                            </span>
                        </motion.h1>
                        <motion.p
                            className="text-sm md:text-lg text-gray-300 tracking-[0.4em] mt-3 font-light"
                            initial={{ y: 20, opacity: 0 }}
                            animate={phase === "branding" ? { y: 0, opacity: 1 } : {}}
                            transition={{ duration: 1.2, delay: 0.7 }}
                        >
                            & DRONE TECHNOLOGY
                        </motion.p>

                        <motion.div
                            className="mt-6 h-[1px] bg-linear-to-r from-transparent via-aero-blue/50 to-transparent"
                            initial={{ width: 0 }}
                            animate={phase === "branding" ? { width: 200 } : {}}
                            transition={{ duration: 1.5, delay: 1.0 }}
                        />
                    </motion.div>

                    {/* Skip hint */}
                    <motion.div
                        className="absolute bottom-6 right-6 text-white/30 text-xs tracking-wider z-30"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1 }}
                    >
                        CLICK TO SKIP
                    </motion.div>

                    {/* Progress bar */}
                    <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-white/5">
                        <motion.div
                            className="h-full bg-linear-to-r from-aero-blue to-aero-purple"
                            initial={{ width: "0%" }}
                            animate={{ width: "100%" }}
                            transition={{ duration: 8, ease: "linear" }}
                        />
                    </div>
                </motion.div>
            ) : null}
        </AnimatePresence>
    );
};
