'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { analyzeMentionSentiment } from '@/lib/ai'
import { fetchGNewsMentions } from '@/lib/gnews'

export async function addKeyword(formData: FormData) {
  const keyword = (formData.get('keyword') as string)?.trim()
  if (!keyword) {
    return { error: 'Keyword cannot be empty' }
  }

  const supabase = await createClient()

  // 1. Insert keyword
  const { data: keywordData, error: keywordError } = await supabase
    .from('tracked_keywords')
    .insert({ keyword })
    .select('id')
    .single()

  if (keywordError) {
    if (keywordError.code === '23505') {
      return { error: 'You are already tracking this keyword' }
    }
    return { error: keywordError.message }
  }

  const keywordId = keywordData.id

  try {
    // 2. Fetch mentions for the new keyword from GNews
    const articles = await fetchGNewsMentions(keyword)

    // Fetch existing URLs to prevent duplicate inserts
    const { data: existingMentions } = await supabase
      .from('mentions')
      .select('url')

    const existingUrls = new Set(
      (existingMentions || [])
        .map((m) => m.url)
        .filter(Boolean)
    )

    // 3. Analyze each and insert into public.mentions
    const mentionsToInsert = []

    for (const article of articles) {
      try {
        if (existingUrls.has(article.url)) {
          continue
        }

        const analysis = await analyzeMentionSentiment(article.title, article.description || '')
        existingUrls.add(article.url)

        mentionsToInsert.push({
          keyword_id: keywordId,
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
        console.error(`Error analyzing article "${article.title || 'Unknown'}":`, articleError)
      }
    }

    if (mentionsToInsert.length > 0) {
      const { error: mentionsError } = await supabase
        .from('mentions')
        .insert(mentionsToInsert)

      if (mentionsError) {
        console.error('Failed to insert mentions in actions.ts:', mentionsError.message)
      }
    }
  } catch (e) {
    console.error('Error generating initial mentions:', e)
  }

  revalidatePath('/dashboard')
  revalidatePath('/settings')
  return { success: true }
}

export async function deleteKeyword(id: string) {
  const supabase = await createClient()
  const { error } = await supabase
    .from('tracked_keywords')
    .delete()
    .eq('id', id)

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/dashboard')
  revalidatePath('/settings')
  return { success: true }
}

export async function editKeyword(id: string, keyword: string) {
  const supabase = await createClient()
  const { error } = await supabase
    .from('tracked_keywords')
    .update({ keyword })
    .eq('id', id)

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/dashboard')
  revalidatePath('/settings')
  return { success: true }
}

