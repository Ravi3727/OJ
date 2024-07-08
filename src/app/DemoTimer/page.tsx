'use client';

import CountdownTimer from '@/components/Timer';
import { Timer } from 'lucide-react';
import React, { useState } from 'react';

const Page = () => {
  const [inputTime, setInputTime] = useState('');
  const [time, setTime] = useState(0);

  const handleStart = () => {
    const numericTime = Number(inputTime);
    if (!isNaN(numericTime) && numericTime > 0) {
      setTime(numericTime);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Timer className="text-black text-5xl" />

      <div className="flex flex-col items-center justify-center mt-10">
        <h1 className="text-black text-2xl">Enter Time</h1>
        <input
          type="number"
          className="border-2 border-black rounded-lg p-2"
          placeholder="Enter time in seconds"
          value={inputTime}
          onChange={(e) => setInputTime(e.target.value)}
        />
      </div>
      <div className="mt-4">
        <button
          onClick={handleStart}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Set Timer
        </button>
      </div>
      <h1 className="text-black text-3xl mt-10">Countdown Timer</h1>
      <CountdownTimer initialTime={time} />
    </div>
  );
};

export default Page;
