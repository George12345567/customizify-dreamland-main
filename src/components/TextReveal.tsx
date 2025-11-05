import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface TextRevealProps {
  text: string;
  delay?: number;
  duration?: number;
  color?: string;
  fontSize?: string;
  fontWeight?: string;
  className?: string;
  onComplete?: () => void;
}

const TextReveal: React.FC<TextRevealProps> = ({
  text,
  delay = 0,
  duration = 1,
  color = '#8B5CF6',
  fontSize = '1.5rem',
  fontWeight = 'bold',
  className = '',
  onComplete
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const maskRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!containerRef.current || !textRef.current || !maskRef.current) return;
    
    // Set initial state
    gsap.set(maskRef.current, {
      width: '0%',
      x: '0%'
    });
    
    // Create animation
    const animation = gsap.timeline({
      delay: delay,
      onComplete: onComplete
    });
    
    // Reveal text
    animation.to(maskRef.current, {
      width: '100%',
      duration: duration,
      ease: 'power2.inOut'
    });
    
    // Cleanup
    return () => {
      animation.kill();
    };
  }, [delay, duration, onComplete]);
  
  return (
    <div 
      ref={containerRef} 
      className={`text-reveal-container ${className}`}
      style={{
        position: 'relative',
        overflow: 'hidden',
        display: 'inline-block'
      }}
    >
      <div
        ref={textRef}
        className="text-reveal-text"
        style={{
          color: color,
          fontSize: fontSize,
          fontWeight: fontWeight,
          position: 'relative',
          zIndex: 1
        }}
      >
        {text}
      </div>
      <div
        ref={maskRef}
        className="text-reveal-mask"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          height: '100%',
          backgroundColor: color,
          zIndex: 2
        }}
      />
    </div>
  );
};

export default TextReveal; 