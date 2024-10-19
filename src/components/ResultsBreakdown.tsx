import React from 'react';
import { motion } from 'framer-motion';
import { FileText, AlignLeft } from 'lucide-react';

interface ResultsBreakdownProps {
  paragraphs: { text: string; time: number }[];
  totalWords: number;
  totalSyllables: number;
}

const ResultsBreakdown: React.FC<ResultsBreakdownProps> = ({ paragraphs, totalWords, totalSyllables }) => {
  return (
    <motion.div
      className="bg-pastel-blue rounded-2xl p-6 shadow-sm mt-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <h2 className="text-2xl font-semibold flex items-center mb-4 text-dark-text">
        <AlignLeft className="mr-2" />
        Detailed Breakdown
      </h2>
      <motion.div
        className="space-y-4"
        initial="hidden"
        animate="visible"
        variants={{
          visible: {
            transition: {
              staggerChildren: 0.1
            }
          }
        }}
      >
        {paragraphs.map((paragraph, index) => (
          <motion.div
            key={index}
            className="bg-white rounded-xl p-4"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 }
            }}
          >
            <p className="font-medium text-dark-text mb-2">Paragraph {index + 1}</p>
            <p className="text-gray-600 mb-2">{paragraph.text.slice(0, 100)}...</p>
            <p className="text-sm text-gray-500">Estimated time: {paragraph.time.toFixed(2)} seconds</p>
          </motion.div>
        ))}
      </motion.div>
      <motion.div
        className="mt-6 grid grid-cols-2 gap-4"
        initial="hidden"
        animate="visible"
        variants={{
          visible: {
            transition: {
              staggerChildren: 0.1,
              delayChildren: 0.3
            }
          }
        }}
      >
        <motion.div
          className="bg-pastel-green rounded-xl p-4"
          variants={{
            hidden: { opacity: 0, scale: 0.9 },
            visible: { opacity: 1, scale: 1 }
          }}
        >
          <p className="flex items-center text-dark-text">
            <FileText className="mr-2" size={16} />
            Total Words: {totalWords}
          </p>
        </motion.div>
        <motion.div
          className="bg-pastel-pink rounded-xl p-4"
          variants={{
            hidden: { opacity: 0, scale: 0.9 },
            visible: { opacity: 1, scale: 1 }
          }}
        >
          <p className="flex items-center text-dark-text">
            <FileText className="mr-2" size={16} />
            Total Syllables: {totalSyllables}
          </p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default ResultsBreakdown;