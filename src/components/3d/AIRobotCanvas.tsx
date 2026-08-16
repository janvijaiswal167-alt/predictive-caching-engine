import React, { useEffect, useRef } from 'react';

export const AIRobotCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 500);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 500);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };
    window.addEventListener('resize', handleResize);

    // Mouse tracking for Robot head rotation
    let targetRotX = 0;
    let targetRotY = 0;
    let currentRotX = 0;
    let currentRotY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      targetRotY = (e.clientX - cx) / (rect.width / 2);
      targetRotX = (e.clientY - cy) / (rect.height / 2);
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Neural Network Nodes around robot
    const numNodes = 20;
    const nodes = Array.from({ length: numNodes }, () => ({
      angle: Math.random() * Math.PI * 2,
      radius: 120 + Math.random() * 80,
      speed: (Math.random() - 0.5) * 0.015,
      size: 3 + Math.random() * 3,
      pulse: Math.random() * Math.PI
    }));

    let tick = 0;

    const render = () => {
      tick += 0.03;
      ctx.clearRect(0, 0, width, height);

      // Smooth Rotation interpolation
      currentRotX += (targetRotX - currentRotX) * 0.05;
      currentRotY += (targetRotY - currentRotY) * 0.05;

      const centerX = width / 2;
      const centerY = height / 2 - 20;

      // Render Floating Neural Network Nodes & Connections
      ctx.strokeStyle = 'rgba(37, 99, 235, 0.25)';
      ctx.lineWidth = 1;

      nodes.forEach((n, idx) => {
        n.angle += n.speed;
        n.pulse += 0.04;

        const nx = centerX + Math.cos(n.angle) * n.radius + currentRotY * 15;
        const ny = centerY + Math.sin(n.angle) * (n.radius * 0.6) + currentRotX * 10;

        // Connect nearby nodes
        for (let j = idx + 1; j < nodes.length; j++) {
          const n2 = nodes[j];
          const nx2 = centerX + Math.cos(n2.angle) * n2.radius + currentRotY * 15;
          const ny2 = centerY + Math.sin(n2.angle) * (n2.radius * 0.6) + currentRotX * 10;
          const dist = Math.hypot(nx2 - nx, ny2 - ny);
          if (dist < 110) {
            ctx.beginPath();
            ctx.moveTo(nx, ny);
            ctx.lineTo(nx2, ny2);
            ctx.strokeStyle = `rgba(124, 58, 237, ${0.4 - dist / 300})`;
            ctx.stroke();
          }
        }

        // Draw node dot
        ctx.beginPath();
        ctx.arc(nx, ny, n.size + Math.sin(n.pulse) * 1.5, 0, Math.PI * 2);
        ctx.fillStyle = idx % 2 === 0 ? '#2563EB' : '#7C3AED';
        ctx.shadowColor = '#06B6D4';
        ctx.shadowBlur = 10;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      // 3D AI Robot Body Structure (Holographic Cyber Metallic Shell)
      const headX = centerX + currentRotY * 25;
      const headY = centerY + currentRotX * 15 + Math.sin(tick) * 6;
      const headW = 140;
      const headH = 170;

      // Robot Neck / Shoulder outline
      ctx.beginPath();
      ctx.moveTo(headX - 60, headY + 120);
      ctx.lineTo(headX - 110, headY + 200);
      ctx.lineTo(headX + 110, headY + 200);
      ctx.lineTo(headX + 60, headY + 120);
      ctx.closePath();
      const shoulderGrad = ctx.createLinearGradient(headX - 110, headY + 120, headX + 110, headY + 200);
      shoulderGrad.addColorStop(0, 'rgba(15, 23, 42, 0.9)');
      shoulderGrad.addColorStop(0.5, 'rgba(37, 99, 235, 0.4)');
      shoulderGrad.addColorStop(1, 'rgba(124, 58, 237, 0.8)');
      ctx.fillStyle = shoulderGrad;
      ctx.fill();
      ctx.strokeStyle = '#2563EB';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Chest Reactor Core (Pulsing glowing orb)
      const reactorY = headY + 165;
      const rRad = 22 + Math.sin(tick * 3) * 3;
      const rGrad = ctx.createRadialGradient(headX, reactorY, 2, headX, reactorY, rRad);
      rGrad.addColorStop(0, '#FFFFFF');
      rGrad.addColorStop(0.4, '#06B6D4');
      rGrad.addColorStop(1, 'rgba(124, 58, 237, 0)');
      ctx.beginPath();
      ctx.arc(headX, reactorY, rRad, 0, Math.PI * 2);
      ctx.fillStyle = rGrad;
      ctx.fill();

      // Robot Head Outer Helmet Shell (Rounded Futuristic polygon)
      ctx.beginPath();
      ctx.roundRect(headX - headW / 2, headY - headH / 2, headW, headH, [30, 30, 20, 20]);
      const helmetGrad = ctx.createLinearGradient(headX - headW / 2, headY - headH / 2, headX + headW / 2, headY + headH / 2);
      helmetGrad.addColorStop(0, 'rgba(15, 23, 42, 0.95)');
      helmetGrad.addColorStop(0.5, 'rgba(30, 41, 59, 0.85)');
      helmetGrad.addColorStop(1, 'rgba(15, 23, 42, 0.95)');
      ctx.fillStyle = helmetGrad;
      ctx.fill();

      // Outer Glow Border
      ctx.strokeStyle = '#7C3AED';
      ctx.lineWidth = 2;
      ctx.shadowColor = '#2563EB';
      ctx.shadowBlur = 15;
      ctx.stroke();
      ctx.shadowBlur = 0;

      // Cyber Visor (Black Glass Plate across eye region)
      const visorW = headW - 24;
      const visorH = 48;
      const visorX = headX - visorW / 2;
      const visorY = headY - 20;

      ctx.beginPath();
      ctx.roundRect(visorX, visorY, visorW, visorH, 12);
      ctx.fillStyle = '#030712';
      ctx.fill();
      ctx.strokeStyle = '#06B6D4';
      ctx.lineWidth = 1;
      ctx.stroke();

      // Cybernetic Glowing Eyes (Glowing Blue / Purple Lenses)
      const eyeSpacing = 28 + currentRotY * 4;
      const eyeY = visorY + visorH / 2;

      // Left Eye
      const eye1X = headX - eyeSpacing;
      ctx.beginPath();
      ctx.arc(eye1X, eyeY, 10, 0, Math.PI * 2);
      ctx.fillStyle = '#06B6D4';
      ctx.shadowColor = '#2563EB';
      ctx.shadowBlur = 15;
      ctx.fill();
      ctx.beginPath();
      ctx.arc(eye1X, eyeY, 4, 0, Math.PI * 2);
      ctx.fillStyle = '#FFFFFF';
      ctx.fill();

      // Right Eye
      const eye2X = headX + eyeSpacing;
      ctx.beginPath();
      ctx.arc(eye2X, eyeY, 10, 0, Math.PI * 2);
      ctx.fillStyle = '#06B6D4';
      ctx.shadowColor = '#7C3AED';
      ctx.shadowBlur = 15;
      ctx.fill();
      ctx.beginPath();
      ctx.arc(eye2X, eyeY, 4, 0, Math.PI * 2);
      ctx.fillStyle = '#FFFFFF';
      ctx.fill();
      ctx.shadowBlur = 0;

      // Visor Scanning Ray line
      const scanY = visorY + ((Math.sin(tick * 2) + 1) / 2) * visorH;
      ctx.beginPath();
      ctx.moveTo(visorX + 4, scanY);
      ctx.lineTo(visorX + visorW - 4, scanY);
      ctx.strokeStyle = 'rgba(6, 182, 212, 0.7)';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Floating Holographic Card 1 (Top Right)
      const card1X = headX + 90;
      const card1Y = headY - 70 + Math.sin(tick * 1.5) * 6;
      ctx.fillStyle = 'rgba(15, 23, 42, 0.75)';
      ctx.strokeStyle = 'rgba(37, 99, 235, 0.6)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.roundRect(card1X, card1Y, 110, 50, 8);
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = '#60A5FA';
      ctx.font = '10px Inter, sans-serif';
      ctx.fillText('NEURAL LINK', card1X + 10, card1Y + 18);
      ctx.fillStyle = '#22C55E';
      ctx.fillText('● ACTIVE 99.9%', card1X + 10, card1Y + 36);

      // Floating Holographic Card 2 (Bottom Left)
      const card2X = headX - 190;
      const card2Y = headY + 30 - Math.sin(tick * 1.5) * 6;
      ctx.fillStyle = 'rgba(15, 23, 42, 0.75)';
      ctx.strokeStyle = 'rgba(124, 58, 237, 0.6)';
      ctx.beginPath();
      ctx.roundRect(card2X, card2Y, 110, 50, 8);
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = '#C084FC';
      ctx.font = '10px Inter, sans-serif';
      ctx.fillText('AI MODEL V4.5', card2X + 10, card2Y + 18);
      ctx.fillStyle = '#38BDF8';
      ctx.fillText('LATENCY < 12ms', card2X + 10, card2Y + 36);

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
    <div className="relative w-full h-[450px] md:h-[550px] flex items-center justify-center">
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  );
};
