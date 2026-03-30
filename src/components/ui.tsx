"use client";

import { useEffect, useRef, useState } from "react";

export function Counter({ end, duration = 2000, suffix = "", prefix = "" }: {
  end: number; duration?: number; suffix?: string; prefix?: string;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const startTime = Date.now();
          const step = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * end));
            if (progress < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end, duration]);

  return <span ref={ref}>{prefix}{count.toLocaleString()}{suffix}</span>;
}

export function CountdownTimer({ endDate }: { endDate: string }) {
  const [time, setTime] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const update = () => {
      const total = new Date(endDate).getTime() - Date.now();
      if (total <= 0) return setTime({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      setTime({
        days: Math.floor(total / 86400000),
        hours: Math.floor((total % 86400000) / 3600000),
        minutes: Math.floor((total % 3600000) / 60000),
        seconds: Math.floor((total % 60000) / 1000),
      });
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, [endDate]);

  return (
    <div className="flex gap-2">
      {[
        { value: time.days, label: "日" },
        { value: time.hours, label: "時" },
        { value: time.minutes, label: "分" },
        { value: time.seconds, label: "秒" },
      ].map((item, i) => (
        <div key={i} className="flex flex-col items-center">
          <span className="text-2xl sm:text-3xl font-bold text-[#FF6B35] tabular-nums">{String(item.value).padStart(2, "0")}</span>
          <span className="text-xs text-[var(--text-muted)]">{item.label}</span>
        </div>
      ))}
    </div>
  );
}

export function SectionTitle({ title, subtitle, action }: { title: string; subtitle?: string; action?: { label: string; href: string } }) {
  return (
    <div className="flex items-end justify-between mb-6">
      <div>
        <h2 className="text-2xl sm:text-3xl font-bold text-[var(--text)]">{title}</h2>
        {subtitle && <p className="text-[var(--text-muted)] mt-1">{subtitle}</p>}
      </div>
      {action && (
        <a href={action.href} className="text-sm font-medium text-[#FF6B35] hover:text-[#E55A2B] transition-colors whitespace-nowrap">
          {action.label} →
        </a>
      )}
    </div>
  );
}

export function Badge({ children, variant = "default" }: { children: React.ReactNode; variant?: "default" | "success" | "danger" | "warning" }) {
  const colors = {
    default: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300",
    success: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300",
    danger: "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300",
    warning: "bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300",
  };
  return <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colors[variant]}`}>{children}</span>;
}

export function LoadingSkeleton({ className }: { className?: string }) {
  return <div className={`skeleton ${className || ""}`} />;
}
