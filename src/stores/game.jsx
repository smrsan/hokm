import { create } from "zustand";

export const useGame = create((set) => ({
    isPaused: true,
    isStarted: false,
    winnerId: null,

    start() {
        set(() => ({ isStarted: true }));
    },

    pause() {
        set(() => ({ isPaused: true }));
    },

    resume() {
        set(() => ({ isPaused: false }));
    },

    reset() {
        set(() => ({ isStarted: false, isPaused: true, winnerId: null }));
    },

    win(playerId) {
        set(() => ({ winnerId: playerId }));
    },
}));
