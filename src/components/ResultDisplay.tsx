import React from 'react';
import { motion } from 'framer-motion';
import { Clock } from 'lucide-react';

interface ResultDisplayProps {
  result: { minutes: number; seconds: number };
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ result }) => {
  const totalSeconds = result.minutes * 60 + result.seconds;

  return (
    <motion.div
      className="bg-pastel-blue rounded-2xl p-6 shadow-sm"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-semibold text-center flex items-center justify-center mb-4">
        <Clock className="mr-2" />
        Estimated Speaking Time
      </h2>
      <motion.div
        className="text-4xl font-bold text-center text-blue-600 mb-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          {result.minutes}:{result.seconds.toString().padStart(2, '0')}
        </motion.span>
      </motion.div>
      <motion.div
        className="w-full h-4 bg-gray-200 rounded-full overflow-hidden"
        initial={{ width: 0 }}
        animate={{ width: '100%' }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <motion.div
          className="h-full bg-blue-500 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${(totalSeconds / 600) * 100}%` }}
          transition={{ duration: 1, delay: 0.7 }}
        />
      </motion.div>
    </motion.div>
  );
};

export default ResultDisplay;