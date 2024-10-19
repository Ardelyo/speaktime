import React, { useState } from 'react';
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { calculateSpeakingTime } from '../utils/timeCalculator';
import ResultDisplay from './ResultDisplay';

const SpeakTimeCalculator = () => {
  const [text, setText] = useState('');
  const [language, setLanguage] = useState('english');
  const [wpm, setWpm] = useState(150);
  const [result, setResult] = useState({ minutes: 0, seconds: 0 });

  const handleCalculate = () => {
    const { minutes, seconds } = calculateSpeakingTime(text, language, wpm);
    setResult({ minutes, seconds });
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 space-y-6">
      <Textarea
        placeholder="Paste or type your text here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="min-h-[200px]"
      />
      
      <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
        <Select value={language} onValueChange={setLanguage}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Select language" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="english">English</SelectItem>
            <SelectItem value="spanish">Spanish</SelectItem>
            <SelectItem value="french">French</SelectItem>
          </SelectContent>
        </Select>
        
        <div className="flex-1 space-y-2">
          <label htmlFor="wpm-slider" className="block text-sm font-medium text-gray-700">
            Speaking Pace: {wpm} WPM
          </label>
          <Slider
            id="wpm-slider"
            min={100}
            max={200}
            step={10}
            value={[wpm]}
            onValueChange={(value) => setWpm(value[0])}
          />
        </div>
      </div>
      
      <Button onClick={handleCalculate} className="w-full">Calculate Speaking Time</Button>
      
      <ResultDisplay result={result} />
    </div>
  );
};

export default SpeakTimeCalculator;