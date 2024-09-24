import { create } from "zustand";

export const useHandCards = create((set, get) => ({
    cards: [],

    add(cardProps) {
        set((state) => ({ cards: state.cards.concat([cardProps]) }));
    },

    hide(cardNum) {
        const cards = get().cards;
        const card = cards.find((c) => c.num === cardNum && !c.hidden);

        if (card == null) return false;

        card.hidden = true;

        set(() => ({
            cards: [...cards],
        }));

        return true;
    },

    remove(cardNum) {
        const cards = get().cards;
        const index = cards.findIndex((c) => c.num === cardNum);

        if (index < 0) return false;

        set(() => ({
            cards: [...cards.slice(0, index), ...cards.slice(index + 1)],
        }));

        return true;
    },

    clear() {
        set(() => ({ cards: [] }));
    },
}));
