interface NaverDatalabResult {
  keyword: string;
  score: number;
}

export async function fetchNaverDatalab(
  keywords: string[]
): Promise<NaverDatalabResult[]> {
  const clientId = process.env.NAVER_CLIENT_ID;
  const clientSecret = process.env.NAVER_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    console.warn("Naver API credentials not set, skipping DataLab");
    return keywords.map((kw) => ({ keyword: kw, score: Math.random() * 100 }));
  }

  const endDate = new Date();
  const startDate = new Date();
  startDate.setDate(endDate.getDate() - 7);

  const fmt = (d: Date) => d.toISOString().split("T")[0];

  const keywordGroups = keywords.slice(0, 5).map((kw) => ({
    groupName: kw,
    keywords: [kw],
  }));

  try {
    const res = await fetch("https://openapi.naver.com/v1/datalab/search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Naver-Client-Id": clientId,
        "X-Naver-Client-Secret": clientSecret,
      },
      body: JSON.stringify({
        startDate: fmt(startDate),
        endDate: fmt(endDate),
        timeUnit: "date",
        keywordGroups,
      }),
    });

    if (!res.ok) {
      console.error("Naver DataLab error:", res.status);
      return keywords.map((kw) => ({ keyword: kw, score: 50 }));
    }

    const data = await res.json();
    return (data.results || []).map(
      (r: { title: string; data: { ratio: number }[] }) => ({
        keyword: r.title,
        score:
          r.data.length > 0
            ? r.data.reduce(
                (sum: number, d: { ratio: number }) => sum + d.ratio,
                0
              ) / r.data.length
            : 0,
      })
    );
  } catch (err) {
    console.error("Naver DataLab fetch error:", err);
    return keywords.map((kw) => ({ keyword: kw, score: 50 }));
  }
}
