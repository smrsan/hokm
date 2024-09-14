import { Box } from "@mui/material";
import PlayingCard from "./PlayingCard/PlayingCard";
import { playingCardClasses } from "./PlayingCard/styles";

const CARD_WIDTH = 100;

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
const makeCardSx = ({ index, totalCards, fanAngle, position, isOpponent }) => {
    const angle =
        (index - (totalCards - 1) / 2) * (fanAngle / totalCards) -
        (position === "bottom"
            ? 15
            : position === "top"
            ? 15 + 180
            : position === "right"
            ? 90 + 15
            : position === "left"
            ? -90 + 15
            : 15);

    return {
        [`&.${playingCardClasses.root}`]: {
            position: "absolute",
            width: `${CARD_WIDTH}px`,
            transform: `rotate(${angle}deg)`,
            transformOrigin: "bottom left",
            cursor: isOpponent ? "default" : "pointer",
            transitionDuration: "300ms",
            transitionProperty: "transform",
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
        },
        [`& .${playingCardClasses.img}`]: {
            position: "relative",
            display: "block",
            width: `${CARD_WIDTH}px`,
        },
    };
};

const CardHand = ({ position = "right", isOpponent = false }) => {
    const totalCards = 13;
    const fanAngle = 135;

    return (
        <Box sx={makeRootSx({ position })}>
            {Array.from({ length: 13 }).map((_, i) => (
                <PlayingCard
                    key={i}
                    {...{
                        sx: makeCardSx({
                            index: i,
                            totalCards,
                            fanAngle,
                            position,
                            isOpponent,
                        }),
                        cardNum: isOpponent ? -1 : i + 1,
                    }}
                />
            ))}
        </Box>
    );
};

export default CardHand;
