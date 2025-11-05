import React, { useRef, useState } from 'react';
import { gsap } from 'gsap';

interface AnimatedButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  disabled?: boolean;
  fullWidth?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  animationType?: 'scale' | 'glow' | 'ripple' | 'bounce';
}

const AnimatedButton: React.FC<AnimatedButtonProps> = ({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
  fullWidth = false,
  icon,
  iconPosition = 'left',
  animationType = 'scale'
}) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const rippleRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  
  // Button styles based on variant
  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return {
          backgroundColor: '#8B5CF6',
          color: 'white',
          border: 'none'
        };
      case 'secondary':
        return {
          backgroundColor: '#0EA5E9',
          color: 'white',
          border: 'none'
        };
      case 'outline':
        return {
          backgroundColor: 'transparent',
          color: '#8B5CF6',
          border: '2px solid #8B5CF6'
        };
      case 'ghost':
        return {
          backgroundColor: 'transparent',
          color: '#8B5CF6',
          border: 'none'
        };
      default:
        return {
          backgroundColor: '#8B5CF6',
          color: 'white',
          border: 'none'
        };
    }
  };
  
  // Button size styles
  const getSizeStyles = () => {
    switch (size) {
      case 'sm':
        return {
          padding: '0.5rem 1rem',
          fontSize: '0.875rem'
        };
      case 'md':
        return {
          padding: '0.75rem 1.5rem',
          fontSize: '1rem'
        };
      case 'lg':
        return {
          padding: '1rem 2rem',
          fontSize: '1.125rem'
        };
      default:
        return {
          padding: '0.75rem 1.5rem',
          fontSize: '1rem'
        };
    }
  };
  
  // Handle hover animation
  const handleMouseEnter = () => {
    if (disabled || !buttonRef.current) return;
    
    setIsHovered(true);
    
    switch (animationType) {
      case 'scale':
        gsap.to(buttonRef.current, {
          scale: 1.05,
          duration: 0.3,
          ease: 'power2.out'
        });
        break;
      case 'glow':
        gsap.to(buttonRef.current, {
          boxShadow: '0 0 15px rgba(139, 92, 246, 0.5)',
          duration: 0.3,
          ease: 'power2.out'
        });
        break;
      case 'bounce':
        gsap.to(buttonRef.current, {
          y: -5,
          duration: 0.3,
          ease: 'power2.out',
          yoyo: true,
          repeat: 1
        });
        break;
      default:
        break;
    }
  };
  
  // Handle leave animation
  const handleMouseLeave = () => {
    if (disabled || !buttonRef.current) return;
    
    setIsHovered(false);
    
    switch (animationType) {
      case 'scale':
        gsap.to(buttonRef.current, {
          scale: 1,
          duration: 0.3,
          ease: 'power2.out'
        });
        break;
      case 'glow':
        gsap.to(buttonRef.current, {
          boxShadow: 'none',
          duration: 0.3,
          ease: 'power2.out'
        });
        break;
      case 'bounce':
        gsap.to(buttonRef.current, {
          y: 0,
          duration: 0.3,
          ease: 'power2.out'
        });
        break;
      default:
        break;
    }
  };
  
  // Handle click animation
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled) return;
    
    // Create ripple effect
    if (animationType === 'ripple' && buttonRef.current) {
      const button = buttonRef.current;
      const rect = button.getBoundingClientRect();
      
      const ripple = document.createElement('div');
      ripple.className = 'ripple';
      ripple.style.position = 'absolute';
      ripple.style.width = '10px';
      ripple.style.height = '10px';
      ripple.style.borderRadius = '50%';
      ripple.style.backgroundColor = 'rgba(255, 255, 255, 0.5)';
      ripple.style.left = `${e.clientX - rect.left}px`;
      ripple.style.top = `${e.clientY - rect.top}px`;
      ripple.style.transform = 'translate(-50%, -50%)';
      ripple.style.pointerEvents = 'none';
      
      button.appendChild(ripple);
      
      gsap.to(ripple, {
        width: '200px',
        height: '200px',
        opacity: 0,
        duration: 0.6,
        ease: 'power2.out',
        onComplete: () => {
          button.removeChild(ripple);
        }
      });
    }
    
    // Call onClick handler
    if (onClick) onClick();
  };
  
  // Combine styles
  const buttonStyles = {
    ...getVariantStyles(),
    ...getSizeStyles(),
    width: fullWidth ? '100%' : 'auto',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '0.5rem',
    fontWeight: 600,
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.6 : 1,
    transition: 'all 0.3s ease',
    position: 'relative' as const,
    overflow: 'hidden'
  };
  
  return (
    <button
      ref={buttonRef}
      className={`animated-button ${className}`}
      style={buttonStyles}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      disabled={disabled}
    >
      {icon && iconPosition === 'left' && (
        <span className="button-icon button-icon-left">{icon}</span>
      )}
      <span className="button-text">{children}</span>
      {icon && iconPosition === 'right' && (
        <span className="button-icon button-icon-right">{icon}</span>
      )}
      <div ref={rippleRef} className="ripple-container" />
    </button>
  );
};

export default AnimatedButton; 