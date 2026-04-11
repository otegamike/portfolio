import React, { useEffect, useState, useRef, useMemo } from 'react';

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%^&*()_+-=[]{}|;:<>?/~';
const FONT_SIZE = 13;

// --- CSS Version for Mobile (Performant) ---
const MatrixRainMobile: React.FC = () => {
  const columnCount = 15; // Fewer columns for mobile performance
  
  // Generate random character strings for each column once
  const columns = useMemo(() => {
    return Array.from({ length: columnCount }).map(() => {
      const length = 20 + Math.floor(Math.random() * 20);
      const chars = Array.from({ length })
        .map(() => CHARS[Math.floor(Math.random() * CHARS.length)])
        .join('\n');
      return {
        chars,
        duration: 5 + Math.random() * 10, // Random fall speed
        delay: Math.random() * -20, // Random start offset
        left: `${Math.random() * 100}%`,
      };
    });
  }, []);

  return (
    <div style={{
      position: 'absolute',
      inset: 0,
      background: '#050505',
      overflow: 'hidden',
      userSelect: 'none',
      pointerEvents: 'none',
    }}>
      <style>
        {`
          @keyframes matrixFall {
            0% { transform: translateY(-100%); }
            100% { transform: translateY(100vh); }
          }
          .matrix-column {
            position: absolute;
            top: 0;
            color: #00FF41;
            font-family: 'Share Tech Mono', monospace;
            font-size: ${FONT_SIZE}px;
            line-height: ${FONT_SIZE}px;
            white-space: pre;
            text-shadow: 0 0 5px #00FF41;
            will-change: transform;
          }
        `}
      </style>
      {columns.map((col, i) => (
        <div
          key={i}
          className="matrix-column"
          style={{
            left: col.left,
            animation: `matrixFall ${col.duration}s linear infinite`,
            animationDelay: `${col.delay}s`,
            opacity: 0.8,
          }}
        >
          {col.chars}
        </div>
      ))}
    </div>
  );
};

// --- Your Original Canvas Version (Optimized) ---
const MatrixRainCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    let animFrameId: number = 0;
    let columns: number[] = [];
    let columnSpeeds: number[] = [];
    let lastTime = 0;
    const interval = 1000 / 30;

    let cachedWidth = 0;
    let cachedHeight = 0;
    let atlasCanvas: HTMLCanvasElement | null = null;
    let atlasCellWidth = 0;
    let atlasCellHeight = 0;

    const createAtlas = (dpr: number) => {
      const scaledFontSize = FONT_SIZE * dpr;
      const ac = document.createElement('canvas');
      const actx = ac.getContext('2d');
      if (!actx) return;
      ac.width = CHARS.length * scaledFontSize;
      ac.height = scaledFontSize * 2;
      actx.font = `${scaledFontSize}px 'Share Tech Mono', monospace`;
      actx.textBaseline = 'top';
      actx.textAlign = 'center';
      actx.fillStyle = '#00FF41';
      for (let i = 0; i < CHARS.length; i++) actx.fillText(CHARS[i], i * scaledFontSize + scaledFontSize / 2, 0);
      actx.fillStyle = '#ffffff';
      for (let i = 0; i < CHARS.length; i++) actx.fillText(CHARS[i], i * scaledFontSize + scaledFontSize / 2, scaledFontSize);
      atlasCanvas = ac;
      atlasCellWidth = scaledFontSize;
      atlasCellHeight = scaledFontSize;
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      cachedWidth = window.innerWidth;
      cachedHeight = window.innerHeight;
      canvas.width = cachedWidth * dpr;
      canvas.height = cachedHeight * dpr;
      canvas.style.width = `${cachedWidth}px`;
      canvas.style.height = `${cachedHeight}px`;
      ctx.scale(dpr, dpr);
      createAtlas(dpr);
      const colCount = Math.floor(cachedWidth / 20);
      columns = Array(colCount).fill(0).map(() => Math.random() * -100);
      columnSpeeds = Array(colCount).fill(0).map(() => 0.5 + Math.random() * 1.5);
    };

    const draw = (timestamp: number) => {
      animFrameId = requestAnimationFrame(draw);
      if (timestamp - lastTime < interval) return;
      lastTime = timestamp;
      if (!atlasCanvas) return;

      ctx.fillStyle = 'rgba(5, 5, 5, 0.15)';
      ctx.fillRect(0, 0, cachedWidth, cachedHeight);

      for (let i = 0; i < columns.length; i++) {
        const charIndex = Math.floor(Math.random() * CHARS.length);
        const x = i * 20;
        const y = columns[i] * FONT_SIZE;
        ctx.drawImage(atlasCanvas, charIndex * atlasCellWidth, Math.random() > 0.98 ? atlasCellHeight : 0, atlasCellWidth, atlasCellHeight, x, y, FONT_SIZE, FONT_SIZE);
        if (y > cachedHeight && Math.random() > 0.98) columns[i] = 0;
        columns[i] += columnSpeeds[i];
      }
    };

    window.addEventListener('resize', resize);
    resize();
    animFrameId = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(animFrameId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas ref={canvasRef} style={{ display: 'block', position: 'absolute', inset: 0, background: '#050505' }} />;
};

// --- Main Switcher Component ---
const MatrixRain: React.FC = () => {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  useEffect(() => {
    // Check for mobile by user agent or screen width
    const checkMobile = () => {
      const mobileUA = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      const mobileWidth = window.innerWidth < 768;
      setIsMobile(mobileUA || mobileWidth);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Return null during hydration to avoid mismatch
  if (isMobile === null) return <div style={{ background: '#050505', position: 'absolute', inset: 0 }} />;

  return isMobile ? <MatrixRainMobile /> : <MatrixRainCanvas />;
};

export default MatrixRain;