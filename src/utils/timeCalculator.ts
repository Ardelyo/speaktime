type Language = 'english' | 'french' | 'spanish' | 'indonesian';
type TextType = 'presentation' | 'conversation' | 'poem' | 'script';
type SpeakingStyle = 'fast' | 'normal' | 'slow' | 'formal' | 'informal';

interface LanguageParams {
  defaultSPM: number;
  pauseRules: {
    comma: number;
    period: number;
    questionMark: number;
    exclamationMark: number;
  };
  syllableMultiplier: number;
}

const languageParams: Record<Language, LanguageParams> = {
  english: {
    defaultSPM: 200,
    pauseRules: { comma: 0.25, period: 0.5, questionMark: 0.75, exclamationMark: 0.5 },
    syllableMultiplier: 1,
  },
  french: {
    defaultSPM: 220,
    pauseRules: { comma: 0.2, period: 0.4, questionMark: 0.75, exclamationMark: 0.5 },
    syllableMultiplier: 1.1,
  },
  spanish: {
    defaultSPM: 210,
    pauseRules: { comma: 0.2, period: 0.45, questionMark: 0.75, exclamationMark: 0.5 },
    syllableMultiplier: 1.2,
  },
  indonesian: {
    defaultSPM: 190, // Indonesian tends to have a slightly slower speaking rate
    pauseRules: { comma: 0.2, period: 0.5, questionMark: 0.75, exclamationMark: 0.5 },
    syllableMultiplier: 1.3, // Indonesian words often have more syllables
  },
};

export const calculateSpeakingTime = (
  text: string,
  language: Language,
  spm: number,
  textType: TextType,
  speakingStyle: SpeakingStyle
) => {
  // Step 1: Text Preprocessing
  const cleanText = preprocessText(text, language);

  // Step 2 & 3: Word and Syllable Count
  const syllableCount = estimateSyllableCount(cleanText, language);

  // Step 4 & 5: Adjust Speaking Rate and Calculate Base Time
  const adjustedSPM = adjustSPMForStyleAndType(spm, speakingStyle, textType);
  let totalSeconds = (syllableCount / adjustedSPM) * 60;

  // Step 6: Adjust for Pauses
  totalSeconds += countPauses(cleanText, languageParams[language].pauseRules);

  // Step 7: Adjust for Liaison/Elision (simplified)
  if (language === 'french' || language === 'spanish') {
    totalSeconds *= 0.98; // Simplified 2% reduction for liaison/elision
  }

  // Step 8: Final Speaking Time
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = Math.round(totalSeconds % 60);
  
  return { minutes, seconds };
};

const preprocessText = (text: string, language: Language): string => {
  let cleanText = text.trim().replace(/\s+/g, ' ');
  // Remove punctuation not typical for the selected language
  const punctuationToKeep = language === 'spanish' ? /[.,!?¿¡]/ : /[.,!?]/;
  cleanText = cleanText.replace(new RegExp(`[^\\w\\s${punctuationToKeep.source}]`, 'g'), '');
  return cleanText;
};

const estimateSyllableCount = (text: string, language: Language): number => {
  const words = text.toLowerCase().split(/\s+/);
  let count = 0;
  
  for (const word of words) {
    if (language === 'indonesian') {
      // Indonesian syllable estimation
      count += word.split(/[aiueo]/gi).length - 1 || 1;
    } else {
      count += word.split(/[aeiouáéíóúàèìòùâêîôûäëïöü]/gi).length - 1 || 1;
    }
  }
  
  return Math.round(count * languageParams[language].syllableMultiplier);
};

const adjustSPMForStyleAndType = (baseSPM: number, style: SpeakingStyle, type: TextType): number => {
  let adjustmentFactor = 1;

  switch (style) {
    case 'fast': adjustmentFactor *= 1.2; break;
    case 'slow': adjustmentFactor *= 0.8; break;
    case 'formal': adjustmentFactor *= 0.9; break;
    // 'normal' and 'informal' use default adjustment
  }

  switch (type) {
    case 'presentation': adjustmentFactor *= 0.95; break;
    case 'poem': adjustmentFactor *= 0.8; break;
    case 'script': adjustmentFactor *= 1.1; break;
    // 'conversation' uses default adjustment
  }

  return Math.round(baseSPM * adjustmentFactor);
};

const countPauses = (text: string, pauseRules: LanguageParams['pauseRules']): number => {
  const commas = (text.match(/,/g) || []).length * pauseRules.comma;
  const periods = (text.match(/\./g) || []).length * pauseRules.period;
  const questionMarks = (text.match(/\?/g) || []).length * pauseRules.questionMark;
  const exclamationMarks = (text.match(/!/g) || []).length * pauseRules.exclamationMark;

  return commas + periods + questionMarks + exclamationMarks;
};

// Helper function to handle abbreviations and numbers (simplified version)
export const preprocessSpecialCases = (text: string, language: Language): string => {
  // Handle common abbreviations
  const abbreviations: Record<string, string> = {
    'Mr.': 'Mister',
    'Dr.': 'Doctor',
    'etc.': 'etcetera',
    // Add more abbreviations as needed
  };

  for (const [abbr, full] of Object.entries(abbreviations)) {
    text = text.replace(new RegExp(abbr, 'g'), full);
  }

  // Handle numbers (very basic implementation)
  text = text.replace(/\d+/g, (match) => {
    return match.length > 3 ? 'multiple digit number' : 'number';
  });

  return text;
};
