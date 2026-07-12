export interface BrandItem {
  id: string
  keyword: string
  slug: string
  reputationScore: number
  mentionCount: number
  statusColor: 'green' | 'yellow' | 'red'
  positiveRatio: number
}

/**
 * Converts a keyword string into a URL-friendly slug.
 */
export function slugifyKeyword(keyword: string): string {
  return keyword
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // remove non-alphanumeric, spaces, or hyphens
    .replace(/[\s_-]+/g, '-') // replace spaces or underscores with a single hyphen
    .replace(/^-+|-+$/g, '') // trim leading/trailing hyphens
}

export interface TrackedKeyword {
  id: string
  keyword: string
  created_at?: string
}

export interface LightweightMention {
  keyword_id: string
  sentiment: 'positive' | 'neutral' | 'negative' | null
  ai_metadata?: {
    confidence?: number
    category?: string
  } | null
  published_at?: string
}

/**
 * Groups mentions by keyword and calculates their reputation scores, counts, and ratios.
 */
export function calculateBrandsList(
  keywords: TrackedKeyword[],
  lightweightMentions: LightweightMention[]
): BrandItem[] {
  const mentionsByKeyword: Record<string, LightweightMention[]> = {}
  lightweightMentions.forEach((m) => {
    if (!mentionsByKeyword[m.keyword_id]) {
      mentionsByKeyword[m.keyword_id] = []
    }
    mentionsByKeyword[m.keyword_id].push(m)
  })

  return keywords.map((kw) => {
    const brandMentions = mentionsByKeyword[kw.id] || []
    let totalWeightedSentiment = 0
    let totalConfidence = 0
    let posCount = 0

    brandMentions.forEach((m) => {
      let sentimentValue = 50
      if (m.sentiment === 'positive') {
        sentimentValue = 100
        posCount++
      } else if (m.sentiment === 'negative') {
        sentimentValue = 0
      }

      const confidence = m.ai_metadata?.confidence ?? 75
      totalWeightedSentiment += sentimentValue * confidence
      totalConfidence += confidence
    })

    const score = totalConfidence > 0 ? Math.round(totalWeightedSentiment / totalConfidence) : 50
    const mentionCount = brandMentions.length
    const positiveRatio = mentionCount > 0 ? Math.round((posCount / mentionCount) * 100) : 0

    let statusColor: 'green' | 'yellow' | 'red' = 'yellow'
    if (score > 75) statusColor = 'green'
    else if (score < 50) statusColor = 'red'

    return {
      id: kw.id,
      keyword: kw.keyword,
      slug: slugifyKeyword(kw.keyword),
      reputationScore: score,
      mentionCount,
      statusColor,
      positiveRatio,
    }
  })
}
