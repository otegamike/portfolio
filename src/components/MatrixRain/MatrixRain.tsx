import { useEffect, useRef } from 'react';
import './MatrixRain.css';

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%^&*()_+-=[]{}|;:<>?/~';
const FONT_SIZE = 14;
const COLUMN_GAP = 20; // px between columns

const MatrixRain: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animFrameId: number;
    let columns: number[] = [];
    let columnSpeeds: number[] = [];
    let lastTime = 0;
    const interval = 50; // ms between frames (~20fps for performance)

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      const colCount = Math.floor(canvas.width / COLUMN_GAP);
      // Preserve existing drops, init new ones
      const newColumns: number[] = [];
      const newSpeeds: number[] = [];
      for (let i = 0; i < colCount; i++) {
        newColumns[i] = columns[i] ?? Math.random() * -100;
        newSpeeds[i] = columnSpeeds[i] ?? 0.5 + Math.random() * 1.5;
      }
      columns = newColumns;
      columnSpeeds = newSpeeds;
    };

    resize();
    window.addEventListener('resize', resize);

    const draw = (timestamp: number) => {
      animFrameId = requestAnimationFrame(draw);

      if (timestamp - lastTime < interval) return;
      lastTime = timestamp;

      // Fade previous frame
      ctx.fillStyle = 'rgba(5, 5, 5, 0.15)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = `${FONT_SIZE}px 'Share Tech Mono', monospace`;

      for (let i = 0; i < columns.length; i++) {
        const char = CHARS[Math.floor(Math.random() * CHARS.length)];
        const x = i * COLUMN_GAP;
        const y = columns[i] * FONT_SIZE;

        // Occasional bright flash character
        if (Math.random() > 0.96) {
          ctx.fillStyle = '#ffffff';
          ctx.shadowColor = '#00FF41';
          ctx.shadowBlur = 12;
        } else {
          ctx.fillStyle = '#00FF41';
          ctx.shadowColor = 'transparent';
          ctx.shadowBlur = 0;
        }

        ctx.fillText(char, x, y);
        ctx.shadowBlur = 0;

        // Reset column when it goes off screen, with randomness
        if (y > canvas.height && Math.random() > 0.975) {
          columns[i] = 0;
          columnSpeeds[i] = 0.5 + Math.random() * 1.5;
        }

        columns[i] += columnSpeeds[i];
      }
    };

    animFrameId = requestAnimationFrame(draw);

    // Pause when tab is hidden
    const handleVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(animFrameId);
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
    };
  }, []);

  return <canvas ref={canvasRef} className="matrix-rain" />;
};

export default MatrixRain;
