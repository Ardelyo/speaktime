import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface AnimatedCountProps {
  label: string;
  count: number;
}

const AnimatedCount: React.FC<AnimatedCountProps> = ({ label, count }) => {
  return (
    <div className="flex items-center">
      <span className="mr-2">{label}:</span>
      <AnimatePresence mode="wait">
        <motion.span
          key={count}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.3 }}
          className="font-semibold"
        >
          {count}
        </motion.span>
      </AnimatePresence>
    </div>
  );
};

export default AnimatedCount;