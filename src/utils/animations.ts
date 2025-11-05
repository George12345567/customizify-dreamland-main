import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import * as THREE from 'three';
import p5 from 'p5';
import Matter from 'matter-js';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// CSS Motion Path Animation
export const createMotionPathAnimation = (element: HTMLElement, path: string) => {
  // Check if the browser supports motion-path
  if (CSS.supports('offset-path', 'path("M0,0 L100,100")')) {
    element.style.offsetPath = `path("${path}")`;
    element.style.offsetRotate = '0deg';
    
    const animation = element.animate(
      [
        { offsetDistance: '0%' },
        { offsetDistance: '100%' }
      ],
      {
        duration: 3000,
        iterations: Infinity,
        easing: 'ease-in-out'
      }
    );
    
    return animation;
  }
  
  // Fallback for browsers that don't support motion-path
  console.warn('Motion path not supported in this browser');
  return null;
};

// Scroll-Driven Animations with GSAP
export const initScrollAnimations = () => {
  // Fade in elements on scroll
  gsap.utils.toArray('.fade-in-on-scroll').forEach((element: any) => {
    gsap.from(element, {
      opacity: 0,
      y: 50,
      duration: 1,
      scrollTrigger: {
        trigger: element,
        start: 'top 80%',
        toggleActions: 'play none none reverse'
      }
    });
  });
  
  // Parallax effect
  gsap.utils.toArray('.parallax').forEach((element: any) => {
    gsap.to(element, {
      yPercent: 30,
      ease: 'none',
      scrollTrigger: {
        trigger: element,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true
      }
    });
  });
  
  // Stagger animations for lists
  gsap.utils.toArray('.stagger-list').forEach((container: any) => {
    const items = container.querySelectorAll('.stagger-item');
    gsap.from(items, {
      opacity: 0,
      y: 20,
      duration: 0.5,
      stagger: 0.1,
      scrollTrigger: {
        trigger: container,
        start: 'top 80%'
      }
    });
  });
};

// Houdini API - Custom Properties
export const registerCustomProperties = () => {
  if (CSS.registerProperty) {
    // Register a custom property for gradient animation
    CSS.registerProperty({
      name: '--gradient-angle',
      syntax: '<angle>',
      inherits: false,
      initialValue: '0deg'
    });
    
    // Register a custom property for blur animation
    CSS.registerProperty({
      name: '--blur-amount',
      syntax: '<length>',
      inherits: false,
      initialValue: '0px'
    });
  }
};

// GSAP Animations
export const initGSAPAnimations = () => {
  // Button hover animations
  gsap.utils.toArray('.hover-scale').forEach((button: any) => {
    button.addEventListener('mouseenter', () => {
      gsap.to(button, {
        scale: 1.05,
        duration: 0.3,
        ease: 'power2.out'
      });
    });
    
    button.addEventListener('mouseleave', () => {
      gsap.to(button, {
        scale: 1,
        duration: 0.3,
        ease: 'power2.out'
      });
    });
  });
  
  // Modal animations
  gsap.utils.toArray('.modal').forEach((modal: any) => {
    const openBtn = document.querySelector(`[data-modal="${modal.id}"]`);
    const closeBtn = modal.querySelector('.modal-close');
    
    if (openBtn) {
      openBtn.addEventListener('click', () => {
        gsap.to(modal, {
          opacity: 1,
          scale: 1,
          duration: 0.5,
          ease: 'back.out(1.7)',
          display: 'flex'
        });
      });
    }
    
    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        gsap.to(modal, {
          opacity: 0,
          scale: 0.9,
          duration: 0.3,
          ease: 'power2.in',
          onComplete: () => {
            modal.style.display = 'none';
          }
        });
      });
    }
  });
};

