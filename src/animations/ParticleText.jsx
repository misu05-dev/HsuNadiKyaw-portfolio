import { useEffect, useRef } from "react";

function ParticleText({
    text = "Hsu Nadi Kyaw",
    className = "",
    fontSize = 60,
    particleColor = "#6930a1",
    particleGap = 1,
    hoverRadius = 60,
    repelStrength = 6,
    canvasHeight = 90,
}) {
    const canvasRef = useRef(null);
    const mouseRef = useRef({ x: -9999, y: -9999 });
    const particlesRef = useRef([]);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");

        // Measure text width first
        ctx.font = `bold ${fontSize}px sans-serif`;
        const metrics = ctx.measureText(text);
        const textWidth = Math.ceil(metrics.width) + 20; // buffer so descenders/edges aren't clipped

        // Set canvas size DIRECTLY on the DOM element — synchronous, no re-render race
        canvas.width = textWidth;
        canvas.height = canvasHeight;

        const width = canvas.width;
        const height = canvas.height;

        ctx.clearRect(0, 0, width, height);
        ctx.font = `bold ${fontSize}px sans-serif`;
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
    }, [text, fontSize, particleColor, particleGap, hoverRadius, repelStrength, canvasHeight]);

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
        />
    );
}

export default ParticleText;