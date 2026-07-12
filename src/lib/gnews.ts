export interface GNewsArticle {
  title: string
  description: string
  url: string
  publishedAt: string
  source: {
    name: string
    url: string
  }
}

/**
 * Fetches the latest 10 English news articles from the GNews API for a given keyword.
 */
export async function fetchGNewsMentions(keyword: string): Promise<GNewsArticle[]> {
  const apiKey = process.env.GNEWS_API_KEY
  if (!apiKey) {
    console.warn('GNEWS_API_KEY is not configured in .env.local')
    return []
  }

  // Fetch the latest 10 English news articles sorted by publication date
  const url = `https://gnews.io/api/v4/search?q=${encodeURIComponent(keyword)}&lang=en&max=10&sortby=publishedAt&apikey=${apiKey}`

  try {
    const response = await fetch(url)
    if (!response.ok) {
      const errorText = await response.text()
      console.error(`GNews API error (${response.status}) for "${keyword}":`, errorText)
      return []
    }

    const data = await response.json()
    return data.articles || []
  } catch (error) {
    console.error(`Failed to fetch GNews articles for "${keyword}":`, error)
    return []
  }
}
