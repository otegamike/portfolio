import React, { useEffect, useRef } from 'react';

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%^&*()_+-=[]{}|;:<>?/~';
const FONT_SIZE = 13;

const getColumnGap = (width: number) => (width < 768 ? 24 : 20);

const MatrixRain: React.FC = () => {
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
    const interval = 1000 / 30; // 30 fps target

    let cachedWidth = 0;
    let cachedHeight = 0;
    let columnGap = 20;

    // --- Back-Buffer Setup ---
    const offCanvas = document.createElement('canvas');
    const offCtx = offCanvas.getContext('2d', { alpha: false });
    
    // --- Atlas (Offscreen Canvas) Setup ---
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
      ac.height = cellH * 2; // Two rows: 0 (Green), 1 (White)

      actx.font = `${scaledFontSize}px 'Share Tech Mono', monospace`;
      actx.textBaseline = 'top';
      actx.textAlign = 'center';

      // Draw Green Characters
      actx.fillStyle = '#00FF41';
      for (let i = 0; i < CHARS.length; i++) {
        actx.fillText(CHARS[i], i * cellW + cellW / 2, 0);
      }

      // Draw White Characters
      actx.fillStyle = '#ffffff';
      for (let i = 0; i < CHARS.length; i++) {
        actx.fillText(CHARS[i], i * cellW + cellW / 2, cellH);
      }

      atlasCanvas = ac;
      atlasCellWidth = cellW;
      atlasCellHeight = cellH;
    };

    const resize = () => {
      currentDpr = Math.min(window.devicePixelRatio || 1, 2);
      cachedWidth = window.innerWidth;
      cachedHeight = window.innerHeight;
      columnGap = getColumnGap(cachedWidth);

      // Main visible canvas
      canvas.width = cachedWidth * currentDpr;
      canvas.height = cachedHeight * currentDpr;
      canvas.style.width = `${cachedWidth}px`;
      canvas.style.height = `${cachedHeight}px`;

      // Back-buffer canvas
      offCanvas.width = cachedWidth * currentDpr;
      offCanvas.height = cachedHeight * currentDpr;
      
      if (offCtx) {
        // Reset transform before re-scaling, in case resize is called multiple times
        offCtx.resetTransform();
        offCtx.scale(currentDpr, currentDpr);
        offCtx.fillStyle = '#050505';
        offCtx.fillRect(0, 0, cachedWidth, cachedHeight);
      }

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
    
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(resize);
    } else {
      resize();
    }

    const draw = (timestamp: number) => {
      animFrameId = requestAnimationFrame(draw);

      if (timestamp - lastTime < interval) return;
      lastTime = timestamp;

      if (!offCtx || !atlasCanvas) return;

      // Darken the back-buffer
      offCtx.fillStyle = 'rgba(5, 5, 5, 0.15)';
      offCtx.fillRect(0, 0, cachedWidth, cachedHeight);

      // Draw the characters to the back-buffer
      for (let i = 0; i < columns.length; i++) {
        const charIndex = Math.floor(Math.random() * CHARS.length);
        const x = i * columnGap;
        const y = columns[i] * FONT_SIZE;
        const isWhite = Math.random() > 0.98;

        const sx = charIndex * atlasCellWidth;
        const sy = isWhite ? atlasCellHeight : 0;

        offCtx.drawImage(
          atlasCanvas,
          sx, sy, atlasCellWidth, atlasCellHeight, // Source physical pixels
          x, y, FONT_SIZE, FONT_SIZE // Destination logical coords
        );

        if (y > cachedHeight && Math.random() > 0.98) {
          columns[i] = 0;
        }
        columns[i] += columnSpeeds[i];
      }

      // Blit everything from back-buffer to visible canvas
      ctx.drawImage(offCanvas, 0, 0);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!animFrameId) {
            lastTime = 0;
            animFrameId = requestAnimationFrame(draw);
          }
        } else {
          if (animFrameId) {
            cancelAnimationFrame(animFrameId);
            animFrameId = 0;
          }
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
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        background: '#050505', // Ensures a fallback
      }}
    />
  );
};

export default MatrixRain;