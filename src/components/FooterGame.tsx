
import React, { useEffect, useRef, useState } from 'react';

// Game objects and settings
interface GameObject {
  x: number;
  y: number;
  width: number;
  height: number;
  speed?: number;
  dx?: number;
  dy?: number;
}

const GAME_WIDTH = 800;
const GAME_HEIGHT = 200;
const PADDLE_WIDTH = 100;
const PADDLE_HEIGHT = 10;
const BALL_SIZE = 10;
const BLOCK_WIDTH = 60;
const BLOCK_HEIGHT = 20;
const BLOCK_GAP = 10;
const ROWS = 2;
const COLS = 10;

const FooterGame: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [gameInitialized, setGameInitialized] = useState(false);
  
  // Game objects
  const paddleRef = useRef<GameObject>({
    x: GAME_WIDTH / 2 - PADDLE_WIDTH / 2,
    y: GAME_HEIGHT - PADDLE_HEIGHT - 10,
    width: PADDLE_WIDTH,
    height: PADDLE_HEIGHT,
  });
  
  const ballRef = useRef<GameObject>({
    x: GAME_WIDTH / 2,
    y: GAME_HEIGHT - PADDLE_HEIGHT - 20,
    width: BALL_SIZE,
    height: BALL_SIZE,
    dx: 3,
    dy: -3,
  });
  
  const blocksRef = useRef<GameObject[]>([]);
  
  // Create blocks in a grid pattern
  const createBlocks = () => {
    const blocks: GameObject[] = [];
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        blocks.push({
          x: c * (BLOCK_WIDTH + BLOCK_GAP) + 40,
          y: r * (BLOCK_HEIGHT + BLOCK_GAP) + 40,
          width: BLOCK_WIDTH,
          height: BLOCK_HEIGHT,
        });
      }
    }
    return blocks;
  };
  
  // Initialize game
  const initGame = () => {
    if (!gameInitialized) {
      blocksRef.current = createBlocks();
      setGameInitialized(true);
    }
    
    // Reset paddle position
    paddleRef.current = {
      x: GAME_WIDTH / 2 - PADDLE_WIDTH / 2,
      y: GAME_HEIGHT - PADDLE_HEIGHT - 10,
      width: PADDLE_WIDTH,
      height: PADDLE_HEIGHT,
    };
    
    // Reset ball position
    ballRef.current = {
      x: GAME_WIDTH / 2,
      y: GAME_HEIGHT - PADDLE_HEIGHT - 20,
      width: BALL_SIZE,
      height: BALL_SIZE,
      dx: 3,
      dy: -3,
    };
    
    // Reset blocks if all destroyed
    if (blocksRef.current.length === 0) {
      blocksRef.current = createBlocks();
    }
    
    setScore(0);
    setGameOver(false);
  };
  
  // Detect collision between objects
  const detectCollision = (obj1: GameObject, obj2: GameObject) => {
    return (
      obj1.x < obj2.x + obj2.width &&
      obj1.x + obj1.width > obj2.x &&
      obj1.y < obj2.y + obj2.height &&
      obj1.y + obj1.height > obj2.y
    );
  };
  
  // Update game state
  const updateGame = () => {
    if (!isPlaying || gameOver) return;
    
    const ball = ballRef.current;
    const paddle = paddleRef.current;
    
    // Move ball
    if (ball.dx && ball.dy) {
      ball.x += ball.dx;
      ball.y += ball.dy;
    }
    
    // Wall collision (left/right)
    if (ball.x + ball.width > GAME_WIDTH || ball.x < 0) {
      if (ball.dx) ball.dx = -ball.dx;
    }
    
    // Wall collision (top)
    if (ball.y < 0) {
      if (ball.dy) ball.dy = -ball.dy;
    }
    
    // Bottom collision (game over)
    if (ball.y + ball.height > GAME_HEIGHT) {
      setGameOver(true);
      setIsPlaying(false);
    }
    
    // Paddle collision
    if (
      detectCollision(ball, paddle)
    ) {
      // Calculate impact point on paddle (0-1)
      const impact = (ball.x + ball.width / 2 - paddle.x) / paddle.width;
      
      // Angle (-1 to 1) based on impact point
      const angle = 2 * impact - 1;
      
      // Change ball direction based on impact
      if (ball.dy && ball.dx) {
        ball.dy = -Math.abs(ball.dy);
        ball.dx = 5 * angle;
      }
    }
    
    // Block collisions
    blocksRef.current = blocksRef.current.filter(block => {
      if (detectCollision(ball, block)) {
        if (ball.dy) ball.dy = -ball.dy;
        setScore(prevScore => prevScore + 10);
        return false;
      }
      return true;
    });
    
    // If all blocks are cleared
    if (blocksRef.current.length === 0) {
      setIsPlaying(false);
      setGameOver(true);
    }
  };
  
  // Draw game
  const drawGame = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Clear canvas
    ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
    
    // Set background
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
    
    // Draw paddle
    ctx.fillStyle = '#29dd3b';
    ctx.fillRect(
      paddleRef.current.x,
      paddleRef.current.y,
      paddleRef.current.width,
      paddleRef.current.height
    );
    
    // Draw ball
    ctx.fillStyle = '#FFFFFF';
    ctx.beginPath();
    ctx.arc(
      ballRef.current.x + BALL_SIZE / 2,
      ballRef.current.y + BALL_SIZE / 2,
      BALL_SIZE / 2,
      0,
      Math.PI * 2
    );
    ctx.fill();
    
    // Draw blocks
    blocksRef.current.forEach(block => {
      ctx.fillStyle = '#8B5CF6';
      ctx.fillRect(block.x, block.y, block.width, block.height);
      
      // Add inner highlight
      ctx.fillStyle = '#9B87F5';
      ctx.fillRect(block.x + 2, block.y + 2, block.width - 4, block.height - 4);
    });
    
    // Draw score
    ctx.fillStyle = '#FFFFFF';
    ctx.font = '16px Roboto Mono';
    ctx.fillText(`Score: ${score}`, 10, 25);
    
    // Draw game over message
    if (gameOver) {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
      ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
      
      ctx.fillStyle = '#FFFFFF';
      ctx.font = '24px Roboto Mono';
      ctx.textAlign = 'center';
      ctx.fillText(
        blocksRef.current.length === 0 ? 'You Win!' : 'Game Over',
        GAME_WIDTH / 2,
        GAME_HEIGHT / 2 - 10
      );
      
      ctx.font = '16px Roboto Mono';
      ctx.fillText('Click to play again', GAME_WIDTH / 2, GAME_HEIGHT / 2 + 20);
    }
  };
  
  // Game loop
  useEffect(() => {
    if (!isPlaying) return;
    
    let animationId: number;
    
    const gameLoop = () => {
      updateGame();
      drawGame();
      animationId = requestAnimationFrame(gameLoop);
    };
    
    gameLoop();
    
    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [isPlaying]);
  
  // Mouse move handler for paddle
  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isPlaying) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    
    // Update paddle position
    paddleRef.current.x = Math.max(
      0,
      Math.min(mouseX - PADDLE_WIDTH / 2, GAME_WIDTH - PADDLE_WIDTH)
    );
  };
  
  // Touch move handler for mobile
  const handleTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (!isPlaying) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const rect = canvas.getBoundingClientRect();
    const touchX = e.touches[0].clientX - rect.left;
    
    // Update paddle position
    paddleRef.current.x = Math.max(
      0,
      Math.min(touchX - PADDLE_WIDTH / 2, GAME_WIDTH - PADDLE_WIDTH)
    );
  };
  
  // Canvas click handler
  const handleCanvasClick = () => {
    if (gameOver) {
      initGame();
    }
    setIsPlaying(true);
  };
  
  // Initial draw
  useEffect(() => {
    initGame();
    drawGame();
  }, []);
  
  return (
    <div className="mt-10 mb-8 flex flex-col items-center">
      <h3 className="text-xl font-bold mb-4 text-gradient">Play Breakout</h3>
      <p className="text-napptix-light-grey mb-4 font-roboto-mono text-center max-w-md">
        Use your mouse to move the paddle and break all the blocks!
      </p>
      <div className="border-2 border-[#29dd3b]/30 rounded-lg overflow-hidden shadow-[0_0_15px_rgba(41,221,59,0.2)]">
        <canvas
          ref={canvasRef}
          width={GAME_WIDTH}
          height={GAME_HEIGHT}
          className="max-w-full"
          onMouseMove={handleMouseMove}
          onTouchMove={handleTouchMove}
          onClick={handleCanvasClick}
        />
      </div>
      {!isPlaying && !gameOver && (
        <button
          className="mt-4 px-6 py-2 bg-napptix-purple hover:bg-napptix-purple/80 text-white font-bold rounded-full transition-all"
          onClick={() => setIsPlaying(true)}
        >
          Start Game
        </button>
      )}
    </div>
  );
};

export default FooterGame;
