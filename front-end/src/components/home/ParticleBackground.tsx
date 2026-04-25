import { useRef, useEffect, useCallback } from "react";

interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    size: number;
    opacity: number;
}

interface ParticleBackgroundProps {
    className?: string;
    particleCount?: number;
    connectionDistance?: number;
    color?: string;
}

export const ParticleBackground = ({
    className = "",
    particleCount = 25,
    connectionDistance = 120,
    color = "0, 210, 255",
}: ParticleBackgroundProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const particlesRef = useRef<Particle[]>([]);
    const animationRef = useRef<number>(0);
    const lastFrameRef = useRef<number>(0);

    // Reduce particles on mobile
    const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
    const actualCount = isMobile ? Math.floor(particleCount * 0.5) : particleCount;
    const targetFPS = isMobile ? 20 : 30;
    const frameInterval = 1000 / targetFPS;

    const initParticles = useCallback(
        (width: number, height: number) => {
            particlesRef.current = Array.from({ length: actualCount }, () => ({
                x: Math.random() * width,
                y: Math.random() * height,
                vx: (Math.random() - 0.5) * 0.4,
                vy: (Math.random() - 0.5) * 0.4,
                size: Math.random() * 2 + 0.5,
                opacity: Math.random() * 0.5 + 0.2,
            }));
        },
        [actualCount]
    );

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const resize = () => {
            const parent = canvas.parentElement;
            if (!parent) return;
            canvas.width = parent.clientWidth;
            canvas.height = parent.clientHeight;
            if (particlesRef.current.length === 0) {
                initParticles(canvas.width, canvas.height);
            }
        };

        resize();
        window.addEventListener("resize", resize);

        const animate = (timestamp: number) => {
            // Throttle to target FPS
            const elapsed = timestamp - lastFrameRef.current;
            if (elapsed < frameInterval) {
                animationRef.current = requestAnimationFrame(animate);
                return;
            }
            lastFrameRef.current = timestamp;

            const { width, height } = canvas;
            ctx.clearRect(0, 0, width, height);

            const particles = particlesRef.current;

            for (const p of particles) {
                p.x += p.vx;
                p.y += p.vy;

                if (p.x < 0 || p.x > width) p.vx *= -1;
                if (p.y < 0 || p.y > height) p.vy *= -1;

                // Speed limit
                const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
                if (speed > 0.8) {
                    p.vx = (p.vx / speed) * 0.8;
                    p.vy = (p.vy / speed) * 0.8;
                }

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(${color}, ${p.opacity})`;
                ctx.fill();
            }

            // Draw connections (skip on mobile for performance)
            if (!isMobile) {
                for (let i = 0; i < particles.length; i++) {
                    for (let j = i + 1; j < particles.length; j++) {
                        const dx = particles[i].x - particles[j].x;
                        const dy = particles[i].y - particles[j].y;
                        const distSq = dx * dx + dy * dy;
                        const maxDistSq = connectionDistance * connectionDistance;
                        if (distSq < maxDistSq) {
                            const opacity = (1 - Math.sqrt(distSq) / connectionDistance) * 0.15;
                            ctx.beginPath();
                            ctx.moveTo(particles[i].x, particles[i].y);
                            ctx.lineTo(particles[j].x, particles[j].y);
                            ctx.strokeStyle = `rgba(${color}, ${opacity})`;
                            ctx.lineWidth = 0.5;
                            ctx.stroke();
                        }
                    }
                }
            }

            animationRef.current = requestAnimationFrame(animate);
        };

        animationRef.current = requestAnimationFrame(animate);

        return () => {
            window.removeEventListener("resize", resize);
            cancelAnimationFrame(animationRef.current);
        };
    }, [color, connectionDistance, initParticles, frameInterval, isMobile]);

    return (
        <canvas
            ref={canvasRef}
            className={`absolute inset-0 pointer-events-none ${className}`}
            style={{ zIndex: 0 }}
        />
    );
};
