import { motion, AnimatePresence } from "framer-motion";
import { Play, X } from "lucide-react";
import { useState, useMemo } from "react";
import { useTranslation } from "react-i18next";

interface YouTubeVideo {
    id: string;
    title: string;
    youtubeId: string;
    accent: string;
}

const VideoCard = ({
    video,
    index,
    watchText,
    onPlay,
}: {
    video: YouTubeVideo;
    index: number;
    watchText: string;
    onPlay: (youtubeId: string) => void;
}) => {
    const [hovered, setHovered] = useState(false);
    const thumbnailUrl = `https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`;

    return (
        <motion.div
            initial={{ y: 30 }}
            whileInView={{ y: 0 }}
            viewport={{ once: true, margin: "200px 0px" }}
            transition={{ duration: 0.5, delay: index * 0.08 }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onClick={() => onPlay(video.youtubeId)}
            className="relative rounded-2xl overflow-hidden cursor-pointer group"
            style={{
                boxShadow: hovered
                    ? `0 8px 60px ${video.accent}25, 0 0 0 1px ${video.accent}30`
                    : `0 4px 30px rgba(0,0,0,0.4), 0 0 0 1px ${video.accent}12`,
            }}
        >
            {/* Thumbnail */}
            <div className="relative aspect-video overflow-hidden">
                <motion.img
                    src={thumbnailUrl}
                    alt={video.title}
                    className="w-full h-full object-cover"
                    animate={{ scale: hovered ? 1.08 : 1 }}
                    transition={{ duration: 0.6 }}
                />

                {/* Overlay */}
                <div
                    className="absolute inset-0 transition-opacity duration-500"
                    style={{
                        background: `linear-gradient(to top, rgba(0,0,0,0.85) 0%, ${video.accent}10 40%, transparent 70%)`,
                        opacity: hovered ? 0.9 : 0.7,
                    }}
                />

                {/* Play button */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                        animate={{ scale: hovered ? 1.15 : 1 }}
                        transition={{ duration: 0.3 }}
                        className="flex items-center justify-center rounded-full"
                        style={{
                            width: 64,
                            height: 64,
                            background: `${video.accent}25`,
                            border: `2px solid ${video.accent}60`,
                            backdropFilter: "blur(10px)",
                            boxShadow: hovered ? `0 0 40px ${video.accent}40` : `0 0 20px ${video.accent}20`,
                        }}
                    >
                        <Play size={24} fill={video.accent} style={{ color: video.accent, marginLeft: 2 }} />
                    </motion.div>
                </div>

                {/* HUD corners */}
                {[
                    ["top-3 left-3", "border-t border-l"],
                    ["top-3 right-3", "border-t border-r"],
                    ["bottom-3 left-3", "border-b border-l"],
                    ["bottom-3 right-3", "border-b border-r"],
                ].map(([pos, border], i) => (
                    <div
                        key={i}
                        className={`absolute ${pos} w-4 h-4 pointer-events-none transition-colors duration-300 ${border}`}
                        style={{ borderColor: hovered ? `${video.accent}50` : `${video.accent}20` }}
                    />
                ))}

                {/* Index badge */}
                <div className="absolute top-3 left-3 ml-5 z-10">
                    <span
                        className="text-[9px] font-bold tracking-[0.2em] uppercase px-2 py-0.5 rounded-sm"
                        style={{ color: video.accent, background: `${video.accent}15` }}
                    >
                        {String(index + 1).padStart(2, "0")}
                    </span>
                </div>
            </div>

            {/* Title bar */}
            <div className="p-4" style={{ background: "#181826" }}>
                <h3 className="text-sm font-bold text-white leading-snug line-clamp-2">{video.title}</h3>
                <div className="flex items-center gap-2 mt-2">
                    <motion.div
                        animate={{ opacity: hovered ? [0.5, 1, 0.5] : 0.4 }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="w-1.5 h-1.5 rounded-full"
                        style={{ background: hovered ? video.accent : "rgba(255,255,255,0.3)" }}
                    />
                    <span className="text-[10px] tracking-widest uppercase" style={{ color: `${video.accent}80` }}>
                        {watchText}
                    </span>
                </div>
            </div>
        </motion.div>
    );
};

export const YouTubeGallery = () => {
    const { t, i18n } = useTranslation('gallery');
    const [activeVideoId, setActiveVideoId] = useState<string | null>(null);

    // Dynamic video array using translations
    const videos: YouTubeVideo[] = useMemo(() => [
        {
            id: "cluster-flight",
            title: t('videos.cluster-flight'),
            youtubeId: "gGFPBUKCZJc",
            accent: "#a855f7",
        },
        {
            id: "shore-to-ship",
            title: t('videos.shore-to-ship'),
            youtubeId: "RbpTye5I1iA",
            accent: "#06b6d4",
        },
        {
            id: "firefighting",
            title: t('videos.firefighting'),
            youtubeId: "HjHNnHjEXOI",
            accent: "#ef4444",
        },
        {
            id: "blood-transport",
            title: t('videos.blood-transport'),
            youtubeId: "MMYdsLAhr6k",
            accent: "#10b981",
        },
        {
            id: "maritime-rescue",
            title: t('videos.maritime-rescue'),
            youtubeId: "7i0_KVfvQKc",
            accent: "#f59e0b",
        },
        {
            id: "tethered-uav",
            title: t('videos.tethered-uav'),
            youtubeId: "TfLvaJ-PwdA",
            accent: "#ec4899",
        },
    ], [t]);

    return (
        <>
            {/* Video Grid */}
            <section className="py-32 relative overflow-hidden">
                {/* Background effects */}
                <div className="absolute inset-0">
                    <div
                        className="absolute inset-0 opacity-[0.015]"
                        style={{
                            backgroundImage:
                                "linear-gradient(rgba(0,210,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(0,210,255,0.5) 1px, transparent 1px)",
                            backgroundSize: "80px 80px",
                        }}
                    />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-aero-blue/[0.03] rounded-full blur-[200px] pointer-events-none" />
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-6">
                    {/* Section header */}
                    <motion.div
                        initial={{ y: 20 }}
                        whileInView={{ y: 0 }}
                        viewport={{ once: true, margin: "200px 0px" }}
                        className="text-center mb-16"
                    >
                        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-aero-blue/30 bg-aero-card/80 text-aero-blue text-sm font-medium tracking-wide mb-6 backdrop-blur-md">
                            <span className="w-2 h-2 rounded-full bg-aero-blue animate-pulse" />
                            {t('header.badge')}
                        </span>
                        <h2 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight mb-4">
                            {t('header.title1')}{" "}
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-aero-blue to-aero-purple">
                                {t('header.title2')}
                            </span>
                        </h2>
                    </motion.div>

                    {/* Featured highlight — local showcase video */}
                    <motion.div
                        initial={{ opacity: 0, y: 28 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-60px" }}
                        transition={{ duration: 0.65 }}
                        className="mb-16 max-w-5xl mx-auto"
                    >
                        <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-[0_0_60px_rgba(0,210,255,0.1)] bg-aero-darker aspect-video">
                            <div
                                className="absolute inset-0 bg-gradient-to-t from-aero-darker/40 via-transparent to-transparent pointer-events-none z-[1]"
                                aria-hidden
                            />
                            <video
                                className="absolute inset-0 w-full h-full object-contain bg-black"
                                src="/videos/125412.mp4"
                                controls
                                playsInline
                                preload="metadata"
                                poster="/images/banners/applications-hero.jpg"
                            >
                                Your browser does not support the video tag.
                            </video>
                        </div>
                        <p className="text-center text-xs text-gray-500 mt-3 tracking-wide uppercase">
                            {t('featured.caption')}
                        </p>
                    </motion.div>

                    {/* Video grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {videos.map((video, i) => (
                            <VideoCard 
                                key={video.id} 
                                video={video} 
                                index={i} 
                                watchText={t('card.watchDemo')}
                                onPlay={setActiveVideoId} 
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* Fullscreen Modal */}
            <AnimatePresence>
                {activeVideoId && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-8"
                        onClick={() => setActiveVideoId(null)}
                    >
                        {/* Backdrop */}
                        <div className="absolute inset-0 bg-aero-darker/95 backdrop-blur-md" />

                        {/* Close button */}
                        <motion.button
                            initial={{ scale: 0.8 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0.8 }}
                            transition={{ delay: 0.2 }}
                            onClick={() => setActiveVideoId(null)}
                            className="absolute top-6 right-6 z-10 w-12 h-12 rounded-full flex items-center justify-center border border-white/20 bg-white/5 hover:bg-white/10 transition-colors"
                        >
                            <X size={20} className="text-white" />
                        </motion.button>

                        {/* Video container */}
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            transition={{ duration: 0.4 }}
                            className="relative z-10 w-full max-w-5xl rounded-2xl overflow-hidden"
                            style={{
                                boxShadow: "0 0 100px rgba(0,210,255,0.15), 0 0 0 1px rgba(0,210,255,0.2)",
                            }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="relative w-full" style={{ paddingTop: "56.25%" }}>
                                <iframe
                                    className="absolute inset-0 w-full h-full"
                                    src={`https://www.youtube-nocookie.com/embed/${activeVideoId}?autoplay=1&rel=0&modestbranding=1&hl=${i18n.language}&cc_lang_pref=${i18n.language}`}
                                    title="Video Player"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                />
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};