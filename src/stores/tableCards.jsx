import { create } from "zustand";

export const useTableCards = create((set) => ({
    cards: [],
    add(cardProps) {
        set((state) => ({ cards: state.cards.concat([cardProps]) }));
    },
    clear() {
        set(() => ({ cards: [] }));
    },
}));
