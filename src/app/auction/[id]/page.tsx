"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { auctions } from "@/data/mock";
import { CountdownTimer } from "@/components/ui";
import { cn, formatPrice } from "@/lib/utils";

export default function AuctionDetailPage() {
  const params = useParams();
  const auctionId = params.id as string;
  const auction = auctions.find((a) => a.id === auctionId) || auctions[0];
  const [bidAmount, setBidAmount] = useState(auction.currentPrice + 10000);
  const [autoBidMax, setAutoBidMax] = useState("");
  const [showAutoBid, setShowAutoBid] = useState(false);
  const [bidPlaced, setBidPlaced] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);

  const minBid = auction.currentPrice + 10000;
  const sortedBids = [...auction.bids].sort((a, b) => b.amount - a.amount);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-[var(--text-muted)] mb-6">
        <a href="/" className="hover:text-[#FF6B35]">ホーム</a>
        <span>/</span>
        <a href="/auctions" className="hover:text-[#FF6B35]">オークション</a>
        <span>/</span>
        <span className="text-[var(--text)]">{auction.machine.name}</span>
      </nav>

      <div className="grid lg:grid-cols-5 gap-8">
        {/* Left: Images */}
        <div className="lg:col-span-3 space-y-4">
          <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-gray-100">
            <img src={auction.images[selectedImage]} alt={auction.machine.name} className="w-full h-full object-cover" />
            <span className="absolute top-4 left-4 px-4 py-2 bg-[#FFD700] text-[#1A1A2E] font-bold rounded-full shadow-lg text-sm">
              オークション開催中
            </span>
          </div>
          <div className="flex gap-3">
            {auction.images.map((img, i) => (
              <button key={i} onClick={() => setSelectedImage(i)}
                className={cn("shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-all",
                  selectedImage === i ? "border-[#FF6B35]" : "border-[var(--border)]"
                )}>
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>

          {/* Bid History */}
          <div className="mt-8 rounded-2xl border border-[var(--border)] overflow-hidden">
            <div className="px-6 py-4 bg-[var(--bg)] border-b border-[var(--border)]">
              <h3 className="font-bold text-lg">入札履歴 ({auction.bids.length}件)</h3>
            </div>
            <div className="divide-y divide-[var(--border)]">
              {sortedBids.slice(0, 10).map((bid, i) => (
                <div key={bid.id} className="flex items-center justify-between px-6 py-3">
                  <div className="flex items-center gap-3">
                    <span className={cn("w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold",
                      i === 0 ? "bg-[#FFD700] text-[#1A1A2E]" : "bg-[var(--bg)] text-[var(--text-muted)] border border-[var(--border)]"
                    )}>{i + 1}</span>
                    <div>
                      <p className="font-medium text-sm">{bid.bidderName}</p>
                      <p className="text-xs text-[var(--text-muted)]">{new Date(bid.createdAt).toLocaleString("ja-JP")}</p>
                    </div>
                  </div>
                  <p className={cn("font-bold", i === 0 ? "text-[#FF6B35]" : "text-[var(--text)]")}>
                    {formatPrice(bid.amount)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Bidding Panel */}
        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-6 sticky top-24">
            <h2 className="text-2xl font-black text-[var(--text)]">{auction.machine.name}</h2>
            <p className="text-sm text-[var(--text-muted)] mt-1">{auction.machine.maker} / {auction.sellerName}</p>

            {/* Countdown */}
            <div className="mt-6 p-4 rounded-xl bg-[var(--bg)] border border-[var(--border)]">
              <p className="text-xs text-[var(--text-muted)] mb-2 text-center">残り時間</p>
              <div className="flex justify-center">
                <CountdownTimer endDate={auction.endDate} />
              </div>
            </div>

            {/* Current Price */}
            <div className="mt-6">
              <p className="text-sm text-[var(--text-muted)]">現在価格</p>
              <p className="text-4xl font-black text-[#FF6B35] mt-1">{formatPrice(auction.currentPrice)}</p>
              <p className="text-sm text-[var(--text-muted)] mt-1">
                開始価格: {formatPrice(auction.startPrice)} / 入札数: {auction.bids.length} / ウォッチ: {auction.watchers}
              </p>
            </div>

            {/* Buy Now */}
            {auction.buyNowPrice && (
              <button className="w-full mt-6 py-3 rounded-xl bg-gradient-to-r from-[#FFD700] to-[#FF6B35] text-white font-bold text-lg shadow-lg hover:shadow-xl transition-all">
                即落札 {formatPrice(auction.buyNowPrice)}
              </button>
            )}

            {/* Bid Form */}
            <div className="mt-6 pt-6 border-t border-[var(--border)]">
              <label className="block text-sm font-semibold mb-2">入札金額</label>
              <div className="relative">
                <input
                  type="number"
                  value={bidAmount}
                  onChange={(e) => setBidAmount(parseInt(e.target.value) || minBid)}
                  min={minBid}
                  step={10000}
                  className="w-full pl-4 pr-12 py-3 rounded-xl border border-[var(--border)] bg-[var(--bg)] text-lg font-bold text-[var(--text)] focus:outline-none focus:ring-2 focus:ring-[#FF6B35]"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)]">円</span>
              </div>
              <p className="text-xs text-[var(--text-muted)] mt-1">最低入札額: {formatPrice(minBid)}</p>

              <button
                onClick={() => setBidPlaced(true)}
                disabled={bidAmount < minBid}
                className={cn("w-full mt-4 py-3 rounded-xl font-bold text-lg transition-all",
                  bidAmount >= minBid
                    ? "bg-gradient-to-r from-[#FF6B35] to-[#E55A2B] text-white shadow-lg hover:shadow-xl"
                    : "bg-gray-200 text-gray-400 cursor-not-allowed"
                )}>
                入札する
              </button>

              {bidPlaced && (
                <div className="mt-3 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm text-center">
                  入札を受け付けました！（デモ）
                </div>
              )}

              {/* Auto Bid Toggle */}
              <button onClick={() => setShowAutoBid(!showAutoBid)} className="w-full mt-4 text-sm text-[#FF6B35] font-medium hover:underline">
                {showAutoBid ? "自動入札を閉じる" : "自動入札を設定する"}
              </button>

              {showAutoBid && (
                <div className="mt-3 p-4 rounded-xl bg-[var(--bg)] border border-[var(--border)] space-y-3">
                  <p className="text-sm text-[var(--text-muted)]">上限価格を設定すると、他の入札者がいても自動で入札します</p>
                  <input
                    type="number"
                    placeholder="上限価格を入力"
                    value={autoBidMax}
                    onChange={(e) => setAutoBidMax(e.target.value)}
                    className="w-full px-4 py-2 rounded-lg border border-[var(--border)] bg-[var(--bg-card)] text-[var(--text)] focus:outline-none focus:ring-2 focus:ring-[#FF6B35]"
                  />
                  <button className="w-full py-2 rounded-lg bg-[#1A1A2E] text-white font-semibold text-sm hover:bg-[#16213E] transition-colors">
                    自動入札を有効にする
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
