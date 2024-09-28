import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const useOthersHandCards = create(
    persist(
        (set, get) => ({
            cards: [],

            add(cardProps) {
                set((state) => ({ cards: state.cards.concat([cardProps]) }));
            },

            remove(cardNum) {
                const cards = get().cards;
                const index = cards.findIndex((c) => c.num === cardNum);

                if (index < 0) return false;

                set(() => ({
                    cards: [
                        ...cards.slice(0, index),
                        ...cards.slice(index + 1),
                    ],
                }));

                return true;
            },

            draw(cardNum) {
                const allCards = get().cards;
                const card = allCards.find((c) => c.num === cardNum);

                set(() => ({
                    cards: allCards.filter((c) => c !== card),
                }));

                return card;
            },

            clear() {
                set(() => ({ cards: [] }));
            },
        }),
        {
            name: "othersHand",
            storage: createJSONStorage(() => localStorage),
        }
    )
);
