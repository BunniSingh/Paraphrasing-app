export interface ParaphraseResponse {
  success: boolean;
  paraphrasedText?: string;
  error?: string;
}

// Free paraphrasing service using a mock API for demo
// In production, replace with actual API like RapidAPI's Paraphrasing API
export async function paraphraseText(text: string): Promise<ParaphraseResponse> {
  try {
    // Validate input
    if (!text.trim()) {
      return {
        success: false,
        error: "Please enter some text to paraphrase"
      };
    }

    if (text.length > 1000) {
      return {
        success: false,
        error: "Text is too long. Please limit to 1000 characters."
      };
    }

    // For demo purposes, using a simple transformation
    // Replace this with actual API call in production
    const paraphrasedText = await mockParaphraseAPI(text);
    
    return {
      success: true,
      paraphrasedText
    };
  } catch (error) {
    return {
      success: false,
      error: "Failed to paraphrase text. Please try again."
    };
  }
}

// Mock paraphrasing function for demo - replace with real API
async function mockParaphraseAPI(text: string): Promise<string> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // Simple word replacements for demo
  const replacements: Record<string, string> = {
    'good': 'excellent',
    'bad': 'poor',
    'big': 'large',
    'small': 'tiny',
    'fast': 'quick',
    'slow': 'gradual',
    'happy': 'joyful',
    'sad': 'melancholy',
    'beautiful': 'stunning',
    'ugly': 'unattractive',
    'important': 'crucial',
    'easy': 'simple',
    'difficult': 'challenging',
    'amazing': 'remarkable',
    'terrible': 'awful'
  };

  let result = text;
  
  // Apply word replacements
  Object.entries(replacements).forEach(([original, replacement]) => {
    const regex = new RegExp(`\\b${original}\\b`, 'gi');
    result = result.replace(regex, replacement);
  });

  // Add some sentence restructuring
  result = result
    .replace(/\. ([A-Z])/g, '. Additionally, $1')
    .replace(/^([A-Z][^.!?]*[.!?])/, 'It is worth noting that $1');

  return result;
}

// For production use with RapidAPI:
/*
const RAPIDAPI_KEY = 'your-rapidapi-key';
const RAPIDAPI_HOST = 'paraphrasing-api.rapidapi.com';

export async function paraphraseText(text: string): Promise<ParaphraseResponse> {
  try {
    const response = await fetch('https://paraphrasing-api.rapidapi.com/paraphrase', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-RapidAPI-Key': RAPIDAPI_KEY,
        'X-RapidAPI-Host': RAPIDAPI_HOST
      },
      body: JSON.stringify({ text })
    });

    if (!response.ok) {
      throw new Error('API request failed');
    }

    const data = await response.json();
    
    return {
      success: true,
      paraphrasedText: data.paraphrased_text
    };
  } catch (error) {
    return {
      success: false,
      error: 'Failed to paraphrase text. Please try again.'
    };
  }
}
*/