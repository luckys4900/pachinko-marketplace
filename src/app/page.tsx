"use client";

import { MachineCard, AuctionCard } from "@/components/MachineCard";
import { Counter, SectionTitle } from "@/components/ui";
import { listings, auctions, machines } from "@/data/mock";
import Link from "next/link";

const heroSlides = [
  { title: "新台入荷！", subtitle: "2024年最新モデル続々入荷中", cta: "新着台を見る", href: "/search?sort=newest", image: "https://placehold.co/1200x500/FF6B35/FFFFFF?text=新台入荷" },
  { title: "オークション開催中", subtitle: "お得な価格で落札するチャンス", cta: "オークション一覧", href: "/auctions", image: "https://placehold.co/1200x500/1A1A2E/FFD700?text=オークション" },
  { title: "無料出品キャンペーン", subtitle: "今なら出品手数料が無料！", cta: "出品する", href: "/sell", image: "https://placehold.co/1200x500/FFD700/1A1A2E?text=無料出品" },
];

const stats = [
  { label: "出品台数", value: 2847, suffix: "台" },
  { label: "累計取引数", value: 15632, suffix: "件" },
  { label: "登録会員数", value: 8945, suffix: "人" },
  { label: "満足度", value: 98, suffix: "%" },
];

export default function HomePage() {
  const activeListings = listings.filter((l) => l.status === "active");
  const newListings = [...activeListings].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0, 8);
  const popularListings = [...activeListings].sort((a, b) => b.views - a.views).slice(0, 10);
  const activeAuctions = auctions.filter((a) => a.status === "active");

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#1A1A2E] via-[#16213E] to-[#0F3460] text-white">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-64 h-64 bg-[#FF6B35] rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#FFD700] rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="animate-fade-in-up">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight">
                パチンコ台の
                <br />
                <span className="bg-gradient-to-r from-[#FF6B35] to-[#FFD700] bg-clip-text text-transparent">
                  新しい売買
                </span>
              </h1>
              <p className="mt-4 text-lg text-gray-300 leading-relaxed max-w-lg">
                全国の中古パチンコ台を簡単検索・安全取引。オークション形式でもお得に購入できます。
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link href="/search" className="px-8 py-3 rounded-full bg-gradient-to-r from-[#FF6B35] to-[#E55A2B] text-white font-bold text-lg shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all">
                  台を探す
                </Link>
                <Link href="/sell" className="px-8 py-3 rounded-full border-2 border-[#FFD700] text-[#FFD700] font-bold text-lg hover:bg-[#FFD700]/10 transition-all">
                  出品する
                </Link>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="grid grid-cols-2 gap-3">
                {heroSlides.slice(0, 2).map((slide, i) => (
                  <Link key={i} href={slide.href} className={`rounded-2xl overflow-hidden shadow-2xl card-hover ${i === 0 ? "col-span-2" : ""}`}>
                    <div className="relative aspect-video bg-gradient-to-br from-[#FF6B35]/20 to-[#FFD700]/20 flex items-center justify-center">
                      <div className="text-center p-4">
                        <p className="text-xl font-bold">{slide.title}</p>
                        <p className="text-sm text-gray-300 mt-1">{slide.subtitle}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="relative -mt-8 z-10 max-w-5xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-[var(--bg-card)] rounded-2xl p-6 text-center shadow-xl border border-[var(--border)]">
              <p className="text-3xl sm:text-4xl font-black text-[#FF6B35]">
                <Counter end={stat.value} suffix={stat.suffix} />
              </p>
              <p className="text-sm text-[var(--text-muted)] mt-2 font-medium">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Popular Ranking */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <SectionTitle title="人気ランキング" subtitle="週間アクセス数 TOP10" action={{ label: "すべて見る", href: "/search?sort=popular" }} />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {popularListings.slice(0, 10).map((listing, i) => (
            <div key={listing.id} className="relative">
              <div className={`absolute -top-1 -left-1 z-10 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shadow-lg ${
                i < 3 ? "bg-gradient-to-br from-[#FFD700] to-[#FF6B35] text-white" : "bg-[var(--bg-card)] text-[var(--text)] border border-[var(--border)]"
              }`}>
                {i + 1}
              </div>
              <MachineCard
                href={`/machine/${listing.machineId}`}
                image={listing.machine.image}
                title={listing.machine.name}
                subtitle={listing.machine.maker}
                price={listing.price}
                condition={listing.condition}
                meta={`${listing.views} views`}
              />
            </div>
          ))}
        </div>
      </section>

      {/* New Arrivals */}
      <section className="bg-[var(--bg)] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionTitle title="新着台" subtitle="最新出品情報" action={{ label: "すべて見る", href: "/search?sort=newest" }} />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {newListings.map((listing) => (
              <MachineCard
                key={listing.id}
                href={`/machine/${listing.machineId}`}
                image={listing.machine.image}
                title={listing.machine.name}
                subtitle={`${listing.machine.maker} / ${listing.location}`}
                price={listing.price}
                condition={listing.condition}
                badge="NEW"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Active Auctions */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <SectionTitle title="オークション開催中" subtitle="入札して安くゲット！" action={{ label: "すべて見る", href: "/auctions" }} />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {activeAuctions.map((auction) => (
            <AuctionCard
              key={auction.id}
              href={`/auction/${auction.id}`}
              image={auction.machine.image}
              title={auction.machine.name}
              currentPrice={auction.currentPrice}
              endTime={auction.endDate}
              bidCount={auction.bids.length}
              watchers={auction.watchers}
            />
          ))}
        </div>
      </section>

      {/* Category Browse */}
      <section className="bg-gradient-to-br from-[#1A1A2E] to-[#16213E] py-16 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionTitle title="カテゴリから探す" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "CR機", desc: "高スペック・大当たり", icon: "🎰", count: 45 },
              { label: "デジパチ", desc: "デジタル確変機", icon: "💎", count: 23 },
              { label: "ライトミドル", desc: "お手頃価格帯", icon: "⭐", count: 18 },
              { label: "外伝", desc: "大当たり性能重視", icon: "🔥", count: 12 },
            ].map((cat) => (
              <Link key={cat.label} href={`/search?category=${cat.label}`} className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-[#FF6B35]/50 transition-all group">
                <div className="text-3xl mb-3">{cat.icon}</div>
                <h3 className="font-bold text-lg group-hover:text-[#FF6B35] transition-colors">{cat.label}</h3>
                <p className="text-sm text-gray-400 mt-1">{cat.desc}</p>
                <p className="text-xs text-[#FF6B35] mt-2">{cat.count}件の出品</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="rounded-3xl bg-gradient-to-r from-[#FF6B35] to-[#E55A2B] p-8 sm:p-12 text-white text-center shadow-2xl">
          <h2 className="text-3xl sm:text-4xl font-black">不要な台を売りませんか？</h2>
          <p className="mt-3 text-lg text-white/80">無料で出品できます。あなたの台を全国の買い手に。</p>
          <Link href="/sell" className="inline-block mt-6 px-10 py-4 rounded-full bg-white text-[#FF6B35] font-bold text-lg shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all">
            無料で出品する
          </Link>
        </div>
      </section>
    </div>
  );
}
