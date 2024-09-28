import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const useWonCards = create(
    persist(
        (set) => ({
            wonCards: {},

            add(playerNum) {
                set((state) => ({
                    cards: {
                        ...state.cards,
                        [playerNum]: (state.cards[playerNum] ?? 0) + 1,
                    },
                }));
            },

            clear() {
                set(() => ({ cards: {} }));
            },
        }),
        {
            name: "wonCards",
            storage: createJSONStorage(() => localStorage),
        }
    )
);
