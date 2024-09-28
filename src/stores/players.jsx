import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const usePlayers = create(
    persist(
        (set, get) => ({
            kingPlayerNum: -1,
            turn: -1,
            hokm: -1,

            chooseKingRandomly() {
                const kingPlayerNum = Math.floor(Math.random() * 4);

                set(() => ({
                    kingPlayerNum,
                    turn: kingPlayerNum,
                }));
            },

            reset() {
                set(() => ({
                    kingPlayerNum: -1,
                    turn: -1,
                    hokm: -1,
                }));
            },

            nextTurn() {
                const newTurn = (get().turn + 1) % 4;

                set(() => ({
                    turn: newTurn,
                }));

                return newTurn;
            },

            chooseHokm(suiteNum) {
                set(() => ({
                    hokm: suiteNum,
                }));
            },
        }),
        {
            name: "players",
            storage: createJSONStorage(() => localStorage),
        }
    )
);
