import { useCallback, useMemo, useRef, useState } from "react";
import { isMobile } from "react-device-detect";
import Box from "@mui/material/Box";
import { useGrabbedCard } from "../stores/grabbedCard";
import { CARD_HIDING_DURATION } from "../constants";
import clsx from "clsx";
import { useHandCards } from "../stores/handCards";

const CARD_WIDTH = "min(16vw, 16vh)";

/**
 * PCard
 * @param {Object} props
 * @param {number} props.card
 * @param {boolean} props.grabbable
 * @param {import("@mui/material").BoxProps["sx"]} props.sx
 * @returns
 */
const PCard = ({ card, sx, grabbable = false }) => {
    const cardRef = useRef();
    const grabbedCardRef = useRef();
    const mouseMoveHandlerRef = useRef();
    const [isDragging, setIsDragging] = useState(false);
    const grabCard = useGrabbedCard((state) => state.grab);
    const handCards = useHandCards((state) => state.cards);
    const isLastCard = useMemo(() => {
        return (
            handCards.length - 1 ===
            handCards.findIndex((c) => c.num === card.num)
        );
    }, [card.num, handCards]);
    const isGrabThresholdCheckedRef = useRef(false);
    const grabStartXYRef = useRef();

    const adjustGrabbedCardPos = useCallback(
        /** @param {MouseEvent} e  */
        (e) => {
            const touch = isMobile ? e.touches[0] : null;
            const [x, y] = isMobile
                ? [touch.clientX, touch.clientY]
                : [e.clientX, e.clientY];

            /** @type {HTMLDivElement} */
            const grabbedCard = grabbedCardRef.current;
            const cardRect = grabbedCard.getBoundingClientRect();

            const pt = cardRect.height / 2 - 8;
            const pl = cardRect.width / 2 - 8;

            grabbedCard.style.top = y - pt + "px";
            grabbedCard.style.left = x - pl + "px";
            grabbedCard.style.bottom = "auto";
            grabbedCard.style.right = "auto";
        },
        []
    );

    const handleMouseUp = useCallback(() => {
        setIsDragging(false);

        window.removeEventListener(
            isMobile ? "touchmove" : "mousemove",
            mouseMoveHandlerRef.current
        );
    }, []);

    const handleMouseMove = useCallback(
        /** @param {MouseEvent} e  */
        async (e) => {
            if (isMobile && !isGrabThresholdCheckedRef.current) {
                isGrabThresholdCheckedRef.current = true;
                const touch = e.touches[0];
                const diffX = Math.abs(
                    grabStartXYRef.current[0] - touch.clientX
                );
                const diffY = Math.abs(
                    grabStartXYRef.current[1] - touch.clientY
                );
                if (diffX > diffY) {
                    handleMouseUp();
                    return;
                }
                setIsDragging(true);
                await new Promise((r) => setTimeout(r));
            }

            adjustGrabbedCardPos(e);
        },
        [adjustGrabbedCardPos, handleMouseUp]
    );

    const handleMouseDown = useCallback(
        (e) => {
            if (!grabbable) return;

            grabCard({ num: card.num });

            if (isMobile) {
                // Check whether user is scrolling or grabbing
                isGrabThresholdCheckedRef.current = false;
                grabStartXYRef.current = [
                    e.touches[0].clientX,
                    e.touches[0].clientY,
                ];
            } else {
                setIsDragging(true);
                setTimeout(() => adjustGrabbedCardPos(e));
            }

            window.addEventListener(
                isMobile ? "touchend" : "mouseup",
                handleMouseUp,
                {
                    once: true,
                }
            );
            window.addEventListener(
                isMobile ? "touchmove" : "mousemove",
                (mouseMoveHandlerRef.current = handleMouseMove)
            );
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [grabbable, adjustGrabbedCardPos, card]
    );

    return (
        <>
            <Box
                ref={cardRef}
                component="img"
                alt="Playing Card"
                src={`/cards/${card.num}.svg`}
                draggable={false}
                onMouseDown={!isMobile ? handleMouseDown : () => void 0}
                onTouchStart={isMobile ? handleMouseDown : () => void 0}
                sx={{
                    position: "relative",
                    width: CARD_WIDTH,
                    opacity: isDragging || card.hidden ? 0 : 1,
                    ...sx,
                    cursor: grabbable ? "grab" : "default",
                    "&.hideMePlz": {
                        transitionTimingFunction: "ease",
                        transitionProperty: "margin-right, margin-left",
                        transitionDuration: `${CARD_HIDING_DURATION}ms`,
                        [isLastCard ? "ml" : "mr"]: `calc(-1 * ${CARD_WIDTH})`,
                    },
                }}
                className={clsx({
                    hideMePlz: card.hidden,
                })}
            />
            {isDragging && (
                <Box
                    ref={grabbedCardRef}
                    component="img"
                    alt="Playing Card"
                    src={`/cards/${card.num}.svg`}
                    draggable={false}
                    sx={{
                        position: "fixed",
                        width: "min(20vw, 20vh)",
                        cursor: "grabbing",
                        zIndex: 1000,
                        border: "1px solid black",
                        borderRadius: "4px",
                        bottom: "100vh",
                        right: "100vw",
                        transform: "rotate(5deg)",
                    }}
                />
            )}
        </>
    );
};

export default PCard;
