export const calculateSpeakingTime = (text: string, language: string, wpm: number) => {
  // Step 1: Text Preprocessing
  const cleanText = text.trim().replace(/\s+/g, ' ');

  // Step 2: Word Count
  const words = cleanText.split(/\s+/);
  const wordCount = words.length;

  // Step 3: Syllable Count
  const syllableCount = estimateSyllableCount(cleanText, language);

  // Step 4: Average Speaking Rate (WPM is provided as an input)
  const spm = wpm * 1.4; // Assuming ~1.4 syllables per word on average

  // Step 5 & 7: Base Speaking Time Calculation (using syllables for more accuracy)
  let totalSeconds = (syllableCount / spm) * 60;

  // Step 6: Adjust for Pauses and Punctuation
  totalSeconds += countPauses(cleanText);

  // Step 8: Final Speaking Time
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = Math.round(totalSeconds % 60);
  
  return { minutes, seconds };
};

const estimateSyllableCount = (text: string, language: string): number => {
  const words = text.toLowerCase().split(/\s+/);
  let count = 0;
  
  for (const word of words) {
    count += word.split(/[aeiou]/gi).length - 1 || 1;
  }
  
  // Adjust for language (rough estimate)
  const languageMultiplier = {
    english: 1,
    spanish: 1.2,
    french: 1.1
  }[language] || 1;
  
  return Math.round(count * languageMultiplier);
};

const countPauses = (text: string): number => {
  const commas = (text.match(/,/g) || []).length * 0.25;
  const periods = (text.match(/\./g) || []).length * 0.5;
  const questionMarks = (text.match(/\?/g) || []).length * 0.75;
  const exclamationMarks = (text.match(/!/g) || []).length * 0.5;

  return commas + periods + questionMarks + exclamationMarks;
};