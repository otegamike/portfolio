import { useEffect, useRef } from 'react';

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%^&*()_+-=[]{}|;:<>?/~';
const FONT_SIZE = 14;
const COLUMN_GAP = 20;

const MatrixRain: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false }); // Optimization: Disable alpha for the main context
    if (!ctx) return;

    let animFrameId: number;
    let columns: number[] = [];
    let columnSpeeds: number[] = [];
    let lastTime = 0;
    const interval = 1000 / 30; // Solid 30fps

    const resize = () => {
      // Scale for high-DPI screens to prevent blur/lag
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(dpr, dpr);

      const colCount = Math.floor(window.innerWidth / COLUMN_GAP);
      const newColumns: number[] = [];
      const newSpeeds: number[] = [];
      for (let i = 0; i < colCount; i++) {
        newColumns[i] = columns[i] ?? Math.random() * -100;
        newSpeeds[i] = columnSpeeds[i] ?? 0.5 + Math.random() * 1.5;
      }
      columns = newColumns;
      columnSpeeds = newSpeeds;
      
      // Font only needs to be set once per resize
      ctx.font = `${FONT_SIZE}px 'Share Tech Mono', monospace`;
    };

    window.addEventListener('resize', resize);
    resize();

    const draw = (timestamp: number) => {
      animFrameId = requestAnimationFrame(draw);

      if (timestamp - lastTime < interval) return;
      lastTime = timestamp;

      // 1. Efficient Fade: Opaque black with low alpha fill
      ctx.fillStyle = 'rgba(5, 5, 5, 0.15)';
      ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

      // 2. Performance: Group drawing by color to minimize fillStyle switches
      ctx.fillStyle = '#00FF41';
      for (let i = 0; i < columns.length; i++) {
        const char = CHARS[Math.floor(Math.random() * CHARS.length)];
        const x = i * COLUMN_GAP;
        const y = columns[i] * FONT_SIZE;

        // Draw standard characters
        ctx.fillText(char, x, y);

        if (y > window.innerHeight && Math.random() > 0.98) {
          columns[i] = 0;
        }
        columns[i] += columnSpeeds[i];
      }

      // 3. Selective "Glow": Draw highlights in a separate pass
      ctx.fillStyle = '#ffffff';
      for (let i = 0; i < columns.length; i++) {
        if (Math.random() > 0.98) {
          const char = CHARS[Math.floor(Math.random() * CHARS.length)];
          ctx.fillText(char, i * COLUMN_GAP, columns[i] * FONT_SIZE);
        }
      }
    };

    animFrameId = requestAnimationFrame(draw);

    const handleVisibility = () => {
      if (document.hidden) cancelAnimationFrame(animFrameId);
      else { lastTime = 0; animFrameId = requestAnimationFrame(draw); }
    };
    
    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      cancelAnimationFrame(animFrameId);
      window.removeEventListener('resize', resize);
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, []);

  return <canvas ref={canvasRef} className='matrix-rain' style={{ display: 'block', position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }} />;
};

export default MatrixRain;