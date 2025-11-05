import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

interface ScrollAnimationsProps {
  children: React.ReactNode;
  animationType?: 'fade' | 'slide-up' | 'slide-down' | 'slide-left' | 'slide-right' | 'scale' | 'rotate';
  delay?: number;
  duration?: number;
  stagger?: number;
  className?: string;
  trigger?: string;
  start?: string;
  end?: string;
  scrub?: boolean | number;
}

const ScrollAnimations: React.FC<ScrollAnimationsProps> = ({
  children,
  animationType = 'fade',
  delay = 0,
  duration = 1,
  stagger = 0,
  className = '',
  trigger = 'top 80%',
  start = 'top 80%',
  end = 'bottom 20%',
  scrub = false
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    // Get all child elements
    const elements = containerRef.current.children;
    
    // Set initial state based on animation type
    const initialStates: Record<string, gsap.TweenVars> = {
      'fade': { opacity: 0 },
      'slide-up': { opacity: 0, y: 50 },
      'slide-down': { opacity: 0, y: -50 },
      'slide-left': { opacity: 0, x: 50 },
      'slide-right': { opacity: 0, x: -50 },
      'scale': { opacity: 0, scale: 0.8 },
      'rotate': { opacity: 0, rotation: 15 }
    };
    
    // Set initial state
    gsap.set(elements, initialStates[animationType]);
    
    // Create animation
    const animation = gsap.to(elements, {
      opacity: 1,
      y: 0,
      x: 0,
      scale: 1,
      rotation: 0,
      duration: duration,
      delay: delay,
      stagger: stagger,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: containerRef.current,
        start: start,
        end: end,
        scrub: scrub,
        toggleActions: 'play none none reverse'
      }
    });
    
    // Cleanup
    return () => {
      animation.kill();
    };
  }, [animationType, delay, duration, stagger, start, end, scrub]);
  
  return (
    <div 
      ref={containerRef} 
      className={`scroll-animation ${className}`}
    >
      {children}
    </div>
  );
};

export default ScrollAnimations; 