import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface IntroAnimationProps {
    onComplete: () => void;
}

export const IntroAnimation = ({ onComplete }: IntroAnimationProps) => {
    const [phase, setPhase] = useState<"playing" | "branding" | "fadeout">("playing");
    const videoRef = useRef<HTMLVideoElement>(null);
    const hasTriggeredBranding = useRef(false);

    const handleTimeUpdate = useCallback(() => {
        const video = videoRef.current;
        if (!video) return;

        // Show branding overlay near the end of the video (last 2.5 seconds)
        if (!hasTriggeredBranding.current && video.duration - video.currentTime <= 2.5) {
            hasTriggeredBranding.current = true;
            setPhase("branding");
        }
    }, []);

    const handleVideoEnd = useCallback(() => {
        setPhase("fadeout");
        setTimeout(() => onComplete(), 900);
    }, [onComplete]);

    // Allow skip on click
    const handleSkip = useCallback(() => {
        if (videoRef.current) {
            videoRef.current.pause();
        }
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
                    className="fixed inset-0 z-[9999] bg-black overflow-hidden cursor-pointer"
                    onClick={handleSkip}
                >
                    {/* Video */}
                    <video
                        ref={videoRef}
                        autoPlay
                        muted
                        playsInline
                        onTimeUpdate={handleTimeUpdate}
                        onEnded={handleVideoEnd}
                        className="absolute inset-0 w-full h-full object-cover"
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
                            transition={{ duration: 0.8, delay: 0.2 }}
                        >
                            <span className="bg-clip-text text-transparent bg-linear-to-r from-aero-blue to-aero-purple drop-shadow-[0_0_30px_rgba(0,210,255,0.4)]">
                                GERMAN AVIATION
                            </span>
                        </motion.h1>
                        <motion.p
                            className="text-sm md:text-lg text-gray-300 tracking-[0.4em] mt-3 font-light"
                            initial={{ y: 20, opacity: 0 }}
                            animate={phase === "branding" ? { y: 0, opacity: 1 } : {}}
                            transition={{ duration: 0.8, delay: 0.5 }}
                        >
                            & DRONE TECHNOLOGY
                        </motion.p>

                        {/* Decorative line */}
                        <motion.div
                            className="mt-6 h-[1px] bg-linear-to-r from-transparent via-aero-blue/50 to-transparent"
                            initial={{ width: 0 }}
                            animate={phase === "branding" ? { width: 200 } : {}}
                            transition={{ duration: 1, delay: 0.7 }}
                        />
                    </motion.div>

                    {/* Skip hint */}
                    <motion.div
                        className="absolute bottom-6 right-6 text-white/30 text-xs tracking-wider"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.5 }}
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
