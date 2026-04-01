import { useEffect, useRef } from 'react';

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%^&*()_+-=[]{}|;:<>?/~';
const FONT_SIZE = 14;

// Fix 4: Pre-compute a character pool to avoid per-frame Math.random indexing
const CHAR_POOL_SIZE = 256; // power of 2 for fast bitwise wrap
const CHAR_POOL: string[] = [];
for (let i = 0; i < CHAR_POOL_SIZE; i++) {
  CHAR_POOL[i] = CHARS[Math.floor(Math.random() * CHARS.length)];
}
let poolIndex = 0;
const nextChar = () => CHAR_POOL[poolIndex++ & (CHAR_POOL_SIZE - 1)];

// Fix 2: Wider gaps on mobile → fewer columns → fewer fillText calls
const getColumnGap = (width: number) => (width < 768 ? 28 : 20);

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

    // Fix 5: Cache dimensions outside the draw loop
    let cachedWidth = 0;
    let cachedHeight = 0;
    let columnGap = 20;

    const resize = () => {
      // Fix 1: Cap DPR at 2 to avoid massive backing buffers on 3× phones
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      cachedWidth = window.innerWidth;
      cachedHeight = window.innerHeight;
      columnGap = getColumnGap(cachedWidth);

      canvas.width = cachedWidth * dpr;
      canvas.height = cachedHeight * dpr;
      canvas.style.width = `${cachedWidth}px`;
      canvas.style.height = `${cachedHeight}px`;
      ctx.scale(dpr, dpr);

      const colCount = Math.floor(cachedWidth / columnGap);
      const newColumns: number[] = [];
      const newSpeeds: number[] = [];
      for (let i = 0; i < colCount; i++) {
        newColumns[i] = columns[i] ?? Math.random() * -100;
        newSpeeds[i] = columnSpeeds[i] ?? 0.5 + Math.random() * 1.5;
      }
      columns = newColumns;
      columnSpeeds = newSpeeds;

      ctx.font = `${FONT_SIZE}px 'Share Tech Mono', monospace`;
    };

    window.addEventListener('resize', resize);
    resize();

    const draw = (timestamp: number) => {
      animFrameId = requestAnimationFrame(draw);

      if (timestamp - lastTime < interval) return;
      lastTime = timestamp;

      // Fade with cached dimensions
      ctx.fillStyle = 'rgba(5, 5, 5, 0.15)';
      ctx.fillRect(0, 0, cachedWidth, cachedHeight);

      // Fix 3: Single-pass rendering — green chars with inline 2% white glow
      ctx.fillStyle = '#00FF41';
      for (let i = 0; i < columns.length; i++) {
        const char = nextChar(); // Fix 4: pool lookup instead of Math.random
        const x = i * columnGap;
        const y = columns[i] * FONT_SIZE;

        // Inline glow: 2% chance → white highlight, otherwise green
        if (Math.random() > 0.98) {
          ctx.fillStyle = '#ffffff';
          ctx.fillText(char, x, y);
          ctx.fillStyle = '#00FF41';
        } else {
          ctx.fillText(char, x, y);
        }

        if (y > cachedHeight && Math.random() > 0.98) {
          columns[i] = 0;
        }
        columns[i] += columnSpeeds[i];
      }
    };

    // Fix 6: IntersectionObserver — pause animation when canvas is off-screen
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

    // Start the animation
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
      }}
    />
  );
};

export default MatrixRain;