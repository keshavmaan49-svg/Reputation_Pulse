import { GoogleGenerativeAI } from '@google/generative-ai'
import OpenAI from 'openai'

// Initialize clients if keys are present
const geminiKey = process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== 'your-gemini-api-key' ? process.env.GEMINI_API_KEY : null;
const openaiKey = process.env.OPENAI_API_KEY && process.env.OPENAI_API_KEY !== 'your-openai-api-key' ? process.env.OPENAI_API_KEY : null;

const genAI = geminiKey ? new GoogleGenerativeAI(geminiKey) : null;
const openai = openaiKey ? new OpenAI({ apiKey: openaiKey }) : null;

export interface AnalysisResult {
  sentiment: 'positive' | 'neutral' | 'negative'
  summary: string
  ai_metadata: {
    confidence: number
    category: 'Product Launch' | 'Funding' | 'Security' | 'Partnership' | 'Legal' | 'Review' | 'Competition' | 'Hiring' | 'Other'
    topics: string[]
    analysis_model: 'gemini-2.5-flash' | 'heuristic'
    analyzed_at: string // ISO 8601 date string
  }
}

interface GeminiAnalysisResponse {
  sentiment: 'positive' | 'neutral' | 'negative'
  confidence: number
  summary: string
  category: 'Product Launch' | 'Funding' | 'Security' | 'Partnership' | 'Legal' | 'Review' | 'Competition' | 'Hiring' | 'Other'
  topics: string[]
}

/**
 * Checks if the system is configured to use real AI APIs or if it runs in mock mode.
 */
export function getAiStatus() {
  if (genAI) return 'Gemini'
  if (openai) return 'OpenAI'
  return 'Mock Engine'
}

function validateGeminiResponse(data: unknown): data is GeminiAnalysisResponse {
  if (!data || typeof data !== 'object') return false;
  const d = data as Record<string, unknown>;

  const validSentiments = ['positive', 'neutral', 'negative'];
  if (typeof d.sentiment !== 'string' || !validSentiments.includes(d.sentiment)) {
    return false;
  }

  if (typeof d.confidence !== 'number' || d.confidence < 0 || d.confidence > 100) {
    return false;
  }

  if (typeof d.summary !== 'string' || d.summary.trim() === '') {
    return false;
  }

  const validCategories = [
    'Product Launch',
    'Funding',
    'Security',
    'Partnership',
    'Legal',
    'Review',
    'Competition',
    'Hiring',
    'Other',
  ];
  if (typeof d.category !== 'string' || !validCategories.includes(d.category)) {
    return false;
  }

  if (!Array.isArray(d.topics) || d.topics.length < 3 || d.topics.length > 5 || !d.topics.every((t: unknown) => typeof t === 'string')) {
    return false;
  }

  return true;
}

/**
 * Analyzes the sentiment (positive, neutral, negative) of a mention and provides a one-line summary.
 * Uses LLM if key is provided, falls back to keyword-based matching if not.
 */
export async function analyzeMentionSentiment(title: string, snippet: string): Promise<AnalysisResult> {
  const prompt = `Analyze the following news article:
Title: "${title}"
Description: "${snippet}"

Provide the output ONLY as a JSON object containing the following keys:
{
  "sentiment": "positive" | "neutral" | "negative",
  "confidence": <integer between 0 and 100>,
  "summary": "<one-sentence executive summary>",
  "category": "Product Launch" | "Funding" | "Security" | "Partnership" | "Legal" | "Review" | "Competition" | "Hiring" | "Other",
  "topics": [<3-5 key topics as strings>]
}

Return ONLY the raw JSON object. Do not wrap in markdown code blocks, do not write backticks, and do not add conversational text.`;

  if (genAI) {
    let attempts = 2
    while (attempts > 0) {
      try {
        const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' })
        const result = await model.generateContent(prompt)
        const text = result.response.text()
        const parsed = parseJsonObject<Record<string, unknown>>(text)

        if (validateGeminiResponse(parsed)) {
          return {
            sentiment: parsed.sentiment,
            summary: parsed.summary,
            ai_metadata: {
              confidence: parsed.confidence,
              category: parsed.category,
              topics: parsed.topics,
              analysis_model: 'gemini-2.5-flash',
              analyzed_at: new Date().toISOString(),
            }
          }
        }
        console.warn(`Gemini validation failed on attempt ${3 - attempts}. Response:`, text)
      } catch (e) {
        console.error(`Gemini analyzeMentionSentiment attempt ${3 - attempts} failed:`, e)
      }
      attempts--
    }
    console.warn('Gemini analysis failed or returned invalid output after retry. Falling back to heuristic.')
  }

  // Fallback Mock Logic
  return getMockAnalysis(title, snippet)
}

// Helpers
function parseJsonObject<T>(text: string): T | null {
  try {
    const cleaned = text.replace(/^```json\s*/i, '').replace(/```\s*$/i, '').trim()
    return JSON.parse(cleaned) as T
  } catch (e) {
    console.error('Failed to parse JSON object from LLM response:', text, e)
    return null
  }
}

function getMockAnalysis(title: string, snippet: string): AnalysisResult {
  const content = (title + ' ' + snippet).toLowerCase()
  let sentiment: 'positive' | 'neutral' | 'negative' = 'neutral'
  const confidence = 75

  if (
    content.includes('error') ||
    content.includes('overrated') ||
    content.includes('issue') ||
    content.includes('down') ||
    content.includes('bad') ||
    content.includes('fail') ||
    content.includes('slow') ||
    content.includes('dated')
  ) {
    sentiment = 'negative'
  } else if (
    content.includes('dominating') ||
    content.includes('optimize') ||
    content.includes('thrilled') ||
    content.includes('great') ||
    content.includes('love') ||
    content.includes('innovative') ||
    content.includes('game changer') ||
    content.includes('productivity')
  ) {
    sentiment = 'positive'
  }

  // Create a summary by using the title or shortening it
  let summary = title
  if (summary.length > 77) {
    summary = summary.substring(0, 77) + '...'
  }

  // Heuristic category assignment
  let category: AnalysisResult['ai_metadata']['category'] = 'Other'
  if (content.includes('launch') || content.includes('release') || content.includes('introduce')) {
    category = 'Product Launch'
  } else if (content.includes('funding') || content.includes('raised') || content.includes('million') || content.includes('seed')) {
    category = 'Funding'
  } else if (content.includes('security') || content.includes('breach') || content.includes('hack') || content.includes('vulnerability')) {
    category = 'Security'
  } else if (content.includes('partner') || content.includes('integrate') || content.includes('collab')) {
    category = 'Partnership'
  } else if (content.includes('lawsuit') || content.includes('legal') || content.includes('court') || content.includes('sue')) {
    category = 'Legal'
  } else if (content.includes('review') || content.includes('test') || content.includes('feedback')) {
    category = 'Review'
  } else if (content.includes('compete') || content.includes('competitor') || content.includes('versus') || content.includes('vs')) {
    category = 'Competition'
  } else if (content.includes('hire') || content.includes('hiring') || content.includes('career') || content.includes('recruit')) {
    category = 'Hiring'
  }

  // Heuristic topics generation (must have 3-5 topics)
  const topics: string[] = ['News', 'Mention']
  if (category !== 'Other') {
    topics.push(category)
  }
  // Make sure we have at least 3 topics
  if (topics.length < 3) {
    topics.push('Update')
  }

  return {
    sentiment,
    summary,
    ai_metadata: {
      confidence,
      category,
      topics,
      analysis_model: 'heuristic',
      analyzed_at: new Date().toISOString(),
    }
  }
}

