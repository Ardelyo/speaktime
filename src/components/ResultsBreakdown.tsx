import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { FileText, AlignLeft } from 'lucide-react';

interface ResultsBreakdownProps {
  paragraphs: { text: string; time: number }[];
  totalWords: number;
  totalSyllables: number;
}

const ResultsBreakdown: React.FC<ResultsBreakdownProps> = ({ paragraphs, totalWords, totalSyllables }) => {
  return (
    <div className="mt-6 bg-gray-50 rounded-2xl p-6 shadow-sm">
      <h2 className="text-2xl font-semibold flex items-center mb-4">
        <AlignLeft className="mr-2" />
        Breakdown
      </h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-2/3">Paragraph</TableHead>
            <TableHead>Time (seconds)</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paragraphs.map((paragraph, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">{paragraph.text.slice(0, 50)}...</TableCell>
              <TableCell>{paragraph.time.toFixed(2)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="mt-4 space-y-2">
        <p className="flex items-center">
          <FileText className="mr-2" size={16} />
          Total Words: {totalWords}
        </p>
        <p className="flex items-center">
          <FileText className="mr-2" size={16} />
          Total Syllables: {totalSyllables}
        </p>
      </div>
    </div>
  );
};

export default ResultsBreakdown;