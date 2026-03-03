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
    particleCount = 60,
    connectionDistance = 120,
    color = "0, 210, 255",
}: ParticleBackgroundProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const particlesRef = useRef<Particle[]>([]);
    const animationRef = useRef<number>(0);
    const mouseRef = useRef({ x: -1000, y: -1000 });

    const initParticles = useCallback(
        (width: number, height: number) => {
            particlesRef.current = Array.from({ length: particleCount }, () => ({
                x: Math.random() * width,
                y: Math.random() * height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                size: Math.random() * 2 + 0.5,
                opacity: Math.random() * 0.5 + 0.2,
            }));
        },
        [particleCount]
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

        const handleMouse = (e: MouseEvent) => {
            const rect = canvas.getBoundingClientRect();
            mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
        };
        canvas.addEventListener("mousemove", handleMouse);

        const animate = () => {
            const { width, height } = canvas;
            ctx.clearRect(0, 0, width, height);

            const particles = particlesRef.current;
            const mouse = mouseRef.current;

            for (const p of particles) {
                p.x += p.vx;
                p.y += p.vy;

                if (p.x < 0 || p.x > width) p.vx *= -1;
                if (p.y < 0 || p.y > height) p.vy *= -1;

                // Mouse repulsion
                const dx = p.x - mouse.x;
                const dy = p.y - mouse.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 100) {
                    p.vx += dx * 0.001;
                    p.vy += dy * 0.001;
                }

                // Speed limit
                const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
                if (speed > 1) {
                    p.vx = (p.vx / speed) * 1;
                    p.vy = (p.vy / speed) * 1;
                }

                // Draw particle
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(${color}, ${p.opacity})`;
                ctx.fill();
            }

            // Draw connections
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < connectionDistance) {
                        const opacity = (1 - dist / connectionDistance) * 0.15;
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.strokeStyle = `rgba(${color}, ${opacity})`;
                        ctx.lineWidth = 0.5;
                        ctx.stroke();
                    }
                }
            }

            animationRef.current = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener("resize", resize);
            canvas.removeEventListener("mousemove", handleMouse);
            cancelAnimationFrame(animationRef.current);
        };
    }, [color, connectionDistance, initParticles]);

    return (
        <canvas
            ref={canvasRef}
            className={`absolute inset-0 pointer-events-auto ${className}`}
            style={{ zIndex: 0 }}
        />
    );
};
