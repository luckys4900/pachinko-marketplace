import Link from "next/link";
import { cn } from "@/lib/utils";

interface CardProps {
  href: string;
  image: string;
  title: string;
  subtitle?: string;
  price?: number;
  condition?: string;
  badge?: string;
  meta?: string;
  className?: string;
}

export function MachineCard({ href, image, title, subtitle, price, condition, badge, meta, className }: CardProps) {
  return (
    <Link href={href} className={cn("block rounded-2xl overflow-hidden bg-[var(--bg-card)] border border-[var(--border)] card-hover group", className)}>
      <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
        <img src={image} alt={title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        {badge && (
          <span className="absolute top-3 left-3 px-3 py-1 bg-[#FF6B35] text-white text-xs font-bold rounded-full shadow-lg">
            {badge}
          </span>
        )}
        {condition && (
          <span className={cn("absolute top-3 right-3 px-2 py-1 text-xs font-semibold rounded-lg", getConditionBadgeClass(condition))}>
            {condition}
          </span>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-bold text-[var(--text)] text-sm sm:text-base truncate">{title}</h3>
        {subtitle && <p className="text-xs text-[var(--text-muted)] mt-1 truncate">{subtitle}</p>}
        <div className="flex items-end justify-between mt-3">
          {price !== undefined && (
            <p className="text-lg font-bold text-[#FF6B35]">{price.toLocaleString()}<span className="text-xs font-normal text-[var(--text-muted)]">円</span></p>
          )}
          {meta && <p className="text-xs text-[var(--text-muted)]">{meta}</p>}
        </div>
      </div>
    </Link>
  );
}

export function AuctionCard({ href, image, title, currentPrice, endTime, bidCount, watchers }: {
  href: string; image: string; title: string; currentPrice: number; endTime: string; bidCount: number; watchers: number;
}) {
  const remaining = new Date(endTime).getTime() - Date.now();
  const isUrgent = remaining < 86400000;
  const days = Math.floor(remaining / 86400000);
  const hours = Math.floor((remaining % 86400000) / 3600000);

  return (
    <Link href={href} className="block rounded-2xl overflow-hidden bg-[var(--bg-card)] border border-[var(--border)] card-hover group">
      <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
        <img src={image} alt={title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        <span className={cn("absolute top-3 left-3 px-3 py-1 text-xs font-bold rounded-full shadow-lg",
          isUrgent ? "bg-[#EF4444] text-white animate-pulse" : "bg-[#FFD700] text-[#1A1A2E]"
        )}>
          {isUrgent ? "間もなく終了" : "オークション"}
        </span>
      </div>
      <div className="p-4">
        <h3 className="font-bold text-[var(--text)] text-sm sm:text-base truncate">{title}</h3>
        <div className="mt-2 space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-xs text-[var(--text-muted)]">現在価格</span>
            <span className="text-lg font-bold text-[#FF6B35]">{currentPrice.toLocaleString()}円</span>
          </div>
          <div className="flex items-center justify-between text-xs text-[var(--text-muted)]">
            <span>残り {days > 0 ? `${days}日` : ""}{hours}時間</span>
            <span>{bidCount}入札 / {watchers}ウォッチ</span>
          </div>
        </div>
      </div>
    </Link>
  );
}

function getConditionBadgeClass(condition: string) {
  const map: Record<string, string> = {
    S: "bg-emerald-500 text-white",
    A: "bg-blue-500 text-white",
    B: "bg-amber-500 text-white",
    C: "bg-red-500 text-white",
  };
  return map[condition] || "bg-gray-500 text-white";
}
