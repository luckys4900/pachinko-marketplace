"use client";

import { useState, useMemo } from "react";
import { useAppStore } from "@/store";
import { MachineCard } from "@/components/MachineCard";
import { listings, MAKERS, CATEGORIES } from "@/data/mock";
import { cn } from "@/lib/utils";

const conditions = [
  { value: "all", label: "すべて" },
  { value: "S", label: "新品同様" },
  { value: "A", label: "美品" },
  { value: "B", label: "良品" },
  { value: "C", label: "使用感あり" },
];

const sortOptions = [
  { value: "newest", label: "新着順" },
  { value: "price_asc", label: "価格: 安い順" },
  { value: "price_desc", label: "価格: 高い順" },
  { value: "popular", label: "人気順" },
];

export default function SearchPage() {
  const { searchQuery, setSearchQuery, viewMode, setViewMode, sortBy, setSortBy } = useAppStore();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedMaker, setSelectedMaker] = useState("all");
  const [selectedCondition, setSelectedCondition] = useState("all");
  const [priceMin, setPriceMin] = useState("");
  const [priceMax, setPriceMax] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);

  const filtered = useMemo(() => {
    let result = listings.filter((l) => l.status === "active");
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter((l) =>
        l.machine.name.toLowerCase().includes(q) ||
        l.machine.maker.toLowerCase().includes(q) ||
        l.machine.modelNumber.toLowerCase().includes(q)
      );
    }
    if (selectedCategory !== "all") result = result.filter((l) => l.machine.category === selectedCategory);
    if (selectedMaker !== "all") result = result.filter((l) => l.machine.maker === selectedMaker);
    if (selectedCondition !== "all") result = result.filter((l) => l.condition === selectedCondition);
    if (priceMin) result = result.filter((l) => l.price >= parseInt(priceMin));
    if (priceMax) result = result.filter((l) => l.price <= parseInt(priceMax));

    switch (sortBy) {
      case "price_asc": result.sort((a, b) => a.price - b.price); break;
      case "price_desc": result.sort((a, b) => b.price - a.price); break;
      case "popular": result.sort((a, b) => b.views - a.views); break;
      default: result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }
    return result;
  }, [searchQuery, selectedCategory, selectedMaker, selectedCondition, priceMin, priceMax, sortBy]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Search header */}
      <div className="mb-8">
        <h1 className="text-3xl font-black text-[var(--text)]">台を探す</h1>
        <p className="text-[var(--text-muted)] mt-1">全国の中古パチンコ台からお探しの一台を</p>
      </div>

      {/* Mobile filter toggle */}
      <button onClick={() => setFilterOpen(!filterOpen)} className="lg:hidden w-full mb-4 px-4 py-3 rounded-xl border border-[var(--border)] bg-[var(--bg-card)] flex items-center justify-between">
        <span className="font-medium">フィルター・絞り込み</span>
        <svg className={cn("w-5 h-5 transition-transform", filterOpen && "rotate-180")} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      <div className="flex gap-8">
        {/* Sidebar Filters */}
        <aside className={cn(
          "lg:block lg:w-64 shrink-0 space-y-6",
          filterOpen ? "block w-full" : "hidden"
        )}>
          {/* Search */}
          <div>
            <label className="block text-sm font-semibold text-[var(--text)] mb-2">キーワード検索</label>
            <input
              type="text" placeholder="機種名・メーカー..."
              value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-[var(--border)] bg-[var(--bg)] text-[var(--text)] focus:outline-none focus:ring-2 focus:ring-[#FF6B35]"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-semibold text-[var(--text)] mb-2">カテゴリ</label>
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((c) => (
                <button key={c.value} onClick={() => setSelectedCategory(c.value)}
                  className={cn("px-3 py-1.5 rounded-full text-sm font-medium transition-colors",
                    selectedCategory === c.value ? "bg-[#FF6B35] text-white" : "bg-[var(--bg)] border border-[var(--border)] text-[var(--text)] hover:border-[#FF6B35]"
                  )}>
                  {c.label}
                </button>
              ))}
            </div>
          </div>

          {/* Maker */}
          <div>
            <label className="block text-sm font-semibold text-[var(--text)] mb-2">メーカー</label>
            <select value={selectedMaker} onChange={(e) => setSelectedMaker(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-[var(--border)] bg-[var(--bg)] text-[var(--text)] focus:outline-none focus:ring-2 focus:ring-[#FF6B35]">
              <option value="all">すべて</option>
              {MAKERS.map((m) => <option key={m} value={m}>{m}</option>)}
            </select>
          </div>

          {/* Condition */}
          <div>
            <label className="block text-sm font-semibold text-[var(--text)] mb-2">状態</label>
            <div className="flex flex-wrap gap-2">
              {conditions.map((c) => (
                <button key={c.value} onClick={() => setSelectedCondition(c.value)}
                  className={cn("px-3 py-1.5 rounded-full text-sm font-medium transition-colors",
                    selectedCondition === c.value ? "bg-[#FF6B35] text-white" : "bg-[var(--bg)] border border-[var(--border)] text-[var(--text)] hover:border-[#FF6B35]"
                  )}>
                  {c.label}
                </button>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div>
            <label className="block text-sm font-semibold text-[var(--text)] mb-2">価格帯</label>
            <div className="flex items-center gap-2">
              <input type="number" placeholder="最低" value={priceMin} onChange={(e) => setPriceMin(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-[var(--border)] bg-[var(--bg)] text-[var(--text)] focus:outline-none focus:ring-2 focus:ring-[#FF6B35] text-sm" />
              <span className="text-[var(--text-muted)]">〜</span>
              <input type="number" placeholder="最高" value={priceMax} onChange={(e) => setPriceMax(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-[var(--border)] bg-[var(--bg)] text-[var(--text)] focus:outline-none focus:ring-2 focus:ring-[#FF6B35] text-sm" />
            </div>
          </div>
        </aside>

        {/* Results */}
        <div className="flex-1 min-w-0">
          {/* Toolbar */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-[var(--border)]">
            <p className="text-sm text-[var(--text-muted)]">
              <span className="font-bold text-[var(--text)]">{filtered.length}</span> 件の出品
            </p>
            <div className="flex items-center gap-3">
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                className="px-3 py-2 rounded-lg border border-[var(--border)] bg-[var(--bg)] text-sm text-[var(--text)] focus:outline-none focus:ring-2 focus:ring-[#FF6B35]">
                {sortOptions.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
              </select>
              <div className="flex border border-[var(--border)] rounded-lg overflow-hidden">
                {(["grid", "list", "table"] as const).map((mode) => (
                  <button key={mode} onClick={() => setViewMode(mode)}
                    className={cn("px-3 py-2 text-sm transition-colors",
                      viewMode === mode ? "bg-[#FF6B35] text-white" : "bg-[var(--bg-card)] text-[var(--text-muted)] hover:bg-[var(--border)]"
                    )}>
                    {mode === "grid" ? "⊞" : mode === "list" ? "☰" : "⊞"}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Results Grid */}
          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-6xl mb-4">🔍</p>
              <p className="text-xl font-bold text-[var(--text)]">該当する台が見つかりません</p>
              <p className="text-[var(--text-muted)] mt-2">条件を変更してお試しください</p>
            </div>
          ) : viewMode === "table" ? (
            <div className="overflow-x-auto rounded-xl border border-[var(--border)]">
              <table className="w-full text-sm">
                <thead className="bg-[var(--bg)] border-b border-[var(--border)]">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold">機種名</th>
                    <th className="px-4 py-3 text-left font-semibold">メーカー</th>
                    <th className="px-4 py-3 text-left font-semibold">状態</th>
                    <th className="px-4 py-3 text-right font-semibold">価格</th>
                    <th className="px-4 py-3 text-left font-semibold">場所</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((l) => (
                    <tr key={l.id} className="border-b border-[var(--border)] hover:bg-[var(--bg)] transition-colors">
                      <td className="px-4 py-3">
                        <a href={`/machine/${l.machineId}`} className="font-medium text-[#FF6B35] hover:underline">{l.machine.name}</a>
                      </td>
                      <td className="px-4 py-3 text-[var(--text-muted)]">{l.machine.maker}</td>
                      <td className="px-4 py-3">
                        <span className={cn("px-2 py-0.5 rounded text-xs font-semibold",
                          l.condition === "S" ? "bg-emerald-100 text-emerald-700" :
                          l.condition === "A" ? "bg-blue-100 text-blue-700" :
                          l.condition === "B" ? "bg-amber-100 text-amber-700" :
                          "bg-red-100 text-red-700"
                        )}>{l.condition}</span>
                      </td>
                      <td className="px-4 py-3 text-right font-bold">{l.price.toLocaleString()}円</td>
                      <td className="px-4 py-3 text-[var(--text-muted)]">{l.location}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : viewMode === "list" ? (
            <div className="space-y-3">
              {filtered.map((l) => (
                <a key={l.id} href={`/machine/${l.machineId}`} className="flex gap-4 p-4 rounded-xl bg-[var(--bg-card)] border border-[var(--border)] hover:border-[#FF6B35] transition-all group">
                  <img src={l.machine.image} alt={l.machine.name} className="w-32 h-24 rounded-lg object-cover shrink-0" />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-[var(--text)] group-hover:text-[#FF6B35] transition-colors">{l.machine.name}</h3>
                    <p className="text-sm text-[var(--text-muted)] mt-1">{l.machine.maker} / {l.location}</p>
                    <div className="flex items-center gap-4 mt-2">
                      <span className="text-lg font-bold text-[#FF6B35]">{l.price.toLocaleString()}円</span>
                      <span className={cn("px-2 py-0.5 rounded text-xs font-semibold",
                        l.condition === "S" ? "bg-emerald-100 text-emerald-700" : "bg-blue-100 text-blue-700"
                      )}>{l.condition}</span>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {filtered.map((l) => (
                <MachineCard
                  key={l.id}
                  href={`/machine/${l.machineId}`}
                  image={l.machine.image}
                  title={l.machine.name}
                  subtitle={`${l.machine.maker} / ${l.location}`}
                  price={l.price}
                  condition={l.condition}
                  meta={`${l.views} views`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
