'use client';
import React, { useEffect, useState, useRef } from 'react';

interface CountdownTimerProps {
  initialTime: number; // in minutes
}

const ContestTimer: React.FC<CountdownTimerProps> = ({ initialTime }) => {
  const [time, setTime] = useState(initialTime * 60); // convert minutes to seconds
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const savedStartTime = localStorage.getItem('contestTimerStart');
    const savedTime = localStorage.getItem('contestTimerTime');

    if (savedStartTime && savedTime) {
      const startTime = parseInt(savedStartTime, 10);
      const savedRemainingTime = parseInt(savedTime, 10);
      const elapsedTime = Math.floor((Date.now() - startTime) / 1000);
      const newTime = savedRemainingTime - elapsedTime;

      setTime(newTime > 0 ? newTime : 0);
    } else {
      const initialSeconds = initialTime * 60;
      setTime(initialSeconds);
      localStorage.setItem('contestTimerStart', Date.now().toString());
      localStorage.setItem('contestTimerTime', initialSeconds.toString());
    }

    intervalRef.current = setInterval(() => {
      setTime((time) => {
        const newTime = time > 0 ? time - 1 : 0;
        localStorage.setItem('contestTimerTime', newTime.toString());
        return newTime;
      });
    }, 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [initialTime]);

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600).toString().padStart(2, '0');
    const m = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${h}:${m}:${s}`;
  };

  return (
    <div className="flex flex-col items-center justify-center mt-4">
      <div className="text-5xl text-white">{formatTime(time)}</div>
    </div>
  );
};

export default ContestTimer;
