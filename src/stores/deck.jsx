import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import _ from "lodash-es";

export const useDeck = create(
    persist(
        (set, get) => ({
            cards: getAllCards(),

            reset() {
                set(() => ({ cards: _.shuffle(getAllCards()) }));
            },

            draw() {
                const deck = get().cards;
                if (!deck.length) return null;
                const card = get().cards[0];
                set((state) => ({ cards: state.cards.slice(1) }));
                return card;
            },
        }),
        {
            name: "deck",
            storage: createJSONStorage(() => localStorage),
        }
    )
);

function getAllCards() {
    return Array.from({ length: 52 }).map((_, i) => i + 1);
}
