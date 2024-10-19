import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, AlignLeft } from 'lucide-react';

interface ResultsBreakdownProps {
  paragraphs: { text: string; time: number }[];
  totalWords: number;
  totalSyllables: number;
}

const ResultsBreakdown: React.FC<ResultsBreakdownProps> = ({ paragraphs, totalWords, totalSyllables }) => {
  return (
    <Card className="mt-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl shadow-md">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold flex items-center">
          <AlignLeft className="mr-2" />
          Breakdown
        </CardTitle>
      </CardHeader>
      <CardContent>
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
      </CardContent>
    </Card>
  );
};

export default ResultsBreakdown;