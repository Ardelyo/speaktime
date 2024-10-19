import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface ResultsBreakdownProps {
  paragraphs: { text: string; time: number }[];
  totalWords: number;
  totalSyllables: number;
}

const ResultsBreakdown: React.FC<ResultsBreakdownProps> = ({ paragraphs, totalWords, totalSyllables }) => {
  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold mb-2">Breakdown</h3>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Paragraph</TableHead>
            <TableHead>Time (seconds)</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paragraphs.map((paragraph, index) => (
            <TableRow key={index}>
              <TableCell>{paragraph.text.slice(0, 50)}...</TableCell>
              <TableCell>{paragraph.time.toFixed(2)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="mt-4">
        <p>Total Words: {totalWords}</p>
        <p>Total Syllables: {totalSyllables}</p>
      </div>
    </div>
  );
};

export default ResultsBreakdown;