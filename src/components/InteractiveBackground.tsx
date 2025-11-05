import React, { useEffect, useRef } from 'react';
import p5 from 'p5';

interface InteractiveBackgroundProps {
  containerId: string;
  colorScheme?: string[];
  particleCount?: number;
  interactionRadius?: number;
}

const InteractiveBackground: React.FC<InteractiveBackgroundProps> = ({
  containerId,
  colorScheme = ['#8B5CF6', '#0EA5E9', '#D946EF', '#F97316', '#22C55E'],
  particleCount = 50,
  interactionRadius = 100
}) => {
  const p5InstanceRef = useRef<p5 | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  
  useEffect(() => {
    // Find the container element
    const container = document.getElementById(containerId);
    if (!container) {
      console.error(`Container with id "${containerId}" not found`);
      return;
    }
    
    containerRef.current = container;
    
    // Create p5 instance
    const sketch = (p: p5) => {
      // Particle class
      class Particle {
        pos: p5.Vector;
        vel: p5.Vector;
        acc: p5.Vector;
        size: number;
        color: p5.Color;
        maxSpeed: number;
        maxForce: number;
        
        constructor() {
          this.pos = p.createVector(p.random(p.width), p.random(p.height));
          this.vel = p.createVector(0, 0);
          this.acc = p.createVector(0, 0);
          this.size = p.random(3, 8);
          this.color = p.color(p.random(colorScheme));
          this.maxSpeed = 2;
          this.maxForce = 0.1;
        }
        
        applyForce(force: p5.Vector) {
          this.acc.add(force);
        }
        
        update() {
          // Update velocity and position
          this.vel.add(this.acc);
          this.vel.limit(this.maxSpeed);
          this.pos.add(this.vel);
          this.acc.mult(0);
          
          // Wrap around edges
          this.edges();
        }
        
        edges() {
          if (this.pos.x < 0) this.pos.x = p.width;
          if (this.pos.x > p.width) this.pos.x = 0;
          if (this.pos.y < 0) this.pos.y = p.height;
          if (this.pos.y > p.height) this.pos.y = 0;
        }
        
        display() {
          p.noStroke();
          p.fill(this.color);
          p.ellipse(this.pos.x, this.pos.y, this.size);
        }
        
        // Seek a target
        seek(target: p5.Vector) {
          const desired = p5.Vector.sub(target, this.pos);
          const d = desired.mag();
          
          // Scale based on distance
          let speed = this.maxSpeed;
          if (d < interactionRadius) {
            speed = p.map(d, 0, interactionRadius, 0, this.maxSpeed);
          }
          
          desired.setMag(speed);
          const steer = p5.Vector.sub(desired, this.vel);
          steer.limit(this.maxForce);
          
          return steer;
        }
      }
      
      // Create particles
      const particles: Particle[] = [];
      let mousePos: p5.Vector;
      
      p.setup = () => {
        // Create canvas
        const canvas = p.createCanvas(container.clientWidth, container.clientHeight);
        canvas.parent(containerId);
        
        // Create particles
        for (let i = 0; i < particleCount; i++) {
          particles.push(new Particle());
        }
        
        // Initialize mouse position
        mousePos = p.createVector(p.width / 2, p.height / 2);
      };
      
      p.draw = () => {
        // Set background with slight transparency for trail effect
        p.background(20, 20, 30, 10);
        
        // Update mouse position
        mousePos.x = p.mouseX;
        mousePos.y = p.mouseY;
        
        // Update and display particles
        for (let i = 0; i < particles.length; i++) {
          const particle = particles[i];
          
          // Apply forces
          const seekForce = particle.seek(mousePos);
          particle.applyForce(seekForce);
          
          // Update and display
          particle.update();
          particle.display();
        }
      };
      
      p.windowResized = () => {
        if (containerRef.current) {
          p.resizeCanvas(containerRef.current.clientWidth, containerRef.current.clientHeight);
        }
      };
    };
    
    // Create p5 instance
    p5InstanceRef.current = new p5(sketch);
    
    // Cleanup
    return () => {
      if (p5InstanceRef.current) {
        p5InstanceRef.current.remove();
        p5InstanceRef.current = null;
      }
    };
  }, [containerId, colorScheme, particleCount, interactionRadius]);
  
  return null; // This component doesn't render anything directly
};

export default InteractiveBackground; 