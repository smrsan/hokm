import { create } from "zustand";
import { useHandCards } from "./handCards";
import { useDeck } from "./deck";

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

export async function startGame() {
    const {
        start: startGame,
        winnerId,
        isStarted: isGameStarted,
    } = useGame.getState();

    if (isGameStarted || winnerId != null) return;
    startGame();

    const addToHand = useHandCards.getState().add;
    const { reset: resetDeck, shuffle: shuffleDeck, draw } = useDeck.getState();

    resetDeck();
    shuffleDeck();

    for (let i = 0; i < 13; i++) {
        addToHand({ num: draw() });
    }
}
