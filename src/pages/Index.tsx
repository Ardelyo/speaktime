import React from 'react';
import SpeakTimeCalculator from '../components/SpeakTimeCalculator';

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-900 mb-8">SpeakTime: Text to Time Calculator</h1>
        <SpeakTimeCalculator />
      </div>
    </div>
  );
};

export default Index;