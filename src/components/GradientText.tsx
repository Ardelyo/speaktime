import React from 'react';
import { motion } from 'framer-motion';

interface GradientTextProps {
  text: string;
}

const GradientText: React.FC<GradientTextProps> = ({ text }) => {
  return (
    <motion.span
      className="bg-clip-text text-transparent bg-gradient-to-r from-gray-700 to-gray-300 text-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {text}
    </motion.span>
  );
};

export default GradientText;