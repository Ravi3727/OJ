'use client'
import React, { useEffect, useState, useRef } from 'react';
import { FaPause } from "react-icons/fa";
import { FaHourglassStart } from "react-icons/fa";
import { LuTimerReset } from "react-icons/lu";
interface CountdownTimerProps {
  initialTime: number; // in minutes
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ initialTime }) => {
  const [time, setTime] = useState(initialTime * 60); // convert minutes to seconds
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
    setTime(initialTime * 60); // convert minutes to seconds
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
    setTime(initialTime * 60); // convert minutes to seconds
  };

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600).toString().padStart(2, '0');
    const m = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${h}:${m}:${s}`;
  };

  return (
    <div className="flex flex-col items-center justify-center mt-4">
      <div className="text-5xl text-white">{formatTime(time)}</div>
      <div className="flex space-x-2 mt-4">
        <button onClick={startTimer} className="px-4 py-2 bg-green-500 text-md text-white  rounded">
          <FaHourglassStart />
        </button>
        <button onClick={pauseTimer} className="px-4 py-2 bg-stone-500 text-md  text-white rounded">
          <FaPause />
        </button>
        <button onClick={resetTimer} className="px-4 py-2 bg-red-500 text-md text-white rounded">
          <LuTimerReset />
        </button>
      </div>
    </div>
  );
};

export default CountdownTimer;
