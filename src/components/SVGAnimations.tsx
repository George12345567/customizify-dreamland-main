import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface SVGAnimationsProps {
  svgPath: string;
  width?: number;
  height?: number;
  color?: string;
  strokeWidth?: number;
  duration?: number;
  delay?: number;
  className?: string;
  onAnimationComplete?: () => void;
}

const SVGAnimations: React.FC<SVGAnimationsProps> = ({
  svgPath,
  width = 100,
  height = 100,
  color = '#8B5CF6',
  strokeWidth = 2,
  duration = 2,
  delay = 0,
  className = '',
  onAnimationComplete
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  
  useEffect(() => {
    if (!pathRef.current) return;
    
    // Get the path length
    const pathLength = pathRef.current.getTotalLength();
    
    // Set initial state
    gsap.set(pathRef.current, {
      strokeDasharray: pathLength,
      strokeDashoffset: pathLength,
      stroke: color,
      strokeWidth: strokeWidth,
      fill: 'none'
    });
    
    // Create animation
    const animation = gsap.to(pathRef.current, {
      strokeDashoffset: 0,
      duration: duration,
      delay: delay,
      ease: 'power2.inOut',
      onComplete: () => {
        // Fill the path after drawing
        gsap.to(pathRef.current, {
          fill: color,
          duration: 0.5,
          ease: 'power2.inOut',
          onComplete: onAnimationComplete
        });
      }
    });
    
    // Cleanup
    return () => {
      animation.kill();
    };
  }, [svgPath, color, strokeWidth, duration, delay, onAnimationComplete]);
  
  return (
    <svg
      ref={svgRef}
      width={width}
      height={height}
      viewBox="0 0 100 100"
      className={`svg-path ${className}`}
    >
      <path
        ref={pathRef}
        d={svgPath}
      />
    </svg>
  );
};

export default SVGAnimations; 