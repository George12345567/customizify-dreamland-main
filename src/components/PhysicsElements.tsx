import React, { useEffect, useRef } from 'react';
import Matter from 'matter-js';

interface PhysicsElementsProps {
  containerId: string;
  elementCount?: number;
  colors?: string[];
  onElementAdded?: (elementId: string) => void;
}

const PhysicsElements: React.FC<PhysicsElementsProps> = ({
  containerId,
  elementCount = 5,
  colors = ['#8B5CF6', '#0EA5E9', '#D946EF', '#F97316', '#22C55E'],
  onElementAdded
}) => {
  const engineRef = useRef<Matter.Engine | null>(null);
  const renderRef = useRef<Matter.Render | null>(null);
  const runnerRef = useRef<Matter.Runner | null>(null);
  const elementsRef = useRef<Matter.Body[]>([]);
  
  useEffect(() => {
    // Find the container element
    const container = document.getElementById(containerId);
    if (!container) {
      console.error(`Container with id "${containerId}" not found`);
      return;
    }
    
    // Create engine
    const engine = Matter.Engine.create({
      gravity: { x: 0, y: 0.5 }
    });
    engineRef.current = engine;
    
    // Create renderer
    const render = Matter.Render.create({
      element: container,
      engine: engine,
      options: {
        width: container.clientWidth,
        height: container.clientHeight,
        wireframes: false,
        background: 'transparent',
        pixelRatio: window.devicePixelRatio
      }
    });
    renderRef.current = render;
    
    // Create runner
    const runner = Matter.Runner.create();
    runnerRef.current = runner;
    
    // Create boundaries
    const wallThickness = 60;
    const walls = [
      // Bottom wall
      Matter.Bodies.rectangle(
        container.clientWidth / 2,
        container.clientHeight + wallThickness / 2,
        container.clientWidth,
        wallThickness,
        { isStatic: true, render: { fillStyle: 'transparent' } }
      ),
      // Left wall
      Matter.Bodies.rectangle(
        -wallThickness / 2,
        container.clientHeight / 2,
        wallThickness,
        container.clientHeight,
        { isStatic: true, render: { fillStyle: 'transparent' } }
      ),
      // Right wall
      Matter.Bodies.rectangle(
        container.clientWidth + wallThickness / 2,
        container.clientHeight / 2,
        wallThickness,
        container.clientHeight,
        { isStatic: true, render: { fillStyle: 'transparent' } }
      ),
      // Top wall
      Matter.Bodies.rectangle(
        container.clientWidth / 2,
        -wallThickness / 2,
        container.clientWidth,
        wallThickness,
        { isStatic: true, render: { fillStyle: 'transparent' } }
      )
    ];
    
    // Add walls to world
    Matter.World.add(engine.world, walls);
    
    // Create elements
    const elements: Matter.Body[] = [];
    
    for (let i = 0; i < elementCount; i++) {
      const size = Matter.Common.random(30, 60);
      const element = Matter.Bodies.circle(
        Matter.Common.random(size, container.clientWidth - size),
        Matter.Common.random(size, container.clientHeight / 2),
        size / 2,
        {
          restitution: 0.8,
          friction: 0.005,
          render: {
            fillStyle: colors[i % colors.length]
          }
        }
      );
      
      elements.push(element);
      
      // Notify when element is added
      if (onElementAdded) {
        onElementAdded(element.id.toString());
      }
    }
    
    // Add elements to world
    Matter.World.add(engine.world, elements);
    elementsRef.current = elements;
    
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
    
    Matter.World.add(engine.world, mouseConstraint);
    render.mouse = mouse;
    
    // Run engine and renderer
    Matter.Runner.run(runner, engine);
    Matter.Render.run(render);
    
    // Handle window resize
    const handleResize = () => {
      if (!container || !render) return;
      
      // Update renderer size
      render.options.width = container.clientWidth;
      render.options.height = container.clientHeight;
      Matter.Render.setPixelRatio(render, window.devicePixelRatio);
      
      // Update wall positions
      walls[0].position.x = container.clientWidth / 2;
      walls[1].position.y = container.clientHeight / 2;
      walls[2].position.x = container.clientWidth + wallThickness / 2;
      walls[2].position.y = container.clientHeight / 2;
      walls[3].position.x = container.clientWidth / 2;
    };
    
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      
      if (runnerRef.current) {
        Matter.Runner.stop(runnerRef.current);
      }
      
      if (renderRef.current) {
        Matter.Render.stop(renderRef.current);
        renderRef.current.canvas.remove();
      }
      
      if (engineRef.current) {
        Matter.Engine.clear(engineRef.current);
      }
    };
  }, [containerId, elementCount, colors, onElementAdded]);
  
  // Function to add a new element
  const addElement = (x: number, y: number, color: string) => {
    if (!engineRef.current || !renderRef.current) return;
    
    const container = document.getElementById(containerId);
    if (!container) return;
    
    const size = Matter.Common.random(30, 60);
    const element = Matter.Bodies.circle(
      x,
      y,
      size / 2,
      {
        restitution: 0.8,
        friction: 0.005,
        render: {
          fillStyle: color
        }
      }
    );
    
    Matter.World.add(engineRef.current.world, element);
    elementsRef.current.push(element);
    
    // Notify when element is added
    if (onElementAdded) {
      onElementAdded(element.id.toString());
    }
    
    return element.id.toString();
  };
  
  // Expose the addElement function
  React.useImperativeHandle(
    React.useRef(),
    () => ({
      addElement
    })
  );
  
  return null; // This component doesn't render anything directly
};

export default PhysicsElements; 