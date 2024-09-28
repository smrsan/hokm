/* eslint-disable react/no-is-mounted */
import { EventEmitter } from "eventemitter3";

import { useDeck } from "./stores/deck";
import { useGrabbedCard } from "./stores/grabbedCard";
import { useHandCards } from "./stores/handCards";
import { useTableCards } from "./stores/tableCards";
import { useWonCards } from "./stores/wonCards";
import { useOthersHandCards } from "./stores/othersHandCards";
import { usePlayers } from "./stores/players";

class GameManager extends EventEmitter {
    constructor() {
        super();
    }

    restart() {
        this.clear();
        this.start();
    }

    clear() {
        useHandCards.getState().clear();
        useOthersHandCards.getState().clear();
        useGrabbedCard.getState().drop();
        useDeck.getState().reset();
        useTableCards.getState().clear();
        useWonCards.getState().clear();
        usePlayers.getState().reset();
    }

    start() {
        const playerCardsCount = 13;
        const othersCardsCount = 52 - playerCardsCount;

        // Give cards to the player 0
        for (let i = 0; i < playerCardsCount; i++) {
            useHandCards.getState().add({ num: useDeck.getState().draw() });
        }

        // Give cards to others
        for (let i = 0, j = (i % 3) + 1; i < othersCardsCount; i++) {
            useOthersHandCards.getState().add({
                num: useDeck.getState().draw(),
                ownerNum: j,
            });
        }

        // Choose King
        usePlayers.getState().chooseKingRandomly();

        // TODO:
        // 1. Display king
        // 2. Display hokm
        // 3. Decide as a computer player if "turn != 0"
    }
}

const gameManager = new GameManager();

export default gameManager;
