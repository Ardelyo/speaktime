import React from 'react';
import { FileText, AlignLeft } from 'lucide-react';

interface ResultsBreakdownProps {
  paragraphs: { text: string; time: number }[];
  totalWords: number;
  totalSyllables: number;
}

const ResultsBreakdown: React.FC<ResultsBreakdownProps> = ({ paragraphs, totalWords, totalSyllables }) => {
  return (
    <div className="bg-pastel-blue rounded-2xl p-6 shadow-sm">
      <h2 className="text-2xl font-semibold flex items-center mb-4 text-dark-text">
        <AlignLeft className="mr-2" />
        Detailed Breakdown
      </h2>
      <div className="space-y-4">
        {paragraphs.map((paragraph, index) => (
          <div key={index} className="bg-white rounded-xl p-4">
            <p className="font-medium text-dark-text mb-2">Paragraph {index + 1}</p>
            <p className="text-gray-600 mb-2">{paragraph.text.slice(0, 100)}...</p>
            <p className="text-sm text-gray-500">Estimated time: {paragraph.time.toFixed(2)} seconds</p>
          </div>
        ))}
      </div>
      <div className="mt-6 grid grid-cols-2 gap-4">
        <div className="bg-pastel-green rounded-xl p-4">
          <p className="flex items-center text-dark-text">
            <FileText className="mr-2" size={16} />
            Total Words: {totalWords}
          </p>
        </div>
        <div className="bg-pastel-pink rounded-xl p-4">
          <p className="flex items-center text-dark-text">
            <FileText className="mr-2" size={16} />
            Total Syllables: {totalSyllables}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResultsBreakdown;