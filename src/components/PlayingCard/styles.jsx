import makeClassNames from "../../utils/makeClassNames";

export const playingCardClasses = makeClassNames("PlayingCard", [
    "root",
    "img",
    "img-loaded",
    "img-error",
    "back",
]);

/** @type {import("@mui/material").BoxProps["sx"]} */
export const playingCardRootSx = {
    aspectRatio: "223 / 324",
    borderRadius: "8px",
    overflow: "hidden",
    border: ".05rem solid #1e1e1e",

    [`&.${playingCardClasses.back}`]: {
        backgroundColor: "#ee3e3e",
        border: ".05rem solid #3e3e3e",

        [`&:after`]: {
            display: "block",
            content: "''",
            position: "absolute",
            zIndex: 1,
            top: "10px",
            left: "10px",
            right: "10px",
            bottom: "10px",
            border: ".2rem solid #dedede",
            backgroundColor: "#fe5e5e",
            borderRadius: "4px",
        },

        [`& .${playingCardClasses.img}`]: {
            position: "relative",
            opacity: 0,
        },
    },

    [`& .${playingCardClasses.img}`]: {
        aspectRatio: "223 / 324",
        width: 200,
        overflow: "hidden",
        border: "1px solid black",
        [`&.${playingCardClasses["img-error"]}, &:not(.${playingCardClasses["img-error"]})`]:
            {
                opacity: 0,
            },
        [`&.${playingCardClasses["img-loaded"]}:not(.${playingCardClasses["img-error"]})`]:
            {
                border: "none",
            },
    },
};
