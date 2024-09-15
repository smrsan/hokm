import Box from "@mui/material/Box";
import PlayingCard from "./PlayingCard/PlayingCard";
import { playingCardClasses } from "./PlayingCard/styles";
import { createRef, useCallback, useEffect, useRef, useState } from "react";
import useStateRef from "../hooks/useStateRef";
import useIsMounted from "../hooks/useIsMounted";

const CARD_WIDTH = 100;
const CARD_ROTATE_ANGLE = 90;

/** @type {(cardNum: number) => import("@mui/material").BoxProps["sx"]} */
const makeRootSx = ({ position }) => {
    return {
        position: "fixed",
        placeItems: "center",
        ...(position === "top"
            ? {
                  top: -CARD_WIDTH * 2.1,
                  right: "50%",
              }
            : position === "bottom"
            ? {
                  bottom: CARD_WIDTH * 2 + 10,
                  left: "50%",
              }
            : position === "right"
            ? {
                  bottom: `calc(50% + ${CARD_WIDTH}px)`,
                  right: -CARD_WIDTH * 0.6,
              }
            : position === "left"
            ? {
                  bottom: `calc(50% + ${CARD_WIDTH * 2}px)`,
                  left: -CARD_WIDTH * 0.6,
              }
            : {
                  top: -CARD_WIDTH + 10,
                  right: "50%",
              }),
    };
};

/** @type {(cardNum: number) => import("@mui/material").BoxProps["sx"]} */
const makeCardSx = ({
    index,
    totalCards,
    fanAngle,
    position,
    isOpponent,
    isDrawn,
    isCopyCard,
}) => {
    const angleDiff = totalCards * 3;
    const angle =
        (index - (totalCards - 1) / 2) * (fanAngle / totalCards) -
        (position === "bottom"
            ? angleDiff
            : position === "top"
            ? angleDiff + CARD_ROTATE_ANGLE * 2
            : position === "right"
            ? CARD_ROTATE_ANGLE + angleDiff
            : position === "left"
            ? -CARD_ROTATE_ANGLE + angleDiff
            : angleDiff);

    return {
        [`&.${playingCardClasses.root}`]: {
            ...(isCopyCard
                ? {
                      opacity: 0,
                      pointerEvents: "none",
                  }
                : {
                      position: "absolute",
                  }),
            width: `${CARD_WIDTH}px`,
            transform: `rotate(${angle}deg)`,
            transformOrigin: "bottom left",
            cursor: isOpponent ? "default" : "pointer",
            transitionDuration: "300ms",
            transitionProperty: "all",
            transitionTimingFunction: "ease",
            ...(isOpponent
                ? {}
                : {
                      "&:hover": {
                          transform: `
                            rotate(${angle}deg)
                            translateY(-15%)
                        `,
                      },
                  }),
            ...(isDrawn
                ? {
                      zIndex: isDrawn,
                      transform: `rotate(0deg) scale(.9) translate(-50%, -150%)`,
                      "&:hover": {},
                  }
                : {}),
        },
        [`& .${playingCardClasses.img}`]: {
            position: "relative",
            display: "block",
            width: `${CARD_WIDTH}px`,
        },
    };
};

const _initCards = [1, 21, 32, 4, 40, 52, 7, 16, 46, 31, 23, 50, 11];

const CardHand = ({
    position = "right",
    isOpponent = false,
    initCards = _initCards,
}) => {
    const fanAngle = 135;

    const highestZIndexRef = useRef(0);
    const [cards, setCards, cardsRef] = useStateRef({});
    const [inHandCards, setInHandCards] = useState(initCards.length);
    const cardRefs = useRef({});
    const copiedCardRefs = useRef({});
    const isMountedRef = useIsMounted();

    const setCardFixed = useCallback((card) => {
        /** @type {HTMLDivElement} */
        const cardElem = cardRefs.current[card.num].current;
        /** @type {HTMLDivElement} */
        const drawnCardElem = copiedCardRefs.current[card.num].current;

        const rect = cardElem.getBoundingClientRect();
        const computedStyle = window.getComputedStyle(cardElem);
        const matrix = new DOMMatrix(computedStyle.transform);

        drawnCardElem.style.top = `
            calc(
                ${rect.top - matrix.m42}px - ${rect.height * 0.11}px
            )
        `;
        drawnCardElem.style.left = rect.left - matrix.m41 + "px";
        drawnCardElem.style.position = "fixed";
    }, []);

    const drawCard = useCallback(
        (card) => () => {
            const p = cardsRef.current;

            const shouldDraw = !p[card.num].isDrawn;

            setInHandCards((p) => (p += shouldDraw ? -1 : +1));

            for (const num in p) {
                const c = p[num];

                if (c.num === card.num) {
                    c.isDrawn = shouldDraw;
                    if (shouldDraw) {
                        c.drawnIndex = ++highestZIndexRef.current;
                    }
                    continue;
                }

                if (c.index >= card.index && !c.isDrawn) {
                    c.index += shouldDraw ? -1 : +1;
                    continue;
                }
            }

            setTimeout(() => {
                if (!isMountedRef.current) return;
                if (!card.isDrawn) return;
                setCardFixed(card);
            }, 300);

            setCards({ ...p });
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [setCardFixed]
    );

    useEffect(() => {
        const cards = {};

        for (let i = 0; i < initCards.length; i++) {
            const num = initCards[i];
            cards[num] = {
                isDrawn: false,
                index: i,
                num,
                drawnIndex: 0,
            };
        }

        setCards(cards);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [initCards]);

    return (
        <>
            <Box sx={makeRootSx({ position })}>
                {Object.entries(cards)
                    .sort(([, a], [, b]) => a.index - b.index)
                    .map(([cardNum, card]) => (
                        <PlayingCard
                            ref={
                                cardRefs.current[cardNum] ??
                                (cardRefs.current[cardNum] = createRef())
                            }
                            key={cardNum}
                            onClick={drawCard(card)}
                            {...{
                                sx: makeCardSx({
                                    index: card.index,
                                    totalCards: inHandCards,
                                    fanAngle,
                                    position,
                                    isOpponent,
                                    isDrawn: card.isDrawn && card.drawnIndex,
                                }),
                                cardNum: isOpponent ? -1 : cardNum,
                            }}
                        />
                    ))}
            </Box>
            {Object.entries(cards).map(([cardNum, card]) =>
                card.isDrawn ? (
                    <PlayingCard
                        ref={
                            copiedCardRefs.current[cardNum] ??
                            (copiedCardRefs.current[cardNum] = createRef())
                        }
                        key={`copy-${cardNum}`}
                        cardNum={isOpponent ? -1 : cardNum}
                        sx={makeCardSx({
                            index: card.index,
                            totalCards: inHandCards,
                            fanAngle,
                            position,
                            isOpponent,
                            isDrawn: card.isDrawn && card.drawnIndex,
                            isCopyCard: true,
                        })}
                    />
                ) : null
            )}
        </>
    );
};

export default CardHand;
