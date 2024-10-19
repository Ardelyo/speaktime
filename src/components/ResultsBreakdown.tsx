import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { FileText, AlignLeft } from 'lucide-react';

interface ResultsBreakdownProps {
  paragraphs: { text: string; time: number }[];
  totalWords: number;
  totalSyllables: number;
}

const ResultsBreakdown: React.FC<ResultsBreakdownProps> = ({ paragraphs, totalWords, totalSyllables }) => {
  const totalTime = paragraphs.reduce((sum, p) => sum + p.time, 0);

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-semibold flex items-center mb-4">
        <AlignLeft className="mr-2" />
        Detailed Breakdown
      </h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-1/2">Paragraph</TableHead>
            <TableHead className="w-1/4">Time (seconds)</TableHead>
            <TableHead className="w-1/4">Progress</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paragraphs.map((paragraph, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">{paragraph.text.slice(0, 50)}...</TableCell>
              <TableCell>{paragraph.time.toFixed(2)}</TableCell>
              <TableCell>
                <Progress value={(paragraph.time / totalTime) * 100} className="w-full" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="mt-6 grid grid-cols-2 gap-4">
        <div className="bg-blue-50 p-4 rounded-md">
          <p className="flex items-center text-blue-700">
            <FileText className="mr-2" size={16} />
            Total Words: {totalWords}
          </p>
        </div>
        <div className="bg-green-50 p-4 rounded-md">
          <p className="flex items-center text-green-700">
            <FileText className="mr-2" size={16} />
            Total Syllables: {totalSyllables}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResultsBreakdown;