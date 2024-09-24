import { useEffect, useRef } from "react";
import Box from "@mui/material/Box";

import PCard from "./PCard";
import { useHandCards } from "../stores/handCards";
import { useDeck } from "../stores/deck";
import { useGame } from "../stores/game";

const Hand = () => {
    const handCards = useHandCards((state) => state.cards);
    const isGameStarted = useGame((state) => state.isStarted);

    const startEffectIdRef = useRef(0);
    useEffect(() => {
        (async function startGame() {
            const effectId = ++startEffectIdRef.current;

            await new Promise((r) => setTimeout(r, 100));

            if (effectId !== startEffectIdRef.current) return;

            const { start: startGame, winnerId } = useGame.getState();

            if (isGameStarted || winnerId != null) return;
            startGame();

            const addToHand = useHandCards.getState().add;
            const {
                reset: resetDeck,
                shuffle: shuffleDeck,
                draw,
            } = useDeck.getState();

            resetDeck();
            shuffleDeck();

            for (let i = 0; i < 13; i++) {
                addToHand({ num: draw() });
            }
        })();
    }, [isGameStarted]);

    return (
        <Box
            sx={{
                display: "flex",
                width: "calc(100vw - 200px)",
                height: "100%",
                justifyContent: "space-around",
                alignItems: "flex-end",
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    width: "512px",
                    maxWidth: "90vw",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    overflowX: "scroll",
                    gap: "8px",
                    mb: "8px",
                }}
            >
                {handCards.map((card, i) => (
                    <PCard
                        key={card.num + "-" + i}
                        {...{
                            card,
                            grabbable: true,
                        }}
                        sx={{
                            cursor: "pointer",
                        }}
                    />
                ))}
            </Box>
        </Box>
    );
};

export default Hand;
