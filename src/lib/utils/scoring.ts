export function calculateCombinedScore(
  naverScore: number,
  newsCount: number,
  isRecent: boolean = true
): number {
  const normalizedNaver = Math.min(naverScore / 100, 1) * 100;
  const normalizedNews = Math.min(newsCount / 100, 1) * 100;
  const recencyBonus = isRecent ? 10 : 0;

  return normalizedNaver * 0.6 + normalizedNews * 0.3 + recencyBonus;
}
