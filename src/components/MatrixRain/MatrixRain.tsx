import React, { useEffect, useState, useRef, useMemo } from 'react';

const FONT_SIZE = 12;
const COL_WIDTH = 20;

const SKILL_STRINGS = [
  'JavaScript',
  'TypeScript',
  'React',
  'Next.js',
  'Node.js',
  'Fullstack Dev',
  'Frontend Eng',
  'Backend Eng',
  'API Engineering',
  'REST APIs',
  'MongoDB',
  'Express.js',
  'Framer Motion',
  'Vite',
  'CSS Grid',
  'Flexbox',
  'HTML5',
  'CSS3',
  'Git',
  'Vercel',
  'Netlify',
  'Cloudinary',
  'Zustand',
  'React Query',
  'Redux',
  'Chart.js',
  'Mongoose',
  'Clerk Auth',
  'Google Gemini',
  'Groq SDK',
  'AI Integration',
  'PDF Generation',
  'Responsive Design',
  'UI Architecture',
  'Component Systems',
  'State Management',
  'Web Accessibility',
  'Database Design',
  'CRUD Systems',
  'Auth Systems',
  'Form Handling',
  'Dynamic UI',
  'Drag & Drop',
  'Micro-interactions',
  'Schema Design',
  'Search & Filter',
  'Data Visualization',
  'Debounced Input',
  'Pagination',
  'Error Boundaries',
  'Code Splitting',
  'Lazy Loading',
  'SEO Optimization',
  'CI/CD Pipelines',
  'GitHub Actions',
  'DOM Manipulation',
  'Browser APIs',
  'Async JavaScript',
  'ES6+',
  'UI Engineering',
  'UX-focused Dev',
  'Product Thinking',
  'Creative Coding',
  'Scalable Systems',
  'Code Optimization',
  'Software Debugging',
  'Clean Architecture',
  'Type Safety',
  'Clean Code',
  'Component Architecture',
  'Modern Web Apps',
  'useEffect',
  'useState',
  'useRef',
  'useMemo',
  'useCallback',
  'useContext',
  'useReducer',
  'async/await',
  'Promise',
  '.map()',
  '.filter()',
  '.reduce()',
  'fetch()',
  'WebSockets',
  '.tsx',
  '.ts',
  'tsconfig.json',
  'package.json',
  'npm run dev',
  'next build',
  'git commit',
  'vercel deploy',
  'Web Performance',
];

// Build a per-column sequence of characters drawn from SKILL_STRINGS.
// Each string's characters are pushed one-by-one, with blank slots between
// strings so words are visually separated as they fall through the column.
const buildColumnSequence = (): string[] => {
  const result: string[] = [];
  for (let i = 0; i < 60; i++) {
    const str = SKILL_STRINGS[Math.floor(Math.random() * SKILL_STRINGS.length)];
    for (const ch of str) result.push(ch);
    const gap = 2 + Math.floor(Math.random() * 4);
    for (let g = 0; g < gap; g++) result.push('');
  }
  return result;
};

