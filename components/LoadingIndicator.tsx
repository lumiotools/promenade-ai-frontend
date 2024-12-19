'use client'

import { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';

const logs = [
  "Searching for IR Pages",
  "Searching for SEC Filings",
  "Searching for Industry Reports",
  "Processing the collected pages",
  "Identifying important info",
  "Extracting snippets",
  "Highlighting the key points",
  "Parsing the response",
];

function useLoadingIndicator() {
  const [currentLogIndex, setCurrentLogIndex] = useState(0);
  const [ellipsis, setEllipsis] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const logInterval = setInterval(() => {
      setCurrentLogIndex((prevIndex) => {
        if (prevIndex < logs.length - 1) {
          return prevIndex + 1;
        }
        return prevIndex; // Stay on the last log
      });
    }, Math.random() * (10000 - 5000) + 5000); // Random interval between 5-10 seconds

    const ellipsisInterval = setInterval(() => {
      setEllipsis((prev) => {
        if (prev.length < 3) return prev + '.';
        return '';
      });
    }, 300); // Update ellipsis every 300ms for a smoother animation

    // const loadingTimeout = setTimeout(() => {
    //   setIsLoading(false);
    // }, Math.random() * (120000 - 90000) + 60000); // Random time between 1.5 -2 minutes

    return () => {
      clearInterval(logInterval);
      clearInterval(ellipsisInterval);
    //   clearTimeout(loadingTimeout);
    };
  }, []);

  return { currentLog: logs[currentLogIndex], ellipsis, isLoading };
}

export function LoadingIndicator() {
  const { currentLog, ellipsis, isLoading } = useLoadingIndicator();

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full space-y-4">
        <div className="flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
        </div>
        <p className="text-center text-gray-700 flex items-center justify-center">
          <span>{currentLog}</span>
          <span className="w-6 text-left ml-1">{ellipsis}</span>
        </p>
      </div>
    </div>
  );
}

