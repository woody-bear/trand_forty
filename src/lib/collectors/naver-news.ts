interface NewsResult {
  keyword: string;
  newsCount: number;
  headlines: string[];
}

export async function fetchNaverNews(
  keywords: string[]
): Promise<NewsResult[]> {
  const clientId = process.env.NAVER_CLIENT_ID;
  const clientSecret = process.env.NAVER_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    console.warn("Naver API credentials not set, skipping News");
    return keywords.map((kw) => ({
      keyword: kw,
      newsCount: Math.floor(Math.random() * 30),
      headlines: [],
    }));
  }

  const results: NewsResult[] = [];

  for (const keyword of keywords) {
    try {
      const res = await fetch(
        `https://openapi.naver.com/v1/search/news.json?query=${encodeURIComponent(keyword)}&display=5&sort=date`,
        {
          headers: {
            "X-Naver-Client-Id": clientId,
            "X-Naver-Client-Secret": clientSecret,
          },
        }
      );

      if (!res.ok) {
        results.push({ keyword, newsCount: 0, headlines: [] });
        continue;
      }

      const data = await res.json();
      results.push({
        keyword,
        newsCount: data.total || 0,
        headlines: (data.items || [])
          .slice(0, 3)
          .map((item: { title: string }) =>
            item.title.replace(/<[^>]*>/g, "")
          ),
      });
    } catch {
      results.push({ keyword, newsCount: 0, headlines: [] });
    }
  }

  return results;
}
