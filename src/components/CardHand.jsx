import Box from "@mui/material/Box";
import PlayingCard from "./PlayingCard/PlayingCard";
import { playingCardClasses } from "./PlayingCard/styles";
import { createRef, useCallback, useEffect, useRef } from "react";
import useStateRef from "../hooks/useStateRef";
import useIsMounted from "../hooks/useIsMounted";
import makeClassNames from "../utils/makeClassNames";
import clsx from "clsx";

const CARD_WIDTH = 100;
const CARD_ROTATE_ANGLE = 90;

const classes = makeClassNames("CardHand", [
    "pos-top",
    "pos-left",
    "pos-right",
    "pos-bottom",

    "copy-card",
    "back-card",
    "drawn-card",
]);

/** @type {import("@mui/material").BoxProps["sx"]} */
const rootSx = {
    position: "fixed",
    placeItems: "center",

    [`&.${classes["pos-top"]}`]: {
        top: -CARD_WIDTH * 2.1,
        right: "50%",
    },
    [`&.${classes["pos-bottom"]}`]: {
        bottom: CARD_WIDTH * 2 + 10,
        left: "50%",
    },
    [`&.${classes["pos-right"]}`]: {
        bottom: `calc(50% + ${CARD_WIDTH}px)`,
        right: -CARD_WIDTH * 0.6,
    },
    [`&.${classes["pos-left"]}`]: {
        bottom: `calc(50% + ${CARD_WIDTH * 2}px)`,
        left: -CARD_WIDTH * 0.6,
    },
};

/** @type {(props: Object) => import("@mui/material").BoxProps["sx"]} */
const makeCardSx = ({ drawnZIndex, angle }) => ({
    [`&.${classes["copy-card"]}`]: {
        opacity: 0,
        pointerEvents: "none",
    },

    [`&.${classes["back-card"]}`]: {
        cursor: "default",
    },

    [`&:not(.${classes["back-card"]})`]: {
        cursor: "pointer",
        [`&:not(.${classes["drawn-card"]}):hover`]: {
            transform: `
                rotate(${angle}deg)
                translateY(-15%)
            `,
        },
    },

    [`&.${classes["drawn-card"]}`]: {
        zIndex: drawnZIndex,
        transform: `rotate(0deg) scale(.9) translate(-50%, -150%) !important`,
    },

    [`&.${playingCardClasses.root}`]: {
        position: "absolute",
        width: `${CARD_WIDTH}px`,
        transform: `rotate(${angle}deg)`,
        transformOrigin: "bottom left",
        transitionDuration: "300ms !important",
        transitionProperty: "all",
        transitionTimingFunction: "ease",
    },
    [`& .${playingCardClasses.img}`]: {
        position: "relative",
        display: "block",
        width: `${CARD_WIDTH}px`,
    },
});

const _initCards = [1, 21, 32, 4, 40, 52, 7, 16, 46, 31, 23, 50, 11];

const CardHand = ({
    position = "right",
    isOpponent = false,
    initCards = _initCards,
}) => {
    const fanAngle = 135;

    const highestZIndexRef = useRef(0);
    const [cards, setCards, cardsRef] = useStateRef({});
    const [, setInHandCards, inHandCardsRef] = useStateRef(initCards.length);
    const cardRefs = useRef({});
    const copiedCardRefs = useRef({});
    const isMountedRef = useIsMounted();

    const makeAngle = useCallback(
        ({ index: cardIndex }) => {
            const inHandCards = inHandCardsRef.current;
            const angleDiff = inHandCards * 3;
            return (
                (cardIndex - (inHandCards - 1) / 2) * (fanAngle / inHandCards) -
                (position === "bottom"
                    ? angleDiff
                    : position === "top"
                    ? angleDiff + CARD_ROTATE_ANGLE * 2
                    : position === "right"
                    ? CARD_ROTATE_ANGLE + angleDiff
                    : position === "left"
                    ? -CARD_ROTATE_ANGLE + angleDiff
                    : angleDiff)
            );
        },
        [inHandCardsRef, position]
    );

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
            <Box sx={rootSx} className={clsx(classes[`pos-${position}`])}>
                {Object.entries(cards)
                    .sort(([, a], [, b]) => a.index - b.index)
                    .map(([cardNum, card]) => (
                        <PlayingCard
                            key={cardNum}
                            ref={
                                cardRefs.current[cardNum] ??
                                (cardRefs.current[cardNum] = createRef())
                            }
                            onClick={drawCard(card)}
                            cardNum={isOpponent ? -1 : cardNum}
                            sx={makeCardSx({
                                drawnZIndex: +card.isDrawn && card.drawnIndex,
                                angle: makeAngle({ index: card.index }),
                            })}
                            className={clsx({
                                [classes["back-card"]]: isOpponent,
                                [classes["drawn-card"]]: card.isDrawn,
                            })}
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
                            drawnZIndex: +card.isDrawn && card.drawnIndex,
                            angle: makeAngle({ index: card.index }),
                        })}
                        className={clsx({
                            [classes["copy-card"]]: true,
                            [classes["back-card"]]: isOpponent,
                            [classes["drawn-card"]]: card.isDrawn,
                        })}
                    />
                ) : null
            )}
        </>
    );
};

export default CardHand;
