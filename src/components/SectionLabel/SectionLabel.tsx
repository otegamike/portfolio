import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import type { Variants } from 'framer-motion';

interface SectionLabelProps {
  children: string;
  className?: string;
  variants?: Variants;
  speed?: number; // Added speed control
}

const SectionLabel: React.FC<SectionLabelProps> = ({ 
  children, 
  className = "section-label", 
  variants,
  speed = 100 
}) => {
  const ref = useRef<HTMLSpanElement>(null);
  // Added 'amount' to ensure it triggers when 10% is visible
  const isInView = useInView(ref, { once: true, margin: "-10% 0px -10% 0px" });
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    if (isInView) {
      const textToType = String(children).trim();
      let currentIndex = 0;

      const type = () => {
        if (currentIndex <= textToType.length) {
          setDisplayedText(textToType.slice(0, currentIndex));
          currentIndex++;
          timeoutId = setTimeout(type, speed);
        }
      };

      let timeoutId = setTimeout(type, speed);

      return () => clearTimeout(timeoutId);
    }
  }, [isInView, children, speed]);

  return (
    <motion.span
      ref={ref}
      className={className}
      variants={variants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      style={{ 
        display: 'inline-block', 
        minHeight: '1em', // Prevents height collapse
        minWidth: '1px'   // Ensures it's detectable
      }}
    >
      {displayedText}
    </motion.span>
  );
};

export default SectionLabel;