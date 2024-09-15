import { forwardRef, useRef, useState } from "react";
import { Box } from "@mui/material";
import { playingCardClasses, playingCardRootSx } from "./styles";
import clsx from "clsx";

/**
 * @typedef {Object} PlayingCardProps
 * @property {number} cardNum
 * @property {{ root: string, img: string }} classes
 */

const PlayingCard = forwardRef(
    /**
     * PlayingCard
     * @param {import("@mui/material").BoxProps & PlayingCardProps} props
     * @returns {JSXElement}
     */
    function PlayingCard({ cardNum = 0, ...props }, ref) {
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
                ref={ref}
                sx={{
                    ...playingCardRootSx,
                    ...props.sx,
                }}
                className={clsx(
                    playingCardClasses.root,
                    props.classes?.root,
                    props.className,
                    { [playingCardClasses.back]: cardNum === -1 || hasError }
                )}
            >
                <img
                    ref={imgRef}
                    className={clsx(
                        playingCardClasses.img,
                        props.classes?.img,
                        {
                            [playingCardClasses["img-loaded"]]: isLoaded,
                            [playingCardClasses["img-error"]]: hasError,
                        }
                    )}
                    src={
                        cardNum >= 0 ? `/cards/${cardNum}.svg` : `/cards/0.svg`
                    }
                    onLoad={handleImageLoad}
                    onError={handleImageError}
                />
            </Box>
        );
    }
);

export default PlayingCard;
