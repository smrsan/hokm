import { create } from "zustand";

export const useGrabbedCard = create((set, get) => ({
    card: null,
    grab(cardProps) {
        set(() => ({ card: cardProps }));
    },
    drop() {
        const card = get().card;
        set(() => ({ card: null }));
        return card;
    },
}));
