import { useEffect, useRef, useState } from "react";

/**
 * Responsive font size: pass either a single number (fontSize) to keep the
 * old fixed behavior, or nothing and let it pick based on viewport width.
 * You can also pass `fontSizes` to customize the breakpoints, e.g.:
 *   fontSizes={{ base: 34, sm: 44, md: 60 }}
 */
function useResponsiveFontSize(fontSize, fontSizes) {
    const sizes = {
        base: fontSizes?.base ?? 36,
        sm: fontSizes?.sm ?? 46,
        md: fontSizes?.md ?? 60,
    };

    const getSize = () => {
        if (fontSize != null) return fontSize; // explicit override wins
        if (typeof window === "undefined") return sizes.md;
        const w = window.innerWidth;
        if (w < 480) return sizes.base;
        if (w < 768) return sizes.sm;
        return sizes.md;
    };

    const [size, setSize] = useState(getSize);

    useEffect(() => {
        if (fontSize != null) {
            setSize(fontSize);
            return;
        }

        let frame;
        const onResize = () => {
            cancelAnimationFrame(frame);
            frame = requestAnimationFrame(() => setSize(getSize()));
        };

        window.addEventListener("resize", onResize);
        return () => {
            window.removeEventListener("resize", onResize);
            cancelAnimationFrame(frame);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fontSize, fontSizes?.base, fontSizes?.sm, fontSizes?.md]);

    return size;
}

function ParticleText({
    text = "Hsu Nadi Kyaw",
    className = "",
    fontSize = null, // leave null to auto-scale by viewport; pass a number to force a fixed size
    fontSizes, // optional { base, sm, md } breakpoint overrides
    particleColor = "#6930a1",
    particleGap = 1,
    hoverRadius = 60,
    repelStrength = 6,
    canvasHeight = 90,
}) {
    const canvasRef = useRef(null);
    const mouseRef = useRef({ x: -9999, y: -9999 });
    const particlesRef = useRef([]);

    const activeFontSize = useResponsiveFontSize(fontSize, fontSizes);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");

        // Measure text width first
        ctx.font = `bold ${activeFontSize}px sans-serif`;
        const metrics = ctx.measureText(text);
        const textWidth = Math.ceil(metrics.width) + 20; // buffer so descenders/edges aren't clipped

        // Set canvas size DIRECTLY on the DOM element — synchronous, no re-render race
        canvas.width = textWidth;
        canvas.height = canvasHeight;

        const width = canvas.width;
        const height = canvas.height;

        ctx.clearRect(0, 0, width, height);
        ctx.font = `bold ${activeFontSize}px sans-serif`;
        ctx.textAlign = "left";
        ctx.textBaseline = "middle";
        ctx.fillStyle = "#fff";
        ctx.fillText(text, 5, height / 2);

        const imageData = ctx.getImageData(0, 0, width, height).data;
        const targets = [];

        for (let y = 0; y < height; y += particleGap) {
            for (let x = 0; x < width; x += particleGap) {
                const alpha = imageData[(y * width + x) * 4 + 3];
                if (alpha > 128) targets.push({ x, y });
            }
        }

        function scatterParticles() {
            particlesRef.current = targets.map((t) => ({
                x: Math.random() * width,
                y: Math.random() * height,
                targetX: t.x,
                targetY: t.y,
                floatOffset: Math.random() * Math.PI * 2,
            }));
        }

        scatterParticles();
        ctx.clearRect(0, 0, width, height);

        let frame;
        let t = 0;

        function animate() {
            t += 0.08;
            ctx.clearRect(0, 0, width, height);
            ctx.fillStyle = particleColor;

            // optional
            // ctx.shadowColor = particleColor;
            // ctx.shadowBlur = 4;

            const mouse = mouseRef.current;

            particlesRef.current.forEach((p) => {
                const floatX = Math.sin(t + p.floatOffset) * 1.5;
                const floatY = Math.cos(t + p.floatOffset) * 1.5;

                let goalX = p.targetX + floatX;
                let goalY = p.targetY + floatY;

                const dx = p.x - mouse.x;
                const dy = p.y - mouse.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < hoverRadius) {
                    const force = (hoverRadius - dist) / hoverRadius;
                    const angle = Math.atan2(dy, dx);
                    goalX = p.x + Math.cos(angle) * force * hoverRadius * (repelStrength / 10);
                    goalY = p.y + Math.sin(angle) * force * hoverRadius * (repelStrength / 10);
                }

                // p.x += (goalX - p.x) * 0.12;
                // p.y += (goalY - p.y) * 0.12;

                p.x += (goalX - p.x) * 0.08;
                p.y += (goalY - p.y) * 0.08;

                ctx.fillRect(p.x, p.y, 2, 2);
            });

            frame = requestAnimationFrame(animate);
        }
        animate();

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) scatterParticles();
                });
            },
            { threshold: 0.4 }
        );
        observer.observe(canvas);

        return () => {
            cancelAnimationFrame(frame);
            observer.disconnect();
        };
    }, [text, activeFontSize, particleColor, particleGap, hoverRadius, repelStrength, canvasHeight]);

    function handleMouseMove(e) {
        const rect = canvasRef.current.getBoundingClientRect();
        const scaleX = canvasRef.current.width / rect.width;
        const scaleY = canvasRef.current.height / rect.height;
        mouseRef.current = {
            x: (e.clientX - rect.left) * scaleX,
            y: (e.clientY - rect.top) * scaleY,
        };
    }

    function handleMouseLeave() {
        mouseRef.current = { x: -9999, y: -9999 };
    }

    return (
        <canvas
            ref={canvasRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className={className}
            style={{ maxWidth: "100%", height: "auto" }}
        />
    );
}

export default ParticleText;