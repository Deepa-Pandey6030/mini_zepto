// src/pages/DeliveryTracker.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function DeliveryTracker() {
  const navigate = useNavigate();
  const location = useLocation();
  const [orderId, setOrderId] = useState('JHUPTO-TRACK-XYZ');
  const [deliveryTimeRemaining, setDeliveryTimeRemaining] = useState(null);
  const [currentStatus, setCurrentStatus] = useState("Order Confirmed");
  const [progressPercentage, setProgressPercentage] = useState(0);

  // Canvas-related state and refs
  const canvasRef = useRef(null);
  const animationFrameId = useRef(null);
  const pathPoints = useRef([ // Define a simple path for the scooter to follow
    { x: 50, y: 350 },  // Start (bottom-left)
    { x: 150, y: 250 },
    { x: 250, y: 300 },
    { x: 350, y: 150 },
    { x: 450, y: 200 },
    { x: 550, y: 100 }, // End (top-right)
  ]);
  const scooterPosition = useRef({ x: 0, y: 0 });
  const scooterImageRef = useRef(new Image()); // Ref to hold the scooter image object
  const [isScooterImageLoaded, setIsScooterImageLoaded] = useState(false); // State to track image loading

  // Define delivery stages and their approximate durations (in seconds)
  const deliveryStages = [
    { status: "Order Confirmed", duration: 0, initialDelay: 3 },
    { status: "Preparing Order", duration: 2 },
    { status: "Out for Delivery", duration: 25 },
    { status: "Arriving Soon!", duration: 20 },
    { status: "Delivered!", duration: 0 }
  ];

  // Load the delivery boy image once when the component mounts
  useEffect(() => {
    // --- UPDATED IMAGE PATH HERE ---
    scooterImageRef.current.src = '/delivery_boy.png'; // Set the path to your delivery_boy.png
    // --- END UPDATED IMAGE PATH ---

    scooterImageRef.current.onload = () => {
      setIsScooterImageLoaded(true);
      console.log("Delivery boy image loaded!");
    };
    scooterImageRef.current.onerror = () => {
      console.error("Failed to load delivery boy image. Using fallback.");
      setIsScooterImageLoaded(false);
    };
  }, []);

  useEffect(() => {
    if (location.state && location.state.orderId) {
      setOrderId(location.state.orderId);
    }

    const totalSimulatedDeliveryTime = 45;
    setDeliveryTimeRemaining(totalSimulatedDeliveryTime);

    let currentStageIndex = 0;
    let timer;

    const startSimulation = () => {
      timer = setInterval(() => {
        setDeliveryTimeRemaining(prevTime => {
          if (prevTime <= 0) {
            clearInterval(timer);
            setCurrentStatus("Delivered!");
            setProgressPercentage(100);
            return 0;
          }

          const elapsed = totalSimulatedDeliveryTime - prevTime;
          let newStatus = currentStatus;
          let newProgress = (elapsed / totalSimulatedDeliveryTime) * 100;

          let cumulativeDuration = 0;
          for (let i = 0; i < deliveryStages.length - 1; i++) {
            cumulativeDuration += deliveryStages[i].duration;
            if (elapsed >= cumulativeDuration) {
              newStatus = deliveryStages[i + 1].status;
              currentStageIndex = i + 1;
            }
          }

          setCurrentStatus(newStatus);
          setProgressPercentage(newProgress);

          return prevTime - 1;
        });
      }, 1000);
    };

    const initialConfirmTimeout = setTimeout(startSimulation, deliveryStages[0].initialDelay * 1000);

    return () => {
      clearInterval(timer);
      clearTimeout(initialConfirmTimeout);
    };
  }, [location.state]);

  // --- Canvas Drawing and Animation Logic ---
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationRunning = true;

    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      canvas.width = parent.clientWidth;
      canvas.height = parent.clientHeight;
      draw();
    };

    const draw = () => {
      if (!ctx || !canvas) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const scaleX = canvas.width / 600;
      const scaleY = canvas.height / 400;
      const scale = Math.min(scaleX, scaleY);

      ctx.save();
      ctx.translate((canvas.width - 600 * scale) / 2, (canvas.height - 400 * scale) / 2);
      ctx.scale(scale, scale);

      // Draw the path
      ctx.beginPath();
      ctx.strokeStyle = '#6B7280'; // gray-500
      ctx.lineWidth = 8;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      ctx.moveTo(pathPoints.current[0].x, pathPoints.current[0].y);
      for (let i = 1; i < pathPoints.current.length; i++) {
        ctx.lineTo(pathPoints.current[i].x, pathPoints.current[i].y);
      }
      ctx.stroke();

      // Calculate delivery boy position along the path
      const pathLength = pathPoints.current.length;
      const currentSegmentIndex = Math.floor((progressPercentage / 100) * (pathLength - 1));
      const segmentProgress = ((progressPercentage / 100) * (pathLength - 1)) - currentSegmentIndex;

      let p1 = pathPoints.current[currentSegmentIndex];
      let p2 = pathPoints.current[Math.min(currentSegmentIndex + 1, pathLength - 1)];

      scooterPosition.current = {
        x: p1.x + (p2.x - p1.x) * segmentProgress,
        y: p1.y + (p2.y - p1.y) * segmentProgress,
      };

      // --- Draw the delivery boy IMAGE here ---
      if (isScooterImageLoaded) {
        const deliveryBoyWidth = 60; // Desired display width of the image
        const deliveryBoyHeight = 60; // Desired display height
        ctx.drawImage(
          scooterImageRef.current,
          scooterPosition.current.x - deliveryBoyWidth / 2, // Center the image
          scooterPosition.current.y - deliveryBoyHeight / 2, // Center the image
          deliveryBoyWidth,
          deliveryBoyHeight
        );
      } else {
        // Fallback to drawing a simple circle if image is not loaded
        ctx.beginPath();
        ctx.arc(scooterPosition.current.x, scooterPosition.current.y, 15, 0, Math.PI * 2);
        ctx.fillStyle = '#FF5733'; // Primary color
        ctx.shadowColor = 'rgba(255, 87, 51, 0.5)';
        ctx.shadowBlur = 15;
        ctx.fill();
        ctx.closePath();
      }
      // --- End delivery boy image drawing ---

      // Draw start and end points
      ctx.beginPath();
      ctx.arc(pathPoints.current[0].x, pathPoints.current[0].y, 10, 0, Math.PI * 2);
      ctx.fillStyle = '#33FF57'; // Secondary green
      ctx.shadowColor = 'rgba(51, 255, 87, 0.5)';
      ctx.shadowBlur = 10;
      ctx.fill();
      ctx.closePath();

      ctx.beginPath();
      ctx.arc(pathPoints.current[pathLength - 1].x, pathPoints.current[pathLength - 1].y, 10, 0, Math.PI * 2);
      ctx.fillStyle = '#FFD700'; // Gold
      ctx.shadowColor = 'rgba(255, 215, 0, 0.5)';
      ctx.shadowBlur = 10;
      ctx.fill();
      ctx.closePath();

      ctx.restore();
    };

    const animate = () => {
      if (animationRunning) {
        draw();
        animationFrameId.current = requestAnimationFrame(animate);
      }
    };

    resizeCanvas();
    animate();

    window.addEventListener('resize', resizeCanvas);

    return () => {
      cancelAnimationFrame(animationFrameId.current);
      window.removeEventListener('resize', resizeCanvas);
      animationRunning = false;
    };
  }, [progressPercentage, isScooterImageLoaded]);

  const formatTime = (seconds) => {
    if (seconds <= 0) return "00:00";
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleViewReceipt = () => {
    navigate('/receipt', { state: { orderId: orderId } });
  };

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-160px)] bg-gray-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-lg text-center border border-gray-100">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-6">Track Your Order</h1>

        <p className="text-gray-600 text-lg mb-4">Order ID: <span className="font-semibold text-primary">{orderId}</span></p>

        {/* Current Status */}
        <div className="bg-blue-100 text-blue-800 font-bold py-3 px-6 rounded-lg mb-6 shadow-md">
          <p className="text-2xl">{currentStatus}</p>
        </div>

        {/* Time Remaining / Delivered Message */}
        {currentStatus !== "Delivered!" ? (
          <div className="text-5xl font-extrabold text-primary mb-6 animate-pulse">
            {formatTime(deliveryTimeRemaining)}
          </div>
        ) : (
          <div className="text-5xl font-extrabold text-green-600 mb-6 animate-bounce-in">
            Delivered! 🎉
          </div>
        )}

        {/* Interactive Map/Path Canvas */}
        <div className="relative w-full h-64 md:h-80 lg:h-96 bg-gray-100 rounded-lg overflow-hidden shadow-inner mb-8">
          <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full"></canvas>
          {/* Optional: Add labels for start/end points on the map */}
          <div className="absolute top-2 left-2 bg-white px-2 py-1 rounded-md text-xs font-semibold text-gray-700 shadow-sm">
            Restaurant 📍
          </div>
          <div className="absolute bottom-2 right-2 bg-white px-2 py-1 rounded-md text-xs font-semibold text-gray-700 shadow-sm">
            Your Location 🏠
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
          {currentStatus === "Delivered!" && (
            <button
              onClick={handleViewReceipt}
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200 ease-in-out shadow-md hover:shadow-lg transform hover:scale-105"
            >
              View Receipt
            </button>
          )}
          <button
            onClick={handleGoHome}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200 ease-in-out shadow-md hover:shadow-lg transform hover:scale-105"
          >
            Go to Home
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeliveryTracker;