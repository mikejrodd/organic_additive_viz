import React, { useEffect, useRef } from 'react';
import Matter from 'matter-js';

const BallCanvas = ({ balls, engine, drawerWidth, boundaries }) => {
  const canvasRef = useRef(null);
  const runnerRef = useRef(Matter.Runner.create());

  useEffect(() => {
    const runner = runnerRef.current;
    engine.timing.timeScale = 1;
    engine.positionIterations = 100;

    const canvasWidth = window.innerWidth - drawerWidth;
    const canvasHeight = window.innerHeight;

    // Create the Matter.js renderer
    const render = Matter.Render.create({
      element: canvasRef.current,
      engine: engine,
      options: {
        width: canvasWidth,
        height: canvasHeight,
        wireframes: false,
        background: '#ffffff'
      }
    });

    // Create the Matter.js mouse control
    const mouse = Matter.Mouse.create(render.canvas);
    const mouseConstraint = Matter.MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.2,
        render: {
          visible: true
        }
      }
    });

    Matter.World.add(engine.world, mouseConstraint);
    engine.world.gravity.y = 1;

    Matter.Runner.run(runner, engine);
    Matter.Render.run(render);

    return () => {
      Matter.Render.stop(render);
      Matter.Runner.stop(runner);
      Matter.Engine.clear(engine);
      console.log('Cleanup: Engine, Runner, Render stopped');
    };
  }, [engine, drawerWidth]);

  useEffect(() => {
    if (engine) {
      const currentBalls = Matter.Composite.allBodies(engine.world);
      console.log('Current balls in the world:', currentBalls);
      currentBalls.forEach(body => {
        if (!balls.includes(body) && !boundaries.includes(body)) {
          Matter.World.remove(engine.world, body);
          console.log('Removing body:', body);
        }
      });
      balls.forEach(ball => {
        if (!currentBalls.includes(ball)) {
          Matter.World.add(engine.world, ball);
          console.log('Adding ball:', ball);
        }
      });
    }
  }, [balls, engine, boundaries]);

  return (
    <div
      id="canvas-container"
      ref={canvasRef}
      style={{
        // Width of the container
        // width: '100%',                       // Full width
        // width: 'calc(100% - 250px)',         // Full width minus a fixed amount (e.g., drawer width)
        width: `calc(80% - ${drawerWidth}px)`, // Full width minus drawer width (dynamic)
        
        // Height of the container
        // height: '1000px',                        // Fixed height
        height: '100vh',                     // Full viewport height
        // height: 'calc(100vh + 100px)',       // Viewport height minus a fixed amount
        
        // Positioning
        position: 'relative',                   // Relative positioning
        // position: 'absolute',                // Absolute positioning
        
        // Offset (use only with absolute or relative positioning)
        left: `0px`,               // Offset from the left by drawer width
        top: '0px',                         // Offset from the top by 50px
        // right: '50px',                       // Offset from the right by 50px
        // bottom: '50px',                      // Offset from the bottom by 50px
        
        // Background color
        // background: '#fafafa',                  // Light gray background
        background: '#ffffff',               // White background
        // background: '#000000',               // Black background
        
        // Overflow behavior
        // overflow: 'hidden',                     // Hide overflow content
        // overflow: 'scroll',                  // Scrollbars for overflow content
        overflow: 'visible',                 // Allow overflow content to be visible
        
        // Border
        // border: '1px solid #ccc',               // Light gray solid border
        border: 'none',                      // No border
        // border: '2px dashed #000',           // Black dashed border
        
        // Margin
        margin: '0 auto',                       // Center the container horizontally
        // margin: '20px',                      // Uniform margin of 20px
        // margin: '0',                         // No margin
        
        // Flexbox layout (for child alignment)
        display: 'flex',                        // Use flexbox for layout
        justifyContent: 'center',               // Center content horizontally
        // justifyContent: 'flex-start',        // Align content to the start horizontally
        // justifyContent: 'flex-end',          // Align content to the end horizontally
        alignItems: 'center',                   // Center content vertically
        // alignItems: 'flex-start',            // Align content to the start vertically
        // alignItems: 'flex-end',              // Align content to the end vertically
        
        // Box shadow
        // boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Subtle shadow for visual effect
        boxShadow: 'none',                    // No shadow
        // boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)', // Strong shadow for emphasis
        
        // Padding
        padding: '10px',                        // Padding inside the container
        // padding: '0',                         // No padding
        // padding: '20px',                      // Uniform padding of 20px
        
        // Border radius
        borderRadius: '10px',                   // Round the corners of the container
        // borderRadius: '0',                    // No rounding of corners
        // borderRadius: '50%',                  // Fully rounded corners (circle/oval)
      }}
    />
  );
};

export default BallCanvas;
