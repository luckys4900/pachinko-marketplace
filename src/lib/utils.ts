import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("ja-JP", {
    style: "currency",
    currency: "JPY",
    maximumFractionDigits: 0,
  }).format(price);
}

export function formatDate(date: string | Date): string {
  return new Intl.DateTimeFormat("ja-JP", {
    year: "numeric", month: "2-digit", day: "2-digit",
  }).format(new Date(date));
}

export function formatRelativeTime(date: string | Date): string {
  const now = new Date();
  const target = new Date(date);
  const diffMs = now.getTime() - target.getTime();
  const diffMinutes = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  if (diffMinutes < 1) return "たった今";
  if (diffMinutes < 60) return `${diffMinutes}分前`;
  if (diffHours < 24) return `${diffHours}時間前`;
  if (diffDays < 7) return `${diffDays}日前`;
  return formatDate(date);
}

export function getTimeRemaining(endDate: string | Date) {
  const total = new Date(endDate).getTime() - new Date().getTime();
  const seconds = Math.floor((total / 1000) % 60);
  const minutes = Math.floor((total / 1000 / 60) % 60);
  const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
  const days = Math.floor(total / (1000 * 60 * 60 * 24));
  return { days, hours, minutes, seconds, total };
}

export function getConditionLabel(condition: string): string {
  const map: Record<string, string> = { S: "新品同様", A: "美品", B: "良品", C: "使用感あり" };
  return map[condition] || condition;
}

export function getConditionColor(condition: string): string {
  const map: Record<string, string> = {
    S: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200",
    A: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
    B: "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200",
    C: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
  };
  return map[condition] || "";
}
