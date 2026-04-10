import React, { useEffect, useRef } from 'react';

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%^&*()_+-=[]{}|;:<>?/~';
const FONT_SIZE = 13;

const isMobile = /iPhone|iPad|Android/i.test(navigator.userAgent);
const getColumnGap = (width: number) => (width < 768 ? 36 : 20); // wider gap on mobile = fewer columns

const MatrixRain: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Respect accessibility preference — also saves battery
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    let animFrameId: number = 0;
    let columns: number[] = [];
    let columnSpeeds: number[] = [];
    let lastTime = 0;
    const interval = 1000 / (isMobile ? 18 : 30); // lower fps on mobile

    let cachedWidth = 0;
    let cachedHeight = 0;
    let columnGap = 20;

    // Back-buffer only on desktop — skipping the blit is a big mobile win
    const offCanvas = isMobile ? null : document.createElement('canvas');
    const offCtx = offCanvas ? offCanvas.getContext('2d', { alpha: false }) : null;

    let atlasCanvas: HTMLCanvasElement | null = null;
    let atlasCellWidth = 0;
    let atlasCellHeight = 0;
    let currentDpr = 1;

    const createAtlas = (dpr: number) => {
      const scaledFontSize = FONT_SIZE * dpr;
      const ac = document.createElement('canvas');
      const actx = ac.getContext('2d', { alpha: true });
      if (!actx) return;

      const cellW = scaledFontSize;
      const cellH = scaledFontSize;
      ac.width = CHARS.length * cellW;
      ac.height = cellH * 2;

      actx.font = `${scaledFontSize}px 'Share Tech Mono', monospace`;
      actx.textBaseline = 'top';
      actx.textAlign = 'center';

      actx.fillStyle = '#00FF41';
      for (let i = 0; i < CHARS.length; i++) {
        actx.fillText(CHARS[i], i * cellW + cellW / 2, 0);
      }
      actx.fillStyle = '#ffffff';
      for (let i = 0; i < CHARS.length; i++) {
        actx.fillText(CHARS[i], i * cellW + cellW / 2, cellH);
      }

      atlasCanvas = ac;
      atlasCellWidth = cellW;
      atlasCellHeight = cellH;
    };

    const resize = () => {
      // Cap DPR at 1 on mobile — this alone halves/thirds the pixel work on iPhones
      currentDpr = Math.min(window.devicePixelRatio || 1, isMobile ? 1 : 2);
      cachedWidth = window.innerWidth;
      cachedHeight = window.innerHeight;
      columnGap = getColumnGap(cachedWidth);

      canvas.width = cachedWidth * currentDpr;
      canvas.height = cachedHeight * currentDpr;
      canvas.style.width = `${cachedWidth}px`;
      canvas.style.height = `${cachedHeight}px`;

      if (offCanvas) {
        offCanvas.width = cachedWidth * currentDpr;
        offCanvas.height = cachedHeight * currentDpr;
      }

      const target = offCtx ?? ctx;
      target.resetTransform?.();
      target.scale(currentDpr, currentDpr);
      target.fillStyle = '#050505';
      target.fillRect(0, 0, cachedWidth, cachedHeight);

      createAtlas(currentDpr);

      const colCount = Math.floor(cachedWidth / columnGap);
      const newColumns: number[] = [];
      const newSpeeds: number[] = [];
      for (let i = 0; i < colCount; i++) {
        newColumns[i] = columns[i] ?? Math.random() * -100;
        newSpeeds[i] = columnSpeeds[i] ?? 0.5 + Math.random() * 1.5;
      }
      columns = newColumns;
      columnSpeeds = newSpeeds;
    };

    window.addEventListener('resize', resize);
    if (document.fonts?.ready) {
      document.fonts.ready.then(resize);
    } else {
      resize();
    }

    const draw = (timestamp: number) => {
      animFrameId = requestAnimationFrame(draw);
      if (timestamp - lastTime < interval) return;
      lastTime = timestamp;
      if (!atlasCanvas) return;

      // Draw to offCtx (desktop) or directly to ctx (mobile)
      const target = offCtx ?? ctx;

      // Use destination-out fade instead of rgba fillRect —
      // avoids a full-screen alpha-blend compositing pass on the GPU
      target.globalCompositeOperation = 'destination-out';
      target.fillStyle = 'rgba(0, 0, 0, 0.12)';
      target.fillRect(0, 0, cachedWidth, cachedHeight);
      target.globalCompositeOperation = 'source-over';

      for (let i = 0; i < columns.length; i++) {
        const charIndex = Math.floor(Math.random() * CHARS.length);
        const x = i * columnGap;
        const y = columns[i] * FONT_SIZE;
        const isWhite = Math.random() > 0.98;

        target.drawImage(
          atlasCanvas,
          charIndex * atlasCellWidth,
          isWhite ? atlasCellHeight : 0,
          atlasCellWidth,
          atlasCellHeight,
          x, y, FONT_SIZE, FONT_SIZE
        );

        if (y > cachedHeight && Math.random() > 0.98) {
          columns[i] = 0;
        }
        columns[i] += columnSpeeds[i];
      }

      // Desktop only: blit back-buffer to visible canvas
      if (offCanvas) {
        ctx.drawImage(offCanvas, 0, 0);
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!animFrameId) { lastTime = 0; animFrameId = requestAnimationFrame(draw); }
        } else {
          if (animFrameId) { cancelAnimationFrame(animFrameId); animFrameId = 0; }
        }
      },
      { threshold: 0 }
    );
    observer.observe(canvas);

    animFrameId = requestAnimationFrame(draw);

    const handleVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(animFrameId);
        animFrameId = 0;
      } else {
        lastTime = 0;
        animFrameId = requestAnimationFrame(draw);
      }
    };

    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      cancelAnimationFrame(animFrameId);
      window.removeEventListener('resize', resize);
      document.removeEventListener('visibilitychange', handleVisibility);
      observer.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="matrix-rain"
      style={{
        display: 'block',
        position: 'absolute',
        top: 0, left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        background: '#050505',
        willChange: 'transform', // promotes canvas to its own GPU layer
      }}
    />
  );
};

export default MatrixRain;