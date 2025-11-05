import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface CustomCursorProps {
  color?: string;
  size?: number;
  trailCount?: number;
  trailDelay?: number;
  trailDuration?: number;
  className?: string;
}

const CustomCursor: React.FC<CustomCursorProps> = ({
  color = 'rgba(139, 92, 246, 0.5)',
  size = 20,
  trailCount = 5,
  trailDelay = 0.05,
  trailDuration = 0.3,
  className = ''
}) => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const trailRefs = useRef<HTMLDivElement[]>([]);
  
  useEffect(() => {
    if (!cursorRef.current) return;
    
    // Create trail elements
    const trails: HTMLDivElement[] = [];
    for (let i = 0; i < trailCount; i++) {
      const trail = document.createElement('div');
      trail.className = `cursor-trail ${className}`;
      trail.style.position = 'fixed';
      trail.style.width = `${size * (1 - i / trailCount)}px`;
      trail.style.height = `${size * (1 - i / trailCount)}px`;
      trail.style.borderRadius = '50%';
      trail.style.backgroundColor = color;
      trail.style.pointerEvents = 'none';
      trail.style.zIndex = '9999';
      trail.style.opacity = `${1 - i / trailCount}`;
      trail.style.transition = `all ${trailDuration}s ease-out`;
      document.body.appendChild(trail);
      trails.push(trail);
    }
    
    trailRefs.current = trails;
    
    // Track mouse position
    let mouseX = 0;
    let mouseY = 0;
    
    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      
      // Update cursor position
      if (cursorRef.current) {
        gsap.to(cursorRef.current, {
          x: mouseX - size / 2,
          y: mouseY - size / 2,
          duration: 0.1,
          ease: 'power2.out'
        });
      }
      
      // Update trail positions with delay
      trails.forEach((trail, index) => {
        gsap.to(trail, {
          x: mouseX - (size * (1 - index / trailCount)) / 2,
          y: mouseY - (size * (1 - index / trailCount)) / 2,
          duration: trailDuration,
          delay: index * trailDelay,
          ease: 'power2.out'
        });
      });
    };
    
    // Hide default cursor
    document.body.style.cursor = 'none';
    
    // Add event listener
    window.addEventListener('mousemove', handleMouseMove);
    
    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.body.style.cursor = '';
      
      // Remove trail elements
      trails.forEach(trail => {
        document.body.removeChild(trail);
      });
    };
  }, [color, size, trailCount, trailDelay, trailDuration, className]);
  
  return (
    <div
      ref={cursorRef}
      className={`custom-cursor ${className}`}
      style={{
        position: 'fixed',
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: '50%',
        backgroundColor: color,
        pointerEvents: 'none',
        zIndex: 10000,
        mixBlendMode: 'difference',
        transition: 'transform 0.2s ease'
      }}
    />
  );
};

export default CustomCursor; 