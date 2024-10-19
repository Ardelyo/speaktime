import React, { useState } from 'react';
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { calculateSpeakingTime, preprocessSpecialCases } from '../utils/timeCalculator';
import ResultDisplay from './ResultDisplay';

const SpeakTimeCalculator = () => {
  const [text, setText] = useState('');
  const [language, setLanguage] = useState<'english' | 'french' | 'spanish'>('english');
  const [textType, setTextType] = useState<'presentation' | 'conversation' | 'poem' | 'script'>('conversation');
  const [speakingStyle, setSpeakingStyle] = useState<'fast' | 'normal' | 'slow' | 'formal' | 'informal'>('normal');
  const [spm, setSpm] = useState(200);
  const [result, setResult] = useState({ minutes: 0, seconds: 0 });

  const handleCalculate = () => {
    const preprocessedText = preprocessSpecialCases(text, language);
    const { minutes, seconds } = calculateSpeakingTime(preprocessedText, language, spm, textType, speakingStyle);
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
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Select value={language} onValueChange={(value: 'english' | 'french' | 'spanish') => setLanguage(value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select language" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="english">English</SelectItem>
            <SelectItem value="french">French</SelectItem>
            <SelectItem value="spanish">Spanish</SelectItem>
          </SelectContent>
        </Select>
        
        <Select value={textType} onValueChange={(value: 'presentation' | 'conversation' | 'poem' | 'script') => setTextType(value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select text type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="presentation">Presentation</SelectItem>
            <SelectItem value="conversation">Conversation</SelectItem>
            <SelectItem value="poem">Poem</SelectItem>
            <SelectItem value="script">Script</SelectItem>
          </SelectContent>
        </Select>
        
        <Select value={speakingStyle} onValueChange={(value: 'fast' | 'normal' | 'slow' | 'formal' | 'informal') => setSpeakingStyle(value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select speaking style" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="fast">Fast</SelectItem>
            <SelectItem value="normal">Normal</SelectItem>
            <SelectItem value="slow">Slow</SelectItem>
            <SelectItem value="formal">Formal</SelectItem>
            <SelectItem value="informal">Informal</SelectItem>
          </SelectContent>
        </Select>
        
        <div className="space-y-2">
          <label htmlFor="spm-slider" className="block text-sm font-medium text-gray-700">
            Speaking Pace: {spm} SPM
          </label>
          <Slider
            id="spm-slider"
            min={150}
            max={250}
            step={10}
            value={[spm]}
            onValueChange={(value) => setSpm(value[0])}
          />
        </div>
      </div>
      
      <Button onClick={handleCalculate} className="w-full">Calculate Speaking Time</Button>
      
      <ResultDisplay result={result} />
    </div>
  );
};

export default SpeakTimeCalculator;