import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const useTableCards = create(
    persist(
        (set) => ({
            cards: [],
            add(cardProps) {
                set((state) => ({ cards: state.cards.concat([cardProps]) }));
            },
            clear() {
                set(() => ({ cards: [] }));
            },
        }),
        {
            name: "table",
            storage: createJSONStorage(() => localStorage),
        }
    )
);
