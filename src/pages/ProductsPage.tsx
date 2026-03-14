import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import { ArrowRight, Plane, Rocket, MonitorDot, Cpu, ArrowLeft, CheckCircle2, ChevronRight, VideoOff } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const productCategories = [
    {
        id: "uav",
        title: "UAV",
        subtitle: "Unmanned Aerial Vehicles",
        description: "High-performance fixed-wing and multi-rotor platforms engineered for precision logistics.",
        icon: Plane,
        accent: "#00d2ff",
        products: [
            {
                id: "fp-98",
                name: "FP-98 Large Fixed Wing UAVs",
                tag: "Fixed Wing",
                img: "https://www.htsdfp.com/UploadFiles/2024-10-10/paergxakh48z8g8g.png",
                description:
                    "The FP-98 is China's first large unmanned transport system, engineered for long-range material transportation and precision delivery across complex environments. Combining exceptional reliability with intelligent autonomy, it features short takeoff and landing using standard 800 m Class A navigable airport runways. The integrated system — UAV, dual-redundant data link, and ground control station — enables transport delivery, emergency airdrop, communication relay, and special test payload missions that dramatically improve cross-city and remote-area logistics efficiency.",
                highlights: [
                    "Long Range Operations",
                    "Large Cargo Capacity",
                    "Mature & Proven Technology",
                    "Easy Maintenance",
                    "Continuous Precision Airdrop",
                    "Short Runway Takeoff & Landing",
                ],
                specs: [
                    { label: "Max Takeoff Weight", value: "≥ 100 kg" },
                    { label: "Payload Capacity", value: "≥ 25 kg" },
                    { label: "Max Range", value: "≥ 1500 km" },
                    { label: "Cruise Speed", value: "160–200 km/h" },
                    { label: "Max Altitude", value: "5000 m" },
                    { label: "Takeoff Distance", value: "≤ 800 m (Class A)" },
                    { label: "Data Link", value: "Dual-redundant" },
                    { label: "Endurance", value: "≥ 10 h" },
                ],
                applications: ["Special test platform", "Emergency rescue", "Island transport", "Branch logistics"],
                paramImg: "https://www.htsdfp.com/UploadFiles/2024-02-22/tkkfy2h9rxuzdlhb.png",
                video: "https://www.htsdfp.com/UploadFiles/2024-04-22/41wt9dr1i4bekn9v.mp4",
            },
            {
                id: "fp-985",
                name: "FP-985 Large Fixed Wing UAVs",
                tag: "Fixed Wing",
                img: "https://www.htsdfp.com/UploadFiles/2024-09-02/2fras71mxkygm1fs.png",
                description:
                    "The FP-985 large fixed-wing unmanned aircraft system is engineered for remote delivery of large-loaded materials across extreme terrain — plateaus, high-cold environments, island routes, and salt-spray coastal corridors. Taking off and landing at standard airports or airstrips, it carries a continuous precision delivery device and features advanced anti-deicing, lightning-strike protection, and high wind resistance. This all-weather capability ensures uninterrupted flight under the most adverse meteorological conditions, making it the definitive choice for demanding logistics networks where reliability is non-negotiable.",
                highlights: [
                    "All-weather Flight Capability",
                    "Anti-icing & Lightning Protection",
                    "Plateau & High-altitude Certified",
                    "Continuous Precision Delivery",
                    "Island & Coastal Operations",
                    "Standard Airport Compatible",
                ],
                specs: [
                    { label: "Max Takeoff Weight", value: "≥ 120 kg" },
                    { label: "Payload Capacity", value: "≥ 30 kg" },
                    { label: "Max Range", value: "≥ 1800 km" },
                    { label: "Cruise Speed", value: "170–210 km/h" },
                    { label: "Max Altitude", value: "5500 m" },
                    { label: "Endurance", value: "≥ 12 h" },
                    { label: "Data Link", value: "Dual-redundant" },
                    { label: "Navigation", value: "Dual GPS / GLONASS" },
                ],
                applications: ["Long-range plateau logistics", "All-weather emergency supply", "Island & coastal transport", "Cold-region delivery"],
                paramImg: null,
                video: "https://www.htsdfp.com/UploadFiles/2024-09-02/5utkpqgcrbftcyja.mp4",
            },
            {
                id: "fp-981c",
                name: "FP-981C VTOL Composite Wing UAVs",
                tag: "VTOL",
                img: "https://www.htsdfp.com/UploadFiles/2024-02-22/mczryvs1tpadubtt.png",
                description:
                    "The FP-981C fuses the vertical agility of multi-rotor flight with the cruise efficiency of a fixed-wing airframe. Designed for complex terrain where conventional runways are unavailable, it launches and lands from virtually any flat surface while delivering fixed-wing endurance and speed in transit. An intelligent flight control system manages the seamless transition between hover and cruise modes, making the FP-981C the most versatile platform in the Flyingpon fleet — equally at home in mountain logistics, island resupply, and precision survey missions.",
                highlights: [
                    "No Runway Required",
                    "Fixed-wing Cruise Efficiency",
                    "Multi-rotor Hover Precision",
                    "Seamless Transition Control",
                    "Complex Terrain Capable",
                    "Intelligent Flight Management",
                ],
                specs: [
                    { label: "Wingspan", value: "≥ 3 m" },
                    { label: "Payload Capacity", value: "≥ 6 kg" },
                    { label: "Max Range", value: "≥ 300 km" },
                    { label: "Cruise Speed", value: "100–130 km/h" },
                    { label: "Max Altitude", value: "4000 m" },
                    { label: "Endurance", value: "≥ 3 h" },
                    { label: "Takeoff Mode", value: "VTOL / Short run" },
                    { label: "Wind Resistance", value: "Level 6" },
                ],
                applications: ["Mountain area logistics", "Emergency rescue drops", "Survey & precision mapping", "Infrastructure inspection"],
                paramImg: null,
                video: "https://www.htsdfp.com/UploadFiles/2024-12-16/fjpitfws8rbr5cxa.mp4",
            },
            {
                id: "fp-981a",
                name: "FP-981A Multi-Rotor UAVs",
                tag: "Multi-Rotor",
                img: "https://www.htsdfp.com/UploadFiles/2024-10-17/trkxvkfb6kupqpuf.png",
                description:
                    "The FP-981A is a high-performance octorotor platform built for terminal delivery and confined-zone operations where precision matters most. RTK positioning delivers centimetre-level hover accuracy, while a fully autonomous landing system and advanced obstacle avoidance enable safe operation in dense urban environments. Rugged IP54-rated construction and robust payload capacity make it the backbone of any last-mile delivery network, handling the missions that fixed-wing aircraft simply cannot reach.",
                highlights: [
                    "RTK Centimetre-level Accuracy",
                    "Advanced Obstacle Avoidance",
                    "Autonomous Precision Landing",
                    "Urban Environment Certified",
                    "IP54 Rugged Construction",
                    "Last-mile Terminal Delivery",
                ],
                specs: [
                    { label: "Configuration", value: "Octorotor" },
                    { label: "Payload Capacity", value: "≥ 10 kg" },
                    { label: "Max Range", value: "≥ 50 km" },
                    { label: "Max Speed", value: "80 km/h" },
                    { label: "Hover Accuracy", value: "±0.1 m (RTK)" },
                    { label: "Endurance", value: "≥ 45 min" },
                    { label: "Wind Resistance", value: "Level 5" },
                    { label: "IP Rating", value: "IP54" },
                ],
                applications: ["Terminal last-mile delivery", "Urban congested-zone drops", "Precision airdrop", "Confined area operations"],
                paramImg: null,
                video: "https://www.htsdfp.com/UploadFiles/2024-02-29/xgzmyg4xwcc4ucaa.mp4",
            },
            {
                id: "fp-980-7b",
                name: "FP-980-7B Terminal Auto Airport",
                tag: "Infrastructure",
                img: "https://www.htsdfp.com/UploadFiles/2024-02-22/b2x9tcljght2gygz.png",
                description:
                    "The FP-980-7B Terminal Auto Airport is a fully intelligent unmanned hub enabling end-to-end autonomous logistics with zero human intervention at the delivery point. Compatible with FP-981A and FP-981C platforms, it automates landing detection, battery swapping, cargo loading and unloading, and mission dispatch — all managed remotely via cloud. A solar/grid hybrid power system and IP55 weather sealing ensure continuous operation in remote and harsh-environment deployment sites, completing the fully unmanned logistics chain.",
                highlights: [
                    "Fully Automated Operations",
                    "Auto Battery Swap ≤ 5 min",
                    "Smart Cargo Handling",
                    "Remote Cloud Management",
                    "Solar/Grid Hybrid Power",
                    "All-weather IP55 Rating",
                ],
                specs: [
                    { label: "Compatible UAVs", value: "FP-981A / FP-981C" },
                    { label: "Battery Swap Time", value: "≤ 5 min" },
                    { label: "Cargo Capacity", value: "≤ 10 kg per mission" },
                    { label: "Power Supply", value: "Grid / Solar hybrid" },
                    { label: "Communication", value: "4G / 5G / Satellite" },
                    { label: "Operating Temp", value: "-20°C ~ +55°C" },
                    { label: "IP Rating", value: "IP55" },
                    { label: "Footprint", value: "6 m × 6 m" },
                ],
                applications: ["End-to-end unmanned logistics", "Rural last-mile hubs", "Emergency supply nodes", "Smart city infrastructure"],
                paramImg: null,
                video: "https://www.htsdfp.com/UploadFiles/2024-02-29/uclgax1ljhl3gy83.mp4",
            },
        ],
    },
    {
        id: "special",
        title: "Special Aircraft",
        subtitle: "Mission-Critical Platforms",
        description: "Specialized composite-wing aircraft engineered for demanding operational environments.",
        icon: Rocket,
        accent: "#a855f7",
        products: [
            {
                id: "fp-981cs",
                name: "FP-981CS VTOL Composite Wing UAVs",
                tag: "Special Ops",
                img: "https://www.htsdfp.com/UploadFiles/2024-05-16/qezfaz4v8z3sg2jb.png",
                description:
                    "The FP-981CS is the mission-critical variant of the composite wing family, purpose-hardened for the most demanding operational environments where failure is not an option. Featuring a reinforced airframe, expanded sensor integration bays, and an extended operational radius, it delivers VTOL deployment from unprepared sites alongside the advanced avionics required for special operations, extended communication relay, and high-stakes emergency response missions. Built to outlast the mission.",
                highlights: [
                    "Mission-critical Hardened Build",
                    "Advanced Sensor Integration",
                    "Extended Operational Radius",
                    "Rapid VTOL Deployment",
                    "Level 7 Wind Resistance",
                    "High-stakes Environment Ready",
                ],
                specs: [
                    { label: "Wingspan", value: "≥ 3.2 m" },
                    { label: "Payload Capacity", value: "≥ 8 kg" },
                    { label: "Max Range", value: "≥ 500 km" },
                    { label: "Cruise Speed", value: "110–140 km/h" },
                    { label: "Max Altitude", value: "5000 m" },
                    { label: "Endurance", value: "≥ 5 h" },
                    { label: "Takeoff Mode", value: "VTOL" },
                    { label: "Wind Resistance", value: "Level 7" },
                ],
                applications: ["Special operations support", "Emergency rapid response", "Complex terrain logistics", "Communication relay"],
                paramImg: null,
                video: null,
            },
        ],
    },
    {
        id: "ground-station",
        title: "Ground Control Station",
        subtitle: "Command & Control Hardware",
        description: "Ruggedized control terminals from handheld units to vehicle-mounted command shelters.",
        icon: MonitorDot,
        accent: "#06b6d4",
        products: [
            {
                id: "fp-980-1",
                name: "FP-980-1 Handheld Control Terminal",
                tag: "Portable",
                img: "https://www.htsdfp.com/UploadFiles/2024-05-16/btv6ke6rklukgb1y.png",
                description:
                    "The FP-980-1 is the individual operator's command interface — a compact, ruggedized handheld terminal that delivers full UAV control and real-time telemetry in the palm of your hand. A high-brightness 7-inch display remains readable in direct sunlight, dual-frequency radio ensures a reliable link beyond 50 km line-of-sight, and IP54 sealing shrugs off dust, rain, and field abuse. Lightweight enough for single-operator deployment, yet powerful enough for professional mission execution in any environment.",
                highlights: [
                    "Compact Handheld Form Factor",
                    '7" High-brightness Display',
                    "50+ km Control Range",
                    "4-hour Battery Life",
                    "IP54 Field Rugged",
                    "Intuitive Operator Interface",
                ],
                specs: [
                    { label: "Weight", value: "≤ 2.5 kg" },
                    { label: "Screen", value: '7" high-brightness' },
                    { label: "Battery Life", value: "≥ 4 h" },
                    { label: "Communication", value: "Dual-frequency radio" },
                    { label: "Control Range", value: "≥ 50 km (LOS)" },
                    { label: "Operating Temp", value: "-20°C ~ +55°C" },
                    { label: "IP Rating", value: "IP54" },
                    { label: "GPS", value: "Integrated" },
                ],
                applications: ["Field single-operator missions", "Rapid deployment scenarios", "Training exercises", "Survey operations"],
                paramImg: null,
                video: null,
            },
            {
                id: "fp-980-2",
                name: "FP-980-2 Portable Control Terminal",
                tag: "Portable",
                img: "https://www.htsdfp.com/UploadFiles/2024-05-16/bzcbm4cwswbdrdng.png",
                description:
                    "The FP-980-2 bridges the gap between individual handheld control and full shelter command capability. Its 15-inch multi-touch display and simultaneous three-UAV management make it ideal for forward operating bases and emergency command deployments. The integrated mission planning suite — backed by a 512 GB SSD and 100 km control range — delivers serious tactical capability in a carry-case footprint, deployable in minutes from any vehicle or field position without external power infrastructure.",
                highlights: [
                    '15" Multi-touch Display',
                    "Control Up to 3 UAVs",
                    "100 km Control Range",
                    "6-hour Battery Life",
                    "512 GB Mission Storage",
                    "Deployable in Minutes",
                ],
                specs: [
                    { label: "Weight", value: "≤ 8 kg (carry case)" },
                    { label: "Screen", value: '15" multi-touch' },
                    { label: "Battery Life", value: "≥ 6 h" },
                    { label: "Simultaneous UAVs", value: "Up to 3" },
                    { label: "Control Range", value: "≥ 100 km" },
                    { label: "Operating Temp", value: "-20°C ~ +60°C" },
                    { label: "IP Rating", value: "IP55" },
                    { label: "Data Recording", value: "512 GB SSD" },
                ],
                applications: ["Multi-UAV field coordination", "Forward operating base command", "Emergency dispatch", "Field survey management"],
                paramImg: null,
                video: null,
            },
            {
                id: "fp-980-3b",
                name: "FP-980-3B Enhanced Shelter Control Station",
                tag: "Shelter",
                img: "https://www.htsdfp.com/UploadFiles/2024-10-10/mtb1hxgg8tzbrx28.png",
                description:
                    "The FP-980-3B is the command and control backbone for large-scale UAV fleet operations. Four operator workstations, RAID NAS redundant data storage, full HVAC environmental control, and seamless switching between satellite, 5G, 4G, VHF, and UHF communication channels combine to deliver a 24/7 operational hub capable of simultaneously managing up to ten UAVs. Designed for permanent or semi-permanent deployment where sustained, high-throughput fleet management is the mission.",
                highlights: [
                    "4 Simultaneous Operator Positions",
                    "Up to 10 UAVs in Parallel",
                    "Satellite/5G/4G/VHF/UHF Comms",
                    "Full HVAC Environmental Control",
                    "10 TB RAID NAS Storage",
                    "24/7 Sustained Operations",
                ],
                specs: [
                    { label: "Shelter Type", value: "Standard 20 ft shelter" },
                    { label: "Workstations", value: "4 operator positions" },
                    { label: "Simultaneous UAVs", value: "Up to 10" },
                    { label: "Power Supply", value: "Shore power / Generator" },
                    { label: "A/C System", value: "Integrated HVAC" },
                    { label: "Communications", value: "Satellite / 4G / 5G / VHF / UHF" },
                    { label: "Data Storage", value: "RAID NAS 10 TB" },
                    { label: "Operating Temp", value: "-30°C ~ +50°C (internal)" },
                ],
                applications: [
                    "Large fleet logistics command",
                    "Regional logistics hub management",
                    "Emergency coordination centres",
                    "Long-duration sustained missions",
                ],
                paramImg: null,
                video: null,
            },
            {
                id: "fp-980-3c",
                name: "FP-980-3C Vehicle Mounted Shelter Station",
                tag: "Vehicle",
                img: "https://www.htsdfp.com/UploadFiles/2024-02-22/surm42ur5g91map5.png",
                description:
                    "The FP-980-3C brings full shelter-class command capability to any terrain on a military-grade 4×4 vehicle platform. Deployable in under 30 minutes, it carries three operator workstations, an integrated 15 kVA generator, and the same satellite/4G/VHF/UHF communications suite as the fixed shelter — in a package that can follow the mission wherever it leads. Designed for the moments when the command post must move as fast as the operation itself.",
                highlights: [
                    "Full Tactical Mobility",
                    "30-minute Rapid Deployment",
                    "3 Operator Workstations",
                    "Integrated 15 kVA Generator",
                    "All-terrain 4×4 Capable",
                    "Complete Shelter Functionality",
                ],
                specs: [
                    { label: "Vehicle Base", value: "4×4 military chassis" },
                    { label: "Deployment Time", value: "≤ 30 min" },
                    { label: "Workstations", value: "3 operator positions" },
                    { label: "Simultaneous UAVs", value: "Up to 6" },
                    { label: "Generator", value: "Integrated 15 kVA" },
                    { label: "Communications", value: "Satellite / 4G / VHF / UHF" },
                    { label: "Terrain", value: "All-terrain 4×4" },
                    { label: "Operating Temp", value: "-40°C ~ +55°C" },
                ],
                applications: [
                    "Mobile rapid-deployment command",
                    "Remote and off-road operations",
                    "Disaster response command",
                    "Tactical field coordination",
                ],
                paramImg: null,
                video: null,
            },
        ],
    },
    {
        id: "control-system",
        title: "UAV Control System",
        subtitle: "Intelligent Flight Software",
        description: "Integrated operation control systems for autonomous fleet management and mission planning.",
        icon: Cpu,
        accent: "#10b981",
        products: [
            {
                id: "uav-ocs",
                name: "UAV Operation Control System",
                tag: "Software",
                img: "https://www.htsdfp.com/UploadFiles/2024-02-22/cj3putets7p9phkh.png",
                description:
                    "The UAV Operation Control System is the digital nerve centre of the Flyingpon ecosystem — an AI-powered fleet management platform that orchestrates every stage of UAV logistics from mission creation to delivery confirmation. Real-time telemetry refreshes in under one second across an unlimited fleet, while AI route optimisation dynamically adapts to weather, airspace conditions, and demand surges. Full RESTful API and SDK integration allows seamless connection to any enterprise supply chain, enabling the transition from managed fleet to fully automated logistics infrastructure.",
                highlights: [
                    "Unlimited Fleet Scale",
                    "100+ Concurrent Missions",
                    "AI-powered Route Optimisation",
                    "Sub-second Real-time Telemetry",
                    "Multi-source GIS Integration",
                    "Cloud & On-premise Deployment",
                    "RESTful API & SDK",
                    "99.9% Uptime SLA",
                ],
                specs: [
                    { label: "Fleet Capacity", value: "Unlimited UAVs" },
                    { label: "Concurrent Missions", value: "100+" },
                    { label: "Route Optimisation", value: "AI-powered" },
                    { label: "Map Integration", value: "Multi-source GIS" },
                    { label: "Data Refresh Rate", value: "Real-time (< 1 s)" },
                    { label: "API Integration", value: "RESTful / SDK" },
                    { label: "Deployment", value: "Cloud / On-premise" },
                    { label: "Uptime SLA", value: "99.9%" },
                ],
                applications: [
                    "Enterprise logistics fleet management",
                    "City-wide delivery networks",
                    "Emergency dispatch automation",
                    "Supply chain integration",
                ],
                paramImg: null,
                video: null,
            },
        ],
    },
];

