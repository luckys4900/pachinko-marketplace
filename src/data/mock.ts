import { Machine, Listing, Auction, PriceHistory } from "@/types";

const I = "https://placehold.co/600x400/FF6B35/FFFFFF?text=";
const sellers = ["東京台屋", "大阪パチンコ館", "名古屋センター", "福岡メガストア", "札幌パチンコ"];

function makeMachine(id: string, name: string, maker: Machine["maker"], modelNumber: string, releaseYear: number, category: Machine["category"], normal: number, special: number, ballsPer: number, count: number, hitRatio: string, description: string): Machine {
  const slug = id.replace("m", "img");
  return {
    id, name, maker, modelNumber, releaseYear,
    image: I + slug,
    images: [I + slug, I + slug + "b", I + slug + "c"],
    category,
    probability: { normal, special },
    ballsPer, count, hitRatio, description,
  };
}

export const machines: Machine[] = [
  makeMachine("m1", "CR 天才バカボン", "Sansce", "SXB", 2024, "CR", 319.6, 99.9, 10, 8, "1/80.5", "2024年最新モデル。爆裂連チャン仕様。"),
  makeMachine("m2", "P 新世紀エヴァンゲリオン", "Heiwa", "HWG", 2024, "CR", 319.6, 78.9, 10, 10, "1/65.2", "エヴァシリーズ最新作。初号機暴走モード搭載。"),
  makeMachine("m3", "P 仮面ライダー", "Newgin", "NWK", 2023, "CR", 299.4, 89.3, 10, 9, "1/72.8", "変身ベルト連動演出が大人気の一台。"),
  makeMachine("m4", "P ドラゴンクエスト", "Sanyo", "SYD", 2024, "LightMiddle", 128.5, 64.9, 8, 5, "1/45.3", "ライトミドルの王道。レベルアップ演出。"),
  makeMachine("m5", "P ゴジラ", "Fuji", "FJG", 2023, "CR", 319.6, 94.1, 10, 8, "1/78.0", "熱線演出が迫力満点の大ヒット機種。"),
  makeMachine("m6", "P ルパン三世", "Okumura", "OKL", 2023, "CR", 294.5, 86.7, 10, 8, "1/70.2", "カリオストロの城コラボ盤。プレミアム演出多数。"),
  makeMachine("m7", "P スラムダンク", "Daiichi", "DCK", 2024, "CR", 319.6, 91.2, 10, 8, "1/75.0", "湘北VS山王戦を完全再現。ダンクシュート演出。"),
  makeMachine("m8", "P 鬼滅の刃", "Maruhon", "MRK", 2024, "CR", 299.4, 82.5, 10, 9, "1/68.4", "水の呼吸演出が美しい大ヒット機種。"),
  makeMachine("m9", "P キン肉マン", "Sansce", "SXM", 2023, "LightMiddle", 138.7, 69.8, 8, 5, "1/50.1", "ライトミドルの大人気機種。マッスルリターン搭載。"),
  makeMachine("m10", "P ジャイアントパンダ", "Sanyo", "SYP", 2024, "Deji", 239.4, 74.9, 10, 6, "1/55.0", "デジパチの定番。パンダの可愛い演出が人気。"),
  makeMachine("m11", "P 北斗の拳", "Sansce", "SXH", 2022, "Gaidai", 399.6, 99.9, 10, 12, "1/85.0", "外伝シリーズ。伝承者演出が熱い一台。"),
  makeMachine("m12", "P ファンタジスタ", "Heiwa", "HWF", 2024, "LightMiddle", 128.5, 64.9, 8, 5, "1/42.0", "ライトミドルの傑作。多彩なプレミアム演出。"),
];

function makeListings(): Listing[] {
  const result: Listing[] = [];
  for (let mi = 0; mi < machines.length; mi++) {
    const m = machines[mi];
    const cnt = mi < 4 ? 3 : mi < 8 ? 2 : 1;
    for (let i = 0; i < cnt; i++) {
      const conds = ["S", "A", "A", "B"] as const;
      const locs = ["東京都", "大阪府", "愛知県", "福岡県", "北海道"];
      const descs = ["状態良好", "美品", "動作確認済み", "即日出荷可能"];
      result.push({
        id: "l" + (mi * 3 + i + 1),
        machineId: m.id,
        machine: m,
        sellerId: "s" + ((i % 5) + 1),
        sellerName: sellers[i % 5],
        price: Math.floor((200000 + Math.random() * 800000) / 10000) * 10000,
        condition: conds[i % 4],
        conditionDetail: i % 2 === 0 ? "外装良好、動作確認済み" : "若干の使用感あり",
        images: m.images,
        description: m.name + "の出品です。" + descs[i % 4],
        location: locs[i % 5],
        createdAt: new Date(Date.now() - i * 86400000 * (mi + 1)).toISOString(),
        updatedAt: new Date().toISOString(),
        status: i === 0 && mi > 6 ? "sold" : "active",
        views: Math.floor(Math.random() * 500) + 50,
        likes: Math.floor(Math.random() * 50),
      });
    }
  }
  return result;
}

export const listings: Listing[] = makeListings();

export const auctions: Auction[] = machines.slice(0, 6).map((m, i) => {
  const sp = Math.floor((100000 + Math.random() * 300000) / 10000) * 10000;
  const bc = Math.floor(Math.random() * 15) + 3;
  return {
    id: "a" + (i + 1),
    machineId: m.id,
    machine: m,
    sellerId: "s" + (i + 1),
    sellerName: sellers[i],
    startPrice: sp,
    currentPrice: sp + bc * 10000,
    buyNowPrice: i % 2 === 0 ? sp * 3 : null,
    bids: Array.from({ length: bc }, (_, bi) => ({
      id: "b" + (i * 20 + bi + 1),
      auctionId: "a" + (i + 1),
      bidderId: "u" + (bi + 1),
      bidderName: "入札者" + (bi + 1),
      amount: sp + (bi + 1) * 10000,
      createdAt: new Date(Date.now() - (bc - bi) * 3600000).toISOString(),
    })),
    startDate: new Date(Date.now() - 86400000 * 3).toISOString(),
    endDate: new Date(Date.now() + 86400000 * (i + 1) + 3600000 * i).toISOString(),
    status: "active",
    images: m.images,
    description: m.name + "のオークション出品です。",
    watchers: Math.floor(Math.random() * 200) + 20,
  };
});

export const priceHistories: Record<string, PriceHistory[]> = Object.fromEntries(
  machines.slice(0, 8).map((m) => [
    m.id,
    Array.from({ length: 12 }, (_, i) => ({
      date: new Date(2024, i, 1).toISOString().split("T")[0],
      price: Math.floor((200000 + Math.sin(i) * 100000 + Math.random() * 50000) / 10000) * 10000,
      condition: ["S", "A", "B"][i % 3],
    })),
  ])
);

export const MAKERS = ["Sansce", "Heiwa", "Sanyo", "Okumura", "Newgin", "Fuji", "Daiichi", "Maruhon"] as const;
export const CATEGORIES = [
  { value: "all", label: "すべて" },
  { value: "CR", label: "CR機" },
  { value: "Deji", label: "デジパチ" },
  { value: "LightMiddle", label: "ライトミドル" },
  { value: "Gaidai", label: "外伝" },
];
