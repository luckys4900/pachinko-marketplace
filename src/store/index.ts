import { create } from "zustand";

interface AppState {
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  selectedCategory: string;
  setSelectedCategory: (c: string) => void;
  selectedMaker: string;
  setSelectedMaker: (m: string) => void;
  priceRange: [number, number];
  setPriceRange: (r: [number, number]) => void;
  viewMode: "grid" | "list" | "table";
  setViewMode: (m: "grid" | "list" | "table") => void;
  sortBy: "newest" | "price_asc" | "price_desc" | "popular";
  setSortBy: (s: "newest" | "price_asc" | "price_desc" | "popular") => void;
  darkMode: boolean;
  toggleDarkMode: () => void;
  setDarkMode: (d: boolean) => void;
  favorites: string[];
  toggleFavorite: (id: string) => void;
}

export const useAppStore = create<AppState>((set) => ({
  searchQuery: "",
  setSearchQuery: (q) => set({ searchQuery: q }),
  selectedCategory: "all",
  setSelectedCategory: (c) => set({ selectedCategory: c }),
  selectedMaker: "all",
  setSelectedMaker: (m) => set({ selectedMaker: m }),
  priceRange: [0, 5000000],
  setPriceRange: (r) => set({ priceRange: r }),
  viewMode: "grid",
  setViewMode: (m) => set({ viewMode: m }),
  sortBy: "newest",
  setSortBy: (s) => set({ sortBy: s }),
  darkMode: false,
  toggleDarkMode: () =>
    set((state) => {
      const next = !state.darkMode;
      if (typeof document !== "undefined") {
        document.documentElement.classList.toggle("dark", next);
        localStorage.setItem("darkMode", JSON.stringify(next));
      }
      return { darkMode: next };
    }),
  setDarkMode: (d) => {
    if (typeof document !== "undefined") {
      document.documentElement.classList.toggle("dark", d);
    }
    return set({ darkMode: d });
  },
  favorites: [],
  toggleFavorite: (id) =>
    set((state) => ({
      favorites: state.favorites.includes(id)
        ? state.favorites.filter((f) => f !== id)
        : [...state.favorites, id],
    })),
}));
