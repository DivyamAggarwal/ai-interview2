"use client"
import React, { useEffect, useState } from 'react';

function TimerComponent({ start }) {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    let interval;
    if (start) {
      interval = setInterval(() => {
        setSeconds(prev => prev + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [start]);

  const formatTime = (sec) => {
    const h = Math.floor(sec / 3600);
    const m = String(Math.floor((sec % 3600) / 60)).padStart(2, '0');
    const s = String(sec % 60).padStart(2, '0');

    return h > 0
      ? `${String(h).padStart(2, '0')}:${m}:${s}`  // HH:MM:SS if hours > 0
      : `${m}:${s}`;                               // MM:SS otherwise
  };

  return <span>{formatTime(seconds)}</span>;
}

export default TimerComponent;
