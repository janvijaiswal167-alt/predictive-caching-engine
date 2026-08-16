import React, { useEffect, useRef } from 'react';

export const AICityCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Mouse tracking for parallax
    let mouseX = 0;
    let mouseY = 0;
    const handleMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / width - 0.5) * 40;
      mouseY = (e.clientY / height - 0.5) * 40;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Buildings setup
    const numBuildings = 35;
    const buildings: { x: number; y: number; w: number; h: number; color: string; windows: boolean[]; depth: number }[] = [];
    for (let i = 0; i < numBuildings; i++) {
      const depth = 0.2 + Math.random() * 0.8;
      const w = 40 + Math.random() * 70;
      const h = 150 + Math.random() * 350;
      const x = (i / numBuildings) * (width + 400) - 200;
      const y = height - h * depth;
      const colors = ['#2563EB', '#7C3AED', '#06B6D4', '#3B82F6'];
      const color = colors[Math.floor(Math.random() * colors.length)];

      const winCount = 15;
      const windows = Array.from({ length: winCount }, () => Math.random() > 0.4);

      buildings.push({ x, y, w, h, color, windows, depth });
    }

    // Flying Drones setup
    const numDrones = 8;
    const drones = Array.from({ length: numDrones }, () => ({
      x: Math.random() * width,
      y: 80 + Math.random() * (height * 0.4),
      speedX: 0.8 + Math.random() * 1.5,
      speedY: (Math.random() - 0.5) * 0.5,
      size: 3 + Math.random() * 3,
      color: Math.random() > 0.5 ? '#06B6D4' : '#7C3AED',
      trail: [] as { x: number; y: number }[]
    }));

    // Data streams setup
    const numParticles = 120;
    const particles = Array.from({ length: numParticles }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      speed: 0.5 + Math.random() * 2,
      size: 1 + Math.random() * 2,
      opacity: 0.2 + Math.random() * 0.8,
      color: Math.random() > 0.3 ? '#2563EB' : '#7C3AED'
    }));

    // Highways light pulses
    const highways = [
      { yRatio: 0.85, speed: 4, lightX: 0 },
      { yRatio: 0.92, speed: 6, lightX: width * 0.5 },
      { yRatio: 0.97, speed: 3, lightX: width * 0.2 }
    ];

    let tick = 0;

    const render = () => {
      tick += 0.02;
      ctx.fillStyle = '#030712';
      ctx.fillRect(0, 0, width, height);

      // Deep space grid radial gradient background
      const grad = ctx.createRadialGradient(
        width / 2 + mouseX * 0.5,
        height / 3 + mouseY * 0.5,
        50,
        width / 2,
        height / 2,
        width * 0.8
      );
      grad.addColorStop(0, 'rgba(37, 99, 235, 0.12)');
      grad.addColorStop(0.5, 'rgba(124, 58, 237, 0.08)');
      grad.addColorStop(1, 'rgba(3, 7, 18, 0.95)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      // Render Data Stream Particles
      particles.forEach((p) => {
        p.y -= p.speed;
        if (p.y < 0) {
          p.y = height;
          p.x = Math.random() * width;
        }
        ctx.beginPath();
        ctx.arc(p.x + mouseX * (p.size * 0.1), p.y + mouseY * (p.size * 0.1), p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.opacity;
        ctx.fill();
        ctx.globalAlpha = 1.0;
      });

      // Render 3D Buildings
      buildings.sort((a, b) => a.depth - b.depth);
      buildings.forEach((b) => {
        const offsetX = mouseX * b.depth;
        const offsetY = mouseY * b.depth;
        const bX = b.x + offsetX;
        const bY = height - b.h * b.depth + offsetY;
        const bW = b.w * b.depth;
        const bH = b.h * b.depth;

        // Building Body
        const bGrad = ctx.createLinearGradient(bX, bY, bX + bW, bY + bH);
        bGrad.addColorStop(0, 'rgba(15, 23, 42, 0.9)');
        bGrad.addColorStop(1, 'rgba(3, 7, 18, 0.95)');
        ctx.fillStyle = bGrad;
        ctx.fillRect(bX, bY, bW, bH);

        // Building Neon Border / Roof Holograms
        ctx.strokeStyle = b.color;
        ctx.lineWidth = 1 * b.depth;
        ctx.globalAlpha = 0.3 * b.depth;
        ctx.strokeRect(bX, bY, bW, bH);

        // Hologram roof beacon
        ctx.beginPath();
        ctx.arc(bX + bW / 2, bY - 2, 2 * b.depth, 0, Math.PI * 2);
        ctx.fillStyle = b.color;
        ctx.globalAlpha = 0.6 + Math.sin(tick * 2 + b.x) * 0.4;
        ctx.fill();
        ctx.globalAlpha = 1.0;

        // Windows
        const rows = 5;
        const cols = 3;
        const wW = (bW - 12 * b.depth) / cols;
        const wH = (bH - 20 * b.depth) / rows;

        for (let r = 0; r < rows; r++) {
          for (let c = 0; c < cols; c++) {
            const idx = (r * cols + c) % b.windows.length;
            if (b.windows[idx]) {
              const wx = bX + 4 * b.depth + c * (wW + 2 * b.depth);
              const wy = bY + 10 * b.depth + r * (wH + 3 * b.depth);
              ctx.fillStyle = b.color;
              ctx.globalAlpha = 0.2 + Math.sin(tick + r + c) * 0.15;
              ctx.fillRect(wx, wy, wW, wH);
              ctx.globalAlpha = 1.0;
            }
          }
        }
      });

      // Digital Highways (bottom perspective lines & light pulses)
      highways.forEach((hw) => {
        const hy = height * hw.yRatio + mouseY * 0.3;
        hw.lightX = (hw.lightX + hw.speed) % width;

        ctx.strokeStyle = 'rgba(37, 99, 235, 0.2)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(0, hy);
        ctx.lineTo(width, hy);
        ctx.stroke();

        // Light pulse beam
        const pGrad = ctx.createLinearGradient(hw.lightX - 120, hy, hw.lightX + 120, hy);
        pGrad.addColorStop(0, 'rgba(6, 182, 212, 0)');
        pGrad.addColorStop(0.5, 'rgba(6, 182, 212, 0.9)');
        pGrad.addColorStop(1, 'rgba(6, 182, 212, 0)');
        ctx.strokeStyle = pGrad;
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(hw.lightX - 120, hy);
        ctx.lineTo(hw.lightX + 120, hy);
        ctx.stroke();
      });

      // Render Flying Drones
      drones.forEach((d) => {
        d.x += d.speedX;
        d.y += d.speedY;
        if (d.x > width + 50) d.x = -50;
        if (d.y < 50 || d.y > height * 0.5) d.speedY *= -1;

        // Trail
        d.trail.push({ x: d.x, y: d.y });
        if (d.trail.length > 15) d.trail.shift();

        ctx.beginPath();
        for (let i = 0; i < d.trail.length - 1; i++) {
          ctx.strokeStyle = d.color;
          ctx.globalAlpha = (i / d.trail.length) * 0.4;
          ctx.lineWidth = d.size * 0.6;
          ctx.moveTo(d.trail[i].x + mouseX * 0.2, d.trail[i].y + mouseY * 0.2);
          ctx.lineTo(d.trail[i + 1].x + mouseX * 0.2, d.trail[i + 1].y + mouseY * 0.2);
          ctx.stroke();
        }

        // Drone Headlight
        ctx.beginPath();
        ctx.arc(d.x + mouseX * 0.2, d.y + mouseY * 0.2, d.size, 0, Math.PI * 2);
        ctx.fillStyle = d.color;
        ctx.globalAlpha = 0.9;
        ctx.fill();
        ctx.globalAlpha = 1.0;
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.85 }}
    />
  );
};
