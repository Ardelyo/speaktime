import React from 'react';
import SpeakTimeCalculator from '../components/SpeakTimeCalculator';
import GradientText from '../components/GradientText';

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-900 mb-8">SpeakTime</h1>
        <SpeakTimeCalculator />
        <div className="mt-8 text-center">
          <GradientText text="made by Ardelyo Product" />
        </div>
      </div>
    </div>
  );
};

export default Index;