// Three.js 3D Model
export const initThreeJSModel = (containerId: string) => {
  const container = document.getElementById(containerId);
  if (!container) return null;
  
  // Create scene
  const scene = new THREE.Scene();
  
  // Create camera
  const camera = new THREE.PerspectiveCamera(
    75,
    container.clientWidth / container.clientHeight,
    0.1,
    1000
  );
  camera.position.z = 5;
  
  // Create renderer
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  container.appendChild(renderer.domElement);
  
  // Add lights
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);
  
  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
  directionalLight.position.set(0, 1, 1);
  scene.add(directionalLight);
  
  // Create a simple hoodie model (placeholder)
  const geometry = new THREE.BoxGeometry(2, 2, 0.5);
  const material = new THREE.MeshPhongMaterial({ 
    color: 0x8B5CF6,
    shininess: 30
  });
  const hoodie = new THREE.Mesh(geometry, material);
  scene.add(hoodie);
  
  // Animation loop
  const animate = () => {
    requestAnimationFrame(animate);
    
    hoodie.rotation.y += 0.01;
    
    renderer.render(scene, camera);
  };
  
  animate();
  
  // Handle window resize
  window.addEventListener('resize', () => {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
  });
  
  return {
    scene,
    camera,
    renderer,
    hoodie,
    animate
  };
};

// Web Animations API
export const createWebAnimation = (element: HTMLElement, keyframes: Keyframe[], options: KeyframeAnimationOptions) => {
  return element.animate(keyframes, options);
};

// SVG Animations with GSAP
export const initSVGAnimations = () => {
  // Animate SVG paths
  gsap.utils.toArray('.svg-path').forEach((svg: any) => {
    const paths = svg.querySelectorAll('path');
    
    gsap.from(paths, {
      strokeDasharray: 1000,
      strokeDashoffset: 1000,
      duration: 2,
      ease: 'power2.out',
      stagger: 0.1,
      scrollTrigger: {
        trigger: svg,
        start: 'top 80%'
      }
    });
  });
  
  // Animate SVG icons
  gsap.utils.toArray('.svg-icon').forEach((icon: any) => {
    icon.addEventListener('mouseenter', () => {
      gsap.to(icon, {
        scale: 1.2,
        rotation: 15,
        duration: 0.3,
        ease: 'back.out(1.7)'
      });
    });
    
    icon.addEventListener('mouseleave', () => {
      gsap.to(icon, {
        scale: 1,
        rotation: 0,
        duration: 0.3,
        ease: 'power2.out'
      });
    });
  });
};

// p5.js Interactive Background
export const initP5Background = (containerId: string) => {
  const container = document.getElementById(containerId);
  if (!container) return null;
  
  const sketch = (p: p5) => {
    const particles: Particle[] = [];
    const numParticles = 50;
    
    p.setup = () => {
      p.createCanvas(container.clientWidth, container.clientHeight);
      
      // Create particles
      for (let i = 0; i < numParticles; i++) {
        particles.push(new Particle(p));
      }
    };
    
    p.draw = () => {
      p.background(20, 20, 30, 10);
      
      // Update and display particles
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].display();
      }
    };
    
    p.windowResized = () => {
      p.resizeCanvas(container.clientWidth, container.clientHeight);
    };
    
    // Particle class
    class Particle {
      pos: p5.Vector;
      vel: p5.Vector;
      acc: p5.Vector;
      size: number;
      color: p5.Color;
      p: p5;
      
      constructor(p: p5) {
        this.p = p;
        this.pos = p.createVector(p.random(p.width), p.random(p.height));
        this.vel = p.createVector(p.random(-1, 1), p.random(-1, 1));
        this.acc = p.createVector(0, 0);
        this.size = p.random(3, 8);
        this.color = p.color(p.random(100, 255), p.random(100, 255), p.random(100, 255), 150);
      }
      
      update() {
        // Add some randomness to movement
        this.acc.x = p.random(-0.1, 0.1);
        this.acc.y = p.random(-0.1, 0.1);
        
        this.vel.add(this.acc);
        this.vel.limit(2);
        this.pos.add(this.vel);
        
        // Wrap around edges
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
    }
  };
  
  return new p5(sketch, container);
};

