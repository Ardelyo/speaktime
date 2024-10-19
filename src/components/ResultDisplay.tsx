import React from 'react';
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock } from 'lucide-react';

interface ResultDisplayProps {
  result: { minutes: number; seconds: number };
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ result }) => {
  const totalSeconds = result.minutes * 60 + result.seconds;
  const progressPercentage = Math.min((totalSeconds / 600) * 100, 100); // Max 10 minutes for progress bar

  return (
    <Card className="bg-gradient-to-r from-blue-100 to-purple-100 rounded-2xl shadow-md">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold text-center flex items-center justify-center">
          <Clock className="mr-2" />
          Estimated Speaking Time
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-4xl font-bold text-center text-blue-600 mb-4">
          {result.minutes}:{result.seconds.toString().padStart(2, '0')}
        </div>
        <Progress value={progressPercentage} className="w-full h-4 rounded-full" />
      </CardContent>
    </Card>
  );
};

export default ResultDisplay;