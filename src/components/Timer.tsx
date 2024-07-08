import React, { useEffect, useState, useRef } from 'react';

interface CountdownTimerProps {
  initialTime: number;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ initialTime }) => {
  const [time, setTime] = useState(initialTime);
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isActive && !isPaused) {
      intervalRef.current = setInterval(() => {
        setTime((time) => (time > 0 ? time - 1 : 0));
      }, 1000);
    } else {
      clearInterval(intervalRef.current!);
    }
    return () => clearInterval(intervalRef.current!);
  }, [isActive, isPaused]);

  useEffect(() => {
    setTime(initialTime);
  }, [initialTime]);

  const startTimer = () => {
    setIsActive(true);
    setIsPaused(false);
  };

  const pauseTimer = () => {
    setIsPaused(true);
  };

  const resetTimer = () => {
    setIsActive(false);
    setIsPaused(false);
    setTime(initialTime);
  };

  return (
    <div className="flex flex-col items-center justify-center mt-4">
      <div className="text-5xl">{time}</div>
      <div className="flex space-x-2 mt-4">
        <button onClick={startTimer} className="px-4 py-2 bg-green-500 text-white rounded">
          Start
        </button>
        <button onClick={pauseTimer} className="px-4 py-2 bg-yellow-500 text-white rounded">
          Pause
        </button>
        <button onClick={resetTimer} className="px-4 py-2 bg-red-500 text-white rounded">
          Reset
        </button>
      </div>
    </div>
  );
};

export default CountdownTimer;
