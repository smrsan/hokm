import { useRef, useState } from "react";
import { Box } from "@mui/material";
import { playingCardClasses, playingCardRootSx } from "./styles";
import clsx from "clsx";

/**
 * @typedef {Object} PlayingCardProps
 * @property {number} cardNum
 * @property {{ root: string, img: string }} classes
 */

/**
 * PlayingCard
 * @param {import("@mui/material").BoxProps & PlayingCardProps} props
 * @returns {JSXElement}
 */
const PlayingCard = ({ cardNum = 0, ...props }) => {
    /** @type {import("react").MutableRefObject<HTMLImageElement>} */
    const imgRef = useRef();
    const [isLoaded, setIsLoaded] = useState(false);
    const [hasError, setHasError] = useState(false);

    const handleImageLoad = () => {
        setIsLoaded(true);
        setHasError(false);
    };

    const handleImageError = () => {
        setIsLoaded(false);
        setHasError(true);
    };

    return (
        <Box
            {...props}
            sx={{
                ...playingCardRootSx,
                ...props.sx,
            }}
            className={clsx(
                playingCardClasses.root,
                props.classes?.root,
                props.className,
                { [playingCardClasses.back]: cardNum === -1 }
            )}
        >
            <img
                ref={imgRef}
                className={clsx(playingCardClasses.img, props.classes?.img, {
                    [playingCardClasses["img-loaded"]]: isLoaded,
                    [playingCardClasses["img-error"]]: hasError,
                })}
                src={cardNum >= 0 ? `/cards/${cardNum}.svg` : `/cards/0.svg`}
                onLoad={handleImageLoad}
                onError={handleImageError}
            />
        </Box>
    );
};

export default PlayingCard;
