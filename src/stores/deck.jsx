import { create } from "zustand";
import _ from "lodash-es";

export const useDeck = create((set, get) => ({
    cards: getAllCards(),

    reset() {
        set(() => ({ cards: getAllCards() }));
    },

    shuffle() {
        set(() => ({ cards: _.shuffle(get().cards) }));
    },

    draw() {
        const deck = get().cards;
        if (!deck.length) return null;
        const card = get().cards[0];
        set(() => ({ cards: get().cards.slice(1) }));
        return card;
    },
}));

function getAllCards() {
    return Array.from({ length: 52 }).map((_, i) => i + 1);
}
