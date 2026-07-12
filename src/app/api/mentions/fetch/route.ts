import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { analyzeMentionSentiment } from '@/lib/ai'
import { fetchGNewsMentions } from '@/lib/gnews'

export async function POST() {
  try {
    const supabase = await createClient()

    // Authenticate user
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get user's tracked keywords
    const { data: keywords, error: kwError } = await supabase
      .from('tracked_keywords')
      .select('*')

    if (kwError) {
      console.error('Failed to retrieve tracked keywords:', kwError.message)
      return NextResponse.json({ error: 'Database error retrieving tracked keywords.' }, { status: 500 })
    }

    if (!keywords || keywords.length === 0) {
      return NextResponse.json({ success: true, totalNewMentions: 0, message: 'No tracked keywords found' }, { status: 200 })
    }

    // Fetch all existing mention URLs for the user to deduplicate
    const { data: existingMentions, error: fetchError } = await supabase
      .from('mentions')
      .select('url')

    if (fetchError) {
      console.error('Failed to fetch existing mention URLs:', fetchError.message)
      return NextResponse.json({ error: 'Database error retrieving existing mentions.' }, { status: 500 })
    }

    const existingUrls = new Set(
      (existingMentions || [])
        .map((m) => m.url)
        .filter(Boolean)
    )

    let totalNewMentions = 0
    const errors: string[] = []

    // Fetch news for each tracked keyword
    for (const kw of keywords) {
      try {
        const articles = await fetchGNewsMentions(kw.keyword)
        const articlesToInsert = []

        for (const article of articles) {
          try {
            // Skip duplicate URLs
            if (existingUrls.has(article.url)) {
              continue
            }

            // Perform sentiment analysis using the enhanced AI pipeline
            const analysis = await analyzeMentionSentiment(article.title, article.description || '')

            // Mark as seen in the current batch to avoid duplicate insertion
            existingUrls.add(article.url)

            articlesToInsert.push({
              keyword_id: kw.id,
              title: article.title,
              source: article.source?.name || 'GNews',
              snippet: article.description || '',
              url: article.url,
              published_at: article.publishedAt,
              sentiment: analysis.sentiment,
              summary: analysis.summary,
              ai_metadata: analysis.ai_metadata,
              ai_analyzed: true,
            })
          } catch (articleError) {
            // Isolate per-article failures, logging on server only
            console.error(`Error analyzing article "${article.title || 'Unknown'}":`, articleError)
          }
        }

        if (articlesToInsert.length > 0) {
          const { error: insertError } = await supabase
            .from('mentions')
            .insert(articlesToInsert)

          if (insertError) {
            console.error(`Failed to insert mentions in DB for keyword "${kw.keyword}":`, insertError.message)
            errors.push(`Failed to insert mentions for ${kw.keyword}`)
          } else {
            totalNewMentions += articlesToInsert.length
          }
        }
      } catch (e) {
        console.error(`Failed to process keyword "${kw.keyword}":`, e)
        errors.push(`Failed to process keyword ${kw.keyword}`)
      }
    }

    return NextResponse.json({
      success: true,
      totalNewMentions,
      errors: errors.length > 0 ? errors : undefined,
    })
  } catch (globalError) {
    console.error('Fetch route global failure:', globalError)
    return NextResponse.json(
      { error: 'An error occurred while fetching brand mentions.' },
      { status: 500 }
    )
  }
}