const allProducts = productCategories.flatMap((cat) =>
    cat.products.map((p) => ({ ...p, categoryAccent: cat.accent, categoryTitle: cat.title, categoryId: cat.id })),
);

/* ── Embedded Video Player ── */
const EmbeddedVideoPlayer = ({ src, accent }: { src: string | null; accent: string }) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [playing, setPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [hovered, setHovered] = useState(false);
    const [muted, setMuted] = useState(false);

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
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="relative rounded-2xl overflow-hidden flex flex-col items-center justify-center gap-5 border"
                style={{ background: "#08080e", borderColor: `${accent}18`, minHeight: "300px" }}
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
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
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

            {/* Scan line while playing */}
            {playing && (
                <motion.div
                    className="absolute left-0 right-0 h-[1px] z-10 pointer-events-none"
                    style={{ background: `linear-gradient(90deg, transparent, ${accent}55, transparent)` }}
                    animate={{ top: ["0%", "100%", "0%"] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                />
            )}

            <video
                ref={videoRef}
                src={src}
                className="w-full aspect-video object-cover block cursor-pointer"
                onTimeUpdate={onTimeUpdate}
                onLoadedMetadata={() => setDuration(videoRef.current?.duration || 0)}
                onEnded={() => setPlaying(false)}
                onClick={togglePlay}
                playsInline
                muted={muted}
            />

            {/* Overlay */}
            <motion.div
                className="absolute inset-0 pointer-events-none z-[5]"
                animate={{ opacity: playing && !hovered ? 0 : 0.6 }}
                transition={{ duration: 0.4 }}
                style={{ background: "linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.25) 40%, transparent 70%)" }}
            />

            {/* Big play button */}
            <AnimatePresence>
                {!playing && (
                    <motion.button
                        key="bigplay"
                        initial={{ opacity: 0, scale: 0.75 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.75 }}
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

/* ── 3D Holographic Card ── */
const HoloProductCard = ({ product, accent, idx, onClick }: { product: any; accent: string; idx: number; onClick: () => void }) => {
    const ref = useRef<HTMLDivElement>(null);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), { stiffness: 200, damping: 25 });
    const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), { stiffness: 200, damping: 25 });
    const glareX = useTransform(mouseX, [-0.5, 0.5], [0, 100]);
    const glareY = useTransform(mouseY, [-0.5, 0.5], [0, 100]);
    const handleMouse = (e: React.MouseEvent) => {
        const rect = ref.current?.getBoundingClientRect();
        if (!rect) return;
        mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
        mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
    };
    return (
        <motion.div
            initial={{ opacity: 0, y: 40, rotateX: 8 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.08, duration: 0.6 }}
            style={{ perspective: "1000px" }}
        >
            <motion.div
                ref={ref}
                onMouseMove={handleMouse}
                onMouseLeave={() => {
                    mouseX.set(0);
                    mouseY.set(0);
                }}
                style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
                className="group relative cursor-pointer"
                onClick={onClick}
            >
                <div
                    className="relative rounded-2xl overflow-hidden flex flex-col"
                    style={{ background: "#08080e", border: "1px solid rgba(255,255,255,0.05)" }}
                >
                    <motion.div
                        className="absolute inset-0 z-20 pointer-events-none rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        style={{
                            background: useTransform(
                                [glareX, glareY],
                                ([x, y]) => `radial-gradient(circle at ${x}% ${y}%, rgba(255,255,255,0.08) 0%, transparent 50%)`,
                            ),
                        }}
                    />
                    <motion.div
                        className="absolute left-0 right-0 h-[1px] z-20 pointer-events-none opacity-0 group-hover:opacity-100"
                        style={{ background: `linear-gradient(90deg, transparent, ${accent}80, transparent)` }}
                        animate={{ top: ["0%", "100%", "0%"] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    />
                    <div className="relative h-56 flex items-center justify-center p-6 overflow-hidden">
                        <div
                            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[60%] h-[40%] rounded-full blur-[60px] opacity-0 group-hover:opacity-30 transition-opacity duration-700"
                            style={{ background: accent }}
                        />
                        <div
                            className="absolute bottom-0 inset-x-0 h-1/2 opacity-[0.04] group-hover:opacity-[0.08] transition-opacity"
                            style={{
                                backgroundImage: `linear-gradient(${accent}40 1px, transparent 1px), linear-gradient(90deg, ${accent}40 1px, transparent 1px)`,
                                backgroundSize: "30px 30px",
                                maskImage: "linear-gradient(to top, black 20%, transparent 100%)",
                                WebkitMaskImage: "linear-gradient(to top, black 20%, transparent 100%)",
                            }}
                        />
                        <motion.img
                            src={product.img}
                            alt={product.name}
                            className="relative z-10 max-h-full max-w-full object-contain drop-shadow-[0_10px_30px_rgba(0,0,0,0.8)]"
                            style={{ transform: "translateZ(30px)" }}
                            whileHover={{ scale: 1.1, y: -8 }}
                            transition={{ type: "spring", stiffness: 200, damping: 20 }}
                        />
                    </div>
                    <div className="h-px" style={{ background: `linear-gradient(to right, transparent, ${accent}30, transparent)` }} />
                    <div className="p-5 flex flex-col gap-3 flex-1 justify-between">
                        <div>
                            <span
                                className="text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-md inline-block mb-3"
                                style={{ color: accent, background: `${accent}12`, border: `1px solid ${accent}20` }}
                            >
                                {product.tag}
                            </span>
                            <h3 className="text-sm font-bold text-gray-200 group-hover:text-white transition-colors leading-snug">{product.name}</h3>
                        </div>
                        <div className="flex items-center justify-between mt-2">
                            <span className="text-xs font-medium text-gray-600 group-hover:text-gray-400 transition-colors">View Specs</span>
                            <div
                                className="w-8 h-8 rounded-full flex items-center justify-center border border-white/[0.06] group-hover:border-transparent transition-all"
                                style={{ background: `linear-gradient(135deg, transparent, ${accent}15)` }}
                            >
                                <ArrowRight size={13} style={{ color: accent }} className="group-hover:translate-x-0.5 transition-transform" />
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};

/* ── Product Detail Page ── */
export const ProductDetailPage = ({
    productId,
    onBack,
    onNavigate,
}: {
    productId: string;
    onBack: () => void;
    onNavigate?: (id: string) => void;
}) => {
    const product = allProducts.find((p) => p.id === productId);
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, [productId]);
    if (!product) return null;
    const accent = product.categoryAccent;

    return (
        <div className="min-h-screen text-white font-sans" style={{ background: "#050508" }}>
            {/* Hero */}
            <section className="relative min-h-[72vh] flex items-end overflow-hidden">
                <div className="absolute inset-0">
                    <div
                        className="absolute inset-0"
                        style={{ background: `radial-gradient(ellipse 80% 60% at 60% 40%, ${accent}08 0%, transparent 70%)` }}
                    />
                    <div
                        className="absolute inset-0 opacity-[0.015]"
                        style={{
                            backgroundImage: `linear-gradient(${accent}50 1px, transparent 1px), linear-gradient(90deg, ${accent}50 1px, transparent 1px)`,
                            backgroundSize: "60px 60px",
                        }}
                    />
                    {[0, 1, 2].map((i) => (
                        <motion.div
                            key={i}
                            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border"
                            style={{ borderColor: accent, width: `${(i + 1) * 320}px`, height: `${(i + 1) * 320}px`, opacity: 0.03 }}
                            animate={{ scale: [1, 1.04, 1], opacity: [0.03, 0.07, 0.03] }}
                            transition={{ duration: 4 + i, repeat: Infinity, delay: i * 0.8 }}
                        />
                    ))}
                </div>
                <div className="absolute top-24 left-8 w-16 h-16 border-t border-l hidden lg:block" style={{ borderColor: `${accent}25` }} />
                <div className="absolute top-24 right-8 w-16 h-16 border-t border-r hidden lg:block" style={{ borderColor: `${accent}25` }} />
                <motion.button
                    onClick={onBack}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    className="absolute top-8 left-8 z-20 flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium transition-all hover:border-white/30 hover:text-white"
                    style={{
                        borderColor: "rgba(255,255,255,0.1)",
                        color: "rgba(255,255,255,0.5)",
                        background: "rgba(0,0,0,0.4)",
                        backdropFilter: "blur(12px)",
                    }}
                >
                    <ArrowLeft size={14} /> Back to Products
                </motion.button>
                <div
                    className="absolute top-10 left-1/2 -translate-x-1/2 z-20 hidden lg:flex items-center gap-2 text-[11px] font-mono"
                    style={{ color: `${accent}50` }}
                >
                    <span>Series Products</span>
                    <ChevronRight size={10} />
                    <span>{product.categoryTitle}</span>
                    <ChevronRight size={10} />
                    <span style={{ color: accent }}>{product.name}</span>
                </div>
                <div className="absolute top-28 right-12 text-[10px] font-mono text-right space-y-1 hidden lg:block" style={{ color: `${accent}40` }}>
                    <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 2, repeat: Infinity }}>
                        SYS.ACTIVE
                    </motion.div>
                    <div>ID: {product.id.toUpperCase()}</div>
                </div>
                <motion.div
                    className="absolute left-0 right-0 h-[1px] z-[2]"
                    style={{
                        background: `linear-gradient(90deg, transparent 5%, ${accent}30 30%, ${accent}55 50%, ${accent}30 70%, transparent 95%)`,
                    }}
                    animate={{ top: ["15%", "85%", "15%"] }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                />

                <div className="relative z-10 w-full max-w-7xl mx-auto px-8 pb-16 pt-36 grid grid-cols-1 lg:grid-cols-2 gap-14 items-end">
                    <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2 }}>
                        <motion.span
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.35 }}
                            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase mb-6"
                            style={{ color: accent, background: `${accent}12`, border: `1px solid ${accent}25` }}
                        >
                            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: accent }} />
                            {product.tag}
                        </motion.span>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-none tracking-tight text-white mb-6">
                            {product.name.split(" ").slice(0, 1).join(" ")}
                            <br />
                            <span className="text-2xl md:text-3xl font-bold" style={{ color: "rgba(255,255,255,0.5)" }}>
                                {product.name.split(" ").slice(1).join(" ")}
                            </span>
                        </h1>
                        <p className="text-gray-400 text-[15px] leading-relaxed max-w-lg mb-8">{product.description}</p>
                        <motion.button
                            whileHover={{ scale: 1.04 }}
                            whileTap={{ scale: 0.97 }}
                            className="flex items-center gap-2 px-8 py-3.5 rounded-full font-bold text-sm text-black"
                            style={{ background: `linear-gradient(135deg, ${accent}, ${accent}bb)`, boxShadow: `0 0 30px ${accent}35` }}
                        >
                            Request a Quote <ArrowRight size={16} />
                        </motion.button>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.9, delay: 0.3 }}
                        className="relative flex items-center justify-center"
                    >
                        <div
                            className="absolute inset-0 rounded-3xl"
                            style={{ background: `radial-gradient(ellipse at center, ${accent}12 0%, transparent 70%)` }}
                        />
                        <div
                            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[70%] h-[30%] rounded-full blur-[80px]"
                            style={{ background: `${accent}18` }}
                        />
                        <motion.div
                            className="absolute inset-0 m-12 rounded-full border opacity-[0.07]"
                            style={{ borderColor: accent }}
                            animate={{ rotate: 360 }}
                            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                        />
                        <motion.img
                            src={product.img}
                            alt={product.name}
                            className="relative z-10 max-h-80 max-w-full object-contain drop-shadow-[0_20px_60px_rgba(0,0,0,0.9)]"
                            animate={{ y: [0, -14, 0] }}
                            transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
                        />
                    </motion.div>
                </div>
                <div
                    className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none"
                    style={{ background: "linear-gradient(to top, #050508, transparent)" }}
                />
            </section>

            {/* Video */}
            <section className="py-16">
                <div className="max-w-7xl mx-auto px-8">
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-8">
                        <p className="text-xs font-bold tracking-[0.2em] uppercase mb-2" style={{ color: accent }}>
                            Product Showcase
                        </p>
                        <h2 className="text-3xl font-black text-white">Live Demonstration</h2>
                    </motion.div>
                    <EmbeddedVideoPlayer src={product.video ?? null} accent={accent} />
                </div>
            </section>

            {/* Highlights */}
            <section className="py-12">
                <div className="max-w-7xl mx-auto px-8">
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-8">
                        <p className="text-xs font-bold tracking-[0.2em] uppercase mb-2" style={{ color: accent }}>
                            Core Capabilities
                        </p>
                        <h2 className="text-3xl font-black text-white">Key Features</h2>
                    </motion.div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {product.highlights.map((h: string, i: number) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.055 }}
                                className="flex items-center gap-3 p-4 rounded-xl border"
                                style={{ background: `${accent}06`, borderColor: `${accent}15` }}
                            >
                                <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ background: `${accent}18` }}>
                                    <CheckCircle2 size={16} style={{ color: accent }} />
                                </div>
                                <span className="text-sm font-semibold text-gray-200">{h}</span>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Specs + Applications */}
            <section className="py-16">
                <div className="max-w-7xl mx-auto px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-start">
                        <motion.div initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                            <p className="text-xs font-bold tracking-[0.2em] uppercase mb-2" style={{ color: accent }}>
                                Technical Data
                            </p>
                            <h2 className="text-3xl font-black text-white mb-8">Main Performance Parameters</h2>
                            <div className="rounded-2xl overflow-hidden border" style={{ borderColor: `${accent}15` }}>
                                <div
                                    className="flex px-5 py-3 text-[10px] font-bold tracking-widest uppercase"
                                    style={{ background: `${accent}10`, color: `${accent}80` }}
                                >
                                    <span className="flex-1">Parameter</span>
                                    <span>Value</span>
                                </div>
                                {product.specs.map((spec: any, i: number) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, x: -10 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: i * 0.04 }}
                                        className="flex items-center justify-between px-5 py-3.5 border-t transition-colors hover:bg-white/[0.02]"
                                        style={{ borderColor: `${accent}08` }}
                                    >
                                        <span className="text-sm text-gray-400">{spec.label}</span>
                                        <span className="text-sm font-bold text-white font-mono">{spec.value}</span>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                        <motion.div initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                            <p className="text-xs font-bold tracking-[0.2em] uppercase mb-2" style={{ color: accent }}>
                                Use Cases
                            </p>
                            <h2 className="text-3xl font-black text-white mb-8">Application Scenarios</h2>
                            <div className="space-y-4">
                                {product.applications.map((app: string, i: number) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, y: 16 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: i * 0.1 }}
                                        className="group relative rounded-2xl p-5 border overflow-hidden cursor-default"
                                        style={{ background: "#08080e", borderColor: `${accent}15` }}
                                    >
                                        <motion.div
                                            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                                            style={{ background: `linear-gradient(135deg, ${accent}08, transparent)` }}
                                        />
                                        <div className="relative z-10 flex items-center gap-4">
                                            <div
                                                className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-black shrink-0"
                                                style={{ background: `${accent}15`, color: accent }}
                                            >
                                                {String(i + 1).padStart(2, "0")}
                                            </div>
                                            <span className="font-semibold text-gray-200 group-hover:text-white transition-colors">{app}</span>
                                            <ArrowRight
                                                size={14}
                                                className="ml-auto opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-1"
                                                style={{ color: accent }}
                                            />
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {product.paramImg && (
                <section className="py-10">
                    <div className="max-w-5xl mx-auto px-8">
                        <motion.div
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="rounded-2xl overflow-hidden border p-4"
                            style={{ borderColor: `${accent}15`, background: "#08080e" }}
                        >
                            <img src={product.paramImg} alt="Performance parameters" className="w-full object-contain rounded-xl" />
                        </motion.div>
                    </div>
                </section>
            )}

            {/* Related */}
            {(() => {
                const related = allProducts.filter((p) => p.categoryId === product.categoryId && p.id !== product.id).slice(0, 3);
                if (!related.length) return null;
                return (
                    <section className="py-16 border-t border-white/[0.04]">
                        <div className="max-w-7xl mx-auto px-8">
                            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-8">
                                <p className="text-xs font-bold tracking-[0.2em] uppercase mb-2" style={{ color: accent }}>
                                    Same Series
                                </p>
                                <h2 className="text-2xl font-black text-white">Related Products</h2>
                            </motion.div>
                            <div className={`grid gap-5 grid-cols-1 sm:grid-cols-2 ${related.length >= 3 ? "lg:grid-cols-3" : ""}`}>
                                {related.map((p: any, i: number) => (
                                    <HoloProductCard key={p.id} product={p} accent={accent} idx={i} onClick={() => onNavigate?.(p.id)} />
                                ))}
                            </div>
                        </div>
                    </section>
                );
            })()}

            {/* CTA */}
            <section className="py-24 relative overflow-hidden border-t border-white/5">
                <div
                    className="absolute inset-0 opacity-[0.015]"
                    style={{
                        backgroundImage: `linear-gradient(rgba(0,210,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(0,210,255,0.5) 1px, transparent 1px)`,
                        backgroundSize: "80px 80px",
                    }}
                />
                <div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full blur-[150px] pointer-events-none"
                    style={{ background: `${accent}06` }}
                />
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="relative z-10 text-center px-6 max-w-2xl mx-auto"
                >
                    <h2 className="text-4xl font-bold text-white mb-4">
                        Ready to deploy <span style={{ color: accent }}>{product.name.split(" ")[0]}</span>?
                    </h2>
                    <p className="text-gray-400 mb-10">
                        Contact our specialists for custom configurations and enterprise solutions tailored to your mission profile.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.98 }}
                            className="group px-10 py-4 bg-white text-black font-bold rounded-full hover:shadow-[0_0_40px_rgba(255,255,255,0.3)] transition-all duration-300"
                        >
                            <span className="flex items-center gap-2">
                                Request a Quote <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </span>
                        </motion.button>
                        <motion.button
                            onClick={onBack}
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.98 }}
                            className="px-10 py-4 border border-white/15 text-gray-300 hover:text-white hover:border-white/30 font-medium rounded-full transition-all duration-300"
                        >
                            Browse All Products
                        </motion.button>
                    </div>
                </motion.div>
            </section>
        </div>
    );
};

