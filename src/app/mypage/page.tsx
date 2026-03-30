"use client";

import { useState } from "react";
import { listings, auctions } from "@/data/mock";
import { cn, formatPrice, formatDate } from "@/lib/utils";

const tabs = [
  { key: "listings", label: "出品管理" },
  { key: "bids", label: "入札履歴" },
  { key: "purchases", label: "取引履歴" },
  { key: "profile", label: "プロフィール" },
];

export default function MyPage() {
  const [activeTab, setActiveTab] = useState("listings");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLogin, setShowLogin] = useState(true);

  const myListings = listings.slice(0, 5);
  const myBids = auctions.slice(0, 3);

  if (!isLoggedIn) {
    return (
      <div className="max-w-md mx-auto px-4 sm:px-6 py-16">
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-[#FF6B35] to-[#FFD700] flex items-center justify-center text-white text-2xl font-bold mb-4">P</div>
          <h1 className="text-2xl font-black text-[var(--text)]">{showLogin ? "ログイン" : "新規登録"}</h1>
          <p className="text-[var(--text-muted)] mt-1">Pachinko Marketへようこそ</p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold mb-2">メールアドレス</label>
            <input type="email" placeholder="example@email.com" className="w-full px-4 py-3 rounded-xl border border-[var(--border)] bg-[var(--bg)] text-[var(--text)] focus:outline-none focus:ring-2 focus:ring-[#FF6B35]" />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">パスワード</label>
            <input type="password" placeholder="パスワード" className="w-full px-4 py-3 rounded-xl border border-[var(--border)] bg-[var(--bg)] text-[var(--text)] focus:outline-none focus:ring-2 focus:ring-[#FF6B35]" />
          </div>

          {!showLogin && (
            <div>
              <label className="block text-sm font-semibold mb-2">ユーザー名</label>
              <input type="text" placeholder="ユーザー名" className="w-full px-4 py-3 rounded-xl border border-[var(--border)] bg-[var(--bg)] text-[var(--text)] focus:outline-none focus:ring-2 focus:ring-[#FF6B35]" />
            </div>
          )}

          <button onClick={() => setIsLoggedIn(true)}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-[#FF6B35] to-[#E55A2B] text-white font-bold text-lg shadow-lg hover:shadow-xl transition-all">
            {showLogin ? "ログイン" : "登録する"}
          </button>

          <p className="text-center text-sm text-[var(--text-muted)]">
            {showLogin ? "アカウントをお持ちでない方は" : "アカウントをお持ちの方は"}
            <button onClick={() => setShowLogin(!showLogin)} className="text-[#FF6B35] font-semibold ml-1 hover:underline">
              {showLogin ? "新規登録" : "ログイン"}
            </button>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* User header */}
      <div className="flex items-center gap-4 mb-8 p-6 rounded-2xl bg-[var(--bg-card)] border border-[var(--border)]">
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#FF6B35] to-[#FFD700] flex items-center justify-center text-white text-2xl font-bold">
          U
        </div>
        <div>
          <h1 className="text-2xl font-black text-[var(--text)]">ユーザーさん</h1>
          <p className="text-[var(--text-muted)]">user@example.com / 登録日: 2024-01-15</p>
        </div>
        <div className="ml-auto flex items-center gap-6 text-center">
          <div>
            <p className="text-2xl font-bold text-[#FF6B35]">5</p>
            <p className="text-xs text-[var(--text-muted)]">出品中</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-[#10B981]">12</p>
            <p className="text-xs text-[var(--text-muted)]">取引完了</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-[#FFD700]">4.8</p>
            <p className="text-xs text-[var(--text-muted)]">評価</p>
          </div>
        </div>
        <button onClick={() => setIsLoggedIn(false)} className="ml-4 px-4 py-2 rounded-lg border border-[var(--border)] text-sm hover:bg-[var(--bg)] transition">
          ログアウト
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 border-b border-[var(--border)] mb-8">
        {tabs.map((tab) => (
          <button key={tab.key} onClick={() => setActiveTab(tab.key)}
            className={cn("px-6 py-3 text-sm font-semibold transition-colors border-b-2 -mb-[1px]",
              activeTab === tab.key ? "text-[#FF6B35] border-[#FF6B35]" : "text-[var(--text-muted)] border-transparent hover:text-[var(--text)]"
            )}>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Listings Tab */}
      {activeTab === "listings" && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <p className="text-sm text-[var(--text-muted)]">{myListings.length}件の出品</p>
            <a href="/sell" className="px-4 py-2 rounded-lg bg-[#FF6B35] text-white text-sm font-bold hover:bg-[#E55A2B] transition">
              新規出品
            </a>
          </div>
          {myListings.map((l) => (
            <div key={l.id} className="flex gap-4 p-4 rounded-xl bg-[var(--bg-card)] border border-[var(--border)]">
              <img src={l.machine.image} alt="" className="w-24 h-18 rounded-lg object-cover shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-bold text-[var(--text)]">{l.machine.name}</h3>
                    <p className="text-sm text-[var(--text-muted)]">{formatPrice(l.price)} / {l.condition}ランク</p>
                  </div>
                  <span className={cn("px-2 py-1 rounded text-xs font-semibold",
                    l.status === "active" ? "bg-emerald-100 text-emerald-700" :
                    l.status === "sold" ? "bg-gray-100 text-gray-700" :
                    "bg-amber-100 text-amber-700"
                  )}>
                    {l.status === "active" ? "出品中" : l.status === "sold" ? "売却済" : "予約中"}
                  </span>
                </div>
                <div className="flex items-center gap-4 mt-2 text-xs text-[var(--text-muted)]">
                  <span>{l.views} views</span>
                  <span>{l.likes} いいね</span>
                  <span>出品日: {formatDate(l.createdAt)}</span>
                </div>
              </div>
              <div className="flex flex-col gap-2 shrink-0">
                <button className="px-3 py-1.5 rounded-lg border border-[var(--border)] text-xs font-medium hover:bg-[var(--bg)] transition">編集</button>
                <button className="px-3 py-1.5 rounded-lg border border-red-200 text-xs font-medium text-red-500 hover:bg-red-50 transition">削除</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Bids Tab */}
      {activeTab === "bids" && (
        <div className="space-y-4">
          {myBids.map((a) => (
            <a key={a.id} href={`/auction/${a.id}`} className="flex gap-4 p-4 rounded-xl bg-[var(--bg-card)] border border-[var(--border)] hover:border-[#FF6B35] transition block">
              <img src={a.machine.image} alt="" className="w-24 h-18 rounded-lg object-cover shrink-0" />
              <div className="flex-1">
                <h3 className="font-bold text-[var(--text)]">{a.machine.name}</h3>
                <div className="flex items-center gap-4 mt-1">
                  <span className="text-sm">現在: <span className="font-bold text-[#FF6B35]">{formatPrice(a.currentPrice)}</span></span>
                  <span className="text-xs text-[var(--text-muted)]">{a.bids.length}入札</span>
                </div>
                <span className={cn("inline-block mt-2 px-2 py-0.5 rounded text-xs font-semibold",
                  a.status === "active" ? "bg-emerald-100 text-emerald-700" : "bg-gray-100 text-gray-700"
                )}>
                  {a.status === "active" ? "開催中" : "終了"}
                </span>
              </div>
            </a>
          ))}
        </div>
      )}

      {/* Purchases Tab */}
      {activeTab === "purchases" && (
        <div className="text-center py-12">
          <p className="text-4xl mb-3">📦</p>
          <p className="font-bold text-[var(--text)]">取引履歴はまだありません</p>
          <p className="text-[var(--text-muted)] mt-1">購入または売却するとここに表示されます</p>
        </div>
      )}

      {/* Profile Tab */}
      {activeTab === "profile" && (
        <div className="max-w-lg space-y-6">
          <div>
            <label className="block text-sm font-semibold mb-2">ユーザー名</label>
            <input type="text" defaultValue="ユーザーさん" className="w-full px-4 py-3 rounded-xl border border-[var(--border)] bg-[var(--bg)] text-[var(--text)] focus:outline-none focus:ring-2 focus:ring-[#FF6B35]" />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">メールアドレス</label>
            <input type="email" defaultValue="user@example.com" className="w-full px-4 py-3 rounded-xl border border-[var(--border)] bg-[var(--bg)] text-[var(--text)] focus:outline-none focus:ring-2 focus:ring-[#FF6B35]" />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">所在地</label>
            <input type="text" defaultValue="東京都新宿区" className="w-full px-4 py-3 rounded-xl border border-[var(--border)] bg-[var(--bg)] text-[var(--text)] focus:outline-none focus:ring-2 focus:ring-[#FF6B35]" />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">自己紹介</label>
            <textarea defaultValue="パチンコ中古台の売買をしています。" rows={3} className="w-full px-4 py-3 rounded-xl border border-[var(--border)] bg-[var(--bg)] text-[var(--text)] focus:outline-none focus:ring-2 focus:ring-[#FF6B35] resize-none" />
          </div>
          <button className="px-8 py-3 rounded-xl bg-[#FF6B35] text-white font-bold hover:bg-[#E55A2B] transition">
            保存する
          </button>
        </div>
      )}
    </div>
  );
}
