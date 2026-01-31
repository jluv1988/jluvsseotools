import { NextResponse } from 'next/server';
import { getKeywordData, getRelatedKeywords } from '@/lib/dataforseo';
import { MOCK_DATA } from '@/lib/mockData';

// Required for Cloudflare Pages deployment
export const runtime = 'edge';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');

    if (!query) {
        return NextResponse.json(MOCK_DATA);
    }

    try {
        const volumeData = await getKeywordData(query);
        const relatedData = await getRelatedKeywords(query);

        // Transformation Logic
        // This is a simplified mapping. Real DataForSEO response structure needs to be safely traversed.

        const overview = { ...MOCK_DATA.overview };
        let trend = [...MOCK_DATA.trend];
        let related = [...MOCK_DATA.related];

        if (volumeData && volumeData.tasks?.[0]?.result?.[0]) {
            const result = volumeData.tasks[0].result[0];

            // Assuming result contains search volume info. 
            // result can be null if no data found.

            if (result.search_volume !== undefined) {
                overview.volume = formatNumber(result.search_volume);
            }
            if (result.cpc !== undefined) {
                overview.cpc = `$${result.cpc.toFixed(2)}`;
            }
            // Difficulty isn't directly in search_volume, sometimes it is. 
            // DataForSEO usually has a separate 'keyword_difficulty' endpoint or returns 'competition' (0-1).
            // We'll map competition * 100 for now if available.
            if (result.competition !== undefined) {
                overview.difficulty = Math.round(result.competition * 100);
            }

            // Monthly searches for trend
            if (result.monthly_searches) {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                trend = result.monthly_searches.map((ms: any) => ({
                    month: new Date(ms.year, ms.month - 1).toLocaleString('default', { month: 'short' }),
                    volume: ms.search_volume
                })).slice(-12);
            }
        }

        if (relatedData && relatedData.tasks?.[0]?.result) {
            // result is an array of items for keywords_for_keywords
            const items = relatedData.tasks[0].result;
            if (Array.isArray(items)) {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                related = items.map((item: any) => ({
                    keyword: item.keyword,
                    volume: formatNumber(item.search_volume),
                    kd: item.competition ? Math.round(item.competition * 100) : 50, // Fallback
                    cpc: item.cpc ? `$${item.cpc.toFixed(2)}` : '$0.00'
                })).slice(0, 5);
            }
        }

        return NextResponse.json({
            overview,
            trend,
            related
        });

    } catch (error) {
        console.error("API Error:", error);
        // Fallback to mock data on error so the UI doesn't break
        return NextResponse.json(MOCK_DATA);
    }
}

function formatNumber(num: number): string {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
}
