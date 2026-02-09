import { getCategoryBySlug } from "@/lib/constants/categories";

export function CategoryBadge({ slug }: { slug: string }) {
  const cat = getCategoryBySlug(slug);
  if (!cat) return null;

  return (
    <span
      className="inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium"
      style={{
        backgroundColor: `${cat.color}15`,
        color: cat.color,
      }}
    >
      {cat.emoji} {cat.nameKo}
    </span>
  );
}