/* ── Products List Page ── */
export const ProductsPage = () => {
    const [activeSection, setActiveSection] = useState("uav");
    const [selectedProductId, setSelectedProductId] = useState<string | null>(null);

    useEffect(() => {
        if (selectedProductId) return;
        const observers: IntersectionObserver[] = [];
        productCategories.forEach((cat) => {
            const el = document.getElementById(cat.id);
            if (!el) return;
            const obs = new IntersectionObserver(
                ([e]) => {
                    if (e.isIntersecting) setActiveSection(cat.id);
                },
                { rootMargin: "-40% 0px -55% 0px" },
            );
            obs.observe(el);
            observers.push(obs);
        });
        return () => observers.forEach((o) => o.disconnect());
    }, [selectedProductId]);

    const scrollTo = (id: string) => {
        const el = document.getElementById(id);
        if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 140, behavior: "smooth" });
    };

    if (selectedProductId) {
        return (
            <ProductDetailPage
                productId={selectedProductId}
                onBack={() => {
                    setSelectedProductId(null);
                    setTimeout(() => window.scrollTo({ top: 0 }), 50);
                }}
                onNavigate={(id) => setSelectedProductId(id)}
            />
        );
    }

    return (
        <div className="min-h-screen text-white font-sans" style={{ background: "#050508" }}>
            {/* Hero */}
            <section className="relative h-[60vh] min-h-[480px] flex items-center justify-center overflow-hidden">
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                        backgroundImage: "url('https://www.htsdfp.com/UploadFiles/2024-10-30/hz7kcrbdstehju8t.png')",
                        filter: "brightness(0.25) saturate(1.4)",
                    }}
                />
                <div
                    className="absolute inset-0"
                    style={{ background: "linear-gradient(to top, #050508 8%, rgba(5,5,8,0.7) 50%, transparent 100%)" }}
                />
                <div className="absolute top-24 left-8 w-20 h-20 border-t border-l border-aero-blue/20 hidden lg:block" />
                <div className="absolute top-24 right-8 w-20 h-20 border-t border-r border-aero-blue/20 hidden lg:block" />
                <div className="absolute bottom-16 left-8 w-20 h-20 border-b border-l border-aero-blue/20 hidden lg:block" />
                <div className="absolute bottom-16 right-8 w-20 h-20 border-b border-r border-aero-blue/20 hidden lg:block" />
                <div className="absolute top-28 left-12 text-[10px] text-aero-blue/40 font-mono space-y-1 hidden lg:block">
                    <div>SYS.STATUS: ONLINE</div>
                    <div>FLEET.COUNT: 11</div>
                    <div>CAT.LOADED: 04</div>
                </div>
                <div className="absolute top-28 right-12 text-[10px] text-aero-blue/40 font-mono text-right hidden lg:block">
                    <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 2, repeat: Infinity }}>
                        SCANNING...
                    </motion.div>
                </div>
                <motion.div
                    className="absolute left-0 right-0 h-[1px] z-[2]"
                    style={{
                        background:
                            "linear-gradient(90deg, transparent 5%, rgba(0,210,255,0.3) 30%, rgba(0,210,255,0.5) 50%, rgba(0,210,255,0.3) 70%, transparent 95%)",
                    }}
                    animate={{ top: ["20%", "80%", "20%"] }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                />
                <div className="relative z-10 text-center px-6">
                    <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9 }}>
                        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-aero-blue/30 bg-black/40 text-aero-blue text-sm font-medium tracking-wide mb-6 backdrop-blur-md">
                            <span className="w-2 h-2 rounded-full bg-aero-blue animate-pulse" />
                            Fleet & Hardware
                        </span>
                        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-4 leading-none">
                            Series <span className="bg-clip-text text-transparent bg-gradient-to-r from-aero-blue to-aero-purple">Products</span>
                        </h1>
                        <p className="text-gray-300 text-lg max-w-lg mx-auto mt-3">
                            A complete ecosystem of UAVs, control stations, and intelligent systems.
                        </p>
                    </motion.div>
                </div>
                <motion.div
                    className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5 }}
                >
                    <span className="text-[10px] uppercase tracking-[0.3em] text-gray-500">Scroll</span>
                    <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }}>
                        <div className="w-5 h-8 border border-white/20 rounded-full flex justify-center pt-1.5">
                            <motion.div
                                className="w-1 h-1 bg-aero-blue rounded-full"
                                animate={{ y: [0, 10, 0], opacity: [1, 0.3, 1] }}
                                transition={{ duration: 2, repeat: Infinity }}
                            />
                        </div>
                    </motion.div>
                </motion.div>
            </section>

            {/* Sticky Nav */}
            <div
                className="sticky top-18 z-40 border-b"
                style={{
                    background: "rgba(5,5,8,0.85)",
                    backdropFilter: "blur(20px)",
                    borderColor: "rgba(255,255,255,0.06)",
                    boxShadow: "0 8px 40px rgba(0,0,0,0.4)",
                }}
            >
                <div className="max-w-7xl mx-auto px-6 overflow-x-auto">
                    <ul className="flex min-w-max">
                        {productCategories.map((cat) => {
                            const Icon = cat.icon;
                            const active = activeSection === cat.id;
                            return (
                                <li key={cat.id}>
                                    <button
                                        onClick={() => scrollTo(cat.id)}
                                        className="relative flex items-center gap-2 px-5 py-4 text-sm font-semibold transition-all duration-200"
                                        style={{ color: active ? cat.accent : "rgba(255,255,255,0.45)" }}
                                    >
                                        <Icon size={15} />
                                        {cat.title}
                                        {active && (
                                            <motion.div
                                                layoutId="activeTab"
                                                className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full"
                                                style={{ background: cat.accent }}
                                            />
                                        )}
                                    </button>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>

            {/* Catalog */}
            <section className="py-24 relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-6 space-y-36">
                    {productCategories.map((category) => {
                        const Icon = category.icon;
                        return (
                            <div key={category.id} id={category.id} className="scroll-mt-40">
                                <motion.div
                                    initial={{ opacity: 0, y: 24 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6 }}
                                    className="mb-14"
                                >
                                    <div className="flex items-center gap-5 mb-5">
                                        <div
                                            className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0"
                                            style={{
                                                background: `linear-gradient(135deg, ${category.accent}20, ${category.accent}05)`,
                                                border: `1px solid ${category.accent}25`,
                                                boxShadow: `0 0 30px ${category.accent}15`,
                                            }}
                                        >
                                            <Icon size={24} style={{ color: category.accent }} />
                                        </div>
                                        <div>
                                            <p className="text-xs font-bold tracking-[0.2em] uppercase mb-1" style={{ color: category.accent }}>
                                                {category.subtitle}
                                            </p>
                                            <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight">{category.title}</h2>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-6">
                                        <div
                                            className="h-px flex-1 max-w-20 rounded-full"
                                            style={{ background: `linear-gradient(to right, ${category.accent}, transparent)` }}
                                        />
                                        <p className="text-gray-500 text-sm max-w-xl">{category.description}</p>
                                    </div>
                                </motion.div>
                                <div
                                    className={`grid gap-5 ${category.products.length === 1 ? "grid-cols-1 max-w-sm" : category.products.length === 2 ? "grid-cols-1 sm:grid-cols-2 max-w-2xl" : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"}`}
                                >
                                    {category.products.map((product, pIdx) => (
                                        <HoloProductCard
                                            key={pIdx}
                                            product={product}
                                            accent={category.accent}
                                            idx={pIdx}
                                            onClick={() => setSelectedProductId(product.id)}
                                        />
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* Footer CTA */}
            <section className="py-32 relative overflow-hidden border-t border-white/5">
                <div
                    className="absolute inset-0 opacity-[0.02]"
                    style={{
                        backgroundImage: `linear-gradient(rgba(0,210,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(0,210,255,0.5) 1px, transparent 1px)`,
                        backgroundSize: "80px 80px",
                    }}
                />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-aero-blue/[0.05] rounded-full blur-[200px] pointer-events-none" />
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="relative z-10 text-center px-6 max-w-3xl mx-auto"
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                        Ready to Deploy
                        <br />
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-aero-blue to-aero-purple">Your Fleet?</span>
                    </h2>
                    <p className="text-gray-400 text-lg mb-12 max-w-xl mx-auto leading-relaxed">
                        Contact our specialists for custom configurations and enterprise solutions.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.98 }}
                            className="group px-10 py-4 bg-white text-black font-bold rounded-full hover:shadow-[0_0_40px_rgba(255,255,255,0.3)] transition-all duration-300"
                        >
                            <span className="flex items-center gap-2">
                                Request a Quote <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </span>
                        </motion.button>
                        <Link to="/applications">
                            <motion.button
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.98 }}
                                className="px-10 py-4 border border-white/15 text-gray-300 hover:text-white hover:border-white/30 font-medium rounded-full transition-all duration-300"
                            >
                                View Applications
                            </motion.button>
                        </Link>
                    </div>
                </motion.div>
            </section>
        </div>
    );
};

export default ProductsPage;
