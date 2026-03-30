"use client";

import { auctions } from "@/data/mock";
import { AuctionCard } from "@/components/MachineCard";
import { SectionTitle } from "@/components/ui";

export default function AuctionsPage() {
  const active = auctions.filter((a) => a.status === "active");
  const ended = auctions.filter((a) => a.status === "ended");

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-black text-[var(--text)]">オークション</h1>
        <p className="text-[var(--text-muted)] mt-1">お気に入りの台に入札して、お得にゲットしよう</p>
      </div>

      {/* Active */}
      <section className="mb-12">
        <SectionTitle title="開催中のオークション" subtitle={`${active.length}件のオークションが開催中`} />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {active.map((a) => (
            <AuctionCard
              key={a.id}
              href={`/auction/${a.id}`}
              image={a.machine.image}
              title={a.machine.name}
              currentPrice={a.currentPrice}
              endTime={a.endDate}
              bidCount={a.bids.length}
              watchers={a.watchers}
            />
          ))}
        </div>
      </section>

      {/* Ended */}
      {ended.length > 0 && (
        <section>
          <SectionTitle title="終了したオークション" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 opacity-60">
            {ended.map((a) => (
              <AuctionCard
                key={a.id}
                href={`/auction/${a.id}`}
                image={a.machine.image}
                title={a.machine.name}
                currentPrice={a.currentPrice}
                endTime={a.endDate}
                bidCount={a.bids.length}
                watchers={a.watchers}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
