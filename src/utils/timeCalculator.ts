export const calculateSpeakingTime = (text: string, language: string, wpm: number) => {
  // Basic text characteristics
  const words = text.trim().split(/\s+/);
  const wordCount = words.length;
  const characterCount = text.length;
  const sentenceCount = text.split(/[.!?]+/).length;

  // Linguistic features
  const syllableCount = estimateSyllableCount(text, language);
  const averageWordLength = characterCount / wordCount;
  const averageSentenceLength = wordCount / sentenceCount;

  // Adjust WPM based on complexity
  const adjustedWPM = adjustWPMForComplexity(wpm, averageWordLength, averageSentenceLength);

  // Calculate speaking time
  const totalMinutes = syllableCount / (adjustedWPM * 1.4); // Assuming ~1.4 syllables per word
  const minutes = Math.floor(totalMinutes);
  const seconds = Math.round((totalMinutes - minutes) * 60);
  
  return { minutes, seconds };
};

const estimateSyllableCount = (text: string, language: string): number => {
  // This is a very basic syllable estimation. For accuracy, consider using a proper NLP library.
  const words = text.toLowerCase().split(/\s+/);
  let count = 0;
  
  for (const word of words) {
    count += word.split(/[aeiou]/gi).length - 1 || 1;
  }
  
  // Adjust for language (very rough estimate)
  const languageMultiplier = {
    english: 1,
    spanish: 1.2,
    french: 1.1
  }[language] || 1;
  
  return Math.round(count * languageMultiplier);
};

const adjustWPMForComplexity = (baseWPM: number, avgWordLength: number, avgSentenceLength: number): number => {
  let complexityFactor = 1;
  
  if (avgWordLength > 6) complexityFactor *= 0.9;
  if (avgSentenceLength > 20) complexityFactor *= 0.95;
  
  return Math.round(baseWPM * complexityFactor);
};