// --- CSS Version for Mobile (Performant) ---
// Mirrors the desktop grid: columns are evenly spaced at COL_WIDTH px intervals,
// fall speed is slow enough that skill strings are readable, and content per
// column is kept short so the loop gap is not jarring.
const MatrixRainMobile: React.FC = () => {
  // Derive column count from the actual viewport width so the grid always
  // fills the screen exactly, just like the canvas version does.
  const [columnCount, setColumnCount] = useState(() =>
    Math.floor(window.innerWidth / COL_WIDTH)
  );

  useEffect(() => {
    const update = () => setColumnCount(Math.floor(window.innerWidth / COL_WIDTH));
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  const columns = useMemo(() => {
    return Array.from({ length: columnCount }).map((_, i) => {
      // 5–7 skill strings per column keeps the falling block short enough
      // that the animation speed feels calm and readable.
      const stringCount = 5 + Math.floor(Math.random() * 3);
      const strings = Array.from({ length: stringCount }, () =>
        SKILL_STRINGS[Math.floor(Math.random() * SKILL_STRINGS.length)]
      );

      // One character per line, with 4–6 blank lines between strings.
      // This matches how the canvas version spaces characters vertically.
      const chars = strings
        .flatMap(str => [
          ...str.split(''),
          ...Array(4 + Math.floor(Math.random() * 3)).fill(''),
        ])
        .join('\n');

      // Slow fall: 22–38 s for one full pass so strings are legible.
      // Stagger delays evenly across columns (like the canvas seqPos stagger)
      // then add a small random offset so they don't all move in lockstep.
      const duration = 12 + Math.random() * 20;
      const baseDelay = -(i / columnCount) * duration;
      const jitter = Math.random() * -4;
      const opacity = 0.1 + Math.random() * 0.5;

      return {
        chars,
        duration,
        delay: baseDelay + jitter,
        // Fixed pixel position — same formula as the canvas: i * COL_WIDTH
        left: i * COL_WIDTH,
        opacity,
      };
    });
  }, [columnCount]);

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        background: '#050505',
        overflow: 'hidden',
        userSelect: 'none',
        pointerEvents: 'none',
        zIndex: -1,
      }}
    >
      <style>
        {`
          @keyframes matrixFall {
            0%   { transform: translateY(-100%); }
            100% { transform: translateY(100vh);  }
          }
          .matrix-column {
            position: absolute;
            top: 0;
            color: #00FF41;
            font-family: 'Share Tech Mono', monospace;
            font-size: ${FONT_SIZE}px;
            line-height: ${FONT_SIZE + 1}px;
            white-space: pre;
            text-shadow: 0 0 6px #00FF41;
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
            opacity: col.opacity,
          }}
        >
          {col.chars}
        </div>
      ))}
    </div>
  );
};

// --- Canvas Version for Desktop (Optimized) ---
const MatrixRainCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    let animFrameId = 0;
    // y position of each column's head, in rows
    let columns: number[] = [];
    // fall speed per column, in rows/frame
    let columnSpeeds: number[] = [];
    // per-column character sequences built from SKILL_STRINGS
    let colCharSeqs: string[][] = [];
    // fractional sequence position (advances at same rate as column speed)
    let colSeqPos: number[] = [];

    let lastTime = 0;
    const interval = 1000 / 30;
    let cachedWidth = 0;
    let cachedHeight = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      cachedWidth = window.innerWidth;
      cachedHeight = window.innerHeight;
      canvas.width = cachedWidth * dpr;
      canvas.height = cachedHeight * dpr;
      canvas.style.width = `${cachedWidth}px`;
      canvas.style.height = `${cachedHeight}px`;
      ctx.scale(dpr, dpr);

      const colCount = Math.floor(cachedWidth / COL_WIDTH);
      columns = Array(colCount)
        .fill(0)
        .map(() => Math.random() * -100);
      columnSpeeds = Array(colCount)
        .fill(0)
        .map(() => 0.5 + Math.random() * 1.5);
      colCharSeqs = Array(colCount)
        .fill(0)
        .map(() => buildColumnSequence());
      // Stagger start positions through each column's sequence
      colSeqPos = Array(colCount)
        .fill(0)
        .map((_, i) => Math.floor((i / colCount) * 200 + Math.random() * 50));
    };

    const draw = (timestamp: number) => {
      animFrameId = requestAnimationFrame(draw);
      if (timestamp - lastTime < interval) return;
      lastTime = timestamp;

      // Partial clear — creates the trailing fade effect
      ctx.fillStyle = 'rgba(5, 5, 5, 0.15)';
      ctx.fillRect(0, 0, cachedWidth, cachedHeight);

      ctx.font = `${FONT_SIZE}px 'Share Tech Mono', monospace`;
      ctx.textBaseline = 'top';

      for (let i = 0; i < columns.length; i++) {
        const x = i * COL_WIDTH;
        const y = columns[i] * FONT_SIZE;

        // Advance sequence at the same rate as the column falls so character
        // density stays consistent regardless of fall speed
        colSeqPos[i] += columnSpeeds[i];
        const seq = colCharSeqs[i];
        const pos = Math.floor(colSeqPos[i]) % seq.length;
        const char = seq[pos];

        if (char) {
          // Head character: occasional bright white flash, otherwise green
          ctx.fillStyle = Math.random() > 0.96 ? '#ccffdd' : '#00FF41';
          ctx.fillText(char, x, y);
        }

        // Reset the column once it has scrolled past the bottom
        if (y > cachedHeight && Math.random() > 0.98) {
          columns[i] = 0;
        }
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

  return (
    <canvas
      ref={canvasRef}
      style={{
        display: 'block',
        position: 'absolute',
        inset: 0,
        background: '#050505',
        zIndex: -1,
      }}
    />
  );
};

// --- Main Switcher Component ---
const MatrixRain: React.FC = () => {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    // Reduced-motion check — read once and stay in sync with OS preference changes
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mq.matches);
    const onMqChange = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mq.addEventListener('change', onMqChange);
    return () => mq.removeEventListener('change', onMqChange);
  }, []);

  useEffect(() => {
    const checkMobile = () => {
      const mobileUA =
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        );
      const mobileWidth = window.innerWidth < 768;
      setIsMobile(mobileUA || mobileWidth);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Respect the OS/browser accessibility setting — show a plain dark
  // background with no animation instead of nothing at all.
  if (prefersReducedMotion)
    return <div style={{ background: '#050505', position: 'absolute', inset: 0, zIndex: -1 }} />;

  if (isMobile === null)
    return <div style={{ background: '#050505', position: 'absolute', inset: 0, zIndex: -1 }} />;

  return isMobile ? <MatrixRainMobile /> : <MatrixRainCanvas />;
};

export default MatrixRain;
