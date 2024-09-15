import { Box } from "@mui/material";
import PlayingCard from "./PlayingCard/PlayingCard";
import makeClassNames from "../utils/makeClassNames";
import clsx from "clsx";
import useStateRef from "../hooks/useStateRef";
import { useEffect } from "react";

const classes = makeClassNames("CardHand", [
    "top",
    "left",
    "right",
    "bottom",

    "opponent",
]);
const _initCards = [1, 21, 32, 4, 40, 52, 7, 16, 46, 31, 23, 50, 11];

/**
 * @typedef {Object} CardHandProps
 * @property {"top" | "left" | "right" | "bottom"} position
 */

/**
 * CardHand
 * @param {CardHandProps} props
 * @returns  {JSXElement}
 */
const CardHand = ({ position, initCards = _initCards }) => {
    const [cards, setCards] = useStateRef({});
    const isYou = position === "bottom";

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
            <Box
                sx={{
                    position: "fixed",
                    zIndex: isYou ? 100 : "unset",
                }}
            >
                {Object.entries(cards).map(([cardNum, card]) => (
                    <PlayingCard
                        key={cardNum}
                        cardNum={isYou ? cardNum : -1}
                        className={clsx(classes[position], {
                            [classes.opponent]: position !== "bottom",
                        })}
                        sx={{
                            position: "fixed",
                            width: "20vw",
                            transformOrigin: "center center",
                            zIndex: card.index,
                            transition: "all ease .1s",
                            cursor: isYou ? "pointer" : "default",

                            [`&:not(.${classes.opponent}):hover`]: {
                                translate: "0 -25px",
                            },

                            [`&.${classes.top}`]: {
                                top: 10,
                                right: 50,
                                transform: `
                                    translateX(-${card.index * 20}px)
                                    rotate(180deg)
                                `,
                            },
                            [`&.${classes.left}`]: {
                                top: 175,
                                left: -35,
                                transform: `
                                    translateY(${card.index * 20}px)
                                    rotate(90deg)
                                `,
                            },
                            [`&.${classes.right}`]: {
                                bottom: 175,
                                right: -35,
                                transform: `
                                    translateY(-${card.index * 20}px)
                                    rotate(-90deg)
                                `,
                            },
                            [`&.${classes.bottom}`]: {
                                bottom: 10,
                                left: 50,
                                transform: `
                                    translateX(${card.index * 20}px)
                                    rotate(0deg)
                                `,
                            },
                        }}
                    />
                ))}
            </Box>
        </>
    );
};

export default CardHand;
