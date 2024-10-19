import React from 'react';
import { Progress } from "@/components/ui/progress";

interface ResultDisplayProps {
  result: { minutes: number; seconds: number };
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ result }) => {
  const totalSeconds = result.minutes * 60 + result.seconds;
  const progressPercentage = Math.min((totalSeconds / 600) * 100, 100); // Max 10 minutes for progress bar

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold text-center">Estimated Speaking Time</h2>
      <div className="text-4xl font-bold text-center text-blue-600">
        {result.minutes}:{result.seconds.toString().padStart(2, '0')}
      </div>
      <Progress value={progressPercentage} className="w-full h-4" />
    </div>
  );
};

export default ResultDisplay;