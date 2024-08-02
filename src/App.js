import React, { useState, useEffect, useRef } from 'react';
import BallCanvas from './components/BallCanvas';
import Drawer from './components/Drawer';
import Popout from './components/Popout'; // Import the new Popout component
import additivesFullData from './additives_full.json';
import Matter from 'matter-js';
import './App.css';
import categoryColors from './colors';
import { Typography, Card, CardContent } from '@mui/material';

const App = () => {
  const [categories, setCategories] = useState({});
  const [balls, setBalls] = useState([]);
  const [boundaries, setBoundaries] = useState([]);
  const [activeAdditives, setActiveAdditives] = useState([]);
  const [activeCategories, setActiveCategories] = useState([]);
  const [selectedAdditive, setSelectedAdditive] = useState(null); // State to manage selected additive for the popout
  const engineRef = useRef(Matter.Engine.create());
  const runnerRef = useRef(Matter.Runner.create());

  useEffect(() => {
    const loadedCategories = {};
    additivesFullData.additives.forEach(category => {
      loadedCategories[category.category] = category.additives;
    });
    setCategories(loadedCategories);
  }, []);

  useEffect(() => {
    const engine = engineRef.current;
    const runner = runnerRef.current;
    Matter.Runner.run(runner, engine);

    // Add boundaries to the world
    const newBoundaries = createBoundaries();
    setBoundaries(newBoundaries);
    newBoundaries.forEach(boundary => {
      Matter.World.add(engine.world, boundary);
    });

    return () => {
      Matter.Runner.stop(runner);
      Matter.Engine.clear(engine);
    };
  }, []);

  const handleCategoryChange = (category) => {
    if (activeCategories.includes(category)) {
      const ballsToRemove = balls.filter(ball => ball.category === category);
      removeBallsFromWorld(ballsToRemove);
      setBalls(prevBalls => prevBalls.filter(ball => ball.category !== category));
      setActiveAdditives(prevAdditives => prevAdditives.filter(additive => additive.category !== category));
      setActiveCategories(prevCategories => prevCategories.filter(cat => cat !== category));
    } else {
      const newBalls = generateStackedBalls(category);
      setActiveAdditives(prevAdditives => [
        ...prevAdditives,
        ...categories[category].map(additive => ({ ...additive, category }))
      ]);
      setActiveCategories(prevCategories => [...prevCategories, category]);
      addBallsOneByOne(newBalls);
    }
  };

  const addBallsOneByOne = (balls, index = 0) => {
    if (index < balls.length) {
      setBalls(prevBalls => [...prevBalls, balls[index]]);
      setTimeout(() => addBallsOneByOne(balls, index + 1), 50);
    }
  };

  const createBall = (x, y, radius, category) => {
    return Matter.Bodies.polygon(x, y, 6, radius, {
      restitution: 0,
      friction: 0.1,
      frictionAir: 0.1,
      frictionStatic: 0.5,
      density: 0.001,
      isStatic: false,
      render: {
        fillStyle: getColorForCategory(category) || '#FF5733'
      }
    });
  };

  const generateStackedBalls = (category) => {
    const radius = 30;
    const additives = categories[category] || [];
    const balls = [];
    const cols = 10; // Number of columns in the grid
    const canvasWidth = window.innerWidth - drawerWidth;
    const centerX = canvasWidth / 2; // Center of the canvas horizontally
    const topY = 100; // A fixed position near the top of the canvas
  
    additives.forEach((additive, index) => {
      const x = centerX + (index % cols - Math.floor(cols / 2)) * (radius * 2) + 250; // Centering the balls horizontally
      const y = topY + Math.floor(index / cols) * (radius * 2); // Stacking the balls vertically from the top
      const ball = createBall(x, y, radius, category);
      ball.additive = additive;
      ball.category = category;
      balls.push(ball);
    });
  
    return balls;
  };

  const removeBallsFromWorld = (ballsToRemove) => {
    const engine = engineRef.current;
    ballsToRemove.forEach(ball => {
      Matter.World.remove(engine.world, ball);
    });
  };

  const getColorForCategory = (category) => {
    return categoryColors[category] || "#333";
  };

  const createBoundaries = () => {
    const canvasWidth = window.innerWidth - drawerWidth;
    const canvasHeight = window.innerHeight - 400;
    const wallThickness = 50;

    const ground = Matter.Bodies.rectangle(
      canvasWidth / 2,
      canvasHeight - wallThickness / 2 + 305,
      canvasWidth,
      wallThickness,
      { isStatic: true, render: { fillStyle: '#FAF9F6' } }
    );

    const leftWall = Matter.Bodies.rectangle(
      wallThickness / 2 -30,
      canvasHeight,
      wallThickness,
      canvasHeight*2,
      { isStatic: true, render: { fillStyle: '#FAF9F6' } }
    );

    const rightWall = Matter.Bodies.rectangle(
      canvasWidth - wallThickness / 2,
      canvasHeight,
      wallThickness,
      canvasHeight*2,
      { isStatic: true, render: { fillStyle: '#FAF9F6' } }
    );

    const ceiling = Matter.Bodies.rectangle(
      canvasWidth / 2,
      wallThickness / 2,
      canvasWidth,
      wallThickness,
      { isStatic: true, render: { fillStyle: '#FAF9F6' } }
    );

    return [ground, leftWall, rightWall, ceiling];
  };

  const drawerWidth = 400;

  return (
    <div style={{ display: 'flex', backgroundColor: '#FAF9F6' }}>
      <Drawer 
        additives={activeAdditives} 
        categories={categories} 
        activeCategories={activeCategories} 
        onCategoryChange={handleCategoryChange} 
      />
      <div style={{ flexGrow: 1, overflow: 'hidden', marginLeft: `${drawerWidth}px` }}>
        <div style={{ textAlign: 'center', padding: '16px 0px 0px 0px', backgroundColor: '#FAF9F6', borderBottom: '1px solid #e0e0e0' }}>
          <Typography variant="h4" style={{ color: '#7b1fa2', padding: '20px 0 0 0', borderBottom: 'none', outline: 'none'  }}>
            Visualize the large number of additives that are permitted in Organic wine
          </Typography>
          <div style={{ textAlign: 'center', padding: '8px', backgroundColor: '#FAF9F6', marginBottom: '20px' }}>
            <Typography variant="body3" style={{ fontFamily: 'Roboto, sans-serif', color: 'grey', padding: '5px 0 0 0', marginTop: '5px' }}>
              Select additive categories from the list on the left - source: www.perdomini-ioc.com
            </Typography>
          </div>
        </div>
        <div style={{ position: 'absolute', top: '135px', left: `${drawerWidth}px`, width: `calc(100% - ${drawerWidth}px - 16px)`, padding: '8px', display: 'grid', gridTemplateColumns: 'repeat(10, 1fr)', gap: '2px', zIndex: 1000, marginRight: '16px' }}>
          {activeAdditives.map((additive, index) => (
            <AdditiveCard key={index} additive={additive} onClick={() => setSelectedAdditive(additive)} />
          ))}
        </div>
        <BallCanvas balls={balls} engine={engineRef.current} drawerWidth={drawerWidth} boundaries={boundaries} />
        <Popout additive={selectedAdditive} onClose={() => setSelectedAdditive(null)} />
      </div>
    </div>
  );
};

const AdditiveCard = ({ additive, onClick }) => {
  return (
    <Card 
      onClick={onClick} 
      style={{
        width: '100%', 
        backgroundColor: 'rgba(250, 249, 246, 0.9)', 
        cursor: 'pointer', 
        borderRadius: '10px', 
        boxSizing: 'border-box', 
        transition: 'background-color 0.3s ease',
        height: '40px', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        overflow: 'hidden'
      }}
    >
      <CardContent style={{ textAlign: 'center', padding: '4px' }}>
        <Typography variant="body2">{additive.name}</Typography>
      </CardContent>
    </Card>
  );
};

export default App;
