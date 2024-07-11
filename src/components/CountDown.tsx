"use client";

import CountdownTimer from "./Timer";
import React, { useState } from "react";
import { MdLockClock } from "react-icons/md";

const CountDown = () => {
  const [inputTime, setInputTime] = useState("");
  const [time, setTime] = useState(0);

  const handleStart = () => {
    const numericTime = Number(inputTime);
    if (!isNaN(numericTime) && numericTime > 0) {
      setTime(numericTime);
    }
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center ">
        <div className="flex flex-row gap-2 mt-24">
          <div className="">
            <input
              type="number"
              className="border-2 border-black rounded-lg p-2"
              placeholder="Enter time in minutes"
              value={inputTime}
              onChange={(e) => setInputTime(e.target.value)}
            />
          </div>

          <div className="mt-1">
            <button
              onClick={handleStart}
              className="px-4 py-2 bg-slate-500 text-white text-xl rounded"
            >
              <MdLockClock />
            </button>
          </div>
        </div>

        <div className=" ">
          <CountdownTimer initialTime={time} />
        </div>
      </div>
    </>
  );
};

export default CountDown;
