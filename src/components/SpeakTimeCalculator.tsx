import React, { useState } from 'react';
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { calculateSpeakingTime, preprocessSpecialCases } from '../utils/timeCalculator';
import ResultDisplay from './ResultDisplay';
import ResultsBreakdown from './ResultsBreakdown';
import { Globe, Calculator, Upload, Clock, FileText, Mic } from 'lucide-react';

const SpeakTimeCalculator = () => {
  const [text, setText] = useState('');
  const [language, setLanguage] = useState<'english' | 'french' | 'spanish'>('english');
  const [textType, setTextType] = useState<'presentation' | 'conversation' | 'poem' | 'script'>('conversation');
  const [speakingStyle, setSpeakingStyle] = useState<'fast' | 'normal' | 'slow' | 'formal' | 'informal'>('normal');
  const [spm, setSpm] = useState(200);
  const [result, setResult] = useState({ minutes: 0, seconds: 0 });
  const [showBreakdown, setShowBreakdown] = useState(false);
  const [wordCount, setWordCount] = useState(0);
  const [syllableCount, setSyllableCount] = useState(0);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    setText(newText);
    setWordCount(newText.trim().split(/\s+/).length);
    // This is a simplified syllable count, you may want to use a more accurate method
    setSyllableCount(newText.trim().split(/[aeiou]/gi).length);
  };

  const handleCalculate = () => {
    const preprocessedText = preprocessSpecialCases(text, language);
    const { minutes, seconds } = calculateSpeakingTime(preprocessedText, language, spm, textType, speakingStyle);
    setResult({ minutes, seconds });
    setShowBreakdown(true);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        setText(content);
        handleTextChange({ target: { value: content } } as React.ChangeEvent<HTMLTextAreaElement>);
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="bg-pastel-green rounded-2xl p-6 shadow-sm">
          <Label htmlFor="text-input" className="text-lg font-semibold mb-2 flex items-center text-dark-text">
            <FileText className="mr-2" />
            Enter your text
          </Label>
          <Textarea
            id="text-input"
            placeholder="Paste or type your text here..."
            value={text}
            onChange={handleTextChange}
            className="min-h-[200px] mb-2 bg-white rounded-xl"
          />
          <div className="flex justify-between text-sm text-dark-text mb-2">
            <span>Words: {wordCount}</span>
            <span>Estimated Syllables: {syllableCount}</span>
          </div>
          <Input type="file" accept=".txt" onChange={handleFileUpload} className="hidden" id="file-upload" />
          <label htmlFor="file-upload" className="cursor-pointer inline-flex items-center px-4 py-2 bg-white text-dark-text rounded-full hover:bg-gray-100 transition-colors">
            <Upload className="mr-2" size={16} />
            Upload Text File
          </label>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="bg-pastel-pink rounded-2xl p-6 shadow-sm">
            <Label htmlFor="language-select" className="text-lg font-semibold mb-2 flex items-center text-dark-text">
              <Globe className="mr-2" />
              Language
            </Label>
            <Select value={language} onValueChange={(value: 'english' | 'french' | 'spanish') => setLanguage(value)}>
              <SelectTrigger id="language-select" className="bg-white rounded-xl">
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="english">English</SelectItem>
                <SelectItem value="french">French</SelectItem>
                <SelectItem value="spanish">Spanish</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="bg-pastel-blue rounded-2xl p-6 shadow-sm">
            <Label htmlFor="text-type-select" className="text-lg font-semibold mb-2 flex items-center text-dark-text">
              <FileText className="mr-2" />
              Text Type
            </Label>
            <Select value={textType} onValueChange={(value: 'presentation' | 'conversation' | 'poem' | 'script') => setTextType(value)}>
              <SelectTrigger id="text-type-select" className="bg-white rounded-xl">
                <SelectValue placeholder="Select text type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="presentation">Presentation</SelectItem>
                <SelectItem value="conversation">Conversation</SelectItem>
                <SelectItem value="poem">Poem</SelectItem>
                <SelectItem value="script">Script</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="bg-pastel-yellow rounded-2xl p-6 shadow-sm">
            <Label htmlFor="speaking-style-select" className="text-lg font-semibold mb-2 flex items-center text-dark-text">
              <Mic className="mr-2" />
              Speaking Style
            </Label>
            <Select value={speakingStyle} onValueChange={(value: 'fast' | 'normal' | 'slow' | 'formal' | 'informal') => setSpeakingStyle(value)}>
              <SelectTrigger id="speaking-style-select" className="bg-white rounded-xl">
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
          </div>
          
          <div className="bg-pastel-green rounded-2xl p-6 shadow-sm">
            <Label htmlFor="spm-slider" className="text-lg font-semibold mb-2 flex items-center text-dark-text">
              <Clock className="mr-2" />
              Speaking Pace: {spm} SPM
            </Label>
            <Slider
              id="spm-slider"
              min={150}
              max={250}
              step={10}
              value={[spm]}
              onValueChange={(value) => setSpm(value[0])}
              className="bg-white rounded-xl"
            />
            <div className="flex justify-between text-sm text-dark-text mt-2">
              <span>Slow</span>
              <span>Average</span>
              <span>Fast</span>
            </div>
          </div>
        </div>
        
        <Button onClick={handleCalculate} className="w-full bg-pastel-blue hover:bg-blue-200 text-dark-text transition-colors rounded-full">
          <Calculator className="mr-2" size={16} />
          Calculate Speaking Time
        </Button>
        
        <ResultDisplay result={result} />
        
        {showBreakdown && (
          <ResultsBreakdown
            paragraphs={[{ text: text, time: result.minutes * 60 + result.seconds }]}
            totalWords={wordCount}
            totalSyllables={syllableCount}
          />
        )}
      </div>
    </div>
  );
};

export default SpeakTimeCalculator;