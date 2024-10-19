import React from 'react';
import { Progress } from "@/components/ui/progress";
import { Clock } from 'lucide-react';

interface ResultDisplayProps {
  result: { minutes: number; seconds: number };
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ result }) => {
  const totalSeconds = result.minutes * 60 + result.seconds;
  const progressPercentage = Math.min((totalSeconds / 600) * 100, 100); // Max 10 minutes for progress bar

  return (
    <div className="bg-gray-50 rounded-2xl p-6 shadow-sm">
      <h2 className="text-2xl font-semibold text-center flex items-center justify-center mb-4">
        <Clock className="mr-2" />
        Estimated Speaking Time
      </h2>
      <div className="text-4xl font-bold text-center text-blue-600 mb-4">
        {result.minutes}:{result.seconds.toString().padStart(2, '0')}
      </div>
      <Progress value={progressPercentage} className="w-full h-4 rounded-full" />
    </div>
  );
};

export default ResultDisplay;