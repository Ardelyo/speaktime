export const calculateSpeakingTime = (text: string, language: string, wpm: number) => {
  // This is a simplified calculation. In a real-world scenario, you'd want to implement
  // more sophisticated syllable counting and language-specific adjustments.
  const words = text.trim().split(/\s+/).length;
  const totalMinutes = words / wpm;
  const minutes = Math.floor(totalMinutes);
  const seconds = Math.round((totalMinutes - minutes) * 60);
  
  return { minutes, seconds };
};