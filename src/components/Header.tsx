"use client";

import Link from "next/link";
import { useState } from "react";
import { useAppStore } from "@/store";

const navLinks = [
  { href: "/", label: "ホーム" },
  { href: "/search", label: "台を探す" },
  { href: "/auctions", label: "オークション" },
  { href: "/sell", label: "出品する" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { darkMode, toggleDarkMode, searchQuery, setSearchQuery } = useAppStore();

  return (
    <header className="sticky top-0 z-50 bg-[var(--bg-card)] border-b border-[var(--border)] backdrop-blur-md bg-opacity-90">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#FF6B35] to-[#FFD700] flex items-center justify-center text-white font-bold text-lg shadow-lg">
              P
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-[#FF6B35] to-[#FFD700] bg-clip-text text-transparent hidden sm:block">
              Pachinko Market
            </span>
          </Link>

          {/* Search */}
          <div className="flex-1 max-w-md mx-4 hidden md:block">
            <div className="relative">
              <input
                type="text"
                placeholder="機種名・メーカーで検索..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-full border border-[var(--border)] bg-[var(--bg)] text-[var(--text)] focus:outline-none focus:ring-2 focus:ring-[#FF6B35] focus:border-transparent transition"
              />
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--text-muted)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-2 rounded-lg text-sm font-medium text-[var(--text)] hover:bg-[#FF6B35]/10 hover:text-[#FF6B35] transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <button onClick={toggleDarkMode} className="p-2 rounded-lg hover:bg-[var(--border)] transition ml-2" aria-label="テーマ切替">
              {darkMode ? (
                <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" /></svg>
              ) : (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" /></svg>
              )}
            </button>
            <Link href="/mypage" className="ml-2 w-9 h-9 rounded-full bg-gradient-to-br from-[#FF6B35] to-[#E55A2B] flex items-center justify-center text-white font-bold text-sm shadow hover:shadow-lg transition">
              U
            </Link>
          </nav>

          {/* Mobile toggle */}
          <button className="md:hidden p-2 rounded-lg hover:bg-[var(--border)] transition" onClick={() => setMobileOpen(!mobileOpen)}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden pb-4 animate-fade-in-up">
            <div className="relative mb-3">
              <input
                type="text"
                placeholder="機種名・メーカーで検索..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-full border border-[var(--border)] bg-[var(--bg)] text-[var(--text)] focus:outline-none focus:ring-2 focus:ring-[#FF6B35]"
              />
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--text-muted)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <nav className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href} onClick={() => setMobileOpen(false)}
                  className="px-4 py-3 rounded-lg font-medium hover:bg-[#FF6B35]/10 hover:text-[#FF6B35] transition-colors">
                  {link.label}
                </Link>
              ))}
              <div className="flex items-center gap-3 px-4 py-3">
                <button onClick={toggleDarkMode} className="p-2 rounded-lg hover:bg-[var(--border)] transition">
                  {darkMode ? "☀️ ライト" : "🌙 ダーク"}
                </button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
