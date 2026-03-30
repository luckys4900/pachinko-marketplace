"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { machines, listings, priceHistories } from "@/data/mock";
import { CountdownTimer, Badge } from "@/components/ui";
import { cn, formatPrice, getConditionLabel } from "@/lib/utils";

export default function MachineDetailPage() {
  const params = useParams();
  const machineId = params.id as string;
  const machine = machines.find((m) => m.id === machineId) || machines[0];
  const machineListings = listings.filter((l) => l.machineId === machineId && l.status === "active");
  const history = priceHistories[machineId] || [];
  const [selectedImage, setSelectedImage] = useState(0);
  const [activeTab, setActiveTab] = useState<"spec" | "market" | "listings">("spec");

  const avgPrice = machineListings.length > 0
    ? Math.round(machineListings.reduce((s, l) => s + l.price, 0) / machineListings.length)
    : 0;
  const minPrice = machineListings.length > 0 ? Math.min(...machineListings.map((l) => l.price)) : 0;
  const maxPrice = machineListings.length > 0 ? Math.max(...machineListings.map((l) => l.price)) : 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-[var(--text-muted)] mb-6">
        <a href="/" className="hover:text-[#FF6B35]">ホーム</a>
        <span>/</span>
        <a href="/search" className="hover:text-[#FF6B35]">検索</a>
        <span>/</span>
        <span className="text-[var(--text)]">{machine.name}</span>
      </nav>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Image Gallery */}
        <div className="space-y-4">
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-gray-100">
            <img src={machine.images[selectedImage]} alt={machine.name} className="w-full h-full object-cover" />
          </div>
          <div className="flex gap-3 overflow-x-auto pb-2">
            {machine.images.map((img, i) => (
              <button key={i} onClick={() => setSelectedImage(i)}
                className={cn("shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-all",
                  selectedImage === i ? "border-[#FF6B35] shadow-lg" : "border-[var(--border)] hover:border-[#FF6B35]/50"
                )}>
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Info */}
        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Badge variant="success">{machine.category}</Badge>
              <span className="text-sm text-[var(--text-muted)]">{machine.maker}</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-[var(--text)]">{machine.name}</h1>
            <p className="text-[var(--text-muted)] mt-2">{machine.description}</p>
          </div>

          {/* Price summary */}
          {machineListings.length > 0 && (
            <div className="grid grid-cols-3 gap-4 p-4 rounded-2xl bg-[var(--bg-card)] border border-[var(--border)]">
              <div className="text-center">
                <p className="text-xs text-[var(--text-muted)]">最低価格</p>
                <p className="text-lg font-bold text-[#FF6B35]">{formatPrice(minPrice)}</p>
              </div>
              <div className="text-center border-x border-[var(--border)]">
                <p className="text-xs text-[var(--text-muted)]">平均価格</p>
                <p className="text-lg font-bold text-[var(--text)]">{formatPrice(avgPrice)}</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-[var(--text-muted)]">最高価格</p>
                <p className="text-lg font-bold text-[var(--text-muted)]">{formatPrice(maxPrice)}</p>
              </div>
            </div>
          )}

          <div className="flex gap-3">
            <a href="/search" className="flex-1 py-3 rounded-xl bg-gradient-to-r from-[#FF6B35] to-[#E55A2B] text-white font-bold text-center shadow-lg hover:shadow-xl transition-all">
              この台を検索 ({machineListings.length}件)
            </a>
          </div>

          {/* Quick specs */}
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: "通常確率", value: `1/${machine.probability.normal}` },
              { label: "特化確率", value: `1/${machine.probability.special}` },
              { label: "賞球数", value: `${machine.ballsPer}個` },
              { label: "カウント", value: `${machine.count}個` },
            ].map((spec) => (
              <div key={spec.label} className="p-3 rounded-xl bg-[var(--bg)] border border-[var(--border)]">
                <p className="text-xs text-[var(--text-muted)]">{spec.label}</p>
                <p className="font-bold text-[var(--text)]">{spec.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-12">
        <div className="flex gap-1 border-b border-[var(--border)] mb-8">
          {([
            { key: "spec", label: "スペック詳細" },
            { key: "market", label: "相場推移" },
            { key: "listings", label: `出品一覧 (${machineListings.length})` },
          ] as const).map((tab) => (
            <button key={tab.key} onClick={() => setActiveTab(tab.key)}
              className={cn("px-6 py-3 text-sm font-semibold transition-colors border-b-2 -mb-[1px]",
                activeTab === tab.key
                  ? "text-[#FF6B35] border-[#FF6B35]"
                  : "text-[var(--text-muted)] border-transparent hover:text-[var(--text)]"
              )}>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Spec Tab */}
        {activeTab === "spec" && (
          <div className="grid md:grid-cols-2 gap-8">
            <div className="rounded-2xl border border-[var(--border)] overflow-hidden">
              <table className="w-full text-sm">
                <tbody>
                  {[
                    ["機種名", machine.name],
                    ["メーカー", machine.maker],
                    ["型番", machine.modelNumber],
                    ["発売年", `${machine.releaseYear}年`],
                    ["カテゴリ", machine.category],
                    ["通常確率", `1/${machine.probability.normal}`],
                    ["特化確率", `1/${machine.probability.special}`],
                    ["賞球数", `${machine.ballsPer}個`],
                    ["カウント", `${machine.count}個`],
                    ["大当たり比率", machine.hitRatio],
                  ].map(([label, value]) => (
                    <tr key={label} className="border-b border-[var(--border)] last:border-0">
                      <td className="px-4 py-3 font-semibold bg-[var(--bg)] text-[var(--text)] w-1/3">{label}</td>
                      <td className="px-4 py-3 text-[var(--text-muted)]">{value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-bold">機種説明</h3>
              <p className="text-[var(--text-muted)] leading-relaxed">{machine.description}</p>
              <p className="text-[var(--text-muted)] leading-relaxed">
                本機種は{machine.releaseYear}年に{machine.maker}から発売された{machine.category}機です。
                通常時確率は1/{machine.probability.normal}、大当たり後の特化ゾーンでは1/{machine.probability.special}に変動します。
              </p>
            </div>
          </div>
        )}

        {/* Market Tab */}
        {activeTab === "market" && (
          <div className="rounded-2xl border border-[var(--border)] p-6">
            <h3 className="text-lg font-bold mb-6">価格相場推移</h3>
            {history.length > 0 ? (
              <div className="space-y-4">
                <div className="h-64 flex items-end gap-2 border-b border-[var(--border)] pb-4">
                  {history.map((h, i) => {
                    const maxP = Math.max(...history.map((x) => x.price));
                    const heightPct = (h.price / maxP) * 100;
                    return (
                      <div key={i} className="flex-1 flex flex-col items-center gap-1">
                        <span className="text-xs text-[var(--text-muted)]">{(h.price / 10000).toFixed(0)}万</span>
                        <div className="w-full rounded-t-lg bg-gradient-to-t from-[#FF6B35] to-[#FFD700]" style={{ height: `${heightPct}%` }} />
                        <span className="text-xs text-[var(--text-muted)]">{i + 1}月</span>
                      </div>
                    );
                  })}
                </div>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div><p className="text-xs text-[var(--text-muted)]">最高取引価格</p><p className="font-bold text-[#EF4444]">{formatPrice(Math.max(...history.map((h) => h.price)))}</p></div>
                  <div><p className="text-xs text-[var(--text-muted)]">平均取引価格</p><p className="font-bold text-[#FF6B35]">{formatPrice(Math.round(history.reduce((s, h) => s + h.price, 0) / history.length))}</p></div>
                  <div><p className="text-xs text-[var(--text-muted)]">最低取引価格</p><p className="font-bold text-[#10B981]">{formatPrice(Math.min(...history.map((h) => h.price)))}</p></div>
                </div>
              </div>
            ) : (
              <p className="text-center text-[var(--text-muted)] py-12">相場データがありません</p>
            )}
          </div>
        )}

        {/* Listings Tab */}
        {activeTab === "listings" && (
          <div className="space-y-4">
            {machineListings.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-4xl mb-3">📭</p>
                <p className="text-lg font-bold text-[var(--text)]">現在出品がありません</p>
                <p className="text-[var(--text-muted)] mt-1">出品されたら通知を受け取れます</p>
              </div>
            ) : (
              machineListings.map((l) => (
                <div key={l.id} className="flex gap-4 p-4 rounded-2xl bg-[var(--bg-card)] border border-[var(--border)] hover:border-[#FF6B35] transition-all">
                  <img src={l.images[0]} alt={l.machine.name} className="w-28 h-20 rounded-xl object-cover shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="font-bold text-[var(--text)]">{l.conditionDetail}</h3>
                        <p className="text-sm text-[var(--text-muted)] mt-1">出品者: {l.sellerName} / {l.location}</p>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="text-xl font-bold text-[#FF6B35]">{formatPrice(l.price)}</p>
                        <span className={cn("inline-block px-2 py-0.5 rounded text-xs font-semibold mt-1",
                          l.condition === "S" ? "bg-emerald-100 text-emerald-700" :
                          l.condition === "A" ? "bg-blue-100 text-blue-700" :
                          l.condition === "B" ? "bg-amber-100 text-amber-700" :
                          "bg-red-100 text-red-700"
                        )}>{getConditionLabel(l.condition)}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 mt-3">
                      <span className="text-xs text-[var(--text-muted)]">{l.views} views</span>
                      <button className="ml-auto px-4 py-2 rounded-lg bg-[#FF6B35] text-white text-sm font-bold hover:bg-[#E55A2B] transition-colors">
                        カートに追加
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}
