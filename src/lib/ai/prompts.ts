export function buildTrendPrompt(
  keyword: string,
  category: string,
  newsHeadlines: string[]
) {
  const headlinesText =
    newsHeadlines.length > 0
      ? `\n관련 뉴스:\n${newsHeadlines.map((h) => `- ${h}`).join("\n")}`
      : "";

  return `당신은 40대 한국인을 위한 트렌드 설명 전문가입니다.
아래 트렌드 키워드에 대해 JSON 형식으로 응답해 주세요.

키워드: ${keyword}
카테고리: ${category}${headlinesText}

응답 형식 (JSON만 출력):
{
  "title": "호기심을 유발하는 제목 (예: '두쫀크가 뭐야?')",
  "explanation": "40대가 이해하기 쉬운 2-3문장 설명. 비유나 비교를 활용해서 쉽게.",
  "usageExample": "실제 대화에서 자연스럽게 쓸 수 있는 예문 1개",
  "usageWrong": "40대가 잘못 사용할 수 있는 예문 (위험한 경우만, 아니면 null)",
  "dangerLevel": "safe | caution | danger (40대가 사용하기에 적절한지)",
  "emoji": "이 트렌드를 대표하는 이모지 1개"
}

dangerLevel 기준:
- safe: 40대가 자연스럽게 사용 가능
- caution: 상황에 따라 어색할 수 있음
- danger: 40대가 쓰면 민망함, 알기만 하세요`;
}