// Matter.js Physics
export const initMatterPhysics = (containerId: string) => {
  const container = document.getElementById(containerId);
  if (!container) return null;
  
  // Create engine
  const engine = Matter.Engine.create();
  const world = engine.world;
  
  // Create renderer
  const render = Matter.Render.create({
    element: container,
    engine: engine,
    options: {
      width: container.clientWidth,
      height: container.clientHeight,
      wireframes: false,
      background: 'transparent'
    }
  });
  
  // Create boundaries
  const ground = Matter.Bodies.rectangle(
    container.clientWidth / 2,
    container.clientHeight + 30,
    container.clientWidth,
    60,
    { isStatic: true, render: { fillStyle: 'transparent' } }
  );
  
  const leftWall = Matter.Bodies.rectangle(
    -30,
    container.clientHeight / 2,
    60,
    container.clientHeight,
    { isStatic: true, render: { fillStyle: 'transparent' } }
  );
  
  const rightWall = Matter.Bodies.rectangle(
    container.clientWidth + 30,
    container.clientHeight / 2,
    60,
    container.clientHeight,
    { isStatic: true, render: { fillStyle: 'transparent' } }
  );
  
  Matter.World.add(world, [ground, leftWall, rightWall]);
  
  // Create draggable items
  const items: Matter.Body[] = [];
  const colors = ['#8B5CF6', '#0EA5E9', '#D946EF', '#F97316', '#22C55E'];
  
  for (let i = 0; i < 5; i++) {
    const item = Matter.Bodies.circle(
      Matter.Common.random(100, container.clientWidth - 100),
      Matter.Common.random(100, 300),
      30,
      {
        restitution: 0.8,
        friction: 0.005,
        render: {
          fillStyle: colors[i % colors.length]
        }
      }
    );
    
    items.push(item);
  }
  
  Matter.World.add(world, items);
  
  // Add mouse control
  const mouse = Matter.Mouse.create(render.canvas);
  const mouseConstraint = Matter.MouseConstraint.create(engine, {
    mouse: mouse,
    constraint: {
      stiffness: 0.2,
      render: {
        visible: false
      }
    }
  });
  
  Matter.World.add(world, mouseConstraint);
  render.mouse = mouse;
  
  // Run engine and renderer
  Matter.Runner.run(engine);
  Matter.Render.run(render);
  
  // Handle window resize
  window.addEventListener('resize', () => {
    render.options.width = container.clientWidth;
    render.options.height = container.clientHeight;
    Matter.Render.setPixelRatio(render, window.devicePixelRatio);
  });
  
  return {
    engine,
    world,
    render,
    items
  };
};

// Initialize all animations
export const initAllAnimations = () => {
  // Register custom properties
  registerCustomProperties();
  
  // Initialize GSAP animations
  initGSAPAnimations();
  
  // Initialize scroll animations
  initScrollAnimations();
  
  // Initialize SVG animations
  initSVGAnimations();
  
  // Add classes to elements for animations
  document.querySelectorAll('button').forEach(button => {
    button.classList.add('hover-scale');
  });
  
  document.querySelectorAll('.modal').forEach(modal => {
    modal.classList.add('modal');
  });
  
  // Add fade-in-on-scroll class to sections
  document.querySelectorAll('section').forEach(section => {
    section.classList.add('fade-in-on-scroll');
  });
  
  // Add stagger-list class to lists
  document.querySelectorAll('ul, ol').forEach(list => {
    list.classList.add('stagger-list');
    list.querySelectorAll('li').forEach(item => {
      item.classList.add('stagger-item');
    });
  });
  
  // Add parallax class to images
  document.querySelectorAll('img').forEach(img => {
    img.classList.add('parallax');
  });
  
  // Add svg-path class to SVGs
  document.querySelectorAll('svg').forEach(svg => {
    svg.classList.add('svg-path');
  });
  
  // Add svg-icon class to SVG icons
  document.querySelectorAll('.icon').forEach(icon => {
    icon.classList.add('svg-icon');
  });
}; 