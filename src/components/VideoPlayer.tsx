import { motion, AnimatePresence } from "framer-motion";
import { VideoOff } from "lucide-react";
import { useState, useRef, useEffect } from "react";

export const VideoPlayer = ({ src, accent }: { src: string | null; accent: string }) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [playing, setPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [hovered, setHovered] = useState(false);
    const [muted, setMuted] = useState(false);
    const [isInView, setIsInView] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);

    // Only inject the <video> element once the section scrolls near the viewport
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsInView(true);
                    observer.disconnect();
                }
            },
            { rootMargin: "200px" }
        );
        if (containerRef.current) observer.observe(containerRef.current);
        return () => observer.disconnect();
    }, []);

    const togglePlay = () => {
        if (!videoRef.current) return;
        if (playing) {
            videoRef.current.pause();
            setPlaying(false);
        } else {
            videoRef.current.play();
            setPlaying(true);
        }
    };

    const onTimeUpdate = () => {
        if (!videoRef.current) return;
        const ct = videoRef.current.currentTime;
        const dur = videoRef.current.duration;
        setCurrentTime(ct);
        setProgress(dur ? (ct / dur) * 100 : 0);
    };

    const onScrub = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!videoRef.current || !videoRef.current.duration) return;
        const rect = e.currentTarget.getBoundingClientRect();
        const pct = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
        videoRef.current.currentTime = pct * videoRef.current.duration;
    };

    const toggleMute = () => {
        if (!videoRef.current) return;
        videoRef.current.muted = !muted;
        setMuted(!muted);
    };

    const fmtTime = (s: number) => {
        if (!s || isNaN(s)) return "0:00";
        return `${Math.floor(s / 60)}:${Math.floor(s % 60)
            .toString()
            .padStart(2, "0")}`;
    };

    if (!src) {
        return (
            <motion.div
                initial={{ y: 20 }}
                whileInView={{ y: 0 }}
                viewport={{ once: true, margin: "200px 0px" }}
                className="relative rounded-2xl overflow-hidden flex flex-col items-center justify-center gap-5 border"
                style={{ background: "#1c1c2a", borderColor: `${accent}18`, minHeight: "300px" }}
            >
                <div
                    className="absolute inset-0 opacity-[0.025]"
                    style={{
                        backgroundImage: `linear-gradient(${accent}50 1px, transparent 1px), linear-gradient(90deg, ${accent}50 1px, transparent 1px)`,
                        backgroundSize: "40px 40px",
                    }}
                />
                <style>{`@keyframes strokeDash { to { stroke-dashoffset: -200; } }`}</style>
                <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ opacity: 0.08 }}>
                    <rect
                        x="2"
                        y="2"
                        width="98%"
                        height="96%"
                        rx="14"
                        fill="none"
                        stroke={accent}
                        strokeWidth="1.5"
                        strokeDasharray="12 8"
                        style={{ animation: "strokeDash 20s linear infinite" }}
                    />
                </svg>
                <div className="relative z-10 flex flex-col items-center gap-3 text-center px-8">
                    <div
                        className="w-16 h-16 rounded-2xl flex items-center justify-center border"
                        style={{ background: `${accent}0e`, borderColor: `${accent}20` }}
                    >
                        <VideoOff size={26} style={{ color: `${accent}70` }} />
                    </div>
                    <p className="text-sm font-bold tracking-[0.2em] uppercase mt-1" style={{ color: `${accent}80` }}>
                        Demo Not Available
                    </p>
                    <p className="text-xs text-gray-600 max-w-xs leading-relaxed">
                        Video demonstration for this product is not currently available. Contact our team for a live product briefing.
                    </p>
                    <motion.button
                        whileHover={{ scale: 1.04 }}
                        whileTap={{ scale: 0.97 }}
                        className="mt-2 px-6 py-2.5 rounded-full text-xs font-bold tracking-wide border transition-all"
                        style={{ color: accent, borderColor: `${accent}35`, background: `${accent}0c` }}
                    >
                        Request Live Demo
                    </motion.button>
                </div>
            </motion.div>
        );
    }

    return (
        <motion.div
            ref={containerRef}
            initial={{ y: 20 }}
            whileInView={{ y: 0 }}
            viewport={{ once: true, margin: "200px 0px" }}
            className="relative rounded-2xl overflow-hidden select-none"
            style={{ background: "#000", boxShadow: `0 4px 80px ${accent}18, 0 0 0 1px ${accent}${hovered ? "28" : "16"}` }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            {/* HUD brackets */}
            {[
                ["top-4 left-4", "border-t-2 border-l-2"],
                ["top-4 right-4", "border-t-2 border-r-2"],
                ["bottom-[4.5rem] left-4", "border-b-2 border-l-2"],
                ["bottom-[4.5rem] right-4", "border-b-2 border-r-2"],
            ].map(([pos, border], i) => (
                <div
                    key={i}
                    className={`absolute ${pos} w-5 h-5 z-20 pointer-events-none transition-colors duration-300 ${border}`}
                    style={{ borderColor: `${accent}${hovered ? "60" : "35"}` }}
                />
            ))}

            {/* Shimmer skeleton — visible until video is ready to play */}
            <AnimatePresence>
                {!isLoaded && (
                    <motion.div
                        key="skeleton"
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4 }}
                        className="absolute inset-0 z-[15] flex items-center justify-center aspect-video"
                        style={{ background: "#1c1c2a" }}
                    >
                        {/* Shimmer sweep */}
                        <motion.div
                            className="absolute inset-0"
                            style={{
                                background: `linear-gradient(105deg, transparent 35%, ${accent}08 50%, transparent 65%)`,
                                backgroundSize: "200% 100%",
                            }}
                            animate={{ backgroundPosition: ["-100% 0", "200% 0"] }}
                            transition={{ duration: 1.6, repeat: Infinity, ease: "linear" }}
                        />
                        {/* Play icon placeholder */}
                        <div className="relative z-10 flex flex-col items-center gap-3">
                            <div
                                className="flex items-center justify-center rounded-full"
                                style={{
                                    width: 80,
                                    height: 80,
                                    background: `${accent}10`,
                                    border: `2px solid ${accent}25`,
                                }}
                            >
                                <motion.div
                                    animate={{ opacity: [0.3, 0.7, 0.3] }}
                                    transition={{ duration: 1.5, repeat: Infinity }}
                                >
                                    <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
                                        <path d="M8 5.5v13l11-6.5L8 5.5z" fill={accent} opacity="0.5" />
                                    </svg>
                                </motion.div>
                            </div>
                            <span
                                className="text-[10px] font-bold tracking-[0.25em] uppercase"
                                style={{ color: `${accent}50` }}
                            >
                                Loading
                            </span>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Video — only added to DOM when near viewport */}
            {isInView && (
                <video
                    ref={videoRef}
                    src={src}
                    className="w-full aspect-video object-cover block cursor-pointer transition-opacity duration-500"
                    style={{ opacity: isLoaded ? 1 : 0 }}
                    onTimeUpdate={onTimeUpdate}
                    onLoadedMetadata={() => {
                        setDuration(videoRef.current?.duration || 0);
                        setIsLoaded(true);
                    }}
                    onCanPlay={() => setIsLoaded(true)}
                    onEnded={() => setPlaying(false)}
                    onClick={togglePlay}
                    playsInline
                    preload="auto"
                    muted={muted}
                />
            )}

            {/* Overlay */}
            <motion.div
                className="absolute inset-0 pointer-events-none z-[5]"
                animate={{ opacity: playing && !hovered ? 0 : 0.6 }}
                transition={{ duration: 0.4 }}
                style={{ background: "linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.25) 40%, transparent 70%)" }}
            />

            {/* Big play button */}
            <AnimatePresence>
                {!playing && isLoaded && (
                    <motion.button
                        key="bigplay"
                        initial={{ scale: 0.75 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0.75 }}
                        transition={{ duration: 0.2 }}
                        onClick={togglePlay}
                        className="absolute inset-0 flex items-center justify-center z-[8]"
                    >
                        <motion.div
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex items-center justify-center rounded-full"
                            style={{
                                width: 80,
                                height: 80,
                                background: `${accent}20`,
                                border: `2px solid ${accent}55`,
                                backdropFilter: "blur(10px)",
                                boxShadow: `0 0 50px ${accent}30`,
                            }}
                        >
                            <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
                                <path d="M8 5.5v13l11-6.5L8 5.5z" fill={accent} />
                            </svg>
                        </motion.div>
                    </motion.button>
                )}
            </AnimatePresence>

            {/* Controls */}
            <motion.div
                className="absolute bottom-0 left-0 right-0 z-[9] px-5 pt-10 pb-4"
                animate={{ opacity: !playing || hovered ? 1 : 0 }}
                transition={{ duration: 0.3 }}
                style={{ background: "linear-gradient(to top, rgba(0,0,0,0.9), transparent)" }}
            >
                {/* Scrubber */}
                <div
                    className="relative h-[3px] rounded-full mb-3.5 cursor-pointer group/bar"
                    style={{ background: "rgba(255,255,255,0.12)" }}
                    onClick={onScrub}
                >
                    <div className="absolute inset-y-0 left-0 w-full rounded-full opacity-15" style={{ background: accent }} />
                    <div
                        className="absolute inset-y-0 left-0 rounded-full"
                        style={{ width: `${progress}%`, background: `linear-gradient(90deg, ${accent}cc, ${accent})` }}
                    />
                    <div
                        className="absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full opacity-0 group-hover/bar:opacity-100 transition-opacity"
                        style={{ left: `${progress}%`, transform: "translate(-50%,-50%)", background: "white", boxShadow: `0 0 10px ${accent}` }}
                    />
                </div>
                {/* Buttons row */}
                <div className="flex items-center gap-3">
                    <button
                        onClick={togglePlay}
                        className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors shrink-0"
                    >
                        {playing ? (
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
                                <rect x="5" y="4" width="4" height="16" rx="1.5" />
                                <rect x="15" y="4" width="4" height="16" rx="1.5" />
                            </svg>
                        ) : (
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                                <path d="M8 5.5v13l11-6.5L8 5.5z" fill="white" />
                            </svg>
                        )}
                    </button>
                    <button
                        onClick={toggleMute}
                        className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors shrink-0"
                    >
                        {muted ? (
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.55)" strokeWidth="2">
                                <path d="M11 5L6 9H2v6h4l5 4V5z" />
                                <line x1="23" y1="9" x2="17" y2="15" />
                                <line x1="17" y1="9" x2="23" y2="15" />
                            </svg>
                        ) : (
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.55)" strokeWidth="2">
                                <path d="M11 5L6 9H2v6h4l5 4V5z" />
                                <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
                                <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                            </svg>
                        )}
                    </button>
                    <span className="text-[11px] font-mono" style={{ color: "rgba(255,255,255,0.45)" }}>
                        <span style={{ color: "rgba(255,255,255,0.85)" }}>{fmtTime(currentTime)}</span> / {fmtTime(duration)}
                    </span>
                    <div className="ml-auto flex items-center gap-2">
                        <motion.span
                            animate={{ opacity: playing ? [0.5, 1, 0.5] : 0.4 }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                            className="w-1.5 h-1.5 rounded-full"
                            style={{ background: playing ? accent : "rgba(255,255,255,0.3)" }}
                        />
                        <span className="text-[10px] font-bold tracking-widest uppercase" style={{ color: `${accent}90` }}>
                            {playing ? "PLAYING" : "DEMO"}
                        </span>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};