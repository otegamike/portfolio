import React, { useState, useEffect } from 'react';
import useIntersectionObserver from '../../hooks/useIntersectionObserver';

interface SectionLabelProps {
  children: string;
  className?: string;
  speed?: number;
  infinite?: boolean;
}

const SectionLabel: React.FC<SectionLabelProps> = ({ 
  children, 
  className = "section-label", 
  speed = 100,
  infinite = false
}) => {
  const { ref, isInView } = useIntersectionObserver<HTMLSpanElement>({ rootMargin: "-10% 0px -10% 0px" });
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    if (isInView) {
      const textToType = String(children).trim();
      let currentIndex = 0;

      const type = () => {
        if (currentIndex <= textToType.length) {
          setDisplayedText(textToType.slice(0, currentIndex));
          currentIndex++;
          if (infinite && currentIndex === textToType.length) currentIndex = 0;
          timeoutId = setTimeout(type, speed);
        }
      };

      let timeoutId = setTimeout(type, speed);

      return () => clearTimeout(timeoutId);
    }
  }, [isInView, children, speed]);

  return (
    <span
      ref={ref}
      className={className}
      style={{ 
        display: 'inline-block', 
        minHeight: '1em',
        minWidth: '1px'
      }}
    >
      {displayedText}
    </span>
  );
};

export default SectionLabel;
