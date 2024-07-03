'use client'
import React, { useState, useEffect } from 'react';

interface CountdownProps {
  initialTime: number; // Time in seconds
}

const CountdownTimer: React.FC<CountdownProps> = ({ initialTime }) => {
  const [timeLeft, setTimeLeft] = useState(initialTime);

  useEffect(() => {
    if (timeLeft === 0) return;

    const timer = setInterval(() => {
      setTimeLeft(prevTime => prevTime - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <div>
      <h1 className='text-white text-md'>Countdown Timer</h1>
      <p className='text-orange-500 text-xl'>{formatTime(timeLeft)}</p>
    </div>
  );
};

export default CountdownTimer;
