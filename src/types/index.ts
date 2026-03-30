export type MachineMaker = "Sansce" | "Heiwa" | "Sanyo" | "Okumura" | "Newgin" | "Fuji" | "Daiichi" | "Maruhon" | "Other";

export interface Machine {
  id: string;
  name: string;
  maker: MachineMaker;
  modelNumber: string;
  releaseYear: number;
  image: string;
  images: string[];
  category: "CR" | "Deji" | "LightMiddle" | "Gaidai";
  probability: { normal: number; special: number };
  ballsPer: number;
  count: number;
  hitRatio: string;
  description: string;
}

export interface Listing {
  id: string;
  machineId: string;
  machine: Machine;
  sellerId: string;
  sellerName: string;
  price: number;
  condition: "S" | "A" | "B" | "C";
  conditionDetail: string;
  images: string[];
  description: string;
  location: string;
  createdAt: string;
  updatedAt: string;
  status: "active" | "sold" | "reserved";
  views: number;
  likes: number;
}

export interface Auction {
  id: string;
  machineId: string;
  machine: Machine;
  sellerId: string;
  sellerName: string;
  startPrice: number;
  currentPrice: number;
  buyNowPrice: number | null;
  bids: AuctionBid[];
  startDate: string;
  endDate: string;
  status: "active" | "ended" | "cancelled";
  images: string[];
  description: string;
  watchers: number;
}

export interface AuctionBid {
  id: string;
  auctionId: string;
  bidderId: string;
  bidderName: string;
  amount: number;
  createdAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: "user" | "seller" | "admin";
  rating: number;
  totalSales: number;
  totalPurchases: number;
  createdAt: string;
}

export interface PriceHistory {
  date: string;
  price: number;
  condition: string;
}
